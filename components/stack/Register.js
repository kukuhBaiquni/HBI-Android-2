import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secure: true
    }
  }
  render() {
    const { navigation } = this.props;
    return(
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInDown'
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular>
                <Input
                  placeholder='Nama'
                  maxLength={30}
                  placeholderTextColor='#919191'
                  underlineColorAndroid='transparent'
                  style={styles.defaultInput}
                  />
              </Item>
            </Animatable.View>
            <View style={{height: 3}}></View>
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
              animation='fadeInDown'
              delay={300}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <Item regular>
                <Input
                  placeholder='Ulangi Password'
                  placeholderTextColor='#919191'
                  secureTextEntry={this.state.secure}
                  style={[styles.defaultInput]}
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
            <Animatable.View
              style={{width: 260, alignItems: 'center'}}
              animation='fadeInRight'
              delay={400}
              useNativeDriver
              duration={500}
              iterationCount={1}
              >
              <TouchableOpacity style={[styles.button, { backgroundColor: '#7c0c10' }]}>
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
