import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, AsyncStorage } from 'react-native';
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
import { SERVER_URL } from '../config';

const Tabs = createMaterialTopTabNavigator({
  About: {
    screen: Example,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='home' size={24} color={tintColor} />
    }
  },
  TulisResep: {
    screen: Example,
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
  Mail: {
    screen: Mail,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <View>
      <TouchableOpacity style={styles.badge}>
        <Text style={styles.text}>6</Text>
      </TouchableOpacity>
      <Icon name='mail' size={24} color={tintColor} />
    </View>
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name='account-box' size={24} color={tintColor} />,
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
  }
});

export default class RouterTabs extends Component {
  render() {
    return(
      <RootStack uriPrefix={ SERVER_URL }/>
    )
  }
}
