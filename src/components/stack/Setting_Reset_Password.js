import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { resetPassword, resetPasswordState, startProcess } from '../../actions/Reset_Password';
import { NavigationEvents } from 'react-navigation';

class SettingResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state ={
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      secure_A: true,
      secure_B: true,
      secure_C: true,
      loading: false,
      showAlert: false,
      confirmMatch: true,
      isPasswordValid: true
    }
  }

  beforeRender() {
    this.props.dispatch(resetPasswordState())
  }

  checkLength(x) {
    this.setState({newPassword: x})
    if (x.length > 5) {
      this.setState({isPasswordValid: true})
    }else{
      this.setState({isPasswordValid: false})
    }
  }

  onSave() {
    if (this.state.newPassword === this.state.confirmPassword) {
      this.setState({loading: true, confirmMatch: true, showAlert: false})
      const data = {
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        token: this.props.navigation.state.params.token
      }
      this.props.dispatch(startProcess())
      this.props.dispatch(resetPassword(data))
    }else{
      this.setState({confirmMatch: false})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status.resetPassword.success !== this.props.status.resetPassword.success) {
      if (this.state.loading) {
        ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.navigation.goBack()
      }
    }
    if (prevProps.status.process !== this.props.status.process) {
      if (!this.props.status.process && prevProps.status.resetPassword.error) {
        this.setState({loading: false, showAlert: true})
      }
    }
  }

  render() {
    const { navigation, status } = this.props;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', width: '95%', borderRadius: 3, elevation: 3, marginTop: 10}}>
            {
              !this.state.confirmMatch &&
              <Text style={{color: 'red', textAlign: 'center', padding: 10, fontSize: 16}}>Password tidak sesuai!</Text>
            }
            {
              !this.state.isPasswordValid &&
              <Text style={{color: 'red', textAlign: 'center', padding: 10, fontSize: 16}}>Password minimal 6 karakter!</Text>
            }
            {
              this.state.showAlert &&
              <Text style={{color: 'red', textAlign: 'center', padding: 10, fontSize: 16}}>{this.props.status.resetPassword.message}</Text>
            }
            <Form>
              <Item stackedLabel style={{width: 315, borderBottomColor: '#a8a8a8'}}>
                <Label style={{color: '#a8a8a8'}}>Password Sekarang</Label>
                <Input
                  onChangeText={(x) => this.setState({currentPassword: x})}
                  value={this.state.currentPassword}
                  secureTextEntry={this.state.secure_A}
                  onFocus={() => this.setState({showAlert: false})}
                  />
                <TouchableOpacity onPress={() => this.setState({secure_A: !this.state.secure_A})} style={{position: 'absolute', right: 10, bottom: 10}}>
                  <Icon name={this.state.secure_A ? 'visibility' : 'visibility-off'} />
                </TouchableOpacity>
              </Item>
              <Item stackedLabel style={{width: 315, borderBottomColor: '#a8a8a8'}}>
                <Label style={{color: '#a8a8a8'}}>Password Baru</Label>
                <Input
                  onChangeText={(x) => this.checkLength(x)}
                  value={this.state.newPassword}
                  secureTextEntry={this.state.secure_B}
                  />
                <TouchableOpacity onPress={() => this.setState({secure_B: !this.state.secure_B})} style={{position: 'absolute', right: 10, bottom: 10}}>
                  <Icon name={this.state.secure_B ? 'visibility' : 'visibility-off'} />
                </TouchableOpacity>
              </Item>
              <Item stackedLabel style={this.state.confirmMatch ? {width: 315, borderBottomColor: '#a8a8a8'} : {width: 315, borderBottomColor: 'red'}}>
                <Label style={this.state.confirmMatch ? {color: '#a8a8a8'} : {color: 'red'}}>Ulangi Password Baru</Label>
                <Input
                  onChangeText={(x) => this.setState({confirmPassword: x})}
                  value={this.state.confirmPassword}
                  secureTextEntry={this.state.secure_C}
                  />
                <TouchableOpacity onPress={() => this.setState({secure_C: !this.state.secure_C})} style={{position: 'absolute', right: 10, bottom: 10}}>
                  <Icon name={this.state.secure_C ? 'visibility' : 'visibility-off'} />
                </TouchableOpacity>
              </Item>
            </Form>
            <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity onPress={() => this.onSave()} style={{borderRadius: 3, width: '95%', height: 50, backgroundColor: '#7c0c10', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(SettingResetPassword);

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cecece',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: 'white'
  }
})
