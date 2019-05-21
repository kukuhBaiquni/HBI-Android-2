import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableNativeFeedback, Linking, StatusBar } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import { accountVerification } from '../../actions/Account_Verification';
import { Icon } from 'react-native-elements';

class DeepLinkHandler extends Component {

  openApp() {
    SendIntentAndroid.isAppInstalled('com.google.android.gm').then((isInstalled) => {
      if (isInstalled) {
        SendIntentAndroid.openApp('com.google.android.gm').then((wasOpened) => {
          if (!wasOpened) {
            Linking.openURL('https//gmail.com/')
          }
        })
      }
    });
  }

  render() {
    return(
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
        />
        <View style={{width: 260, alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 15}}>
            Kami telah mengirimkan kode verifikasi ke email Anda. Untuk menyelesaikan proses pendaftaran
            silahkan periksa email Anda.
          </Text>
          <TouchableNativeFeedback onPress={() => this.openApp()}>
            <View style={{width: 200, height: 50, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderRadius: 3}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Verifikasi Email</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.props.navigation.replace('MainTabs')}>
            <View style={{position: 'absolute', alignItems: 'center', width: 320, height: 50, borderWidth: 1, borderColor: '#7c0c10', borderRadius: 3, top: 320, flexDirection: 'row', justifyContent:'center'}}>
              <Icon color='#7c0c10' name='home'/>
              <Text style={{color: '#7c0c10', fontWeight: 'bold', marginLeft: 5}}>Ke halaman utama</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(DeepLinkHandler);
