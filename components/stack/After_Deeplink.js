import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar, TouchableNativeFeedback, Alert, Linking } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import { accountVerification } from '../../actions/Account_Verification';
import { NavigationActions, NavigationEvents } from 'react-navigation';

class AfterDeeplink extends Component {

  afterRender() {
    if (this.props.navigation.state.params !== undefined) {
      const hash = this.props.navigation.state.params.hash;
      this.props.dispatch(accountVerification(hash))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.status.account_verification.message.includes('berhasil')) {
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    }else{
      this.alertPop()
    }
  }

  alertPop = async () => {
    try {
      Alert.alert(
        'Kesalahan',
        'Permintaan anda tidak dapat di proses.',
      [
        {text: 'OK'}
      ],
      { cancelable: false }
      )
      this.props.navigation.popToTop()
    } catch(error) {
      this.props.navigation.popToTop()
    }
  }

  render() {
    return(
      <View>
        <NavigationEvents
          onDidFocus={() => this.afterRender()}
          />
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
        />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(AfterDeeplink);
