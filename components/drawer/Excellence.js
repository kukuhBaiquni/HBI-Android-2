import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default class Excellence extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Image source={require('../../android/app/src/main/assets/custom/Beranda/KeunggulanProduk.png')} style={{height: 490, width: '100%', marginTop: 20}} resizeMode='contain'/>
        </ScrollView>
      </View>
    )
  }
}
