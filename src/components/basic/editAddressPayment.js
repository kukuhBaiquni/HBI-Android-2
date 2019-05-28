import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';

export const ADDRESS_INFO = (props) => {
    const { data, navigation } = props;
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
                        <Text style={userInfo.valueText}>{userData.data.name}</Text>
                        <Text style={userInfo.propertyText}>Nomor Telepon</Text>
                        <Text style={userInfo.valueText}>0{userData.data.phone}</Text>
                        <Text style={userInfo.propertyText}>Alamat Pengiriman</Text>
                        {
                            this.state.isAddressValid
                            ?
                            <View>
                                <Text style={{...TYPOGRAPHY.f13}}>
                                    Jl.{userData.data.address.street} No.{userData.data.address.no}
                                    Rt.{userData.data.address.rt} Rw.{userData.data.address.rw}
                                </Text>
                                <Text style={{...TYPOGRAPHY.f13}}>Kecamatan {userData.data.address.district}</Text>
                                <Text style={{...TYPOGRAPHY.f13}}>Kelurahan {userData.data.address.village}</Text>
                                <Text style={{...TYPOGRAPHY.f13}}>{userData.data.address.city}</Text>
                            </View>
                            :
                            <Text style={userInfo.alertUncompleteAddress}>Alamat belum lengkap</Text>
                        }
                    </View>
                    :
                    <View>
                        <Text style={userInfo.propertyText}>Nama</Text>
                        <Text style={userInfo.valueText}>{navigation.state.params.name}</Text>
                        <Text style={userInfo.propertyText}>Nomor Telepon</Text>
                        <Text style={userInfo.valueText}>{navigation.state.params.phone}</Text>
                        <Text style={userInfo.propertyText}>Alamat Pengiriman</Text>
                        {
                            this.state.isAddressValid
                            ?
                            <View>
                                <Text style={{...TYPOGRAPHY.f13}}>
                                    Jl.{navigation.state.params.street} No.{navigation.state.params.no}
                                    Rt.{navigation.state.params.rt} Rw.{navigation.state.params.rw}
                                </Text>
                                <Text style={{...TYPOGRAPHY.f13}}>Kecamatan {navigation.state.params.district}</Text>
                                <Text style={{...TYPOGRAPHY.f13}}>Kelurahan {navigation.state.params.village}</Text>
                                <Text style={{...TYPOGRAPHY.f13}}>{navigation.state.params.city}</Text>
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

    propertyText                : { ...TYPOGRAPHY.f13b },

    valueText                   : { marginBottom: 5, ...TYPOGRAPHY.f13 },

    alertUncompleteAddress      : { fontStyle: 'italic', color: '#bababa' },

    papperWhite                 : { backgroundColor: 'white', padding: 10, width: '95%', elevation: 3, borderRadius: 3 },

    titleText                   : { ...TYPOGRAPHY.f16b, color: COLORS.PRIMARY, marginBottom: 10 },

    changeText                  : { color: COLORS.PRIMARY, ...TYPOGRAPHY.f15 },

    changeTextPseudoButton      : { position: 'absolute', right: 10, top: 0 },

});
