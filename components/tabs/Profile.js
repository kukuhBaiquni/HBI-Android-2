import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';

class Profile extends Component {

  beforeRender = async () => {
    try {
      const val = await AsyncStorage.getItem('access_token');
      if (val !== null) {
        this.props.dispatch(fetchUser(val))
      }else{
        this.props.navigation.goBack()
        this.props.navigation.navigate('ProfilePrevention')
      }
    } catch (error) {
      this.props.navigation.goBack()
      this.props.navigation.navigate('ProfilePrevention')
    }
  }

  render() {
    const { userData } = this.props;
    return(
      <View>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
        <Text>{userData.name}</Text>
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
