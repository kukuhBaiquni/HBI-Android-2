import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { sendForm, resetStatus } from '../../actions/Send_Call_Us';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';

class Suggestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      loading: false,
      loading: false,
      showSuccess: false,
      showError: false
    }
  }

  submitForm() {
    const data = {
      type: 'Suggestion',
      email: this.props.userData.email,
      text: this.state.text
    }
    this.props.dispatch(sendForm(data))
    this.setState({email: '', text: '', loading: true})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status.sendFormCallUs.success !== this.props.status.sendFormCallUs.success) {
      if (this.state.loading) {
        if (this.props.status.sendFormCallUs.success) {
          this.setState({loading: false, showSuccess: true, showError: false})
          this.props.dispatch(resetStatus())
        }
      }
    }
    if (prevProps.status.sendFormCallUs.error !== this.props.status.sendFormCallUs.error) {
      if (this.state.loading) {
        if (this.props.status.sendFormCallUs.error) {
          this.setState({loading: false, showError: true, showSuccess: false})
          this.props.dispatch(resetStatus())
        }
      }
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
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
            <Image resizeMode='contain' style={{height: 21, width: 21}} source={require('../../android/app/src/main/assets/custom/DrawerDarkred.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kirim Saran Kepada Kami</Text>
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
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <View style={{width: '95%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>Sampaikan Saran Anda kepada Kami</Text>
              <TextInput
                style={{width: '100%', paddingLeft: 10, fontSize: 16, backgroundColor: 'white', elevation: 3, borderRadius: 3, borderWidth: 1, borderColor: '#f4f4f4'}}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.submitForm()} style={{elevation: 3, position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c0c10', width: '95%', height: 50, borderRadius: 3}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Kirim</Text>
          </TouchableOpacity>
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
)(Suggestion)

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
