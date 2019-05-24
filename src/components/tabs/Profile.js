import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, AsyncStorage, Alert, TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../basic/supportFunction';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            isVisible: false
        };
    };

    render() {
        const { userData, navigation } = this.props;
        return(
            <ScrollView style={{flex:1}}>
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                    {
                        userData.data.banner === '' || userData.data.banner === undefined
                        ?
                        <LinearGradient
                            colors={['transparent', 'black']}
                            style={{height: 170}}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 2}}
                            >
                        </LinearGradient>
                        :
                        <View>
                            <Image
                                source={{uri: `${SERVER_URL}images/dummy/${userData.data.banner}`}}
                                style={styles.bannerStyle}
                                >
                            </Image>
                            <LinearGradient
                                colors={['transparent', 'black']}
                                style={{height: 170}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 2}}
                                >
                            </LinearGradient>
                        </View>
                    }
                </View>
                <View style={styles.headerContainer}>
                    <Image
                        source={{uri: `${SERVER_URL}images/dummy/${userData.data.photo}`}}
                        style={{height: 70, width: 70, borderRadius: 35, borderWidth: 2, borderColor: 'white', marginTop: 25}}>
                    </Image>
                    <View style={{marginLeft: 12, marginTop: 26}}>
                        <Text style={{color: 'white', fontSize: 17}}>{userData.data.name}</Text>
                        <Text style={{color: '#e2e2e2', fontSize: 12}}>Bergabung sejak {userData.data.join}</Text>
                    </View>
                </View>
                {/*LIST MENU*/}
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('MyProfile', {token: this.state.token})}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Icon name='face' />
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Profil Saya</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('MyRekening')}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Icon name='account-balance' />
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Rekening Bank</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.setState({isVisible: !this.state.isVisible})}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Icon name='compare-arrows' />
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Transaksi</Text>
                                <View style={{position: 'absolute', right: 10, top: 10}}>
                                    <Icon name={this.state.isVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    {
                        this.state.isVisible &&
                        <View>
                            <TouchableNativeFeedback onPress={() => navigation.navigate('MyTransaction', {token: this.state.token})}>
                                <View style={styles.listMenu}>
                                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                                        <Text style={[styles.menuTitle, {marginLeft: 30}]}>Transaksi Saya</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionRecords', {token: this.state.token})}>
                                <View style={styles.listMenu}>
                                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                                        <Text style={[styles.menuTitle, {marginLeft: 30}]}>Riwayat Transaksi</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    }
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Settings', {token: this.state.token})}>
                        <View style={styles.listMenu}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Icon name='settings' />
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Pengaturan</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
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
    headerMenu: {
        height: 50,
        paddingTop: 15,
        paddingLeft: 8,
        backgroundColor: '#bfbfbf',
        marginTop: 10
    },
    bannerStyle: {
        height: 170,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 100,
        marginLeft: 20
    }
});

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Profile);
