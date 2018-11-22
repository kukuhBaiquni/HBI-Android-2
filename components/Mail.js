import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native';
import { Right, Button, Body, Header, Title, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

export default class Mail extends Component {
  test() {
    console.log('ggwp - mail');
  }

  render() {
    return(
      <View>
        <NavigationEvents
          onDidFocus={() => this.test()}
        />
        <Header
          androidStatusBarColor='#7c0c10'
          style={{backgroundColor: 'white', marginBottom: 10}}
          >
          <Left/>
          <Body>
            <Title style={{color: '#7c0c10', fontWeight: 'bold'}}>Mail</Title>
          </Body>
          <Right />
          <Right />
        </Header>
        <TouchableNativeFeedback>
          <View style={styles.containerWithIcon}>
            <Icon name='drafts' size={20} color='#515151'/>
            <Left>
              <Text style={styles.subtitle}>Inbox</Text>
            </Left>
          </View>
        </TouchableNativeFeedback>

        <View style={{paddingTop: 15, paddingBottom: 15}}>
          <Text style={{fontStyle: 'italic', color: '#a3a3a3', textAlign: 'center'}}>Belum ada surat</Text>
        </View>

        <TouchableNativeFeedback>
          <View style={styles.containerWithIcon}>
            <Icon name='notifications' size={20} color='#515151'/>
            <Left>
              <Text style={styles.subtitle}>Notifikasi Sistem</Text>
            </Left>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.viewContent}>
          <Text style={{color: '#878787'}}>Selamat akun Anda telah aktif, Anda dapat berbelanja di menu Shopping.</Text>
        </View>

        <TouchableNativeFeedback>
          <View style={styles.containerWithIcon}>
            <Icon name='local-mall' size={20} color='#515151'/>
            <Left>
              <Text style={styles.subtitle}>Notifikasi Order</Text>
            </Left>
          </View>
        </TouchableNativeFeedback>

        <View style={{paddingTop: 15, paddingBottom: 15}}>
          <Text style={{fontStyle: 'italic', color: '#a3a3a3', textAlign: 'center'}}>Belum ada surat</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContent: {
    paddingLeft: 27,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  subtitle: {
    marginLeft: 10,
    color: '#515151',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  },
  containerWithIcon: {
    backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    flexDirection: 'row'
  }
})
