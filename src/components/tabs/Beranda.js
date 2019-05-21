import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Image, AsyncStorage, ToastAndroid } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { BERANDA } from '../../images';

class Beranda extends Component {


    render() {
        return(
            <View>

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
