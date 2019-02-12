import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { locale } from '../../config';
import moment from 'moment';

class ListNotifications extends Component {
  render() {
    const { navigation, userData } = this.props;
    const display = ['', 'Order', 'Sistem', 'Inbox'];
    const fetchinx = ['', 'order', 'system', 'inbox'];
    const tracking = ['', 'Menunggu Pembayaran', 'Pesanan Sedang Diproses', 'Pesanan Sedang Dikirim', 'Pesanan Sudah Sampai']
    const color = ['', '#ffbf00', '#01adbc', '#0038bc', '#00b71e']
    const data = userData.notifications[fetchinx[navigation.state.params.type]];
    const type = fetchinx[navigation.state.params.type];
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Telusuri Notifikasi {display[navigation.state.params.type]}</Text>
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {
              data.map((x, i) =>
              <TouchableOpacity onPress={() => navigation.navigate('NotificationDetails', {data: x, type})} key={i} style={x.status ? [styles.listItem, {backgroundColor: '#eaeaea'}] : [styles.listItem, {backgroundColor: 'white'}]}>
                <Text>Nomor Transaksi</Text>
                <Text style={{position: 'absolute', right: 10, top: 7, fontWeight: 'bold'}}>{x.trx}</Text>
                <Text style={{fontSize: 12, color: '#a3a3a3'}}>{locale[new Date(x.date).getDay()] + ', ' + moment(x.date).format('DD MMM YYYY') + ' - ' + moment(x.date).format('HH:mm')}</Text>
                <Text style={{color: color[x.tracking]}}>{tracking[x.tracking]}</Text>
              </TouchableOpacity>
              )
            }
          </View>
          <View style={{height: 10}} />
        </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(ListNotifications)

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#bababa',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: 'white'
  },
  listItem: {
    width: '95%',
    marginTop: 5,
    borderRadius: 5,
    height: 70,
    paddingTop: 5,
    paddingLeft: 15,
    elevation: 3
  }
})
