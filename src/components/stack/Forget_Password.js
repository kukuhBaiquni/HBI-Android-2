import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Input, Item } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { DotIndicator } from 'react-native-indicators';
import { sendEmail, resetSendEmailState } from '../../actions/Forget_Password_Send_Email';
import validator from 'validator';
import { BACKDARKRED } from '../../images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class ForgetPassword extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Lupa Password',
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
            emailHandler: '',
            isEmailValid: true,
            loading: false,
            emailNotFound: false
        };
    };

    sendEmail = () => {
        this.props.dispatch(resetSendEmailState());
        const email = this.state.emailHandler;
        if (validator.isEmail(email)) {
            this.setState({isEmailValid: true, loading: true});
            this.props.dispatch(sendEmail(this.state.emailHandler));
        }else{
            this.setState({isEmailValid: false});
        }
    };

    _showErrorEmailNotFound = () => {
        const { sendEmail } = this.props.forgetPassword;
        return(
            <View style={styles.failedMessageContainer}>
                <Text style={styles.failedMessageText}>{sendEmail.statusCode === 404 ? 'Email yang Anda masukan tidak terdaftar.' : 'Permintaan Anda tidak dapat diproses, coba beberapa saat lagi'}</Text>
            </View>
        )
    };

    _invalidEmail = () => {
        return(
            <View style={styles.failedMessageContainer}>
                <Text style={styles.failedMessageText}>Email yang Anda masukan tidak valid.</Text>
            </View>
        )
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.forgetPassword.sendEmail.success !== this.props.forgetPassword.sendEmail.success) {
            this.setState({loading: false, emailNotFound: false});
            this.props.navigation.navigate('ChangePassword', {email: this.state.emailHandler});
            this.props.dispatch(resetSendEmailState());
        };
        if (prevProps.forgetPassword.sendEmail.error !== this.props.forgetPassword.sendEmail.error) {
            this.setState({loading: false, emailNotFound: true});
        };
    };

    render() {
        return(
            <View style={styles.container}>
                {this.state.emailNotFound && this._showErrorEmailNotFound()}
                {!this.state.isEmailValid && this._invalidEmail()}
                <Modal
                    isVisible={this.state.loading}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
                        <DotIndicator
                            color='#7c0c10'
                            size={8}
                            />
                    </View>
                </Modal>
                <Text style={styles.titleText}>Masukan Email Anda</Text>
                <View
                    style={styles.inputWidth}
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
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={this.sendEmail}>
                    <Text style={styles.buttonText}>Kirim Kode Konfirmasi</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(ForgetPassword);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    defaultInput: {
        backgroundColor: 'white',
        height: 35,
        borderRadius: 3,
        fontSize: 12
    },
    inputWidth: {
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center'
    },
    titleText: {
        marginBottom: 10,
        color: '#7c0c10'
    },
    sendButton: {
        width: SCREEN_WIDTH * 0.89,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7c0c10',
        borderRadius: 3,
        height: 40,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
    },
    failedMessageContainer: {
        backgroundColor: '#ff9b9b',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: SCREEN_WIDTH,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    failedMessageText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    }
});
