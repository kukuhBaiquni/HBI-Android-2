import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

class CartIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCount: 0
    }
  }

  componentDidMount = async () => {
    try {
      var item = await AsyncStorage.getItem('cart');
      var itemCount = JSON.parse(item).length
      if (itemCount === 0) {
        this.setState({itemCount: 0})
      }else{
        this.setState({itemCount})
      }
    } catch(error) {
      this.setState({itemCount: 0})
    }
  }

  render() {
    const { navigation, bcolor } = this.props;
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        {
          this.state.itemCount > 0 &&
          <Animatable.View style={styles.badge}
            animation='rubberBand'
            useNativeDriver
            duration={500}
            iterationCount={1}
            >
            <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: 'white'}}>{this.state.itemCount}</Text>
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
