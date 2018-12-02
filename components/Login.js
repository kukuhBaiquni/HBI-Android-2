import React, { Component } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true
    }
  }
  render() {
    return(
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={{width: 320, alignItems: 'center', marginTop: 70}}>
          <Item regular>
            <Input
              placeholder='Email'
              placeholderTextColor='#919191'
              underlineColorAndroid='transparent'
              keyboardType='email-address'
              style={{backgroundColor: 'white'}}
              />
          </Item>
          <View style={{height: 3}}></View>
          <Item regular>
            <Input
              placeholder='Password'
              placeholderTextColor='#919191'
              secureTextEntry={this.state.secure}
              style={{backgroundColor: 'white'}}
              />
            <TouchableOpacity style={{position: 'absolute', right: 5}}>
              {
                this.state.secure
                ? <Icon onPress={() => this.setState({secure: false})} name='visibility' color='#919191' />
                : <Icon onPress={() => this.setState({secure: true})} name='visibility-off' color='#919191' />
              }
            </TouchableOpacity>
          </Item>
          <TouchableOpacity style={{height: 50, width: 316, backgroundColor: '#7c0c10', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk</Text>
          </TouchableOpacity>

        <Text style={{padding: 30}}>Atau</Text>
        <TouchableOpacity style={{height: 50, width: 320, backgroundColor: '#3b5998', alignItems: 'center', justifyContent: 'center'}} onPress={() => console.log('fb')}>
          <SocialIcon
            type='facebook'
            raised={false}
            style={{height: 28, width: 28, borderRadius: 0, position: 'absolute', left: 6}}
            />
          <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk dengan Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50, width: 320, backgroundColor: '#ff4242', alignItems: 'center', justifyContent: 'center', marginTop: 10}} onPress={() => console.log('google')}>
          <SocialIcon
            type='google'
            raised={false}
            style={{height: 28, width: 28, borderRadius: 0, position: 'absolute', left: 6}}
            />
          <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk dengan Google</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 15, color: '#919191'}}>Belum punya akun? <Text onPress={() => console.log('daftar')} style={{color: '#7c0c10'}}>Daftar disini</Text></Text>
        </View>
      </View>
    )
  }
}
