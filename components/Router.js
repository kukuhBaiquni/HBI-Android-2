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
import { SERVER_URL } from '../config';

const DrawerComponent = (props) => (
  <ScrollView style={{flex: 1}}>
    <SafeAreaView>
      <View style={{height: 120, backgroundColor: '#7c0c10', padding: 10}}>
        <Text style={{color: 'white', fontSize: 19}}>Selamat Datang!</Text>
      </View>
        <DrawerItems {...props} />
        <View style={{borderBottomColor: '#bababa', borderBottomWidth: 1}} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.customToShop} onPress={() => props.navigation.navigate('Shopping')}>
            <Text style={{color: 'white'}}>Mulai Belanja Disini</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 10, paddingLeft: 20}}>
          <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 0})}>FAQ</Text>
          <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 1})}>Kebijakan Privasi</Text>
          <Text style={{marginBottom: 10}} onPress={() => props.navigation.navigate('About', {type: 2})}>Syarat & Ketentuan</Text>
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
},
{
  contentComponent: DrawerComponent
})

const Tabs = createMaterialTopTabNavigator({
  Home: {
    screen: Drawer,
    navigationOptions: {
      title: 'Beranda',
      tabBarIcon: ({tintColor}) => <Icon name='home' size={24} color={tintColor} />,
    tabBarOnPress: (x) => {x.navigation.navigate('FirstPage')}
    }
  },
  Timeline: {
    screen: Timeline,
    navigationOptions: {
      tabBarLabel: 'Berita',
      tabBarIcon: ({tintColor}) => <Icon name='event-note' size={24} color={tintColor} />
    }
  },
  Shopping: {
    screen: ShopPage,
    navigationOptions: {
      title: 'Belanja',
      tabBarIcon: ({tintColor}) => <Icon name='store-mall-directory' size={24} color={tintColor} />
    }
  },
  Mail: {
    screen: Mail,
    path: 'mail',
    navigationOptions: {
      title: 'Notifikasi',
      tabBarIcon: ({tintColor}) => <View>
      <TouchableOpacity style={styles.badge}>
        <Text style={styles.text}>6</Text>
      </TouchableOpacity>
      <Icon name='notifications' size={24} color={tintColor} />
    </View>
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
      tabBarIcon: ({tintColor}) => <Icon name='account-box' size={24} color={tintColor} />,
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
});

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
      header: null
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
      }
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
      }
    })
  },
  ProfilePrevention: {
    screen: ProfilePrevention,
    navigationOptions: ({navigation}) => ({
      header: null
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
      header: null
    })
  },
  EditAddress: {
    screen: EditAddress,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  EditAddressDP: {
    screen: EditAddressDP,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  DirectPayment: {
    screen: DirectPayment,
    navigationOptions: ({navigation}) => ({
      header: null
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
      header: null
    })
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  EditRekening: {
    screen: EditRekening,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  MyRekening: {
    screen: MyRekening,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  TransactionRecords: {
    screen: TransactionRecords,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  TransactionDetails: {
    screen: TransactionDetails,
    navigationOptions: ({navigation}) => ({
      header: null
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
      header: null
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
      header: null
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  SettingNotifications: {
    screen: SettingNotifications,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  SettingResetPassword: {
    screen: SettingResetPassword,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  ListContent: {
    screen: ListContent,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  ContentDetails: {
    screen: ContentDetails,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  NotificationDetails: {
    screen: NotificationDetails,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
}, {
  initialRouteName: 'FirstPage'
})

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'orange',
    height: 15,
    width: 15,
    borderRadius: 8,
    position: 'absolute',
    zIndex: 2,
    marginLeft: 13,
    marginTop: -3
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: -1,
    fontWeight: 'bold'
  },
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

export default class RouterTabs extends Component {
  render() {
    return(
      <RootStack uriPrefix={ SERVER_URL }/>
    )
  }
}
