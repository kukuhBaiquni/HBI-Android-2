import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { BACKDARKRED } from '../../images';

class MyRekening extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Rekening Bank',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> )
        }
    };

    render() {
        const { userData, navigation } = this.props;
        return(
            <View style={{flex: 1}}>
                <TouchableNativeFeedback>
                    <View style={[styles.listMenu, {marginTop: 10}]}>
                        <Text style={styles.menuTitle}>Nama Bank</Text>
                        <Text style={{marginTop: 2, color: '#939393'}}>{userData.nama_rekening === '' ? 'Belum diatur' : userData.nama_rekening}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.listMenu}>
                        <Text style={styles.menuTitle}>Nomor Rekening</Text>
                        <Text style={{marginTop: 2, color: '#939393'}}>{userData.no_rekening === '' ? 'Belum diatur' : userData.no_rekening}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
};

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
    },
    headerMenu: {
        height: 50,
        paddingTop: 15,
        paddingLeft: 8,
        backgroundColor: '#bfbfbf',
        marginTop: 10
    },
    listMenu: {
        height: 55,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        padding: 6,
        backgroundColor: 'white'
    },
    menuTitle: {
        fontSize: 16
    },
})


function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(MyRekening);
