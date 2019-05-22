import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Image, AsyncStorage, ToastAndroid, Alert, StatusBar, BackHandler, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import { getAllProducts } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';

import NetInfo from "@react-native-community/netinfo";
import RNExitApp from 'react-native-exit-app';

class Beranda extends Component {

    handleBackButton = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda yakin ingin keluar dari aplikasi?', [{
                text: 'Batal',
            }, {
                text: 'OK',
                onPress: () => RNExitApp.exitApp()
            }, ], {
                cancelable: false
            }
        )
        return true;
    };

    _beforeBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    _beforeRender = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this._afterRender();
            }else{
                Alert.alert(
                    'Tidak ada Jaringan',
                    'Silahkan periksa kembali koneksi internet Anda',
                    [
                        {text: 'OK', onPress: () => RNExitApp.exitApp()}
                    ],
                    { cancelable: false }
                );
            }
        });
    };

    _afterRender = async () => {
        const { token, userData, dispatch, listProducts } = this.props;
        try{
            const id = await AsyncStorage.getItem('PlayerID')
            const token = await AsyncStorage.getItem('access_token');
            if (id !== null && token !== null) {
                const ids = JSON.parse(id);
                const tokens = JSON.parse(token);
                this.setState({token: tokens});
                if (token === '') dispatch(setInitialToken(tokens));
                if (userData.data.playerID !== ids) dispatch(setPlayerId({ids, token: tokens}));
                if (JSON.stringify(userData.data) === JSON.stringify({})) dispatch(fetchUser(tokens));
            }
            if (listProducts.length === 0) dispatch(getAllProducts());
        }catch(error) {
            ToastAndroid.show('Data tidak dapat diakses.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        };
    };

    componentDidUpdate(prevProps, prevState) {
        const { userData } = this.props;
        if (prevProps.userData.success !== userData.success) {
            ToastAndroid.show(`Selamat datang ${userData.data.name}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    };

    render() {
        return(
            <View>
                <NavigationEvents
                    onWillFocus={this._beforeRender}
                    onWillBlur={this._beforeBlur}
                    />
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#7c0c10'
                    animated
                    />

            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Beranda);
