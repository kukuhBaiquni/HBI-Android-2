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
import Blank from './stack/Blank';
import EditProfile from './stack/Edit_Profile';
import MyProfile from './stack/My_Profile';
import EditRekening from './stack/Edit_Rekening';
import MyRekening from './stack/My_Rekening';
import TransactionRecords from './stack/Transaction_Records';
import TransactionDetails from './stack/Transaction_Details';
import Help from './stack/Help';
import Timeline from './tabs/Timeline';
import Splash from './Splash_Screen';
import { SERVER_URL } from '../config';

const openC = async (x) => {
  console.log(x);
}

const DrawerComponent = (props) => (
  <ScrollView style={{flex: 1}}>
    <SafeAreaView>
      <View style={{justifyContent: 'center', alignItems: 'center', height: 120, backgroundColor: '#7c0c10'}}>
        <View style={{height: 10}} />
        <Image
          resizeMode='contain'
          style={{width: 150, height: 90, paddingTop: 0}}
          source={{uri: `${SERVER_URL}images/support/SScreen.png`}}
          />
      </View>
        <DrawerItems {...props} />
        <View style={{borderBottomColor: '#bababa', borderBottomWidth: 1}} />
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('Timeline')}>
          <View style={styles.customIcon}>
            <Icon name='event-note' />
          </View>
          <Text style={{paddingTop: 15, paddingBottom: 15, marginLeft: 69, color: 'black', fontWeight: 'bold'}}>Timeline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('Shopping')}>
          <View style={styles.customIcon}>
            <Icon name='store-mall-directory' />
          </View>
          <Text style={{paddingTop: 15, paddingBottom: 15, marginLeft: 69, color: 'black', fontWeight: 'bold'}}>Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('Mail')}>
          <View style={styles.customIcon}>
            <Icon name='mail' />
          </View>
          <Text style={{paddingTop: 15, paddingBottom: 15, marginLeft: 69, color: 'black', fontWeight: 'bold'}}>Mail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}}
          onPress={
           async () => {
              try {
                const val = await AsyncStorage.getItem('access_token')
                if (val !== null) {
                  props.navigation.navigate('Profile')
                }else{
                  props.navigation.navigate('ProfilePrevention')
                }
              }catch (error) {
                props.navigation.navigate('ProfilePrevention')
              }
            }
          }
          >
          <View style={styles.customIcon}>
            <Icon name='account-box' />
          </View>
          <Text style={{paddingTop: 15, paddingBottom: 15, marginLeft: 69, color: 'black', fontWeight: 'bold'}}>Profile</Text>
        </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
)

const Drawer = createDrawerNavigator({
  About:{
    screen: Blank,
    navigationOptions: {
      title: 'Tentang Kami',
      drawerIcon: ({tintColor}) => <Icon name='contacts' size={24} color={tintColor} />
    }
  },
  Member:{
    screen: Blank,
    navigationOptions: {
      drawerIcon: ({tintColor}) => <Icon name='people' size={24} color={tintColor} />
    }
  },
  Business:{
    screen: Blank,
    navigationOptions: {
      title: 'Bisnis',
      drawerIcon: ({tintColor}) => <Icon name='business-center' size={24} color={tintColor} />
    }
  },
  CallUs:{
    screen: Blank,
    navigationOptions: {
      title: 'Hubungi Kami',
      drawerIcon: ({tintColor}) => <Icon name='phone' size={24} color={tintColor} />
    }
  },
  Help2:{
    screen: Help,
    navigationOptions: {
      title: 'Bantuan',
      drawerIcon: ({tintColor}) => <Icon name='help' size={24} color={tintColor} />
    }
  }
},
{
  contentComponent: DrawerComponent
})

const Tabs = createMaterialTopTabNavigator({
  About: {
    screen: Drawer,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='home' size={24} color={tintColor} />,
    tabBarOnPress: (x) => {x.navigation.navigate('FirstPage')}
    }
  },
  Timeline: {
    screen: Timeline,
    navigationOptions: {
      tabBarLabel: 'Timeline',
      tabBarIcon: ({tintColor}) => <Icon name='event-note' size={24} color={tintColor} />
    }
  },
  Shopping: {
    screen: ShopPage,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='store-mall-directory' size={24} color={tintColor} />
    }
  },
  // Mail: {
  //   screen: Mail,
  //   navigationOptions: {
  //     tabBarIcon: ({tintColor}) => <View>
  //     <TouchableOpacity style={styles.badge}>
  //       <Text style={styles.text}>6</Text>
  //     </TouchableOpacity>
  //     <Icon name='mail' size={24} color={tintColor} />
  //   </View>
  //   }
  // },
  Mail: {
    screen: Mail,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='mail' size={24} color={tintColor} />
    }
  },
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
  Help: {
    screen: Help,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
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
  }
});

export default class RouterTabs extends Component {
  render() {
    return(
      <RootStack uriPrefix={ SERVER_URL }/>
    )
  }
}
