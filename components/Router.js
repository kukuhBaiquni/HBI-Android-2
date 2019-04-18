import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, AsyncStorage, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchAutocomplete from './stack/Search_Autocomplete';
import Example from './Static_Example';
import ShopPage from './tabs/Shop_Page';
import ProductDetails from './stack/Product_Details';
import Mail from './tabs/Mail';
import Cart from './stack/Cart';
import Profile from './tabs/Profile';
import ProfilePrevention from './stack/Profile_Prevention';
import Login from './stack/Login';
import Register from './stack/Register';
import DeepLinkHandler from './stack/Deep_Link_Handler';
import AfterDeeplink from './stack/After_Deeplink';
import Payment from './stack/Payment';
import EditAddress from './stack/Edit_Address';
import EditAddressDP from './stack/Edit_Address_DP';
import DirectPayment from './stack/Direct_Payment';
import Suggestion from './drawer/Suggestion';
import EditProfile from './stack/Edit_Profile';
import MyProfile from './stack/My_Profile';
import EditRekening from './stack/Edit_Rekening';
import MyRekening from './stack/My_Rekening';
import TransactionRecords from './stack/Transaction_Records';
import TransactionDetails from './stack/Transaction_Details';
import Timeline from './tabs/Timeline';
import Splash from './Splash_Screen';
import About from './drawer/About';
import Member from './drawer/Member';
import Business from './drawer/Business';
import CallUs from './drawer/CallUs';
import Faq from './stack/Faq';
import MyActiveTransaction from './stack/My_Active_Transaction';
import Tracking from './stack/Tracking';
import TransactionList from './stack/Transaction_List';
import Settings from './stack/Settings';
import SettingNotifications from './stack/Setting_Notifications';
import SettingResetPassword from './stack/Setting_Reset_Password';
import ListContent from './stack/List_Content';
import ContentDetails from './stack/Content_Details';
import NotificationDetails from './stack/Notification_Details';
import ListNotifications from './stack/List_Notifications';
import AskQuestion from './drawer/AskQuestion';
import Excellence from './drawer/Excellence';
import Join from './drawer/Join';
import Profit from './drawer/Profit';
import Animate from './stack/Animate';
import ListMarket from './stack/List_Market';
import ForgetPassword from './stack/Forget_Password';
import ChangePassword from './stack/Change_Password';
import { SERVER_URL } from '../config';
import BadgeNotification from './Badge_Notification';
import { connect } from 'react-redux';

const BDR = '../android/app/src/main/assets/custom/BackDarkred.png';
const CDR = '../android/app/src/main/assets/custom/CancelDarkred.png';
const YDR = '../android/app/src/main/assets/custom/CeklisDarkred.png';
const DDR = '../android/app/src/main/assets/custom/DrawerDarkred.png';
const rectangle = {height: 19, width: 19};
const xrectangle = {height: 16, width: 16};

class Names extends Component {
    render() {
        return(
            <View>
                {
                    this.props.userData.name === ''
                    ?
                    <View style={{paddingLeft: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Image style={{height: 50, width: 50, borderRadius: 30}} source={require('../android/app/src/main/assets/custom/drawerdefault.png')} />
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 17, marginTop: 5}}>Selamat Datang!</Text>
                        <View>
                            <Text style={{color: 'white', fontSize: 14}}>Buat akun Anda atau login disini</Text>
                            <TouchableOpacity style={{position: 'absolute', right: 20, top: 3}} onPress={() => this.props.navigation.navigate('Login')}>
                                <Image resizeMode='contain' style={{width: 13, height: 13, opacity: 0.5}} source={require('../android/app/src/main/assets/custom/Beranda/NextGrey.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{paddingLeft: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image style={{height: 50, width: 50, borderRadius: 30}} source={{uri: `${SERVER_URL}/images/dummy/${this.props.userData.photo}`}} />
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 17, marginTop: 5}}>Selamat Datang!</Text>
                        <Text style={{color: 'white', fontSize: 15}}>{this.props.userData.name}</Text>
                    </View>
                }
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
}

const UserData = connect(mapDispatchToProps)(Names)

const DrawerComponent = (props) => (
    <ScrollView style={{flex: 1, color: '#a3a3a3'}}>
        <SafeAreaView>
            <View style={{height: 130, backgroundColor: '#7c0c10', padding: 10, paddingTop: 20}}>
                <UserData {...props} />
            </View>
            <DrawerItems {...props} />
            <View style={{height: 1, backgroundColor: '#e2e2e2'}} />
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.customToShop} onPress={() => props.navigation.navigate('Shopping')}>
                    <Text style={{color: 'white'}}>Mulai Belanja Disini</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 10, paddingLeft: 20, height: 160, width: '100%'}}>
                <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 0})}>FAQ</Text>
                <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 1})}>Kebijakan Privasi</Text>
                <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 2})}>Syarat & Ketentuan</Text>
                <View style={{position: 'absolute', bottom: -5, alignItems: 'center', width: '100%', }}>
                    <Text style={{marginBottom: 10, fontSize: 12, color: '#7c0c10'}}>App Version 1.04</Text>
                </View>
            </View>
        </SafeAreaView>
    </ScrollView>
)

