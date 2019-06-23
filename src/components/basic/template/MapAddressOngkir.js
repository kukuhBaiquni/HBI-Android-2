import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

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
    }

    _renderRoute = () => {
    };

    render() {
        const { address } = this.props;
        return(
            <View style={{alignItems: 'center', marginTop: 10}}>
                <View style={styles.basicCard}>
                    <MapView
                        ref={map => this.map = map}
                        style={{height: 200, width: '100%'}}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={(x) => this.setState({region: x})}
                        onPress={(e) => this._markerPosition(e.nativeEvent.coordinate)}
                        />
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
});
