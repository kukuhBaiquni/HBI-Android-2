import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

export default class Cart extends Component {
  componentDidMount() {
    AsyncStorage.removeItem('access_token')
  }
  render() {
    return(
      <View style={{justifyContent: 'center'}}>
        <Text>Cart Page</Text>
        <Button title='Gabon' color= '#4d2e9b' onPress={() => this.props.navigation.navigate('ShopPage')} />
      </View>
    )
  }
}
