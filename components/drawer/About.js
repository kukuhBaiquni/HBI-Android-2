import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { SERVER_URL } from '../../config';

export default class About extends Component {

  componentDidMount() {
    const type = ['faq', 'privacy', 'terms']
    if (this.props.navigation.state.params === undefined) {
      let url = `${SERVER_URL}about`;
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }else{
      let index = this.props.navigation.state.params.type;
      let url = `${SERVER_URL}${type[index]}`;
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
    this.props.navigation.goBack()
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tentang Kami</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Redirecting..</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cecece',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: '#7c0c10'
  }
})
