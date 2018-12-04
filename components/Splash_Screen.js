import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Spinner } from 'native-base';
import { BarIndicator } from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';
import { SERVER_URL } from '../config';

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
        <Animatable.Image
          animation='flipInX'
          iterationCount={1}
          direction='alternate'
          style={{width: 50, height: 50}}
          source={{uri: `${SERVER_URL}logo favicon/apple-touch-icon-114x114.jpg`}}
          onAnimationEnd={() => this.showLoader()}
        />
        <Animatable.Text animation="fadeInUpBig" iterationCount={1} direction="alternate" style={styles.welcome}>HALAL BEEF INDONESIA</Animatable.Text>
        <BarIndicator count={5} size={30} color={this.state.color} />
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
    paddingTop: 200
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    marginBottom: -200
  }
});
