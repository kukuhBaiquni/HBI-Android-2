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
        const raw = JSON.parse(val)
        this.props.dispatch(fetchUser(raw))
      }else{
        console.log('a');
        // this.props.navigation.goBack()
        // this.props.navigation.navigate('ProfilePrevention')
      }
    } catch (error) {
      console.log('b');
      this.props.navigation.goBack()
      this.props.navigation.navigate('ProfilePrevention')
    }
  }

  // beforeRender() {
  //   let token = AsyncStorage.getItem('access_token');
  //   if (!token) {
  //     this.props.navigation.goBack()
  //     this.props.navigation.navigate('ProfilePrevention')
  //   }
  // }

  render() {
    const { userData } = this.props;
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
        <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>

        <Text>Profile</Text>
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
