import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationEvents } from 'react-navigation';
import { loadCart } from '../actions/Load_Cart';

class CartIcon extends Component {

  checkAsync = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      if (token !== null) {
        const raw = JSON.parse(token)
        this.props.dispatch(loadCart(raw))
      }else{
        Alert.alert(
          'Kesalahan',
          'Anda harus login untuk melihat keranjang.',
          [
            {text: 'MENGERTI', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: false }
        );
      }
    }catch(error) {
      Alert.alert(
        'Kesalahan',
        'Anda harus login untuk melihat keranjang.',
        [
          {text: 'MENGERTI', onPress: () => this.props.navigation.goBack()},
        ],
        { cancelable: false }
      );
    }
  }

  // componentDidMount = async () => {
  //   try {
  //     var item = await AsyncStorage.getItem('cart');
  //     var itemCount = JSON.parse(item).length
  //     if (itemCount === 0) {
  //       this.setState({itemCount: 0})
  //     }else{
  //       this.setState({itemCount})
  //     }
  //   } catch(error) {
  //     this.setState({itemCount: 0})
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.cart === this.props.cart) {
      return false
    }else{
      return true
    }
  }

  render() {
    const { navigation, bcolor } = this.props;
    const items = this.props.cart
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Cart', items)}>
        <NavigationEvents
          onWillFocus={() => this.checkAsync()}
          />
        {
          this.props.cart.length > 0 &&
          <Animatable.View style={styles.badge}
            animation='rubberBand'
            useNativeDriver
            duration={500}
            iterationCount={1}
            >
            <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: 'white'}}>{this.props.cart.length}</Text>
          </Animatable.View>
        }
        <Icon name='shopping-cart' size={24} color={ bcolor ? bcolor : 'white'}/>
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    height: 15,
    width: 15,
    backgroundColor: 'orange',
    borderRadius: 10,
    right: -5,
    top: -7,
    zIndex: 1,
    justifyContent: 'center',
  }
});

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(CartIcon);
