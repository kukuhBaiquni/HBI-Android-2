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
import { getMarket } from '../../actions/Get_Market';
import { setTargetMember } from '../../actions/Set_Target_Member';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class ListMarket extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            },
            member: [
                {
                    center: {
                        latitude: -6.919689366190346,
                        longitude: 107.59468043223023
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                },
                {
                    center: {
                        latitude: -6.94248461157722,
                        longitude: 107.57586942985654
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                },
                {
                    center: {
                        latitude: -6.98863485873917,
                        longitude: 107.57206605747342
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                },
                {
                    center: {
                        latitude: -7.033653849522472,
                        longitude: 107.5832569040358
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                },
                {
                    center: {
                        latitude: -7.025569213896901,
                        longitude: 107.64357374981046
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                },
                {
                    center: {
                        latitude: -6.977922716807315,
                        longitude: 107.68835322931409
                    },
                    pitch: 1,
                    heading: 1,
                    altitude: 1,
                    zoom: 13
                }
            ]
        }
    }

    beforeRender = async () => {
        try{
            const id = await AsyncStorage.getItem('PlayerID')
            const token = await AsyncStorage.getItem('access_token');
            if (id !== null && token !== null) {
                const ids = JSON.parse(id)
                const tokens = JSON.parse(token)
                if (this.props.token === '') {
                    this.props.dispatch(setInitialToken(tokens))
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
            if (this.props.listMarket.data.length === 0) {
                this.props.dispatch(getMarket())
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

    test(i) {
        const latitude = this.state.member[i].center.latitude;
        const longitude = this.state.member[i].center.longitude;
        const APIKEY =  'AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU'
        const origin = this.state.myPosition;
        const destination = {
            latitude, longitude
        }
        this.setState({indexHandler: i, destination})
        const urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
        this.map.animateCamera({
            center: {
                latitude: latitude,
                longitude: longitude
            },
            pitch: 1,
            heading: 1,
            altitude: 1,
            zoom: 13
        })
        fetch(urlAddress)
        .then(res => res.json())
        .then(resJson => {
            this.setState({addressHandler: resJson.results[0].formatted_address})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    markerPress(x, i) {
        const prev = this.state.indexHandler;
        let target = i - prev;
        this.swiper.scrollBy(target, true)
    }

    render() {
        const { navigation } = this.props;
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
                    {
                        this.state.member.map((x, i) =>
                        <Marker
                            key={i}
                            onPress={(r, z) => this.markerPress(x, i)}
                            coordinate={x.center}
                            title='Member'
                            description='Jualan Daging'
                            />
                        )
                    }
                    {
                        this.state.myPosition !== null &&
                        <MapViewDirections
                            origin={this.state.myPosition}
                            destination={this.state.destination}
                            apikey='AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU'
                            strokeWidth={3}
                            strokeColor='hotpink'
                            onReady={(x) => this.setState({distance: x.distance})}
                            />
                    }
                </MapView>
                <View style={{position: 'absolute', bottom: 0, right: 0, width: SCREEN_WIDTH, alignItems: 'center'}}>
                    <Swiper
                        horizontal={true}
                        autoplay={false}
                        loop={true}
                        showsPagination={false}
                        ref={swiper => this.swiper = swiper}
                        activeDotColor='#7c0c10'
                        onIndexChanged={(x) => this.test(x)}
                        style={{backgroundColor: 'transparent', width: SCREEN_WIDTH, height: 120}}
                        >
                        {
                            this.state.member.map((x, i) =>
                            <View key={i} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('darkred')}>
                                    <View style={{width: SCREEN_WIDTH*0.95, height: 100, backgroundColor: 'white', elevation: 3, borderRadius: 5, justifyContent: 'space-around',flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{height: 90, width: '30%', borderRadius: 5}} source={require('../../android/app/src/main/assets/custom/Contoh2.png')} />
                                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ListProducts')} background={TouchableNativeFeedback.Ripple('black')}>
                                            <View style={{width: '64%', height: 90, backgroundColor: 'white', borderRadius: 5}}>
                                                <Text>{this.state.addressHandler}</Text>
                                                <Text>Jarak {this.state.distance !== null ? <Text style={{fontWeight: 'bold'}}>{Math.round(this.state.distance * 100) / 100} km</Text> : '-'}</Text>
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
}


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
    }
})
