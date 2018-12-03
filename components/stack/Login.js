import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import { submitFormLogin } from '../../actions/Login_Attempt';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true,
      emailHandler: '',
      passwordHandler: ''
    }
  }

  submitForm() {
    let email = this.state.emailHandler;
    let password = this.state.passwordHandler;
    let data = {
      email, password
    };
    this.props.dispatch(submitFormLogin(data));
    this.props.navigation.replace('Blank');
  }

  render() {
    const { navigation } = this.props;
    return(
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 70}}>
          <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
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
                    ? <Icon onPress={() => this.setState({secure: false})} name='visibility' color='#919191' size={18}/>
                  : <Icon onPress={() => this.setState({secure: true})} name='visibility-off' color='#919191' size={18}/>
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
