import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default class TransactionBundler extends Component {
  render() {
    const { transaction, navigation } = this.props;
    return(
      <ScrollView>
        {
          transaction.map((x, i) =>
          <TouchableNativeFeedback key={i} onPress={() => navigation.navigate('TransactionDetails', transaction[i])}>
            <View style={styles.listMenu}>
              <Text style={{fontSize: 12, color: '#a5a5a5'}}>ID Transaksi</Text>
              <Text style={styles.menuTitle}>{x.trx}</Text>
              <Text style={{fontSize: 12, color: '#a5a5a5'}}>Tanggal: {moment(x.start_date).format('DD-MMM-YYYY')}</Text>
              <View style={{position: 'absolute', right: 20, top: 20}}>
                <Icon name='more-vert' />
              </View>
            </View>
          </TouchableNativeFeedback>
          )
        }
      </ScrollView>
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
    height: 65,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 14,
  },
})
