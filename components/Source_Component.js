import React, { Component } from 'react';
import RouterTabs from './Router';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import SplashScreen from './Splash_Screen';
import OneSignal from 'react-native-onesignal';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    'Remote debugger'
]);

export default class SourceComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataNotif: Object.assign({})
    }

    OneSignal.setLogLevel(7, 0);
    let requiresConsent = false;
    this.state = {
      count: 0,
      changeScreen: false,
      playerID: ''
    }
    OneSignal.setRequiresUserPrivacyConsent(requiresConsent);
    OneSignal.init("11d7b6aa-5d16-4660-9309-f4b58de10ae7");
    OneSignal.configure()
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
    if (notification.payload.additionalData) {
      this.setState({dataNotif: notification.payload.additionalData})
    }
  }

  onOpened = (openResult) => {
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
    const toStorage = async () => {
      try {
        await AsyncStorage.setItem('PlayerID', JSON.stringify(device.userId))
      }catch(error) {
        console.log(error);
      }
    }
    toStorage()
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }

  tick() {
    var state = this.state.count;
    state++
    this.setState({count: state})
    if (this.state.count === 3) {
      this.setState({changeScreen: true})
      clearInterval(this.timer)
    }
  }

  render() {
    return(
      <Provider store = { store }>
        {
          this.state.changeScreen
          ?
          <RouterTabs dataNotif={this.state.dataNotif} />
          :
          <SplashScreen />
        }
      </Provider>
    )
  }
}
