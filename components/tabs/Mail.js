import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Right, Button, Body, Header, Title, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import MailPartials from './Mail_Partials';

export default class Mail extends Component {
  render() {
    const { userData, navigation } = this.props;
    return(
      <View>
        <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
          <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Notifikasi</Text>
        </View>
        <ScrollView>
          <TouchableNativeFeedback>
            <View style={styles.containerWithIcon}>
              <Icon name='local-mall' size={20} color='#515151'/>
              <Left>
                <Text style={styles.subtitle}>Notifikasi Order</Text>
              </Left>
              <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                <Icon name='chevron-right' />
              </View>
            </View>
          </TouchableNativeFeedback>
          <MailPartials navigation={navigation} type='order' />
          <TouchableNativeFeedback>
            <View style={styles.containerWithIcon}>
              <Icon name='notifications' size={20} color='#515151'/>
              <Left>
                <Text style={styles.subtitle}>Notifikasi Sistem</Text>
              </Left>
              <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                <Icon name='chevron-right' />
              </View>
            </View>
          </TouchableNativeFeedback>
          <MailPartials navigation={navigation} type='system' />
          <TouchableNativeFeedback>
            <View style={styles.containerWithIcon}>
              <Icon name='drafts' size={20} color='#515151'/>
              <Left>
                <Text style={styles.subtitle}>Inbox</Text>
              </Left>
              <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                <Icon name='chevron-right' />
              </View>
            </View>
          </TouchableNativeFeedback>
          <MailPartials navigation={navigation} type='inbox' />
          <View style={{height: 70}} />
        </ScrollView>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    flexDirection: 'row',
    marginTop: 5
  }
})
