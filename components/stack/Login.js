import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import { submitFormLogin } from '../../actions/Login_Attempt';
import { forceResetAV } from '../../actions/Account_Verification';
import Modal from "react-native-modal";
import validator from 'validator';
import { DotIndicator } from 'react-native-indicators';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { checkEmail } from '../../actions/Check_Email';
import GoogleSignIn from 'react-native-google-sign-in';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true,
      showModal: true,
      visibility: 0,
      emailHandler: '',
      passwordHandler: '',
      isFormEmpty: false,
      loading: false,
      isLoginError: false,
      oauthData: {},
      error: ''
    }
  }

  facebookLogin() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken()
        .then((data) => {
          const {accessToken} = data;
          const responseInfoCallback = (error, result) => {
            if (error) {
              Alert.alert(
                'Kesalahan',
                'Permintaan anda tidak dapat di proses',
                [
                  {text: 'OK'}
                ],
                { cancelable: false }
              );
            } else {
              const data = {
                name: result.name,
                email: result.email
              }
              AsyncStorage.setItem('facebook_data', JSON.stringify(data))
            }
          }
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,picture'
                }
              }
            },
            responseInfoCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        })
      }
    })
    .then(() => this.emailCheck()),
    function(error) {
      Alert.alert(
        'Kesalahan',
        'Permintaan anda tidak dapat di proses',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }
  emailCheck() {
    setTimeout( async () => {
      const data = await AsyncStorage.getItem('facebook_data')
      if (data !== null) {
        const raw = JSON.parse(data);
        this.setState({oauthData: raw});
        const email = raw.email;
        this.props.dispatch(checkEmail(email));
      }else{
        Alert.alert(
          'Login gagal',
          'Login dibatalkan oleh pengguna',
          [
            {text: 'OK'}
          ],
          { cancelable: false }
        );
      }
    }, 500)
  };

  showFlashMessage() {
    if (this.props.status.account_verification.success) {
      showMessage({
        message: 'Sukses',
        description: this.props.status.account_verification.message,
        type: 'default',
        backgroundColor: '#a8ffb5',
        color: '#00630e'
      })
    }
  }

  submitForm() {
    let email = this.state.emailHandler;
    let password = this.state.passwordHandler;
    let data = {
      email, password
    };
    if (email.length > 0 && password.length > 0) {
      this.setState({loading: true, isFormEmpty: false})
      this.props.dispatch(submitFormLogin(data));
    }else{
      this.setState({isFormEmpty: true})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let data = this.state.oauthData;
    if (this.props.status.isEmailFree) {
      Alert.alert(
        'Login gagal',
        'Akun tidak terdaftar, daftar sekarang?',
        [
          {text: 'OK', onPress: () => this.props.navigation.replace('Register', data)}
        ],
        { cancelable: false }
      );
    }
    if (this.props.status.login.error) {
      if (this.state.loading) {
        this.setState({loading: false, isLoginError: true})
      }
    }else{
      if (prevProps.token !== this.props.token) {
        const token = this.props.token;
        this.storeToken(token)
      }
    }
  };

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(token))
      this.props.dispatch(forceResetAV())
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MainTabs' })], 0)
    } catch (error) {
      Alert.alert(
        'Kesalahan',
        'Permintaan anda tidak dapat di proses',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
      this.props.dispatch(forceResetAV())
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MainTabs' })], 0)
    }
  };

  cleanStorage = async () => {
    try {
      await AsyncStorage.removeItem('facebook_data');
    }catch (error) {
      Alert.alert(
        'Kesalahan',
        'Permintaan anda tidak dapat di proses',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  googleLogin = async () => {
    try {
      await GoogleSignIn.configure({
        scopes: ['profile'],
        clientID: '912178815288-2fia498v78qdsm487k9ngvrjcn46m343.apps.googleusercontent.com'
      })
      const user = await GoogleSignIn.signInPromise();
      const raw = await {
        name: user.name,
        email: user.email
      }
      this.setState({oauthData: raw});
      await this.props.dispatch(checkEmail(user.email))
    } catch(error) {
      this.setState({error: JSON.stringify(error)})
      Alert.alert(
        'Login gagal',
        'Login dibatalkan oleh pengguna',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const { navigation, status } = this.props;
    return(
      <ScrollView>
        <NavigationEvents
          onWillFocus={() => this.cleanStorage()}
          onDidFocus={() => this.showFlashMessage()}
          />
        <Modal
          isVisible={this.state.loading}
          style={{alignItems: 'center'}}
          hideModalContentWhileAnimating={true}
          useNativeDriver
          >
          <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
            <DotIndicator
              color='#7c0c10'
              size={8}
              />
          </View>
        </Modal>
        <View style={{alignItems: 'center', marginTop: 100}}>
          {this.state.isLoginError && <Text style={{color: 'red', width: 280, textAlign: 'center', fontSize: 12}}>{this.props.status.login.message}</Text>}
          <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
            {this.state.isFormEmpty && <Text style={{fontSize: 12, color: 'red', marginLeft: -105, paddingBottom: 5}}>*Form tidak boleh kosong</Text>}
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              delay={100}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular>
                <Input
                  placeholder='Email'
                  placeholderTextColor='#919191'
                  underlineColorAndroid='transparent'
                  keyboardType='email-address'
                  style={[styles.defaultInput]}
                  onChangeText={(x) => this.setState({emailHandler: x})}
                  />
              </Item>
            </Animatable.View>
            <View style={{height: 3}}></View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              delay={200}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular>
                <Input
                  placeholder='Password'
                  placeholderTextColor='#919191'
                  secureTextEntry={this.state.secure}
                  style={[styles.defaultInput]}
                  onChangeText={(x) => this.setState({passwordHandler: x})}
                  />
                <TouchableOpacity style={{position: 'absolute', right: 5}}>
                  {
                    this.state.secure
                    ? <Icon onPress={() => this.setState({secure: false})} name='visibility' color='#919191' size={20}/>
                  : <Icon onPress={() => this.setState({secure: true})} name='visibility-off' color='#919191' size={20}/>
                  }
                </TouchableOpacity>
              </Item>
            </Animatable.View>
            <View style={{height: 3}}></View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInRight'
              delay={400}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <TouchableOpacity style={[styles.button, { backgroundColor: '#7c0c10' }]} onPress={() => this.submitForm()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Text>{this.state.error}</Text>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeIn'
              delay={500}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Divider />
            </Animatable.View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInLeft'
              delay={600}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
            <TouchableOpacity style={[styles.button, { backgroundColor: '#3b5998' }]} onPress={() => this.facebookLogin()}>
              <SocialIcon
                type='facebook'
                raised={false}
                style={{height: 28, width: 28, borderRadius: 0, position: 'absolute', left: 6}}
                />
              <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk dengan Facebook</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            style={{width: 260, alignItems: 'center'}}
            animation='fadeInRight'
            delay={600}
            useNativeDriver
            duration={500}
            iterationCount={1}
            >
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4242' }]} onPress={() => this.googleLogin()}>
              <SocialIcon
                type='google'
                raised={false}
                style={{height: 28, width: 28, borderRadius: 0, position: 'absolute', left: 6}}
                />
              <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk dengan Google</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            style={{width: 260, alignItems: 'center'}}
            animation='flipInX'
            delay={700}
            useNativeDriver
            duration={500}
            iterationCount={1}
            >
            <Text style={{marginTop: 15, color: '#919191', marginBottom: 20}}>Belum punya akun? <Text onPress={() => navigation.replace('Register')} style={{color: '#7c0c10'}}>Daftar disini</Text></Text>
          </Animatable.View>
          </View>
        </View>
        <FlashMessage
          position='top'
          autoHide={false}
          floating={true}
          ref='log'
          icon={{icon: 'success', position: 'left'}}
          />
      </ScrollView>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  defaultInput: {
    backgroundColor: 'white',
    height: 35,
    borderRadius: 3,
    fontSize: 12,
    borderWidth: 0
  },
  button: {
    height: 40,
    width: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 3
  }
})
