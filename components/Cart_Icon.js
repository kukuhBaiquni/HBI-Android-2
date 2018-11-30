import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class CartIcon extends Component {
  render() {
    const { navigation, bcolor } = this.props;
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View style={styles.badge}>
          <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: 'white'}}>2</Text>
        </View>
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