const Drawer = createDrawerNavigator({
    Member:{
        screen: Member,
        navigationOptions: {
            drawerIcon: ({tintColor}) => <Icon name='people' size={24} color={tintColor} />
        }
    },
    Business:{
        screen: Business,
        navigationOptions: {
            title: 'Bisnis',
            drawerIcon: ({tintColor}) => <Icon name='business-center' size={24} color={tintColor} />
        }
    },
    About:{
        screen: About,
        navigationOptions: {
            title: 'Tentang Kami',
            drawerIcon: ({tintColor}) => <Icon name='contacts' size={24} color={tintColor} />
        }
    },
    CallUs:{
        screen: CallUs,
        navigationOptions: {
            title: 'Hubungi Kami',
            drawerIcon: ({tintColor}) => <Icon name='phone' size={24} color={tintColor} />
        }
    },
    Suggestion:{
        screen: Suggestion,
        navigationOptions: {
            title: 'Kirim saran kepada Kami',
            drawerIcon: ({tintColor}) => <Icon name='textsms' size={24} color={tintColor} />
        }
    }
}, {
    contentComponent: DrawerComponent,
    contentOptions: {
        activeTintColor: '#7c0c10'
    }
})


const Tabs = createMaterialTopTabNavigator({
    Home: {
        screen: Drawer,
        navigationOptions: {
            title: 'Beranda',
            tabBarIcon: ({tintColor}) => <Image style={{height: 20, width: 20}} source={require('../android/app/src/main/assets/custom/Tab/Beranda.png')} />,
            tabBarOnPress: (x) => {x.navigation.navigate('FirstPage')}
        }
    },
    Timeline: {
        screen: Timeline,
        navigationOptions: {
            tabBarLabel: 'Berita',
            tabBarIcon: ({focused}) => (
                focused
                ?
                <Image source={require('../android/app/src/main/assets/custom/Tab/BeritaC.png')} style={{height: 20, width: 20}} />
                :
                <Image source={require('../android/app/src/main/assets/custom/Tab/Berita.png')} style={{height: 20, width: 20}} />
            )
        }
    },
    Shopping: {
        screen: ListMarket,
        navigationOptions: {
            title: 'Belanja',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> ),
            tabBarIcon: ({focused}) => (
                focused
                ?
                <Image source={require('../android/app/src/main/assets/custom/Tab/BelanjaC.png')} style={{height: 20, width: 20}} />
                :
                <Image source={require('../android/app/src/main/assets/custom/Tab/Belanja.png')} style={{height: 20, width: 20}} />
            )
        }
    },
    Mail: {
        screen: Mail,
        path: 'mail',
        navigationOptions: {
            title: 'Notifikasi',
            tabBarIcon: ({focused}) => (
                focused
                ?
                <View>
                    <BadgeNotification />
                    <Image style={{height: 20, width: 20}} source={require('../android/app/src/main/assets/custom/Tab/NotifikasiC.png')} />
                </View>
                :
                <View>
                    <BadgeNotification />
                    <Image style={{height: 20, width: 20}} source={require('../android/app/src/main/assets/custom/Tab/Notifikasi.png')} />
                </View>
            )
        }
    },
// Mail: {
//   screen: Mail,
//   navigationOptions: {
//     title: 'Notifikasi',
//     tabBarIcon: ({tintColor}) => <Icon name='notifications' size={24} color={tintColor} />
//   }
// },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                focused
                ?
                <Image source={require('../android/app/src/main/assets/custom/Tab/AkunC.png')} style={{height: 20, width: 20}} />
                :
                <Image source={require('../android/app/src/main/assets/custom/Tab/Akun.png')} style={{height: 20, width: 20}} />
            ),
            title: 'Akun',
            tabBarOnPress: async (x) => {
                {
                    try {
                        const val = await AsyncStorage.getItem('access_token');
                        if (val !== null) {
                            x.navigation.navigate('Profile')
                        }else{
                            x.navigation.navigate('ProfilePrevention')
                        }
                    } catch (error) {
                        x.navigation.navigate('ProfilePrevention')
                    }
                }
            }
        }
    }
    },{
        lazy: true,
        initialRouteName: 'Shopping',
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,
            showIcon: true,
            showLabel: true,
            activeTintColor: '#7c0c10',
            inactiveTintColor: '#8c8c8c',
            labelStyle: {
                fontSize: 9,
            },
            tabStyle: {
                backgroundColor: 'white',
            },
            style: {
                height: 58,
                backgroundColor: 'white'
            },
            indicatorStyle: {
                backgroundColor: 'white'
            }
        }
    }
);

