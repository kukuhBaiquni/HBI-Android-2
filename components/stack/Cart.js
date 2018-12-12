import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, AsyncStorage, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { loadCart } from '../../actions/Load_Cart';

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
  }

  checkAsync = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      if (token !== null) {
        const raw = JSON.parse(token)
        this.setState({token: raw})
        this.props.dispatch(loadCart(raw))
      }else{
        Alert.alert(
          'Kesalahan',
          'Anda harus login untuk melihat keranjang',
          [
            {text: 'MENGERTI', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: false }
        );
      }
    }catch(error) {
      Alert.alert(
        'Kesalahan',
        'Anda harus login untuk melihat keranjang',
        [
          {text: 'MENGERTI', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    return(
      <View style={{justifyContent: 'center'}}>
        <NavigationEvents
          onWillFocus={() => this.checkAsync()}
          />
        <View>

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
)(Cart);
