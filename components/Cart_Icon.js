import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View, Text, StyleSheet, Alert, AsyncStorage } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationEvents } from 'react-navigation';
import { loadCart } from '../actions/Load_Cart';

class CartIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  componentDidMount = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      if (token !== null) {
        const raw = JSON.parse(token)
        this.setState({token: raw})
        this.props.dispatch(loadCart(raw))
      }
    }catch(error) {
    }
  }

  render() {
    const { navigation, bcolor } = this.props;
    const items = this.props.cart;
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        {
          this.props.cart.length > 0 &&
          <Animatable.View style={styles.badge}
            animation='rubberBand'
            useNativeDriver
            duration={500}
            iterationCount={1}
            >
            <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: 'white'}}>{items.length}</Text>
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