const RootStack = createStackNavigator({
    MainTabs: {
        screen: Tabs,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    ProductDetails: {
        screen: ProductDetails,
        navigationOptions: ({navigation}) => ({
            header: null
            // title: `${navigation.state.params.productname}`,
            // headerTintColor: '#7c0c10',
            // headerStyle: {
            //   backgroundColor: 'white',
            //   borderBottomColor: 'black'
            // }
        })
    },
    Cart: {
        screen: Cart,
        navigationOptions: ({navigation}) => ({
            title: 'Keranjang Belanja',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    SearchAutocomplete: {
        screen: SearchAutocomplete,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: 'Login',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({navigation}) => ({
            title: 'Register',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    ProfilePrevention: {
        screen: ProfilePrevention,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    DeepLinkHandler: {
        screen: DeepLinkHandler,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    AfterDeeplink: {
        screen: AfterDeeplink,
        path: 'account_verification/android/:hash',
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    Payment: {
        screen: Payment,
        navigationOptions: ({navigation}) => ({
            title: 'Pembayaran',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    EditAddress: {
        screen: EditAddress,
        navigationOptions: ({navigation}) => ({
            title: 'Ubah Alamat',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    EditAddressDP: {
        screen: EditAddressDP,
        navigationOptions: ({navigation}) => ({
            title: 'Ubah Alamat',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    DirectPayment: {
        screen: DirectPayment,
        navigationOptions: ({navigation}) => ({
            title: 'Pembayaran',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    FirstPage: {
        screen: Drawer,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({navigation}) => ({
            title: 'Perbarui Profil',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    MyProfile: {
        screen: MyProfile,
        navigationOptions: ({navigation}) => ({
            title: 'Profil Saya',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    EditRekening: {
        screen: EditRekening,
        navigationOptions: ({navigation}) => ({
            title: 'Edit Rekening',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    MyRekening: {
        screen: MyRekening,
        navigationOptions: ({navigation}) => ({
            title: 'Rekening Bank',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    TransactionRecords: {
        screen: TransactionRecords,
        navigationOptions: ({navigation}) => ({
            title: 'Riwayat Transaksi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    TransactionDetails: {
        screen: TransactionDetails,
        navigationOptions: ({navigation}) => ({
            title: 'Detail Transaksi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    Faq: {
        screen: Faq,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    MyTransaction: {
        screen: MyActiveTransaction,
        navigationOptions: ({navigation}) => ({
            title: 'Transaksi Saya',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Tracking: {
        screen: Tracking,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    TransactionList: {
        screen: TransactionList,
        navigationOptions: ({navigation}) => ({
            title: 'Telusuri Transaksi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Settings: {
        screen: Settings,
        navigationOptions: ({navigation}) => ({
            title: 'Pengaturan',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    SettingNotifications: {
        screen: SettingNotifications,
        navigationOptions: ({navigation}) => ({
            title: 'Pengaturan Notifikasi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    SettingResetPassword: {
        screen: SettingResetPassword,
        navigationOptions: ({navigation}) => ({
            title: 'Ubah Password',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    ListContent: {
        screen: ListContent,
        navigationOptions: ({navigation}) => ({
            title: 'Telusuri Berita',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    ContentDetails: {
        screen: ContentDetails,
        navigationOptions: ({navigation}) => ({
            title: 'Detail Content',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    NotificationDetails: {
        screen: NotificationDetails,
        navigationOptions: ({navigation}) => ({
            title: 'Detail Notifikasi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={xrectangle} source={require(CDR)} /> )
        })
    },
    ListNotifications: {
        screen: ListNotifications,
        navigationOptions: ({navigation}) => ({
            title: 'Telusuri Notifikasi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    AskQuestion: {
        screen: AskQuestion,
        navigationOptions: ({navigation}) => ({
            title: 'Ajukan Pertanyaan',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Excellence: {
        screen: Excellence,
        navigationOptions: ({navigation}) => ({
            title: 'Keunggulan',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Join: {
        screen: Join,
        navigationOptions: ({navigation}) => ({
            title: 'Bergabung',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Profit: {
        screen: Profit,
        navigationOptions: ({navigation}) => ({
            title: 'Keuntungan',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    Animate: {
        screen: Animate,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    ListProducts: {
        screen: ShopPage,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: ({navigation}) => ({
            title: 'Lupa Password',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({navigation}) => ({
            title: 'Ganti Password',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={rectangle} source={require(BDR)} /> )
        })
    }
}, {
    initialRouteName: 'MainTabs'
})

const styles = StyleSheet.create({
    customIcon: {
        position: 'absolute',
        left: 17,
        top: 13
    },
    customToShop: {
        backgroundColor: '#7c0c10',
        borderRadius: 5,
        width: 250,
        height: 50,
        elevation: 3,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
import { modifyNotification } from '../actions/Notification_Controller';
import { updateListNotifications } from '../actions/Update_List_Notifications';

class RouterTabs extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataNotif !== this.props.dataNotif) {
            this.props.dispatch(modifyNotification('inc'))
            this.props.dispatch(updateListNotifications(this.props.dataNotif))
        }
    }

    render() {
        return(
            <RootStack uriPrefix={ SERVER_URL }/>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
}

export default connect(
    mapDispatchToProps
)(RouterTabs)
