import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';

export default class Suggestion extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image style={{height: 18, width: 18}} source={require('../../android/app/src/main/assets/custom/DrawerDarkred.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kirim Saran</Text>
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
