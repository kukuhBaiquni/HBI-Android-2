import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';
import { CAPITALIZE } from '../supportFunction';
import { Form, Item, Input, Label, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ADDRESS_INFO = (props) => {
    const { userData, navigation, newParams, editModeBasic, changeEditMode, onChangeText, customData } = props;
    return(
        <View style={userInfo.container}>
            <View style={userInfo.papperWhite}>
                <View>
                    <Text style={userInfo.titleText}>Informasi Pembeli</Text>
                    <TouchableOpacity style={userInfo.changeTextPseudoButton} onPress={() => changeEditMode()}>
                        <Icon name={editModeBasic ? 'save' : 'edit'} color={COLORS.PRIMARY} size={17} />
                        <Text style={userInfo.changeText}>{editModeBasic ? 'Simpan' : 'Ubah'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        editModeBasic
                        ?
                        <View style={{marginBottom: 10}}>
                            <Item stackedLabel style={{width: 310}}>
                                <Label style={{...TYPOGRAPHY.subHeader}}>Nama Penerima</Label>
                                <Input
                                    onChangeText={(x) => onChangeText('name', x)}
                                    value={customData.name}
                                    editable={true}
                                    style={{...TYPOGRAPHY.p}}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 310}}>
                                <Label style={{...TYPOGRAPHY.subHeader}}>Nomor Telepon Penerima</Label>
                                <Input
                                    keyboardType='numeric'
                                    onChangeText={(x) => onChangeText('phone', x)}
                                    value={customData.phone}
                                    style={{...TYPOGRAPHY.p}}
                                    />
                            </Item>
                        </View>
                        :
                        <View>
                            <Text style={userInfo.propertyText}>Nama Penerima</Text>
                            <Text style={userInfo.valueText}>{customData.name}</Text>
                            <Text style={userInfo.propertyText}>Nomor Telepon</Text>
                            <Text style={userInfo.valueText}>{customData.phone}</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
};

const userInfo = StyleSheet.create({

    container                   : { alignItems: 'center', marginTop: 15 },

    valueText                   : { marginBottom: 5, ...TYPOGRAPHY.p },

    papperWhite                 : { backgroundColor: 'white', padding: 10, width: '95%', elevation: 1, borderRadius: 3 },

    titleText                   : { ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f14, marginBottom: 5 },

    changeText                  : { ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f14, marginLeft: 2 },

    changeTextPseudoButton      : { position: 'absolute', right: 10, top: 0, flexDirection: 'row' },

    propertyText                : { ...TYPOGRAPHY.subHeader },

});
