import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Input, Item } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { changePassword, resetChangePassword } from '../../actions/Change_Password';
import Modal from 'react-native-modal';
import { DotIndicator } from 'react-native-indicators';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: '',
            repeatNewPassword: '',
            newPasswordSecure: true,
            repeatNewPasswordSecure: true,
            confirmationCode: '',
            isPasswordMatch: true,
            loading: false,
            success: false,
            error: false
        }
    };

    _submitForm = () => {
        this.props.dispatch(resetChangePassword())
        if (this.state.newPassword === this.state.repeatNewPassword) {
            this.setState({loading: true})
            const data = {
                email: this.props.navigation.state.params.email,
                newPassword: this.state.newPassword,
                confirmationCode: this.state.confirmationCode
            };
            this.props.dispatch(changePassword(data))
        }else{
            this.setState({isPasswordMatch: false})
        }
    };

    _passwordNotMatch = () => {
        return(
            <View style={styles.failedMessageContainer}>
                <Text style={styles.failedMessageText}>Password tidak cocok</Text>
            </View>
        )
    };

    _statusCodeInvalid = () => {
        return(
            <View style={styles.failedMessageContainer}>
                <Text style={styles.failedMessageText}>
                    {
                        this.props.forgetPassword.changePassword.statusCode === 406
                        ? 'Kode keamanan tidak cocok, silahkan kembali kehalaman sebelumnya untuk mengirim ulang'
                        : 'Permintaan Anda tidak dapat kami proses'
                    }
                </Text>
            </View>
        )
    };

    _infoMessage = () => {
        return(
            <View style={styles.infoMessageContainer}>
                <Text style={styles.infoMessageText}>Silahkan periksa email Anda untuk mengisi bagian kode konfirmasi</Text>
            </View>
        )
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.forgetPassword.changePassword.success !== this.props.forgetPassword.changePassword.success) {
            this.setState({loading: false, success: true, error: false});
            this.props.navigation.replace('Login', {changePasswordSuccess: true});
        };

        if (prevProps.forgetPassword.changePassword.error !== this.props.forgetPassword.changePassword.error) {
            this.setState({loading: false, success: false, error: true});
        };
    };

    render() {
        return(
            <View style={styles.container}>
                {!this.state.isPasswordMatch && this._passwordNotMatch()}
                {this.state.error && this._statusCodeInvalid()}
                {!this.state.error && this._infoMessage()}
                <Modal
                    isVisible={this.state.loading}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    <View style={styles.modalContainer}>
                        <Text style={styles.pleaseWait}>Mohon Tunggu</Text>
                        <DotIndicator
                            color='#7c0c10'
                            size={8}
                            />
                    </View>
                </Modal>
                <Text style={styles.titleText}>Masukan Password Baru</Text>
                    <View
                        style={styles.inputWidth}
                        >
                        <Item regular>
                            <Input
                                placeholder='Password'
                                placeholderTextColor='#919191'
                                secureTextEntry={this.state.newPasswordSecure}
                                style={[styles.defaultInput]}
                                onChangeText={(x) => this.setState({newPassword: x})}
                                />
                            <TouchableOpacity style={{position: 'absolute', right: 5}}>
                                {
                                    this.state.newPasswordSecure
                                    ? <Icon onPress={() => this.setState({newPasswordSecure: false})} name='visibility' color='#919191' size={20}/>
                                    : <Icon onPress={() => this.setState({newPasswordSecure: true})} name='visibility-off' color='#919191' size={20}/>
                                }
                            </TouchableOpacity>
                        </Item>
                    </View>
                    <View
                        style={styles.inputWidth}
                        >
                        <Item regular>
                            <Input
                                placeholder='Ulangi Password'
                                placeholderTextColor='#919191'
                                secureTextEntry={this.state.repeatNewPasswordSecure}
                                style={[styles.defaultInput, {marginTop: 5}]}
                                onChangeText={(x) => this.setState({repeatNewPassword: x})}
                                />
                            <TouchableOpacity style={{position: 'absolute', right: 5}}>
                                {
                                    this.state.repeatNewPasswordSecure
                                    ? <Icon onPress={() => this.setState({repeatNewPasswordSecure: false})} name='visibility' color='#919191' size={20}/>
                                    : <Icon onPress={() => this.setState({repeatNewPasswordSecure: true})} name='visibility-off' color='#919191' size={20}/>
                                }
                            </TouchableOpacity>
                        </Item>
                    </View>
                    <View
                        style={styles.inputWidth}
                        >
                        <Item regular>
                            <Input
                                placeholder='Kode Konfirmasi'
                                placeholderTextColor='#919191'
                                style={[styles.defaultInput, {marginTop: 5}]}
                                onChangeText={(x) => this.setState({confirmationCode: x})}
                                />
                        </Item>
                    </View>
                <TouchableOpacity style={styles.sendButton} onPress={this._submitForm}>
                    <Text style={styles.buttonText}>Ganti Password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(ChangePassword);

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
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    failedMessageText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
    infoMessageContainer: {
        backgroundColor: '#fffa9b',
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
        color: '#a39b00',
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
    modalContainer: {
        backgroundColor: 'white',
        width: 130,
        height: 90,
        borderRadius: 3,
        alignItems: 'center'
    },
    pleaseWait: {
        fontWeight: 'bold',
        top: 15,
        marginTop: 5
    }
})
