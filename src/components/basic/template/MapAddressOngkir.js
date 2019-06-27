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
            distance: null
        }
    };

    // componentDidMount() {
    //     fetch(googleApis + `Sindanglaya no 131 rt 03 rw 01 arcamanik binaharapan bandung` + `&key=${API_KEY}`)
    //     .then(res => console.log(JSON.parse(res._bodyText)));
    // };

    _afterRender = () => {
        const origin = {...ORIGIN_POINT};
        if (this.props.navigation.state.params !== undefined) {
            const destination = this.props.navigation.state.params.destinationPoint;
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
            if (prevState.distance === null) {
                this._getDestinationPoint();
            }
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
        if (this.props.navigation.state.params !== undefined) {
            return(
                <MapViewDirections
                    origin={navigation.state.params.destinationPoint}
                    destination={{...ORIGIN_POINT}}
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
                coordinate={navigation.state.params.destinationPoint}
                >
                <Entypo name='location-pin' size={20} color={COLORS.ORANGE_DEFAULT} />
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
                        {navigation.state.params !== undefined && this._destinationPoint()}
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
