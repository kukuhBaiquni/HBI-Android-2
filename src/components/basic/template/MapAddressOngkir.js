import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { DRAWER_DEFAULT } from '../../../images';
import { ORIGIN_POINT } from '../supportFunction';

import { CAPITALIZE } from '../supportFunction';

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
            apikey: 'AIzaSyCIMNrAZbX3gmDtNVYVhJVEIV3btZesLVU'
        }
    };

    componentDidMount() {
        fetch(googleApis + `Sindanglaya no 131 rt 03 rw 01 arcamanik binaharapan bandung` + `&key=${this.state.apikey}`)
        .then(res => console.log(JSON.parse(res._bodyText)));
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
    };

    render() {
        const { address, editModeAddress, changeEditMode, customData, navigation } = this.props;
        return(
            <View style={{alignItems: 'center', marginTop: 10}}>
                <View style={styles.basicCard}>
                    <MapView
                        ref={map => this.map = map}
                        style={{height: 200, width: '100%'}}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={(x) => this.setState({region: x})}
                        onPress={(e) => this._markerPosition(e.nativeEvent.coordinate)}
                        >
                        {this._originPoint()}
                    </MapView>
                    <Text style={styles.propertyText}>Alamat Pengiriman</Text>
                    {
                        address.street !== '' || navigation.state.params !== undefined
                        ?
                        <View style={styles.infoTopMap}>
                            <Text style={{...TYPOGRAPHY.p}}>
                                Jl. {address.street}
                            </Text>
                            <Text style={{...TYPOGRAPHY.p}}>Kecamatan {CAPITALIZE(address.district.name)}</Text>
                            <Text style={{...TYPOGRAPHY.p}}>Kelurahan {CAPITALIZE(address.village.name)}</Text>
                            <Text style={{...TYPOGRAPHY.p}}>{CAPITALIZE(address.city.name)}</Text>
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
