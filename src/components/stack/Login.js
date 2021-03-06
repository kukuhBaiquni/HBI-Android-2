import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, AsyncStorage, Alert, Dimensions, Image } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import { submitFormLogin, resetTokenState } from '../../actions/Login_Attempt';
import { forceResetAV } from '../../actions/Account_Verification';
import Modal from "react-native-modal";
import validator from 'validator';
import { DotIndicator } from 'react-native-indicators';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { checkEmail } from '../../actions/Check_Email';
import { BACKDARKRED } from '../../images';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { MODAL } from '../basic/template/loading';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class Login extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Login',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            secure: true,
            visibility: 0,
            emailHandler: '',
            passwordHandler: '',
            isFormEmpty: false,
            loading: false,
            isLoginError: false,
            oauthData: {},
            error: ''
        }
    };

    emailCheck() {
        setTimeout( async () => {
            const data = await AsyncStorage.getItem('facebook_data')
            if (data !== null) {
                const raw = JSON.parse(data);
                this.setState({oauthData: raw});
                const email = raw.email;
                this.props.dispatch(checkEmail(email));
            }else{
                Alert.alert(
                    'Login gagal',
                    'Login dibatalkan oleh pengguna',
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            }
        }, 500)
    };

    showFlashMessage() {
        if (this.props.status.account_verification.success) {
            showMessage({
                message: 'Sukses',
                description: this.props.status.account_verification.message,
                type: 'default',
                backgroundColor: '#a8ffb5',
                color: '#00630e'
            })
        }
    };

    submitForm() {
        let email = this.state.emailHandler;
        let password = this.state.passwordHandler;
        let data = {
            email, password
        };
        if (email.length > 0 && password.length > 0) {
            this.setState({loading: true, isFormEmpty: false})
            this.props.dispatch(submitFormLogin(data));
        }else{
            this.setState({isFormEmpty: true});
        }
    };

    componentDidUpdate(prevProps, prevState) {
        let data = this.state.oauthData;
        const { dispatch, token, navigation } = this.props;
        if (this.props.status.isEmailFree) {
            Alert.alert(
                'Login gagal',
                'Akun tidak terdaftar, daftar sekarang?',
                [
                    {text: 'OK', onPress: () => navigation.replace('Register', data)}
                ],
                { cancelable: false }
            );
        }
        if (token.error !== prevProps.token.error) {
            if (token.error) {
                if (this.state.loading) {
                    this.setState({loading: false, isLoginError: true});
                    dispatch(resetTokenState());
                }
            }
        }else{
            if (prevProps.token.success !== token.success) {
                const token = this.props.token.type;
                this.storeToken(token);
                dispatch(resetTokenState());
                // if (this.props.token.success) {
                //     if (this.state.loading) {
                //         const token = this.props.token.type;
                //         this.setState({loading: false, isLoginError: false});
                //         this.storeToken(token);
                //     }
                // }
            }
        }
    };

    storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
            this.props.dispatch(forceResetAV());
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MainTabs' })], 0);
        } catch (error) {
            Alert.alert(
                'Kesalahan',
                'Permintaan anda tidak dapat di proses',
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
            this.props.dispatch(forceResetAV());
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'MainTabs' })], 0)
        }
    };

    cleanStorage = async () => {
        try {
            await AsyncStorage.removeItem('facebook_data');
        }catch (error) {
            Alert.alert(
                'Kesalahan',
                'Permintaan anda tidak dapat di proses',
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
        }
    };

    _infoMessageFromChangePassword = () => {
        return(
            <View style={styles.infoMessageContainer}>
                <Text style={styles.infoMessageText}>Password Anda berhasil diubah, silahkan login untuk melanjutkan.</Text>
            </View>
        )
    };

    render() {
        const { navigation, status } = this.props;
        return(
            <ScrollView>
                {
                    this.props.navigation.state.params !== undefined &&
                    this._infoMessageFromChangePassword()
                }
                <NavigationEvents
                    onWillFocus={() => this.cleanStorage()}
                    onDidFocus={() => this.showFlashMessage()}
                    />
                <MODAL isVisible={this.state.loading} message='Mohon Tunggu' />
                <View style={{alignItems: 'center', marginTop: 100}}>
                    {this.state.isLoginError && <Text style={{color: 'red', width: 280, textAlign: 'center', fontSize: 12}}>{this.props.status.login.message}</Text>}
                    <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
                        {this.state.isFormEmpty && <Text style={{fontSize: 12, color: 'red', marginLeft: -105, paddingBottom: 5}}>*Form tidak boleh kosong</Text>}
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            delay={100}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Item regular>
                                <Input
                                    placeholder='Email'
                                    placeholderTextColor='#919191'
                                    underlineColorAndroid='transparent'
                                    keyboardType='email-address'
                                    style={[styles.defaultInput]}
                                    onChangeText={(x) => this.setState({emailHandler: x})}
                                    />
                            </Item>
                        </Animatable.View>
                        <View style={{height: 3}}></View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            delay={200}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Item regular>
                                <Input
                                    placeholder='Password'
                                    placeholderTextColor='#919191'
                                    secureTextEntry={this.state.secure}
                                    style={[styles.defaultInput]}
                                    onChangeText={(x) => this.setState({passwordHandler: x})}
                                    />
                                <TouchableOpacity style={{position: 'absolute', right: 5}}>
                                    {
                                        this.state.secure
                                        ? <Icon onPress={() => this.setState({secure: false})} name='visibility' color='#919191' size={20}/>
                                        : <Icon onPress={() => this.setState({secure: true})} name='visibility-off' color='#919191' size={20}/>
                                    }
                                </TouchableOpacity>
                            </Item>
                        </Animatable.View>
                        <View style={{height: 3}}></View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInRight'
                            delay={400}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#7c0c10' }]} onPress={() => this.submitForm()}>
                                <Text style={styles.socialText}>Masuk</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Text>{this.state.error}</Text>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeIn'
                            delay={500}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Divider />
                        </Animatable.View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInLeft'
                            delay={600}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#3b5998' }]}>
                                <SocialIcon
                                    type='facebook'
                                    raised={false}
                                    style={styles.iconInButton}
                                    />
                                <Text style={styles.socialText}>Masuk dengan Facebook</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInRight'
                            delay={600}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4242' }]}>
                                <SocialIcon
                                    type='google'
                                    raised={false}
                                    style={styles.iconInButton}
                                    />
                                <Text style={styles.socialText}>Masuk dengan Google</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='flipInX'
                            delay={700}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Text style={styles.registerHere}>Belum punya akun? <Text onPress={() => navigation.replace('Register')} style={{color: '#7c0c10'}}>Daftar disini</Text></Text>
                            <Text style={styles.registerHere}>Lupa password? <Text onPress={() => navigation.navigate('ForgetPassword')} style={{color: '#7c0c10'}}>Tap disini</Text></Text>
                        </Animatable.View>
                    </View>
                </View>
                <FlashMessage
                    position='top'
                    autoHide={false}
                    floating={true}
                    ref='log'
                    icon={{icon: 'success', position: 'left'}}
                    />
            </ScrollView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
    defaultInput: {
        backgroundColor: 'white',
        height: 35,
        borderRadius: 3,
        fontSize: 12,
        borderWidth: 0
    },
    button: {
        height: 40,
        width: 256,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 3
    },
    iconInButton: {
        height: 28,
        width: 28,
        borderRadius: 0,
        position: 'absolute',
        left: 6
    },
    registerHere: {
        marginTop: 15,
        color: '#919191'
    },
    socialText: {
        color: 'white',
        fontWeight: 'bold'
    },
    infoMessageContainer: {
        backgroundColor: '#aaffa3',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: SCREEN_WIDTH,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoMessageText: {
        color: 'green',
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
})
