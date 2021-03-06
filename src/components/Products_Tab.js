import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { STATIC_RES_URL } from '../components/basic/supportFunction';

import { IDR_FORMAT } from '../components/basic/supportFunction';
import * as Animatable from 'react-native-animatable';
import { COLORS } from './basic/colors';
import { TYPOGRAPHY } from './basic/typography';

export default class ProductsTab extends Component {

    render() {
        let { products, navigation, status } = this.props;
        return(
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        {
                            products.sort((a, b) => a.id - b.id).map((x, i) =>
                            <TouchableOpacity style={styles.itemContainer} key={i} onPress={() => navigation.navigate('ProductDetails', x)}>
                                <View>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.imageStyle}
                                        source={{uri: `${STATIC_RES_URL}products/${x.photo}`}}
                                        />
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.title}>{x.productname}</Text>
                                    </View>
                                    <Text style={styles.price}>{IDR_FORMAT(status === 'Member' ? x.resellerprice : x.enduserprice)}/{x.unit}</Text>
                                    {/*
                                        this.props.status === 'Non Member' &&
                                        <Text style={styles.price}>Stock: {x.amount}</Text>
                                    */}
                                </View>
                            </TouchableOpacity>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 40
    },
    title: {
        textAlign: 'center',
        ...TYPOGRAPHY.subHeader,
        ...TYPOGRAPHY.f13,
        flex: 1,
        flexWrap: 'wrap'
    },
    price: {
        ...TYPOGRAPHY.p,
        ...TYPOGRAPHY.f14,
        textAlign: 'center'
    },
    itemContainer: {
        marginTop: 20
    },
    imageStyle: {width: 160, height: 160, marginBottom: 10, borderRadius: 15}
})
