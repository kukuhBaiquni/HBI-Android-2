/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            backgroundColor = '#7c0c10'
            barStyle = 'light-content'
        />
      <Animatable.Image
        animation='flipInX'
        iterationCount={1}
        direction='alternate'
        style={{width: 50, height: 50}}
        source={{uri: 'http://halalbeef.co.id/logo favicon/apple-touch-icon-114x114.jpg'}}
        />
        <Animatable.Text animation="fadeInDown" iterationCount={1} direction="alternate" style={styles.welcome}>HALAL BEEF</Animatable.Text>
        <Animatable.Text animation="fadeInUp" iterationCount={1} direction="alternate" style={styles.welcome2}>INDONESIA</Animatable.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c0c10',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  welcome2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: -10,
    color: 'white'
  }
});
