import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Switch, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SettingNotifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notif_A: false,
      notif_B: false
    }
  }
  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <Text style={{marginLeft: 10, fontSize: 16}}>Notifikasi Otomatis</Text>
            </View>
            <View style={{position: 'absolute', right: 10, top: 15}}>
              <Switch
                onValueChange={() => this.setState({notif_A: !this.state.notif_A})}
                thumbColor='#b53939'
                value={this.state.notif_A}
                trackColor={{false: '#c9c9c9', true: '#ff9999'}}
                />
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={[styles.listMenu, {borderBottomWidth: 1, borderBottomColor: '#eaeaea'}]}>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <Text style={{marginLeft: 10, fontSize: 16}}>Notifikasi Email dan SMS</Text>
            </View>
            <View style={{position: 'absolute', right: 10, top: 15}}>
              <Switch
                onValueChange={() => this.setState({notif_B: !this.state.notif_B})}
                thumbColor='#b53939'
                value={this.state.notif_B}
                trackColor={{false: '#c9c9c9', true: '#ff9999'}}
                />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
  },
  headerTitle: {
    fontSize: 18,
    color: 'white'
  },
  listMenu: {
    height: 55,
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
