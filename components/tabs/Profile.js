import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';

class Profile extends Component {

  beforeRender() {
    if (this.props.activeUser.length !== 1) {
      this.props.navigation.goBack()
      this.props.navigation.navigate('ProfilePrevention')
    }
  }

  render() {
    return(
      <View>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
        <Text>Profile Page</Text>
      </View>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Profile);
