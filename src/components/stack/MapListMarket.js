import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableNativeFeedback, StatusBar, AsyncStorage, Dimensions, ToastAndroid, PermissionsAndroid, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { SERVER_URL, IDR_FORMAT, _FONTS } from '../basic/supportFunction';
import { NavigationEvents } from 'react-navigation';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { getMemberLocation } from '../../actions/Get_Member_Location';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Modal from 'react-native-modal';
import {WaveIndicator} from 'react-native-indicators';
import { DRAWER_DEFAULT, CONTOH_2, BELANJA, BELANJA_C, BACKDARKRED } from '../../images';
import { MODAL } from '../basic/template/loading';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const googleApis = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';


class MapListMarket extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Daftar Lokasi Member',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            apikey: 'AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU',
            token: '',
            myPosition: null,
            destination: null,
            distance: null,
            addressHandler: '',
            indexHandler: 0,
            region: {
                latitude: -6.9442352,
                longitude: 107.6455722,
                latitudeDelta: 0,
                longitudeDelta: 0.5
            },
            camera: {
                center: {
                    latitude: -6.9442352,
                    longitude: 107.6455722
                },
                pitch: 0,
                heading: 1,
                altitude: 12.71,
                zoom: 5
            },
            locationDenied: null,
            activeMemberIndex: 0,
            fakePosition: null,
            isSwiperVisible: false,
            isMemberVisible: false
        }
    };

    _handleBackButton = () => {
        const { navigation } = this.props;
        navigation.navigate('Beranda');
        return true
    };

    _afterRender = async () => {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
        this.props.dispatch(getMemberLocation())
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Layanan Lokasi',
                    message:
                    'Untuk mendapatkan posisi member terdekat ' +
                    'Anda perlu menyalakan layanan lokasi/GPS.',
                    buttonNegative: 'Tidak',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ToastAndroid.show('Anda juga dapat menandai peta untuk menentukan posisi.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
                this._getPosition();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.log(err);
        }
        this._toggleVisibility();
    };

    _beforeBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
    };

    _toggleVisibility = () => {
        setTimeout(() => {
            this.setState({
                isMemberVisible: true,
                isSwiperVisible: true
            });
        }, 10);
    };

    _getPosition = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                this.map.animateCamera({
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 14
                });
                this.setState({
                    locationDenied: false,
                    myPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            (error) => {
                this.setState({locationDenied: true})
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                showLocationDialog: true
            }
        );
    };

    _setMemberToReducer(x) {
        if (this.state.distance !== null) {
            const ongkir = ongkirCalculation(this.state.distance);
            this.props.navigation.navigate('ListProducts', {member: x, ongkir});
        }
    };

    _drawRoute = (i) => {
        const latitude = this.props.listMarket.data[i].address.geolocation.latitude;
        const longitude = this.props.listMarket.data[i].address.geolocation.longitude;
        let origin = null;
        const destination = {
            latitude, longitude
        };
        if (this.state.fakePosition === null) {
            origin = this.state.myPosition;
        }else{
            origin = this.state.fakePosition;
        }
        this.setState({indexHandler: i, destination, activeMemberIndex: i});
        if (this.state.myPosition === null && this.state.fakePosition === null) {
            this.map.animateCamera({
                center: {
                    latitude, longitude
                },
                pitch: 1,
                heading: 1,
                altitude: 1,
                zoom: 13
            });
        }else{
            this.map.fitToCoordinates([
                origin,
                destination
            ], {
                edgePadding: {
                    top: 10,
                    right: 40,
                    bottom: 500,
                    left: 40
                }, animated: true
            });
        }
    };

    markerPress(x, i) {
        const prev = this.state.indexHandler;
        let target = i - prev;
        this.swiper.scrollBy(target, true);
    };

    _renderListMember = () => {
        const { listMarket } = this.props
        if (listMarket.data.length !== 0) {
            return(
                listMarket.data.map((x, i) =>
                    <Marker
                        key={i}
                        onPress={(r, z) => this.markerPress(x, i)}
                        // coordinate={{latitude: parseFloat(x.address.geolocation[0]), longitude: parseFloat(x.address.geolocation[1])}}
                        coordinate={{latitude: x.address.geolocation.latitude, longitude: x.address.geolocation.longitude}}
                        title={x.address.nama_toko || 'Member Halalbeef Indonesia'}
                        description={x.address.nama_toko}
                        tracksViewChanges={false}
                        >
                        <View style={this.state.activeMemberIndex === i ? styles.pinWrapper : [styles.pinWrapper, {backgroundColor: COLORS.PRIMARY}]}>
                            {
                                this.state.activeMemberIndex === i
                                ?
                                <Image style={styles.pinImage} source={DRAWER_DEFAULT} />
                                :
                                <Text style={{color: COLORS.PURE_WHITE, fontSize: 10, fontWeight: 'bold'}}>HBI</Text>
                            }
                        </View>
                    </Marker>
                )
            )
        }
    };

    _renderRoute = () => {
        const { myPosition, fakePosition, destination, apikey } = this.state;
        if (fakePosition !== null) {
            return(
                <MapViewDirections
                    origin={fakePosition}
                    destination={destination}
                    apikey={apikey}
                    mode='walking'
                    strokeWidth={2}
                    strokeColor={COLORS.PRIMARY}
                    onReady={(x) => this.setState({distance: x.distance})}
                    onError={(error) => console.log(error)}
                    />
            )
        }else{
            return(
                <MapViewDirections
                    origin={myPosition}
                    destination={destination}
                    apikey={apikey}
                    mode='walking'
                    strokeWidth={2}
                    strokeColor={COLORS.PRIMARY}
                    onReady={(x) => this.setState({distance: x.distance})}
                    onError={(error) => console.log(error)}
                    />
            )
        }
    }

    _replacer = () => {
        return(
            <View style={styles.swiperWrapper}>
                <Icon name='chevron-thin-left' color={COLORS.PRIMARY} size={29} />
                <View>
                    <Text style={styles.swipeText}>Geser Disini</Text>
                    <Text style={{fontSize: 13}}>Untuk mencari toko pilihan Anda.</Text>
                </View>
                <Icon name='chevron-thin-right' color={COLORS.PRIMARY} size={29} />
            </View>
        )
    }

    _markerPosition(position) {
        this.setState({ fakePosition: position});
        fetch(googleApis + position.latitude + `,` + position.longitude + `&key=${this.state.apikey}`)
        .then(res => res.json())
        .then(resJson => {
            this.setState({
                addressHandler: resJson.results[0].formatted_address
            })
        })
        .catch((err) => {
            console.log(err);
        })
    };

    _renderManualPosition = () => {
        return(
            <Marker
                coordinate={this.state.fakePosition}
                title='Posisi Saya'
                description={this.state.addressHandler}
                >
                <Icon name='man' size={20} color='darkred' />
            </Marker>
        )
    };

    _focusMyLocation = () => {
        const { myPosition } = this.state;
        if (myPosition !== null) {
            this.map.animateCamera({
                center: {
                    latitude: myPosition.latitude,
                    longitude: myPosition.longitude
                },
                pitch: 1,
                heading: 1,
                altitude: 1,
                zoom: 14
            });
        }
    };

    _renderMyLocationButton = () => {
        return(
            <TouchableOpacity onPress={this._focusMyLocation} style={styles.turnOnGps}>
                <MaterialIcons name='gps-fixed' size={23} color='white' />
            </TouchableOpacity>
        )
    };

    _renderInfoLocation = () => {
        if (this.state.locationDenied) {
            return(
                <TouchableOpacity style={styles.infoLocation} onPress={this._getPosition}>
                    <Text style={styles.textInfoLocation}>Aktifkan GPS untuk mendapatkan lokasi member terdekat.</Text>
                </TouchableOpacity>
            )
        }
    };

    _renderRemovePin = () => {
        if (this.state.fakePosition !== null) {
            return(
                <TouchableOpacity style={styles.removePin} onPress={this._removePin}>
                    <Icon name='cross' size={23} color='white'/>
                </TouchableOpacity>
            )
        }
    };

    _removePin = () => {
        if (this.state.fakePosition !== null) {
            this.setState({fakePosition: null});
        }
    };

    render() {
        const { navigation, listMarket } = this.props;
        if (navigation.isFocused) {
            return(
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor={COLORS.PRIMARY}
                        barStyle='light-content'
                        />
                    <NavigationEvents
                        onDidFocus={this._afterRender}
                        onWillBlur={this._beforeBlur}
                        />
                    <MODAL isVisible={!this.state.isMemberVisible} message='Memuat Peta' />
                    {this._renderMyLocationButton()}
                    {this._renderRemovePin()}
                    {this._renderInfoLocation()}
                    <MapView
                        ref={map => this.map = map}
                        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={(x) => this.setState({region: x})}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        showsCompass={false}
                        onPress={(e) => this._markerPosition(e.nativeEvent.coordinate)}
                        >
                        {this.state.isMemberVisible && this._renderListMember()}
                        {this._renderRoute()}
                        {this.state.fakePosition !== null && this._renderManualPosition()}
                    </MapView>
                    {
                        this.state.isSwiperVisible &&
                        <View style={styles.swiperEld}>
                            <Swiper
                                horizontal={true}
                                autoplay={false}
                                loop={true}
                                index={0}
                                showsPagination={false}
                                ref={swiper => this.swiper = swiper}
                                activeDotColor={COLORS.PRIMARY}
                                onIndexChanged={this._drawRoute}
                                style={styles.swiperStyle}
                                >
                                {
                                    listMarket.data.map((x, i) =>
                                        <View key={i} style={styles.swiperTop}>
                                            <View style={styles.ongkirWrapper}>
                                                {
                                                    this.state.distance !== null &&
                                                    <View style={styles.leftAlign}>
                                                        <Text style={[styles.shopNameText, {marginLeft: 10}]}>Ongkir</Text>
                                                        <Text style={[styles.shopNameText, {marginRight: 10, textAlign: 'right'}]}>
                                                            {IDR_FORMAT(ongkirCalculation(this.state.distance))}
                                                        </Text>
                                                    </View>
                                                }
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => this._setMemberToReducer(x)}
                                                >
                                                <View style={styles.swiperWrapper}>
                                                    <Image style={styles.imageLocation} source={CONTOH_2} />
                                                    <View style={styles.swiperDetails}>
                                                        <Text style={styles.shopNameText}>{x.address.nama_toko}</Text>
                                                        <Text style={styles.addressText}>Jl.{x.address.street} No.{x.address.no}</Text>
                                                        <Text style={styles.addressText}>{x.address.district} {x.address.village}</Text>
                                                        <Text style={styles.distanceText}>Jarak {this.state.distance !== null ? <Text style={{fontWeight: 'bold'}}>{Math.round(this.state.distance * 100) / 100} km</Text> : '-'}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </Swiper>
                        </View>
                    }
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }
    }
};

const ongkirCalculation = (distance) => {
    if (Number(distance) > 10) {
        let raw = Math.ceil(distance*3300).toString();
        if (Number(raw) > 10000) {
            return raw.charAt(0) + raw.charAt(1) + '000';
        }else{
            return raw.charAt(0) + '000';
        }
    }else{
        let raw = Math.ceil(distance*2200).toString();
        if (Number(raw) > 10000) {
            return raw.charAt(0) + raw.charAt(1) + '000';
        }else{
            return raw.charAt(0) + '000';
        }
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(MapListMarket);

const styles = StyleSheet.create({
    slide: {
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 40,
        elevation: 3
    },
    subtitle: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold'
    },
    productName: {color: COLORS.PRIMARY, fontSize: 12, fontWeight: 'bold'},
    floatingButton: {
        position: 'absolute',
        zIndex: 3,
        bottom: 20,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        elevation: 5
    },
    swiperEld: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    swiperStyle: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH,
        height: 150
    },
    swiperTop: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    swiperWrapper: {
        width: SCREEN_WIDTH*0.95,
        height: 100,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    swiperDetails: {
        width: '64%',
        height: 90,
        backgroundColor: 'white',
        borderRadius: 5
    },
    imageLocation: {
        height: 90,
        width: '30%',
        borderRadius: 5
    },
    distanceText: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    shopNameText: {
        // fontFamily: _FONTS.AsapCondensedBold,
        letterSpacing: 0.5,
        fontSize: 15
    },
    addressText: {
        // fontFamily: _FONTS.AsapCondensedRegular,
        letterSpacing: 0.4
    },
    ongkirWrapper: {
        width: SCREEN_WIDTH * 0.95,
        height: 35,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    leftAlign: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.38,
        justifyContent: 'space-between'
    },
    pinImage: {
        borderRadius: 10,
        width: 20,
        height: 20
    },
    swipeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
        letterSpacing: 0.25,
        textAlign: 'center'
    },
    turnOnGps: {
        height: 35,
        width: 35,
        borderRadius: 20,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 120,
        left: 10,
        zIndex: 5
    },
    infoLocation: {
        backgroundColor: 'yellow',
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfoLocation: {
        padding: 5,
        textAlign: 'center',
        // fontFamily: _FONTS.AsapCondensedRegular,
        fontSize: 13,
    },
    removePin: {
        height: 35,
        width: 35,
        borderRadius: 20,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 160,
        left: 10,
        zIndex: 5
    },
    fakePositionStyle: {
        height: 20,
        width: 20,
        backgroundColor: 'cyan',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pinWrapper: {
        backgroundColor: 'transparent',
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.PRIMARY,
        borderRadius: 15,
        borderWidth: 1
    }
});
