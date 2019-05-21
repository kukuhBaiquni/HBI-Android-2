import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Spinner } from 'native-base';
import { BarIndicator } from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';
import { SERVER_URL } from '../../config';

export default class Splash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color : '#7c0c10'
    }
  }

  showLoader() {
    this.setState({
      color: 'white'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            backgroundColor = '#7c0c10'
            barStyle = 'light-content'
        />
        <Image
          resizeMode='contain'
          style={{height: 110, width: 220, marginTop: 500}}
          source={{uri: `${SERVER_URL}images/support/SScreen.png`}}
           />
         <View style={{marginTop: -550}}>
           <BarIndicator count={5} size={23} color='white' />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    marginBottom: -200
  }
});
