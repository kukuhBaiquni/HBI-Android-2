import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchAutocomplete from './Search_Autocomplete';
import { connect } from 'react-redux';
import ShopPage from './Shop_Page';
import Example from './Static_Example';
import ProductDetails from './Product_Details';
import Mail from './Mail';
import Cart from './Cart';

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
  screen: Example,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name='account-box' size={24} color={tintColor} />
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

export const RootStack = createStackNavigator({
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
      title: 'Cart Page',
      headerTintColor: '#7c0c10',
      headerStyle: {
        backgroundColor: 'white',
        borderBottomColor: 'black'
      }
    })
  },
  SearchAutocomplete: {
    screen: SearchAutocomplete,
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

class RouterTabs extends Component {
  render() {
    return(
      <Tabs />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

connect(
  mapDispatchToProps
)(RouterTabs)
