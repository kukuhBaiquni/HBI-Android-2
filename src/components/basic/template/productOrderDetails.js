import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../typography';
import { COLORS } from '../colors';
import { Icon } from 'react-native-elements';
import { IDR_FORMAT, STATIC_RES_URL } from '../supportFunction';
import PropTypes from 'prop-types';

export const PRODUCT_ORDER_DETAILS = (props) => {
    _openModal = () => {
        props.openModal(props.index);
    };

    _removeSingleItem = () => {
        props.removeItem(props.index);
    };

    return(
        <View style={{alignItems: 'center'}}>
            <View style={styles.basicCard}>
                <View style={{marginBottom: 15}}>
                    <Text style={styles.productNameText}>{props.data.productName}</Text>
                    {
                        props.routeName === 'Cart' &&
                        <TouchableOpacity style={styles.touchableRemoveItem} onPress={this._removeSingleItem}>
                            <Icon name='delete' color={COLORS.GRAY_ICON} />
                        </TouchableOpacity>
                    }
                    <View style={styles.productDetails}>
                        <Image
                            resizeMode='cover'
                            style={styles.imageStyle}
                            source={{uri: `${STATIC_RES_URL}products/${props.data.photo}`}}
                            />
                        <View style={styles.partials25}>
                            <Text style={styles.propText}>Harga</Text>
                            <Text style={styles.propText}>Kuantitas</Text>
                            <Text style={styles.propTextSubtotal}>Subtotal</Text>
                        </View>
                        <View style={styles.partial45}>
                            <Text style={styles.valText}>{IDR_FORMAT(Number(props.data.price))}</Text>
                            <Text style={styles.valText}>{props.data.qty}</Text>
                            {
                                props.routeName === 'Cart' &&
                                <TouchableOpacity onPress={this._openModal}>
                                    <Text style={styles.changeDetails}>Ubah Rincian</Text>
                                </TouchableOpacity>
                            }
                            <Text style={styles.subTotal}>
                                {IDR_FORMAT(Number(props.data.price) * Number(props.data.qty))}
                            </Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.separator} />
                    </View>
                </View>
            </View>
        </View>
    )
};

PRODUCT_ORDER_DETAILS.proptypes = {
    data: PropTypes.object.isRequired,
    openModal: PropTypes.func,
    index: PropTypes.number.isRequired,
    removeItem: PropTypes.func,
    routeName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({

    basicCard               : { backgroundColor: COLORS.PURE_WHITE, marginTop: 10, width: '95%', borderRadius: 3, elevation: 1 },

    touchableRemoveItem     : { position: 'absolute', right: 5, top: 5 },

    imageStyle              : { width: 90, height: 90, borderColor: COLORS.GRAY_ICON, borderWidth: 1 },

    productDetails          : { backgroundColor: COLORS.PURE_WHITE, height: 100, flexDirection: 'row', marginLeft: 12 },

    partials25              : { marginBottom: 5, width: '25%' },

    productNameText         : { ...TYPOGRAPHY.subHeader, marginLeft: 12, marginBottom: 5, marginTop: 10 },

    propText                : { marginLeft: 10, ...TYPOGRAPHY.p },

    propTextSubtotal        : { marginLeft: 10, ...TYPOGRAPHY.p, position: 'absolute', bottom: 3 },

    partial45               : { marginBottom: 5, width: '45%' },

    valText                 : { textAlign: 'right', ...TYPOGRAPHY.normalPriceText },

    changeDetails           : { textAlign: 'right', marginTop: 13, ...TYPOGRAPHY.specialActionText },

    subTotal                : { textAlign: 'right', right: 0, position: 'absolute', bottom: 3, ...TYPOGRAPHY.priceTextModal },

    separator               : { backgroundColor: '#d7d7d7', height: 1, width: '95%' }
});
