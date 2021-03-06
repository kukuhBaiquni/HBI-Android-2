import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { DRAWER_DEFAULT } from '../../../images';
import { ORIGIN_POINT } from '../supportFunction';

import { CAPITALIZE, API_KEY } from '../supportFunction';

import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';

const googleApis = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

export default class MapAddressOngkir extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: -6.887244,
                longitude: 107.600628,
                latitudeDelta: 0,
                longitudeDelta: 0.5
            },
            distance: null,
            directLocation: {
                latitude: 0,
                longitude: 0
            }
        }
    };

    componentDidMount() {
        const origin = {...ORIGIN_POINT};
        const userAddress = this.props.address;
        if (userAddress.city.name !== '' && userAddress.district.name !== '' && userAddress.province.name !== '') {
            fetch(googleApis + `${userAddress.city.name}, ${userAddress.district.name}` + `&key=${API_KEY}`)
            .then(res => res.json())
            .then(resJson => {
                let clone = {...this.state.directLocation};
                clone.latitude = resJson.results[0].geometry.location.lat;
                clone.longitude = resJson.results[0].geometry.location.lng;
                this.setState({
                    directLocation: clone
                });
                this.map.fitToCoordinates([
                    origin,
                    clone
                ], {
                    edgePadding: {
                        top: 10,
                        right: 40,
                        bottom: 10,
                        left: 40
                    }, animated: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    _afterRender = () => {
        const origin = {...ORIGIN_POINT};
        if (this.props.navigation.state.params !== undefined) {
            const destination = this.props.navigation.state.params.destinationPoint;
            this.setState({directLocation: destination});
            this.map.fitToCoordinates([
                origin,
                destination
            ], {
                edgePadding: {
                    top: 10,
                    right: 40,
                    bottom: 10,
                    left: 40
                }, animated: true
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.distance !== this.state.distance) {
            this._getDestinationPoint();
        }
    };

    _getDestinationPoint = () => {
        this.props.getOngkir(this.state.distance);
    };

    _originPoint = () => {
        return(
            <Marker
                coordinate={{latitude: ORIGIN_POINT.latitude, longitude: ORIGIN_POINT.longitude}}
                >
                <Image style={styles.pinImage} source={DRAWER_DEFAULT} />
            </Marker>
        )
    };

    _renderRoute = () => {
        const { navigation } = this.props;
        if (this.state.directLocation.longitude !== 0 && this.state.directLocation.latitude !== 0) {
            return(
                <MapViewDirections
                    origin={{...ORIGIN_POINT}}
                    destination={this.state.directLocation}
                    apikey={API_KEY}
                    mode='WALKING'
                    strokeWidth={2}
                    strokeColor={COLORS.PRIMARY}
                    onReady={(x) => this.setState({distance: x.distance})}
                    onError={(error) => console.log(error)}
                    />
            )
        }
    };

    _destinationPoint = () => {
        const { navigation } = this.props;
        return(
            <Marker
                coordinate={this.state.directLocation}
                >
                <Entypo name='location-pin' size={29} color={COLORS.BLUE_SEA} />
            </Marker>
        )
    };

    render() {
        const { address, editModeAddress, changeEditMode, customData, navigation } = this.props;
        return(
            <View style={{alignItems: 'center', marginTop: 10}}>
                <NavigationEvents
                    onDidFocus={this._afterRender}
                    />
                <View style={styles.basicCard}>
                    <MapView
                        ref={map => this.map = map}
                        style={{height: 200, width: '100%'}}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={(x) => this.setState({region: x})}
                        >
                        {this._originPoint()}
                        {this._renderRoute()}
                        {this.state.directLocation.latitude !== 0 && this.state.directLocation.longitude && this._destinationPoint()}
                    </MapView>
                    <Text style={styles.propertyText}>Alamat Tujuan</Text>
                    {
                        address.street !== '' || navigation.state.params !== undefined
                        ?
                        <View style={styles.infoTopMap}>
                            <Text style={{...TYPOGRAPHY.p}}>
                                Jl. {navigation.state.params !== undefined ? navigation.state.params.addressString : address.street}
                            </Text>
                            <Text style={{...TYPOGRAPHY.p}}>{CAPITALIZE(navigation.state.params !== undefined ? navigation.state.params.pcd.split(', ')[0] : address.district.name)}</Text>
                            <Text style={{...TYPOGRAPHY.p}}>{CAPITALIZE(navigation.state.params !== undefined ? navigation.state.params.pcd.split(', ')[1] : address.city.name)}</Text>
                            <Text style={{...TYPOGRAPHY.p}}>Provinsi {CAPITALIZE(navigation.state.params !== undefined ? navigation.state.params.pcd.split(', ')[2] : address.province.name)}</Text>
                            {this.state.distance !== null && <Text style={{...TYPOGRAPHY.p}}>Jarak {Math.round(this.state.distance * 100) / 100} km</Text>}
                            <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.navigate('SetLocation')}>
                                <Icon name='edit' color={COLORS.PRIMARY} size={17} />
                                <Text style={[styles.changeText, {marginLeft: 2}]}>{editModeAddress ? 'Simpan' : 'Ubah'}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Text style={styles.alertUncompleteAddress}>Alamat belum lengkap</Text>
                    }
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    basicCard                   : { backgroundColor: 'white', width: '95%', borderRadius: 3 },
    infoTopMap                  : { ...TYPOGRAPHY.subHeader, marginLeft: 10, marginTop: 5, marginBottom: 5},
    propertyText                : { ...TYPOGRAPHY.subHeader, marginLeft: 10, marginTop: 5, marginBottom: -5 },
    alertUncompleteAddress      : { fontStyle: 'italic', color: '#bababa' },
    changeText                  : { ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f14 },
    touchableArea               : { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
    pinImage                    : { borderRadius: 10, width: 20, height: 20 },
});
