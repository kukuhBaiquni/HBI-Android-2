import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import { YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainConnector from './MainConnector';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    'Remote debugger'
]);

export default class SourceComponent extends Component {

    componentDidMount() {
        SplashScreen.hide();
    };

    render() {
        return(
            <Provider store = { store }>
                <MainConnector />
            </Provider>
        )
    }
};
