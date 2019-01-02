import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, AsyncStorage, Alert, TouchableOpacity, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import GoogleSignIn from 'react-native-google-sign-in';
import { SERVER_URL } from '../../config';

class Profile extends Component {

  beforeRender = async () => {
    try {
      const val = await AsyncStorage.getItem('access_token');
      if (val !== null) {
        const raw = JSON.parse(val)
        this.props.dispatch(fetchUser(raw))
      }
    } catch (error) {
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
      <ScrollView style={{flex:1}}>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
          <View>
            <TouchableOpacity style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
              {
                userData.banner === '' || userData.banner === undefined
                ?
                <View style={{backgroundColor: '#4d2e9b', height: 150}}>
                </View>
                :
                <Image
                  source={{uri: `${SERVER_URL}images/dummy/${userData.banner}`}}
                  style={{height: 150}}
                  >
                </Image>
              }
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
              <Image
                source={{uri: `${SERVER_URL}images/dummy/DENEW.png`}}
                style={{height: 60, width: 60, borderRadius: 30}}>
              </Image>
              <View style={{marginLeft: 15, marginTop: 5}}>
                <Text style={{color: 'white', fontSize: 17}}>{userData.name}</Text>
                <Text style={{color: 'white', fontSize: 15}}>Edit Profil</Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 50}}>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
              <Text style={{fontSize: 25}}>Selamat datang {userData.name}</Text>
            </View>
        </View>
        <Text>Profile</Text>
        <TouchableOpacity style={{marginTop: 20, width: 200, height: 40, backgroundColor: '#4d2e9b', borderRadius: 3, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.logOut()}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Profile);
