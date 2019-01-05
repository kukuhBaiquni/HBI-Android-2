import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../config';
import LinearGradient from 'react-native-linear-gradient';

class MyProfile extends Component {
  render() {
    const userData = this.props.navigation.state.params;
    return(
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil Saya</Text>
        </View>
        <TouchableNativeFeedback>
          <View style={[styles.listMenu, {marginTop: 10}]}>
            <Text style={styles.menuTitle}>Nama</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.name}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Email</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.email}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Telepon</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.phone === '' || userData.phone === undefined ? 'Belum diatur' : '0' + userData.phone}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Jenis Kelamin</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.gender === undefined ? 'Belum diatur' : userData.gender}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Kota / Kabupaten</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.city}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Kecamatan</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.district}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Kelurahan</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.village}</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <Text style={styles.menuTitle}>Alamat Lengkap</Text>
            <Text style={{marginTop: 2, color: '#939393'}}>{userData.address.street}</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile', userData)} style={{borderRadius: 5, backgroundColor: '#7c0c10', marginTop: 10, width: 310, height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Edit Profil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
)(MyProfile);
