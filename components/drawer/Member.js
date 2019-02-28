import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

class Member extends Component {
  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image resizeMode='contain' style={{height: 21, width: 21}} source={require('../../android/app/src/main/assets/custom/DrawerDarkred.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Member</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{paddingTop: 20,width: '90%', height: 80, backgroundColor: '#990000', borderRadius: 5, marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../../android/app/src/main/assets/custom/Beranda/giphy.gif')} style={{width: 50, height: 50, marginTop: -5, marginLeft: -30}} />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 13}}>Hasilkan uang langsung</Text>
              <Text style={{color: 'white', fontSize: 13}}>Dapatkan penghasilan tanpa batas</Text>
            </View>
          </TouchableOpacity>
          <View style={{width: '90%', height: 200, backgroundColor: 'white', elevation: 3, borderRadius: 3, marginTop: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Join')} style={{height: 50, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/SyaratGabung.png')} style={{height: 20, width: 20}} resizeMode='contain' />
              <Text style={{width: '70%'}}>Bergabung</Text>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/NextGrey.png')} style={{height: 15, marginTop: 5, opacity: 0.7}} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profit')} style={{height: 50, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/KeuntunganBergabung.png')} style={{height: 20, width: 20}} resizeMode='contain' />
              <Text style={{width: '70%'}}>Keuntungan</Text>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/NextGrey.png')} style={{height: 15, marginTop: 5, opacity: 0.7}} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Excellence')} style={{height: 50, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/KeunggulanBergabung.png')} style={{height: 20, width: 20}} resizeMode='contain' />
              <Text style={{width: '70%'}}>Keunggulan</Text>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/NextGrey.png')} style={{height: 15, marginTop: 5, opacity: 0.7}} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AskQuestion')} style={{height: 50, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/quest.png')} style={{height: 20, width: 20}} resizeMode='contain' />
              <Text style={{width: '70%'}}>Ajukan Pertanyaan</Text>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/NextGrey.png')} style={{height: 15, marginTop: 5, opacity: 0.7}} resizeMode='contain' />
            </TouchableOpacity>
          </View>
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
  },
  slide: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 35,
    width: '90%',
    elevation: 5,
    borderRadius: 3,
    marginTop: 10
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
