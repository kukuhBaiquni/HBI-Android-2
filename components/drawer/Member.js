import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';

class Member extends Component {

  beforeRender = async () => {
    try{
      const id = await AsyncStorage.getItem('PlayerID')
      const token = await AsyncStorage.getItem('access_token');
      if (id !== null && token !== null) {
        const ids = JSON.parse(id)
        const tokens = JSON.parse(token)
        this.props.dispatch(setInitialToken(tokens))
        this.props.dispatch(setPlayerId({ids, token: tokens}))
      }
    }catch(error) {
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Halal Beef Indonesia</Text>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(Member)

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
