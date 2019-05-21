import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Image, AsyncStorage, ToastAndroid } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import { getAllProducts } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';

import NetInfo from "@react-native-community/netinfo";

class Beranda extends Component {

    _beforeRender = async () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });

    };

    _afterRender = async () => {
        try{
            const id = await AsyncStorage.getItem('PlayerID')
            const token = await AsyncStorage.getItem('access_token');
            if (id !== null && token !== null) {
                const ids = JSON.parse(id);
                const tokens = JSON.parse(token);
                this.setState({token: tokens});
                if (this.props.token === '') this.props.dispatch(setInitialToken(tokens));
                if (this.props.userData.playerID !== ids) this.props.dispatch(setPlayerId({ids, token: tokens}));
                if (this.props.userData.name === '') this.props.dispatch(fetchUser(tokens));
            }
            if (this.props.listProducts.length === 0) this.props.dispatch(getAllProducts());
        }catch(error) {
            ToastAndroid.show('Data tidak dapat diakses.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userData !== this.props.userData) {
            ToastAndroid.show(`Selamat datang ${this.props.userData.name}`, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    };

    render() {
        return(
            <View>
                <NavigationEvents
                    onWillFocus={this._beforeRender}
                    onDidFocus={this._afterRender}
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
