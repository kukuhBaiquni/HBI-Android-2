import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { SERVER_URL } from '../config';
import { idrFormat } from '../config';
import * as Animatable from 'react-native-animatable';

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
                            <TouchableOpacity key={i} onPress={() => navigation.navigate('ProductDetails', x)}>
                                <View>
                                    <Image
                                        resizeMode='contain'
                                        style={{width: 160, height: 160}}
                                        source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                        />
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.title}>{x.productname}</Text>
                                    </View>
                                    <Text style={styles.price}>{idrFormat(x.enduserprice)}/{x.unit}</Text>
                                    <Text style={styles.price}>Stock: {x.amount}</Text>
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
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap'
    },
    price: {
        fontSize: 14,
        textAlign: 'center'
    }
})
