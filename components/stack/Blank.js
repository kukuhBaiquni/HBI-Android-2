import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { BarIndicator } from 'react-native-indicators';

class Blank extends Component {

  storeToken = async () => {
    let token = this.props.token;
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(token))
    } catch (error) {
      this.props.navigation.replace('Login')
    }
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <NavigationEvents
          onDidFocus={() => this.storeToken()}
          />
        <Text style={{position: 'absolute', top: 260, fontWeight: 'bold', color:'#7c0c10'}}>Mohon Tunggu</Text>
        <BarIndicator count={5} size={30} color='#7c0c10' />
      </View>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Blank);
