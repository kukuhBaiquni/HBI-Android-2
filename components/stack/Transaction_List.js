import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { idrFormat, locale } from '../../config';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { loadTransactionTypeSuccess } from '../../actions/Load_Transaction_Type_Success';
import { loadTransactionTypeFailed } from '../../actions/Load_Transaction_Type_Failed';
import { loadTransactionTypeExpired } from '../../actions/Load_Transaction_Type_Expired';
import { DotIndicator } from 'react-native-indicators';

class TransactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  beforeRender() {
    const type = this.props.navigation.state.params.type;
    const token = this.props.navigation.state.params.token;
    if (type === 0) {
      this.props.dispatch(loadTransactionTypeSuccess(token))
    }else if(type === 1) {
      this.props.dispatch(loadTransactionTypeFailed(token))
    }else{
      this.props.dispatch(loadTransactionTypeExpired(token))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.transactionTypeSuccess !== this.props.transactionTypeSuccess) {
      this.setState({data: this.props.transactionTypeSuccess, loading: false})
    }
    if (prevProps.transactionTypeFailed !== this.props.transactionTypeFailed) {
      this.setState({data: this.props.transactionTypeFailed, loading: false})
    }
    if (prevProps.transactionTypeExpired !== this.props.transactionTypeExpired) {
      this.setState({data: this.props.transactionTypeExpired, loading: false})
    }
  }

  render() {
    const { transaction, navigation } = this.props;
    const title = ['Sukses', 'Gagal', 'Kadaluarsa'];
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.trx}
          renderItem={({ item }) => (
            <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionDetails', item)}>
              <View style={[styles.listMenu, {height: 70, flexDirection: 'row'}]}>
                <View style={{paddingLeft: 10}}>
                  <Text style={[styles.menuTitle, {color: '#bababa', fontSize: 15}]}>Nomor Transaksi</Text>
                  <Text>{item.trx}</Text>
                  <Text>{moment(item.start_date).format('HH:mm') + ' - ' + locale[new Date(item.start_date).getDay()] + ', ' + moment(item.start_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{position: 'absolute', right: 10, padding: 6, paddingTop: 15}}>
                  <Text style={{color: '#bababa', textAlign: 'right'}}>Total Belanja</Text>
                  <Text style={{textAlign: 'right'}}>{idrFormat(item.total_price)}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      <View style={{height: 10}} />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(TransactionList)

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
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 14,
  },
})
