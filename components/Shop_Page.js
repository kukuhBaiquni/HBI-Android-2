import React, { Component } from 'react';
import { StatusBar, StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import Sapi from './Sapi';
import Ayam from './Ayam';
import Ikan from './Ikan';
import Olahan from './Olahan';
import { connect } from 'react-redux';
import { getAllProducts } from '../actions/Saga';
import { NavigationEvents } from 'react-navigation';

class ShopPage extends Component {
  componentDidMount() {
    this.props.dispatch(getAllProducts())
  }

  testing(e) {
    console.log(e);
  }

  render() {
    let { data, navigation } = this.props;
    return(
      <Container>
        <NavigationEvents
          onDidFocus={(x) => this.testing(x)}
          />
        <Header style={styles.headerColor}>
          <Item style={{borderBottomColor: '#7c0c10'}}>
            <TextInput style={styles.input} placeholder="Search" />
          </Item>
          <Right>
            <Button transparent>
              <View>
                <TouchableOpacity style={styles.badge}>
                  <Text style={styles.text}>3</Text>
                </TouchableOpacity>
                <Icon onPress={() => this.props.navigation.navigate('Cart')} name='shopping-cart' size={27} color='white'/>
              </View>
            </Button>
          </Right>
        </Header>
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#7c0c10'}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: 'white', height: 45}} />}>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Sapi">
            <Sapi navigation = { navigation } products = { data.filter(x => x.category === 'sapi') } />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ayam">
            <Ayam navigation = { navigation } products = { data.filter(x => x.category === 'ayam') } />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ikan">
            <Ikan navigation = { navigation } products = { data.filter(x => x.category === 'ikan') } />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Olahan">
            <Olahan navigation = { navigation } products = { data.filter(x => x.category === 'olahan') } />
          </Tab>
        </Tabs>
        <StatusBar
          backgroundColor='#7c0c10'
          barStyle='light-content'
        />
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(ShopPage)

const styles = StyleSheet.create({
  input : {
    width: 280,
    height: 35,
    backgroundColor: 'white',
    paddingBottom: 8,
    borderRadius: 3
  },
  headerColor: {
    backgroundColor: '#7c0c10'
  },
  badge: {
    height: 18,
    width: 18,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#ff8c19',
    zIndex: 1,
    position: 'absolute',
    marginLeft: 15,
    marginTop: -10
  },
  text: {
    color: 'white',
    marginLeft: -15,
    fontSize: 14,
    fontWeight: 'bold'
  }
})
