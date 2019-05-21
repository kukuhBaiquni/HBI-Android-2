import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet, ScrollView, Switch, Alert, AsyncStorage, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { fetchUser, logOutRequest } from '../../actions/Get_User_Data';
import GoogleSignIn from 'react-native-google-sign-in';
import { BACKDARKRED } from '../../images';

class Settings extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Pengaturan',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> )
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            notif_A: false,
            notif_B: false
        };
    };

    logOut() {
        Alert.alert(
            'Logout',
            'Apakah anda yakin ingin keluar ?',
            [
                {text: 'YA', onPress: () => this.confirmLogout()},
                {text: 'TIDAK'}
            ],
            { cancelable: false }
        );
    };

    confirmLogout = async (x) => {
        try {
            await AsyncStorage.removeItem('access_token');
            LoginManager.logOut();
            GoogleSignIn.signOut();
            this.props.navigation.replace('MainTabs');
            this.props.dispatch(logOutRequest());
        }catch (error) {
            this.props.navigation.replace('MainTabs');
        }
    }

    render() {
        const { navigation } = this.props;
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <TouchableNativeFeedback>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Akun</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('EditProfile', {token: navigation.state.params.token})}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Perbarui Profil</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('SettingResetPassword', {token: navigation.state.params.token})}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Kata Sandi</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('EditRekening', {token: navigation.state.params.token})}>
                        <View style={[styles.listMenu, {borderBottomWidth: 1, borderBottomColor: '#eaeaea'}]}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Rekening Bank</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Notifikasi</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('SettingNotifications')}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Notifikasi Otomatis</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('SettingNotifications')}>
                        <View style={[styles.listMenu, {borderBottomWidth: 1, borderBottomColor: '#eaeaea'}]}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Notifikasi Email dan SMS</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Undang</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Undang Kontak</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={[styles.listMenu, {borderBottomWidth: 1, borderBottomColor: '#eaeaea'}]}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Undang Teman</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.logOut()}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{marginLeft: 10, fontSize: 16}}>Keluar</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Halal Beef Indonesia 2019</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Settings);

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    },
    listMenu: {
        height: 55,
        padding: 6,
        backgroundColor: 'white'
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
