import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements';
import { forceResetCE } from '../../actions/Check_Email';
import { forceResetRG } from '../../actions/Register';
import { connect } from 'react-redux';

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
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
        </View>
        <Text>Profile Prevention Page</Text>
        <View style={{position: 'absolute', bottom: 10, alignItems: 'stretch', flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#e8e8e8', borderWidth: 1, borderColor: '#c4c4c4'}]} onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#7c0c10', borderWidth: 1, borderColor: '#7c0c10', marginLeft: 10}]} onPress={() => navigation.navigate('Register')}>
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
