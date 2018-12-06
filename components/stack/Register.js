import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import validator from 'validator';
import { submitFormRegister, forceResetRG } from '../../actions/Register';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { NavigationActions, NavigationEvents } from 'react-navigation';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true,
      secure2: true,
      loading: false,
      nameHandler: '',
      emailHandler: '',
      passwordHandler: '',
      passwordHandler2: '',
      isNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isPasswordMatch: true,
      isFormValid: false,
      isFormEmpty: false
    }
  }

  nameHandler(x) {
    this.setState({nameHandler: x})
    if (x.length > 1) {
      this.setState({isNameValid: true})
    }else{
      this.setState({isNameValid: false})
    }
  }
  emailHandler(x) {
    this.setState({emailHandler: x})
    if (validator.isEmail(x)) {
      this.setState({isEmailValid: true})
    }else{
      this.setState({isEmailValid: false})
    }
  }
  passwordHandler(x) {
    this.setState({passwordHandler: x})
    if (x.length > 5) {
      this.setState({isPasswordValid: true})
    }else{
      this.setState({isPasswordValid: false})
    }
  }
  passwordHandler2(x) {
    this.setState({passwordHandler2: x})
    if (this.state.passwordHandler === x) {
      this.setState({isPasswordMatch: true})
    }else{
      this.setState({isPasswordMatch: false})
    }
  }
  nameBlur() {
    const name = this.state.nameHandler;
    if (name.length < 2) {
      this.setState({isNameValid: false})
    }else{
      this.setState({isNameValid: true})
    }
  }
  emailBlur() {
    const email = this.state.emailHandler;
    if (!validator.isEmail(email)) {
      this.setState({isEmailValid: false})
    }else{
      this.setState({isEmailValid: true})
    }
  }
  passwordBlur() {
    const password = this.state.passwordHandler;
    if (password.length > 5) {
      this.setState({isPasswordValid: true})
    }else{
      this.setState({isPasswordValid: false})
    }
  }
  passwordBlur2() {
    const password = this.state.passwordHandler;
    const password2 = this.state.passwordHandler2;
    if (password !== password2) {
      this.setState({isPasswordMatch: false})
    }else{
      this.setState({isPasswordMatch: true})
    }
  }
  submitForm() {
    const { isNameValid, isEmailValid, isPasswordValid, isPasswordMatch, nameHandler, emailHandler, passwordHandler, passwordHandler2 } = this.state;
    if (nameHandler.length !== 0 && emailHandler.length !== 0 && passwordHandler.length !== 0 && passwordHandler2.length !== 0) {
      if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
        this.setState({isFormValid: true, isFormEmpty: false, loading: true})
        const data = {
          name: nameHandler,
          email: emailHandler,
          password: passwordHandler
        }
        this.props.dispatch(submitFormRegister(data))
      }else{
        this.setState({isFormValid: false})
      }
    }else{
      this.setState({isFormValid: false, isFormEmpty: true})
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DeepLinkHandler' })], 0)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.status.register.error) {
      if (this.state.loading) {
        this.setState({loading: false})
      }
    }else{
      if (this.props.status.register.success) {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DeepLinkHandler' })], 0)
      }
    }
  }

  render() {
    const { isNameValid, isEmailValid, isPasswordValid, isPasswordMatch, isFormEmpty } = this.state;
    const { navigation } = this.props;
    return(
      <ScrollView>
        <NavigationEvents
          onDidFocus={() => this.props.dispatch(forceResetRG())}
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
        <View style={{alignItems: 'center', marginTop: 50}}>
          {isFormEmpty && <Text style={{fontSize: 12, color: 'red', marginLeft: -105}}>*Form tidak boleh kosong</Text>}
          {this.props.status.register.error && <Text style={{fontSize: 12, color: 'red'}}>{this.props.status.register.message}</Text>}
          <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular style={{borderColor: 'transparent'}}>
                <Input
                  placeholder='Nama'
                  maxLength={30}
                  placeholderTextColor='#919191'
                  underlineColorAndroid='transparent'
                  onChangeText={(x) => this.nameHandler(x)}
                  onBlur={() => this.nameBlur()}
                  style={styles.defaultInput}
                  />
              </Item>
            </Animatable.View>
            {!isNameValid && <Text style={{fontSize: 12, color: 'red', marginLeft: -105, paddingBottom: 5}}>*Nama minimal 2 karakter</Text>}
            <View style={{height: 3}}></View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              delay={100}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular style={{borderColor: 'transparent'}}>
                <Input
                  placeholder='Email'
                  placeholderTextColor='#919191'
                  underlineColorAndroid='transparent'
                  keyboardType='email-address'
                  onChangeText={(x) => this.emailHandler(x)}
                  onBlur={() => this.emailBlur()}
                  style={[styles.defaultInput]}
                  />
              </Item>
            </Animatable.View>
            {!isEmailValid && <Text style={{fontSize: 12, color: 'red', marginLeft: -150, paddingBottom: 5}}>*Email tidak valid</Text>}
            <View style={{height: 3}}></View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              delay={200}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular style={{borderColor: 'transparent'}}>
                <Input
                  placeholder='Password'
                  placeholderTextColor='#919191'
                  secureTextEntry={this.state.secure}
                  maxLength={20}
                  onChangeText={(x) => this.passwordHandler(x)}
                  onBlur={() => this.passwordBlur()}
                  style={[styles.defaultInput]}
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
            {!isPasswordValid && <Text style={{fontSize: 12, color: 'red', marginLeft: 8, paddingBottom: 5}}>*Password minimal 6 karakter, maksimal 20 karakter</Text>}
            <View style={{height: 3}}></View>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              delay={300}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular style={{borderColor: 'transparent'}}>
                <Input
                  placeholder='Ulangi Password'
                  placeholderTextColor='#919191'
                  maxLength={20}
                  secureTextEntry={this.state.secure2}
                  onChangeText={(x) => this.passwordHandler2(x)}
                  onBlur={() => this.passwordBlur2()}
                  style={[styles.defaultInput]}
                  />
                <TouchableOpacity style={{position: 'absolute', right: 5}}>
                  {
                    this.state.secure2
                    ? <Icon onPress={() => this.setState({secure2: false})} name='visibility' color='#919191' size={24}/>
                  : <Icon onPress={() => this.setState({secure2: true})} name='visibility-off' color='#919191' size={24}/>
                  }
                </TouchableOpacity>
              </Item>
            </Animatable.View>
            {!isPasswordMatch && <Text style={{fontSize: 12, color: 'red', marginLeft: -120, paddingBottom: 5}}>*Password belum sesuai</Text>}
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInRight'
              delay={400}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <TouchableOpacity style={[styles.button, { backgroundColor: '#7c0c10' }]} onPress={() => this.submitForm()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Daftar</Text>
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
              <Text style={{color: 'white', fontWeight: 'bold'}}>Daftar dengan Facebook</Text>
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
              <Text style={{color: 'white', fontWeight: 'bold'}}>Daftar dengan Google</Text>
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
            <Text style={{marginTop: 15, color: '#919191', marginBottom: 20}}>Sudah punya akun? <Text onPress={() => navigation.replace('Login')} style={{color: '#7c0c10'}}>Login disini</Text></Text>
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
)(Register);

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
