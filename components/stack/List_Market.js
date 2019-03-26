import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableNativeFeedback, StatusBar, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { SERVER_URL, idrFormat } from '../../config';
import { NavigationEvents } from 'react-navigation';
import { getAllProducts } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';
import { setTargetMember } from '../../actions/Set_Target_Member';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { getMemberLocation } from '../../actions/Get_Member_Location';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class ListMarket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            myPosition: null,
            destination: null,
            distance: null,
            ongkir: null,
            addressHandler: '',
            indexHandler: 0,
            region: {
                latitude: -6.949364630440158,
                longitude: 107.613774407655,
                latitudeDelta: 0.01754357210323132,
                longitudeDelta: 0.00994127243757248
            },
            camera: {
                center: {
                    latitude: -6.949364630440158,
                    longitude: 107.613774407655
                },
                pitch: 0,
                heading: 1,
                altitude: 0,
                zoom: 13
            }
        }
    }

    beforeRender = async () => {
        try{
            const id = await AsyncStorage.getItem('PlayerID')
            const token = await AsyncStorage.getItem('access_token');
            if (id !== null && token !== null) {
                const ids = JSON.parse(id)
                const tokens = JSON.parse(token)
                this.setState({token: tokens})
                if (this.props.token === '') {
                    this.props.dispatch(setInitialToken(tokens))
                    this.props.dispatch(getMemberLocation(tokens))
                }
                if (this.props.userData.playerID !== ids) {
                    this.props.dispatch(setPlayerId({ids, token: tokens}))
                }
                if (this.props.userData.name === '') {
                    this.props.dispatch(fetchUser(tokens))
                }
            }
            if (this.props.listProducts.length === 0) {
                this.props.dispatch(getAllProducts());
            }
        }catch(error) {
        }
    }

    setMemberToReducer(x) {
        this.props.dispatch(setTargetMember(x))
        this.props.navigation.navigate('ListProducts')
    }

    componentDidMount() {
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
                })
                this.setState({
                    myPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    trailRoute(i) {
        const latitude = this.props.listMarket.data[i].address.geolocation.latitude;
        const longitude = this.props.listMarket.data[i].address.geolocation.longitude;
        const APIKEY =  'AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU'
        const origin = this.state.myPosition;
        const destination = {
            latitude, longitude
        };
        this.setState({indexHandler: i, destination})
        console.log([this.state.myPosition, destination]);
        // this.map.fitToSuppliedMarkers([this.state.myPosition, destination], true)
        this.map.animateCamera({
            center: {
                latitude, longitude
            },
            pitch: 1,
            heading: 1,
            altitude: 1,
            zoom: 13
        });
    };

    markerPress(x, i) {
        const prev = this.state.indexHandler;
        let target = i - prev;
        this.swiper.scrollBy(target, true)
    };

    delayMove = () => {
        setTimeout(() => {this.props.navigation.navigate('ListProducts')}, 100)
    };

    _renderListMember = () => {
        const { listMarket } = this.props;
        if (listMarket.data.length !== 0) {
            return(
                listMarket.data.map((x, i) =>
                    <Marker
                        key={i}
                        onPress={(r, z) => this.markerPress(x, i)}
                        coordinate={x.address.geolocation}
                        title='Member'
                        description='Jualan Daging'
                        />
                )
            )
        }
    };

    _renderRoute = () => {
        return(
            this.state.myPosition !== null &&
            <MapViewDirections
                origin={this.state.myPosition}
                destination={this.state.destination}
                apikey='AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU'
                strokeWidth={3}
                strokeColor='#7c0c10'
                onReady={(x) => this.setState({distance: x.distance})}
                />
        )
    }

    render() {
        const { navigation, listMarket } = this.props;
        return(
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor='#7c0c10'
                    barStyle='light-content'
                    />
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <MapView
                    ref={map => this.map = map}
                    style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={(x) => this.setState({region: x})}
                    showsUserLocation={true}
                    >
                    {this._renderListMember()}
                    {this._renderRoute()}
                </MapView>
                <View style={styles.swiperEld}>
                    <Swiper
                        horizontal={true}
                        autoplay={false}
                        loop={true}
                        showsPagination={false}
                        ref={swiper => this.swiper = swiper}
                        activeDotColor='#7c0c10'
                        onIndexChanged={(x) => this.trailRoute(x)}
                        style={styles.swiperStyle}
                        >
                        {
                            listMarket.data.map((x, i) =>
                            <View key={i} style={styles.swiperTop}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('darkred')}
                                    >
                                    <View style={styles.swiperWrapper}>
                                        <Image style={styles.imageLocation} source={require('../../android/app/src/main/assets/custom/Contoh2.png')} />
                                        <TouchableNativeFeedback
                                            onPress={this.delayMove}
                                            background={TouchableNativeFeedback.Ripple('black')}
                                            >
                                            <View style={styles.swiperDetails}>
                                                <Text>{x.address.nama_toko}</Text>
                                                <Text>Jl.{x.address.street} No.{x.address.no}</Text>
                                                <Text>Kec.{x.address.district} Kel.{x.address.village}</Text>
                                                <Text style={styles.distanceText}>Jarak {this.state.distance !== null ? <Text style={{fontWeight: 'bold'}}>{Math.round(this.state.distance * 100) / 100} km</Text> : '-'}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            )
                        }
                    </Swiper>
                </View>
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
}

export default connect(
    mapDispatchToProps
)(ListMarket)

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
    productName: {color: '#7c0c10', fontSize: 12, fontWeight: 'bold'},
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
        borderColor: '#7c0c10',
        elevation: 5
    },
    swiperEld: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    swiperStyle: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH,
        height: 120
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
    }
})
