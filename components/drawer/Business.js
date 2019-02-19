import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';

export default class Business extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image resizeMode='contain' style={{height: 21, width: 21}} source={require('../../android/app/src/main/assets/custom/DrawerDarkred.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bisnis</Text>
        </View>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
            <View style={{width: '90%', height: 400, borderRadius: 10, elevation: 5, marginTop: 10, backgroundColor: 'white'}}>
              <Image style={{height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%'}} source={require('../../android/app/src/main/assets/custom/Beranda/Achievement.png')} />
              <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
                <View style={{width: '90%', height: 40, justifyContent: 'center', borderBottomColor: '#a8a8a8', borderBottomWidth: 1}}>
                  <Text style={{fontSize: 18}}>Wholesales</Text>
                </View>
                <View style={{width: '90%', paddingTop: 10}}>
                  <Text>Some description..Some description..Some description..Some description..Some description..Some description..Some description..</Text>
                  <TouchableOpacity style={{position: 'absolute', bottom: -60, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>Lihat Detail</Text>
                    <Icon name='chevron-right' color='red' size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{width: '90%', height: 400, borderRadius: 10, elevation: 5, marginTop: 10, backgroundColor: 'white'}}>
              <Image style={{height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%'}} source={require('../../android/app/src/main/assets/custom/Beranda/Achievement.png')} />
              <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
                <View style={{width: '90%', height: 40, justifyContent: 'center', borderBottomColor: '#a8a8a8', borderBottomWidth: 1}}>
                  <Text style={{fontSize: 18}}>Akikah</Text>
                </View>
                <View style={{width: '90%', paddingTop: 10}}>
                  <Text>Some description..Some description..Some description..Some description..Some description..Some description..Some description..</Text>
                  <TouchableOpacity style={{position: 'absolute', bottom: -60, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>Lihat Detail</Text>
                    <Icon name='chevron-right' color='red' size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{width: '90%', height: 400, borderRadius: 10, elevation: 5, marginTop: 10, backgroundColor: 'white'}}>
              <Image style={{height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10, width: '100%'}} source={require('../../android/app/src/main/assets/custom/Beranda/Achievement.png')} />
              <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
                <View style={{width: '90%', height: 40, justifyContent: 'center', borderBottomColor: '#a8a8a8', borderBottomWidth: 1}}>
                  <Text style={{fontSize: 18}}>Kurban</Text>
                </View>
                <View style={{width: '90%', paddingTop: 10}}>
                  <Text>Some description..Some description..Some description..Some description..Some description..Some description..Some description..</Text>
                  <TouchableOpacity style={{position: 'absolute', bottom: -60, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>Lihat Detail</Text>
                    <Icon name='chevron-right' color='red' size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
