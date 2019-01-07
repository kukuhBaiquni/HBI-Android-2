import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/Get_User_Data';
import { NavigationEvents } from 'react-navigation';

class MyRekening extends Component {
  render() {
    const { userData, navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.props.dispatch(fetchUser(navigation.state.params.token))}
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rekening Bank</Text>
            <View style={{position: 'absolute', right: 18, top: 23}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditRekening', {token:navigation.state.params.token})}>
                <Icon name='create' color='#7c0c10' size={20} />
              </TouchableOpacity>
            </View>
        </View>
        <TouchableNativeFeedback>
          <View style={[styles.listMenu, {marginTop: 10}]}>
            <Text style={styles.menuTitle}>Nama Bank</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.nama_rekening === '' ? 'Belum diatur' : userData.nama_rekening}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Nomor Rekening</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.no_rekening === '' ? 'Belum diatur' : userData.no_rekening}</Text>
          </View>
        </TouchableNativeFeedback>
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
  },
  headerMenu: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 8,
    backgroundColor: '#bfbfbf',
    marginTop: 10
  },
  listMenu: {
    height: 55,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 16
  },
})


function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(MyRekening);
