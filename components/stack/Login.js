import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import { submitFormLogin } from '../../actions/Login_Attempt';
import Modal from "react-native-modal";
import validator from 'validator';
import { DotIndicator } from 'react-native-indicators';
import { NavigationEvents } from 'react-navigation';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true,
      showModal: true,
      showModalContent: false,
      emailHandler: '',
      passwordHandler: '',
      isFormEmpty: false,
      loading: false,
      isLoginError: false,
      counter: 0
    }
  }

  afterRender() {
    if (this.props.navigation.state.params === undefined) {
      console.log('a');
    }else{
      console.log('b');
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
      this.timer = setInterval(() => this.checkResponse(), 1000)
    }else{
      this.setState({isFormEmpty: true})
    }
  }

  checkResponse() {
    if (this.props.status.login.error) {
      clearInterval(this.timer)
      this.setState({loading: false, isLoginError: true})
    }else{
      clearInterval(this.timer)
      const token = this.props.token;
      this.storeToken(token)
    }
  }

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(token))
      this.props.navigation.popToTop()
    } catch (error) {
      this.props.navigation.replace('Login')
    }
  }

  render() {
    const { navigation, status } = this.props;
    return(
      <ScrollView>
        <NavigationEvents
          onDidFocus={() => this.afterRender()}
          />
        <Modal
          isVisible={this.state.loading}
          style={{alignItems: 'center'}}
          onModalShow={() => this.setState({showModalContent: true})}
          onModalHide={() => this.setState({showModalContent: false})}
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
        <View style={{alignItems: 'center', marginTop: 70}}>
          {this.state.isLoginError && <Text style={{color: 'red'}}>{this.props.status.login.message}</Text>}
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
                    ? <Icon onPress={() => this.setState({secure: false})} name='visibility' color='#919191' size={24}/>
                  : <Icon onPress={() => this.setState({secure: true})} name='visibility-off' color='#919191' size={24}/>
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
            <TouchableOpacity style={[styles.button, { backgroundColor: '#3b5998' }]} onPress={() => console.log('fb')}>
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
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4242' }]} onPress={() => console.log('google')}>
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
