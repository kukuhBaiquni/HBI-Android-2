import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';

class Payment extends Component {
  beforeRender() {
    console.log('afk');
  }
  render() {

    return(
      <View>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <Text>Payment Page</Text>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Payment);
