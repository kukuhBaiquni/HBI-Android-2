import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Image, AsyncStorage, ToastAndroid, Alert, StatusBar, BackHandler, Platform, Dimensions } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import { getAllProducts, resetGetAllProductState } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';

import NetInfo from "@react-native-community/netinfo";
import RNExitApp from 'react-native-exit-app';
import { getMemberLocation } from '../../actions/Get_Member_Location';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { COLORS } from '../basic/colors';

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
        );
        return true;
    };

    _beforeBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    };

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
        dispatch(getMemberLocation());
        if (listProducts.data.length === 0) dispatch(getAllProducts());
        try{
            const id = await AsyncStorage.getItem('PlayerID');
            const token = await AsyncStorage.getItem('token');
            if (id !== null && token !== null) {
                const ids = JSON.parse(id);
                const tokens = JSON.parse(token);
                 this.setState({token: tokens.access});
                dispatch(setInitialToken(tokens.access));
                if (userData.data.playerID !== ids) dispatch(setPlayerId({ids, token: tokens.access}));
                if (JSON.stringify(userData.data) === JSON.stringify({})) dispatch(fetchUser({token: tokens.access, _id: tokens._id}));
            }
        }catch(error) {
            ToastAndroid.show('Data tidak dapat diakses.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        };
    };

    componentDidUpdate(prevProps, prevState) {
        const { userData, listProducts, dispatch } = this.props;
        if (prevProps.userData.success !== userData.success) {
            ToastAndroid.show(`Selamat datang ${userData.data.personalIdentity.name}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
        if (prevProps.listProducts.success !== listProducts.success) {
            if (listProducts.success) {
                dispatch(resetGetAllProductState());
            }
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
                    backgroundColor={COLORS.PRIMARY}
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

const styles = StyleSheet.create({
    innerContainer: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    cardContainer: {
        marginTop: 10,
        margin: '2%',
        backgroundColor: 'white',
        width: '40%',
        height: SCREEN_HEIGHT * 0.25,
        borderColor: '#d2d2d2',
        borderWidth: 1,
        borderRadius: 4
    }
});
