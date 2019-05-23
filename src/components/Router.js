import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, AsyncStorage, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchAutocomplete from './stack/Search_Autocomplete';
import Example from './Static_Example';
import ShopPage from './tabs/Shop_Page';
import ShopPageMember from './tabs/Shop_Page_Member';
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
import EditProfile from './stack/Edit_Profile';
import MyProfile from './stack/My_Profile';
import EditRekening from './stack/Edit_Rekening';
import MyRekening from './stack/My_Rekening';
import TransactionRecords from './stack/Transaction_Records';
import TransactionDetails from './stack/Transaction_Details';
import Timeline from './tabs/Timeline';
import Splash from './Splash_Screen';
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
import Beranda from './tabs/Beranda';
import ListMarket from './stack/List_Market';
import ForgetPassword from './stack/Forget_Password';
import ChangePassword from './stack/Change_Password';
import { SERVER_URL } from '../../config';
import BadgeNotification from './Badge_Notification';
import { connect } from 'react-redux';
import { BACKDARKRED, BACKWHITE, CHECKLIST_DARKRED, CANCEL_DARKRED, BERANDA, BERITA_C, BERITA, BELANJA, BELANJA_C, NOTIFIKASI, NOTIFIKASI_C, AKUN, AKUN_C } from '../images';

const config = {
    lazy: true,
    initialRouteName: 'Beranda',
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
};

const Tabs = createMaterialTopTabNavigator({
    Beranda: {
        screen: Beranda,
        navigationOptions: {
            title: 'Beranda',
            tabBarIcon: ({tintColor}) => <Image style={{height: 20, width: 20}} source={BERANDA} />,
        }
    },
    Timeline: {
        screen: Timeline,
        navigationOptions: {
            tabBarLabel: 'Berita',
            tabBarIcon: ({focused}) => (
                focused
                ?
                <Image source={BERITA_C} style={{height: 20, width: 20}} />
                :
                <Image source={BERITA} style={{height: 20, width: 20}} />
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
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> ),
            tabBarIcon: ({focused}) => (
                focused
                ?
                <Image source={BELANJA_C} style={{height: 20, width: 20}} />
                :
                <Image source={BELANJA} style={{height: 20, width: 20}} />
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
                    <Image style={{height: 20, width: 20}} source={NOTIFIKASI_C} />
                </View>
                :
                <View>
                    <BadgeNotification />
                    <Image style={{height: 20, width: 20}} source={NOTIFIKASI} />
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
                <Image source={AKUN_C} style={{height: 20, width: 20}} />
                :
                <Image source={AKUN} style={{height: 20, width: 20}} />
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
}, config
);

const RootStack = createStackNavigator({
    MainTabs:                   { screen: Tabs, navigationOptions: ({navigation}) => ({ header: null }) },
    ProductDetails:             { screen: ProductDetails },
    Cart:                       { screen: Cart },
    SearchAutocomplete:         { screen: SearchAutocomplete },
    Login:                      { screen: Login },
    Register:                   { screen: Register },
    ProfilePrevention:          { screen: ProfilePrevention },
    DeepLinkHandler:            { screen: DeepLinkHandler },
    AfterDeeplink:              { screen: AfterDeeplink, path: 'account_verification/android/:hash' },
    Payment:                    { screen: Payment },
    EditAddress:                { screen: EditAddress },
    EditAddressDP:              { screen: EditAddressDP },
    DirectPayment:              { screen: DirectPayment },
    EditProfile:                { screen: EditProfile },
    MyProfile:                  { screen: MyProfile },
    EditRekening:               { screen: EditRekening },
    MyRekening:                 { screen: MyRekening },
    TransactionRecords:         { screen: TransactionRecords },
    TransactionDetails:         { screen: TransactionDetails },
    Faq:                        { screen: Faq },
    MyTransaction:              { screen: MyActiveTransaction },
    Tracking:                   { screen: Tracking },
    TransactionList:            { screen: TransactionList },
    Settings:                   { screen: Settings },
    SettingNotifications:       { screen: SettingNotifications },
    SettingResetPassword:       { screen: SettingResetPassword },
    ListContent:                { screen: ListContent },
    ContentDetails:             { screen: ContentDetails },
    NotificationDetails:        { screen: NotificationDetails },
    ListNotifications:          { screen: ListNotifications },
    ListProducts:               { screen: ShopPage },
    ForgetPassword:             { screen: ForgetPassword },
    ChangePassword:             { screen: ChangePassword },
    ShopPageMember:             { screen: ShopPageMember }
}, {
    initialRouteName: 'MainTabs'
});

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
// 
// import { modifyNotification } from '../actions/Notification_Controller';
// import { updateListNotifications } from '../actions/Update_List_Notifications';

class RouterTabs extends Component {
    render() {
        return(
            <RootStack uriPrefix={ SERVER_URL }/>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(RouterTabs);
