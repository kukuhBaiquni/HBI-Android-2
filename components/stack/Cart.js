import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Cart extends Component {
  render() {
    return(
      <View style={{justifyContent: 'center'}}>
        <Text>Cart Page</Text>
        <Button title='Gabon' color= '#4d2e9b' onPress={() => this.props.navigation.navigate('ShopPage')} />
      </View>
    )
  }
}
