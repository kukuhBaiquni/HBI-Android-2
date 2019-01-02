import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, AsyncStorage, Alert, TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import GoogleSignIn from 'react-native-google-sign-in';
import { SERVER_URL } from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

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
    const { userData, navigation } = this.props;
    const items = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4', 'Menu 5']
    console.log(userData);
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
              <LinearGradient
                colors={['transparent', 'black']}
                style={{height: 130}}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 2}}
                >
              </LinearGradient>
              :
              <View>
                <Image
                  source={{uri: `${SERVER_URL}images/dummy/${userData.banner}`}}
                  style={{height: 130, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                  >
                </Image>
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={{height: 130}}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 2}}
                  >
                </LinearGradient>
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
            <Image
              source={{uri: `${SERVER_URL}images/dummy/${userData.photo}`}}
              style={{height: 60, width: 60, borderRadius: 30}}>
            </Image>
            <View style={{marginLeft: 15, marginTop: 5}}>
              <Text style={{color: 'white', fontSize: 17}}>{userData.name}</Text>
              <Text style={{color: 'white', fontSize: 15}}>Edit Profil</Text>
            </View>
          </TouchableOpacity>
          {/*LIST MENU*/}
          <View style={{marginTop: 30, marginBottom: 20}}>
            <View style={[styles.headerMenu, {marginTop: 0}]}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#757575'}}>Data diri</Text>
            </View>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Telepon</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.phone === '' || userData.phone === undefined ? 'Belum diatur' : '0' + userData.phone}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Jenis Kelamin</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.gender === undefined ? 'Belum diatur' : userData.gender}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Rekening Bank</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.nama_rekening === '' && userData.no_rekening === '' ? 'Belum diatur' : userData.gender}</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerMenu}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#757575'}}>Alamat</Text>
            </View>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Kota / Kabupaten</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.city}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Kecamatan</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.district}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Kelurahan</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.village}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Alamat Lengkap</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.street}</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerMenu}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#757575'}}>Akun</Text>
            </View>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Email</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.email}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={{fontSize: 16, marginTop: 10}}>Password</Text>
                <View style={{position: 'absolute', right: 10, top: 13}}>
                  <Icon name='chevron-right' size={30} color='#939393'/>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={styles.menuTitle}>Bergabung sejak</Text>
                <Text style={{marginTop: 2, color: '#939393'}}>{userData.join}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.listMenu}>
                <Text style={{fontSize: 16, marginTop: 10}}>Riwayat Transaksi</Text>
                <View style={{position: 'absolute', right: 10, top: 13}}>
                  <Icon name='chevron-right' size={30} color='#939393'/>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.logOut()}>
              <View style={styles.listMenu}>
                <Text style={{fontSize: 16, marginTop: 10}}>Logout</Text>
                <View style={{position: 'absolute', right: 15, top: 15}}>
                  <Icon name='input' color='#939393'/>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  listMenu: {
    height: 55,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 16
  },
  headerMenu: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 8,
    backgroundColor: '#bfbfbf',
    marginTop: 10
  }
})

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Profile);
