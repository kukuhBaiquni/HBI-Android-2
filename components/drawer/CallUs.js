import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { sendForm, resetStatus } from '../../actions/Send_Call_Us';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';

class CallUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      text: '',
      loading: false,
      showSuccess: false,
      showError: false
    }
  }

  submitForm() {
    const data = {
      email: this.state.email,
      text: this.state.text
    }
    this.props.dispatch(sendForm(data))
    this.setState({email: '', text: '', loading: true})
  }

  resetState() {
    this.props.dispatch(resetStatus())
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status.sendFormCallUs.success !== this.props.status.sendFormCallUs.success) {
      if (this.state.loading) {
        if (this.props.status.sendFormCallUs.success) {
          this.setState({loading: false, showSuccess: true, showError: false})
        }
      }
    }
    if (prevProps.status.sendFormCallUs.error !== this.props.status.sendFormCallUs.error) {
      if (this.state.loading) {
        if (this.props.status.sendFormCallUs.error) {
          this.setState({loading: false, showError: true, showSuccess: false})
        }
      }
    }
    if (prevProps.status.sendFormCallUs.success !== this.props.status.sendFormCallUs.success && prevProps.status.sendFormCallUs.error !== this.props.status.sendFormCallUs.error) {
      if (!this.props.status.sendFormCallUs.success && !this.props.status.sendFormCallUs.error) {
        this.setState({loading: false, showSuccess: false, showError: false})
      }
    }
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
          <Modal
            isVisible={this.state.loading}
            style={{alignItems: 'center'}}
            hideModalContentWhileAnimating={true}
            useNativeDriver
            >
            <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
              <DotIndicator
                color='#7c0c10'
                size={8}
                />
            </View>
          </Modal>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hubungi Kami</Text>
        </View>
        {
          this.state.showSuccess &&
          <TouchableOpacity style={{backgroundColor: '#fff568', height: 40, borderBottomColor: '#f4f4f4', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#a5a5a5', fontSize: 12}}>Pesan Anda telah terkirim.</Text>
          </TouchableOpacity>
        }
        {
          this.state.showError &&
          <TouchableOpacity style={{backgroundColor: '#ff8787', height: 40, borderBottomColor: '#f4f4f4', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#f71616', fontSize: 12}}>Pesan Anda tidak terkirim.</Text>
          </TouchableOpacity>
        }
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image style={{height: 106, width: 94, marginTop: 20}} source={require('../../android/app/src/main/assets/custom/customerdummy.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>Selamat Datang!</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Kami Hadir Untuk Anda</Text>
            <Text style={{fontSize: 15, textAlign: 'center', marginTop: 10}}>Jam Operational Cusomer Service Kami:</Text>
            <Text style={{fontSize: 15, textAlign: 'center', marginTop: 10}}>Senin - Jum'at (8 AM - 5 PM)</Text>
            <Text style={{fontSize: 15, textAlign: 'center'}}>Sabtu - Minggu (9 AM - 4 PM)</Text>
            <Text style={{fontSize: 15, textAlign: 'center', marginTop: 10}}>Hubungi Kami di admin@halalbeef.co.id,</Text>
            <Text style={{fontSize: 15, textAlign: 'center'}}>atau kirimkan Pesan Anda dibawah ini.</Text>
            <View style={{marginTop: 20, width: '100%'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10, textAlign: 'left', marginLeft: 20}}>Alamat Email</Text>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  style={{width: '90%', paddingLeft: 10, fontSize: 16, backgroundColor: 'white', elevation: 3, borderRadius: 3, borderWidth: 1, borderColor: '#f4f4f4'}}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  onFocus={() => this.resetState()}
                  />
              </View>
            </View>
            <View style={{marginTop: 10, width: '100%'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10, textAlign: 'left', marginLeft: 20}}>Pesan Anda</Text>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  style={{width: '90%', paddingLeft: 10, fontSize: 16, backgroundColor: 'white', elevation: 3, borderRadius: 3, borderWidth: 1, borderColor: '#f4f4f4'}}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  onFocus={() => this.resetState()}
                  />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.submitForm()} style={{borderRadius: 3, width: '90%', height: 50, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(CallUs)

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
