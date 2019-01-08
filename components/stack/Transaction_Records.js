import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadTransaction } from '../../actions/Load_Transaction';
import { DotIndicator } from 'react-native-indicators';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import TransactionBundler from './Transaction_Bundler';

class TransactionRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  beforeRender() {
    this.props.dispatch(loadTransaction(this.props.navigation.state.params.token))
  }

  render() {
    const { transactionRecords, navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <NavigationEvents
            onWillFocus={() => this.beforeRender()}
            />
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
        </View>
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#7c0c10'}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: '#e5e5e5', height: 45}} />}>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Pending">
            <TransactionBundler navigation={navigation} transaction={transactionRecords.filter(x => x.status === 'pending')}/>
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Sending">
            <TransactionBundler navigation={navigation} transaction={transactionRecords.filter(x => x.status === 'sending')} />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Success">
            <TransactionBundler navigation={navigation} transaction={transactionRecords.filter(x => x.status === 'success')} />
          </Tab>
          <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Expired">
            <TransactionBundler navigation={navigation} transaction={transactionRecords.filter(x => x.status === 'expired')} />
          </Tab>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cecece',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: '#7c0c10'
  },
  headerMenu: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 8,
    backgroundColor: '#bfbfbf',
    marginTop: 10
  },
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
})

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(TransactionRecords);
