import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, AsyncStorage, Alert, Image } from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { Icon, SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Divider from '../Divider';
import validator from 'validator';
import { submitFormRegister, registerFailedPrototype } from '../../actions/Register';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { NavigationActions, NavigationEvents } from 'react-navigation';
import { facebookRegister } from '../../actions/Facebook_Register';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { MODAL } from '../basic/template/loading';
import { checkEmail, forceResetCE } from '../../actions/Check_Email';
import { resetToken } from '../../actions/Login_Attempt';

const INPUT = {
    a: 'nameHandler',
    b: 'emailHandler',
    c: 'passwordHandler',
    d: 'passwordHandler2'
};

class Register extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Register',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            secure: true,
            secure2: true,
            loading: false,

            nameHandler: '',
            emailHandler: '',
            passwordHandler: '',
            passwordHandler2: '',

            isNameValid: true,
            isEmailValid: true,
            isPasswordValid: true,
            isPasswordMatch: true,

            isFormValid: false,
        }
    };

    _inputField(value, key) {
        this.setState({ [key]: value });
    };

    _submitForm = () => {
        const { nameHandler, emailHandler, passwordHandler, passwordHandler2 } = this.state;
        if (nameHandler.length === 0) {
            this.setState({ isNameValid: false });
            if (validator.isEmail(emailHandler)) this.setState({isEmailValid: true});
            if (passwordHandler.length > 0) this.setState({isPasswordValid: true});
            if (passwordHandler === passwordHandler2) this.setState({isPasswordMatch: true});
        }else if (!validator.isEmail(emailHandler)) {
            this.setState({ isEmailValid: false });
            if (nameHandler.length > 0) this.setState({isNameValid: true});
            if (passwordHandler.length > 0) this.setState({isPasswordValid: true});
            if (passwordHandler === passwordHandler2) this.setState({isPasswordMatch: true});
        }else if (passwordHandler.length < 8) {
            this.setState({ isPasswordValid: false });
            if (validator.isEmail(emailHandler)) this.setState({isEmailValid: true});
            if (nameHandler.length > 0) this.setState({isNameValid: true});
            if (passwordHandler === passwordHandler2) this.setState({isPasswordMatch: true});
        }else{
            this.setState({ isNameValid: true, isEmailValid: true, isPasswordValid: true});
            if (passwordHandler === passwordHandler2) {
                this.setState({ isPasswordMatch: true });
                const data = {
                    personalIdentity: {
                        name: this.state.nameHandler,
                        email: this.state.emailHandler,
                        password: this.state.passwordHandler
                    }
                };
                this.props.dispatch(submitFormRegister(data));
            }else{
                this.setState({ isPasswordMatch: false });
            }
        }

    };

    // nameHandler(x) {
    //     this.setState({nameHandler: x})
    //     if (x.length > 1) {
    //         this.setState({isNameValid: true})
    //     }else{
    //         this.setState({isNameValid: false})
    //     }
    // };
    //
    // emailHandler(x) {
    //     this.setState({emailHandler: x})
    //     if (validator.isEmail(x)) {
    //         this.setState({isEmailValid: true})
    //     }else{
    //         this.setState({isEmailValid: false})
    //     }
    // };
    //
    // passwordHandler(x) {
    //     this.setState({passwordHandler: x})
    //     if (x.length > 5) {
    //         this.setState({isPasswordValid: true})
    //     }else{
    //         this.setState({isPasswordValid: false})
    //     }
    // };
    //
    // passwordHandler2(x) {
    //     this.setState({passwordHandler2: x})
    //     if (this.state.passwordHandler === x) {
    //         this.setState({isPasswordMatch: true})
    //     }else{
    //         this.setState({isPasswordMatch: false})
    //     }
    // };
    //
    // nameBlur() {
    //     const name = this.state.nameHandler;
    //     if (name.length < 2) {
    //         this.setState({isNameValid: false})
    //     }else{
    //         this.setState({isNameValid: true})
    //     }
    // };
    //
    // emailBlur() {
    //     const email = this.state.emailHandler;
    //     if (!validator.isEmail(email)) {
    //         this.setState({isEmailValid: false})
    //     }else{
    //         this.setState({isEmailValid: true})
    //     }
    // };
    //
    // passwordBlur() {
    //     const password = this.state.passwordHandler;
    //     if (password.length > 5) {
    //         this.setState({isPasswordValid: true})
    //     }else{
    //         this.setState({isPasswordValid: false})
    //     }
    // };
    //
    // passwordBlur2() {
    //     const password = this.state.passwordHandler;
    //     const password2 = this.state.passwordHandler2;
    //     if (password !== password2) {
    //         this.setState({isPasswordMatch: false})
    //     }else{
    //         this.setState({isPasswordMatch: true})
    //     }
    // };
    //
    // submitForm() {
    //     const { isNameValid, isEmailValid, isPasswordValid, isPasswordMatch, nameHandler, emailHandler, passwordHandler, passwordHandler2 } = this.state;
    //     if (nameHandler.length !== 0 && emailHandler.length !== 0 && passwordHandler.length !== 0 && passwordHandler2.length !== 0) {
    //         if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    //             const data = {
    //                 name: nameHandler,
    //                 email: emailHandler,
    //                 password: passwordHandler
    //             }
    //             if(this.state.externalData) {
    //                 this.setState({isFormValid: true, isFormEmpty: false, loading: true})
    //                 this.props.dispatch(facebookRegister(data))
    //             }else{
    //                 this.setState({isFormValid: true, isFormEmpty: false, loading: true})
    //                 this.props.dispatch(submitFormRegister(data))
    //             }
    //         }else{
    //             this.setState({isFormValid: false})
    //         }
    //     }else{
    //         this.setState({isFormValid: false, isFormEmpty: true})
    //     }
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.emailHandler === '') {
    //         if (this.state.externalData) {
    //             this.setState({externalData: false})
    //         }
    //     }
    //     if (!this.props.status.isEmailFree) {
    //         const remove = async () => {
    //             try {
    //                 await AsyncStorage.removeItem('facebook_data')
    //             }catch(error) {
    //
    //             }
    //         }
    //         remove()
    //         if (!this.props.status.register.error && this.props.token.length !== 0) {
    //             this.props.dispatch(registerFailedPrototype())
    //         }
    //     }else{
    //         if (this.state.loading) {
    //             this.props.dispatch(forceResetRG())
    //             this.setState({nameHandler: this.state.oauthData.name, emailHandler: this.state.oauthData.email, externalData: true, loading: false})
    //         }
    //     }
    //     if (this.props.status.register.error) {
    //         if (this.state.loading) {
    //             this.setState({loading: false})
    //         }
    //     }else{
    //         if (this.props.status.register.success) {
    //             if (this.state.externalData) {
    //                 const token = this.props.token;
    //                 this.storeToken(token)
    //             }else{
    //                 this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DeepLinkHandler' })], 0)
    //             }
    //         }
    //     }
    // };
    //
    // storeToken = async (token) => {
    //     try {
    //         await AsyncStorage.setItem('access_token', JSON.stringify(token))
    //         this.props.navigation.popToTop()
    //     } catch (error) {
    //         Alert.alert(
    //             'Kesalahan',
    //             'Permintaan anda tidak dapat di proses',
    //             [
    //                 {text: 'OK'}
    //             ],
    //             { cancelable: false }
    //         );
    //         this.props.navigation.popToTop()
    //     }
    // };
    //
    // checkAsync = async () => {
    //     try {
    //         const raw = await AsyncStorage.getItem('facebook_data');
    //         if (raw !== null) {
    //             const data = JSON.parse(raw);
    //             this.setState({externalData: true, nameHandler: data.name, emailHandler: data.email})
    //         }
    //     }catch(error) {
    //         Alert.alert(
    //             'Kesalahan',
    //             'Permintaan anda tidak dapat diproses',
    //             [
    //                 {text: 'OK'}
    //             ],
    //             { cancelable: false }
    //         );
    //     }
    // };
    //
    // checkParams() {
    //     var data = this.props.navigation.state.params;
    //     this.props.dispatch(resetToken())
    //     if (data !== undefined) {
    //         this.setState({externalData: true, nameHandler: data.name, emailHandler: data.email})
    //     }
    // };
    //
    // emailCheck() {
    //     setTimeout( async () => {
    //         const data = await AsyncStorage.getItem('facebook_data')
    //         if (data !== null) {
    //             const raw = JSON.parse(data);
    //             const email = raw.email;
    //             this.setState({oauthData: raw, loading: true})
    //             this.props.dispatch(checkEmail(email));
    //             GoogleSignIn.signOut()
    //         }else{
    //             Alert.alert(
    //                 'Login gagal',
    //                 'Login dibatalkan oleh pengguna',
    //                 [
    //                     {text: 'OK'}
    //                 ],
    //                 { cancelable: false }
    //             );
    //         }
    //     }, 500)
    // };
    //
    // resetCEAndGoToLogin() {
    //     this.props.dispatch(forceResetCE())
    //     this.props.navigation.replace('Login')
    // };

    render() {
        const { isNameValid, isEmailValid, isPasswordValid, isPasswordMatch, isFormEmpty } = this.state;
        const { navigation } = this.props;
        return(
            <ScrollView>
                <MODAL isVisible={this.state.loading} message='Mohon Tunggu' />
                <View style={{alignItems: 'center', marginTop: 50}}>
                    {this.props.status.register.error && <Text style={{fontSize: 12, color: 'red'}}>{this.props.status.register.message}</Text>}
                    <View style={{width: 260, alignItems: 'center', marginTop: 10}}>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Item regular style={{borderColor: 'transparent'}}>
                                <Input
                                    placeholder='Nama'
                                    maxLength={30}
                                    placeholderTextColor='#919191'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(x) => this._inputField(x, 'nameHandler')}
                                    defaultValue={this.state.nameHandler}
                                    style={styles.defaultInput}
                                    />
                            </Item>
                        </Animatable.View>
                        {!isNameValid && <Text style={{fontSize: 12, color: 'red', marginLeft: -105, paddingBottom: 5, textAlign: 'left'}}>*Nama tidak boleh kosong</Text>}
                        <View style={{height: 7}}></View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Item regular style={{borderColor: 'transparent'}}>
                                <Input
                                    placeholder='Email'
                                    maxLength={30}
                                    placeholderTextColor='#919191'
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(x) => this._inputField(x, 'emailHandler')}
                                    defaultValue={this.state.emailHandler}
                                    style={styles.defaultInput}
                                    />
                            </Item>
                        </Animatable.View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            delay={100}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                        </Animatable.View>
                        {!isEmailValid && <Text style={{fontSize: 12, color: 'red', marginLeft: -150, paddingBottom: 5, textAlign: 'left'}}>*Email tidak valid</Text>}
                        <View style={{height: 7}}></View>
                        <Animatable.View
                            style={{width: 260, alignItems: 'center'}}
                            animation='fadeInDown'
                            delay={200}
                            useNativeDriver
                            duration={500}
                            iterationCount={1}
                            >
                            <Item regular style={{borderColor: 'transparent'}}>
                                <Input
                                    placeholder='Password'
                                    placeholderTextColor='#919191'
                                    secureTextEntry={this.state.secure}
                                    maxLength={20}
                                    onChangeText={(x) => this._inputField(x, 'passwordHandler')}
                                    style={[styles.defaultInput]}
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
                    {!isPasswordValid && <Text style={{fontSize: 12, color: 'red', marginLeft: 8, paddingBottom: 5, textAlign: 'left'}}>*Password minimal 8 karakter, maksimal 20 karakter</Text>}
                    <View style={{height: 7}}></View>
                    <Animatable.View
                        style={{width: 260, alignItems: 'center'}}
                        animation='fadeInDown'
                        delay={300}
                        useNativeDriver
                        duration={500}
                        iterationCount={1}
                        >
                        <Item regular style={{borderColor: 'transparent'}}>
                            <Input
                                placeholder='Ulangi Password'
                                placeholderTextColor='#919191'
                                maxLength={20}
                                secureTextEntry={this.state.secure2}
                                onChangeText={(x) => this._inputField(x, 'passwordHandler2')}
                                style={[styles.defaultInput]}
                                />
                            <TouchableOpacity style={{position: 'absolute', right: 5}}>
                                {
                                    this.state.secure2
                                    ? <Icon onPress={() => this.setState({secure2: false})} name='visibility' color='#919191' size={20}/>
                                    : <Icon onPress={() => this.setState({secure2: true})} name='visibility-off' color='#919191' size={20}/>
                                }
                            </TouchableOpacity>
                        </Item>
                    </Animatable.View>
                    {!isPasswordMatch && <Text style={{fontSize: 12, color: 'red', marginLeft: -120, paddingBottom: 5, textAlign: 'left'}}>*Password belum sesuai</Text>}
                    <Animatable.View
                        style={{width: 260, alignItems: 'center'}}
                        animation='fadeInRight'
                        delay={350}
                        useNativeDriver
                        duration={500}
                        iterationCount={1}
                        >
                        <TouchableOpacity onPress={this._submitForm} style={[styles.button, { backgroundColor: COLORS.PRIMARY }]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Daftar</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View
                        style={{width: 260, alignItems: 'center'}}
                        animation='zoomIn'
                        delay={350}
                        useNativeDriver
                        duration={500}
                        iterationCount={1}
                        >
                    </Animatable.View>
                    <Animatable.View
                        style={{width: 260, alignItems: 'center'}}
                        animation='flipInX'
                        delay={400}
                        useNativeDriver
                        duration={500}
                        iterationCount={1}
                        >
                        <Text style={{marginTop: 15, color: '#919191', marginBottom: 20}}>Sudah punya akun? <Text onPress={() => this.resetCEAndGoToLogin()} style={{color: COLORS.PRIMARY}}>Login disini</Text></Text>
                    </Animatable.View>
                </View>
            </View>
            </ScrollView>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Register);

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
    }
});
