import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { forceResetCE } from '../../actions/Check_Email';
import { forceResetRG } from '../../actions/Register';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../config';

class ProfilePrevention extends Component {

  componentDidMount = async() => {
    this.props.dispatch(forceResetCE());
    this.props.dispatch(forceResetRG());
    try {
      await AsyncStorage.removeItem('facebook_data');
    }catch(error) {

    }
  }

  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{height: 60, backgroundColor: 'white', width: '100%', elevation: 3, marginTop: 1}}>
          <TouchableOpacity style={{position: 'absolute', left: 10, top: 18}} onPress={() => navigation.goBack()}>
            <Image style={{height: 18, width: 18}} source={require('../../android/app/src/main/assets/custom/BackDarkred.png')} />
          </TouchableOpacity>
        </View>
        <Image
          style={{width: '100%', height: '100%', borderColor: '#e2e2e2', borderWidth: 1}}
          source={{uri: `${SERVER_URL}images/dummy/bg.jpg`}}
          />
        <View style={{position: 'absolute', bottom: 10, alignItems: 'stretch', flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.button, {elevation: 3, backgroundColor: '#e8e8e8', borderWidth: 1, borderColor: '#c4c4c4'}]} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {elevation: 3, backgroundColor: '#7c0c10', borderWidth: 1, borderColor: '#7c0c10', marginLeft: 10}]} onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(ProfilePrevention);

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 160,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
