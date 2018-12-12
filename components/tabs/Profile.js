import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import GoogleSignIn from 'react-native-google-sign-in';


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

  logOut() {
    Alert.alert(
      'Logout',
      'Apakah anda yakin ingin keluar ?',
      [
        {text: 'YA', onPress: () => this.confirmLogout()},
        {text: 'TIDAK'}
      ],
      { cancelable: false }
    );
  }

  confirmLogout = async (x) => {
    try {
      await AsyncStorage.removeItem('access_token')
      await LoginManager.logOut()
      await GoogleSignIn.signOutPromise()
      this.props.navigation.replace('MainTabs')
    }catch (error) {
      Alert.alert(
        'Logout gagal',
        'Proses logout gagal, silahkan ulangi permintaan anda',
        [
          {text: 'YA', onPress: () => this.confirmLogout()},
          {text: 'TIDAK'}
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const { userData } = this.props;
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
        <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
        <Text>Profile</Text>
        <TouchableOpacity style={{marginTop: 20, width: 200, height: 40, backgroundColor: '#4d2e9b', borderRadius: 3, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.logOut()}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
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
