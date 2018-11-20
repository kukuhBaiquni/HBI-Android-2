import React, { Component } from 'react';
import { StatusBar, StyleSheet, TextInput } from 'react-native';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import Sapi from './Sapi';
import Ayam from './Ayam';
import Olahan from './Olahan';

export default class MainPage extends Component {
  render() {
    return(
      <Container>
        <Header style={styles.headerColor}>
          <Item style={{borderBottomColor: '#7c0c10'}}>
            <TextInput style={styles.input} placeholder="Search" />
          </Item>
          <Right>
            <Button transparent>
              <Icon name='shopping-cart' color='white'/>
            </Button>
          </Right>
        </Header>
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#7c0c10'}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: 'white', height: 45}} />}>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Tab1">
            <Sapi />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white', borderBottomColor: 'orange'}} heading="Tab2">
            <Ayam />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Tab3">
            <Olahan />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Tab4">
            <Sapi />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Tab5">
            <Ayam />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Tab6">
            <Olahan />
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
  }
})
