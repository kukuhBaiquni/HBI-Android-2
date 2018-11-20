import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { getAllProducts } from '../actions/Saga';
import { SERVER_URL } from '../config';
import { idrFormat } from '../config';
import * as Animatable from 'react-native-animatable';

export default class Sapi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: false
    }
  }

  render() {
    let { products, navigation } = this.props;
    return(
      <View>
        {
          !this.state.visibility &&
          <View style={{flex: 1, justifyContent: 'center', paddingTop: 250}}>
            <BarIndicator count={5} size={30} color='#7c0c10'/>
          </View>
        }
        <ScrollView style={{visibility: this.state.visibility ? 'visible' : 'hidden'}}>
          <Animatable.View
            style={styles.container}
            animation='fadeInUpBig'
            delay={2000}
            iterationCount={1}
            direction='alternate'
            >
            {
              products.map((x, i) =>
              <TouchableOpacity key={i} onPress={() => navigation.navigate('ProductDetails', x)}>
                <View>
                  <Image
                    resizeMode='contain'
                    onLoadEnd={(e) => this.setState({visibility: true})}
                    style={{width: 160, height: 160}}
                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                    />
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>{x.productname}</Text>
                  </View>
                  <Text style={styles.price}>{idrFormat(x.enduserprice)}/Kg</Text>
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
