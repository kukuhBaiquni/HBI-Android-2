import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { SERVER_URL } from '../components/basic/supportFunction';
import { IDR_FORMAT } from '../components/basic/supportFunction';
import * as Animatable from 'react-native-animatable';
import { COLORS } from './basic/colors';
import { TYPOGRAPHY } from './basic/typography';

export default class ProductsTab extends Component {

    render() {
        let { products, navigation } = this.props;
        return(
            <View>
                <ScrollView>
                    <Animatable.View
                        style={styles.container}
                        animation='fadeInUpBig'
                        iterationCount={1}
                        delay={500}
                        direction='alternate'
                        onAnimationEnd={this.props.onAnimationEnd}
                        >
                        {
                            products.sort((a, b) => a.id - b.id).map((x, i) =>
                            <TouchableOpacity style={styles.itemContainer} key={i} onPress={() => navigation.navigate('ProductDetails', x)}>
                                <View>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.imageStyle}
                                        source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                        />
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.title}>{x.productname}</Text>
                                    </View>
                                    <Text style={styles.price}>{IDR_FORMAT(x.enduserprice)}/{x.unit}</Text>
                                    {
                                        this.props.status === 'Non Member' &&
                                        <Text style={styles.price}>Stock: {x.amount}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                            )
                        }
                    </Animatable.View>
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
