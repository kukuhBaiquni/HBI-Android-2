import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';
import { CAPITALIZE } from '../supportFunction';

export const ADDRESS_INFO = (props) => {
    const { userData, navigation, newParams } = props;
    return(
        <View style={userInfo.container}>
            <View style={userInfo.papperWhite}>
                <View>
                    <Text style={userInfo.titleText}>Informasi Pembeli</Text>
                    <TouchableOpacity style={userInfo.changeTextPseudoButton} onPress={() => navigation.navigate('EditAddress', newParams)}>
                        <Text style={userInfo.changeText}>Ubah</Text>
                    </TouchableOpacity>
                </View>
                {
                    navigation.state.params === undefined
                    ?
                    <View>
                        <Text style={userInfo.propertyText}>Nama</Text>
                        <Text style={userInfo.valueText}>{userData.personalIdentity.name}</Text>
                        <Text style={userInfo.propertyText}>Nomor Telepon</Text>
                        <Text style={userInfo.valueText}>{userData.personalIdentity.phone}</Text>

                    </View>
                    :
                    <View>
                        <Text style={userInfo.propertyText}>Nama</Text>
                        <Text style={userInfo.valueText}>{navigation.state.params.name}</Text>
                        <Text style={userInfo.propertyText}>Nomor Telepon</Text>
                        <Text style={userInfo.valueText}>{navigation.state.params.phone}</Text>
                        <Text style={userInfo.propertyText}>Alamat Pengiriman</Text>
                        {
                            userData.personalIdentity.address.street !== '' || navigation.state.params !== undefined
                            ?
                            <View>
                                <Text style={{...TYPOGRAPHY.p}}>
                                    Jl. {navigation.state.params.street}
                                </Text>
                                <Text style={{...TYPOGRAPHY.p}}>Kecamatan {CAPITALIZE(navigation.state.params.district.name)}</Text>
                                <Text style={{...TYPOGRAPHY.p}}>Kelurahan {CAPITALIZE(navigation.state.params.village.name)}</Text>
                                <Text style={{...TYPOGRAPHY.p}}>{CAPITALIZE(navigation.state.params.city.name)}</Text>
                            </View>
                            :
                            <Text style={userInfo.alertUncompleteAddress}>Alamat belum lengkap</Text>
                        }
                    </View>
                }
            </View>
        </View>
    )
};

const userInfo = StyleSheet.create({

    container                   : { alignItems: 'center', marginTop: 15 },

    valueText                   : { marginBottom: 5, ...TYPOGRAPHY.p },

    papperWhite                 : { backgroundColor: 'white', padding: 10, width: '95%', elevation: 1, borderRadius: 3 },

    titleText                   : { ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f14, marginBottom: 5 },

    changeText                  : { ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f14 },

    changeTextPseudoButton      : { position: 'absolute', right: 10, top: 0 },

    propertyText                : { ...TYPOGRAPHY.subHeader },

});
