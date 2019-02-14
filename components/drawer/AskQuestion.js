import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { sendForm, resetStatus } from '../../actions/Send_Call_Us';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';

class AskQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      loading: false,
      showSuccess: false,
      showError: false
    }
  }

  submitForm() {
    if (this.props.userData.email !== '') {
      const data = {
        type: 'Call Us',
        email: this.props.userData.email,
        text: this.state.text
      }
      this.props.dispatch(sendForm(data))
      this.setState({email: '', text: '', loading: true})
    }else{
      Alert.alert(
        'Kesalahan',
        'Anda harus login untuk mengirim formulir, login sekarang?',
        [
          {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
          {text: 'TIDAK'}
        ],
        { cancelable: false }
      );
    }
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
    console.log(this.props);
    return(
      <View style={{flex: 1}}>
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
        <Text style={{fontWeight: 'bold', color: '#7c0c10', marginTop: 10, marginBottom: 10, marginLeft: 20, textAlign: 'left', fontSize: 16}}>Ajukan Pertanyaan Anda disini</Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={{width: '90%', paddingLeft: 10, fontSize: 16, backgroundColor: 'white', elevation: 3, borderRadius: 3, borderWidth: 1, borderColor: '#f4f4f4'}}
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
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
)(AskQuestion);
