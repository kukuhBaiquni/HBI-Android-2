import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchNotifications } from '../../actions/Fetch_Notifications';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { locale } from '../../config';

class MailPartials extends Component {

  beforeRender() {
    const token = this.props.token;
    const type = this.props.type;
    this.props.dispatch(fetchNotifications({token, tag: type}))
  }

  render() {
    const { userData, type, navigation } = this.props;
    const tracking = ['', 'Menunggu Pembayaran', 'Pesanan Sedang Diproses', 'Pesanan Sedang Dikirim', 'Pesanan Sudah Sampai']
    const color = ['', '#ffbf00', '#01adbc', '#0038bc', '#00b71e']
    const data = userData.notifications[type];
    if (userData.notifications[type].length === 0) {
      return(
        <View style={{paddingTop: 15, paddingBottom: 15}}>
          <NavigationEvents
            onWillFocus={() => this.beforeRender()}
            />
          <Text style={{fontStyle: 'italic', color: '#a3a3a3', textAlign: 'center'}}>Belum ada notifikasi</Text>
        </View>
      )
    }else{
      return(
        <View style={{alignItems: 'center'}}>
          <NavigationEvents
            onWillFocus={() => this.beforeRender()}
            />
          {
            data.reverse().slice(0, 3).map((x, i) =>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationDetails', {data: x, type})} key={i} style={x.status ? [styles.listItem, {backgroundColor: '#eaeaea'}] : [styles.listItem, {backgroundColor: 'white'}]}>
              <Text>Nomor Transaksi</Text>
              <Text style={{position: 'absolute', right: 10, top: 7, fontWeight: 'bold'}}>{x.trx}</Text>
              <Text style={{fontSize: 12, color: '#a3a3a3'}}>{locale[new Date(x.date).getDay()] + ', ' + moment(x.date).format('DD MMM YYYY') + ' - ' + moment(x.date).format('HH:mm')}</Text>
              <Text style={{color: color[x.tracking]}}>{tracking[x.tracking]}</Text>
              {
                !x.status &&
                <Text style={{position: 'absolute', right: 10, bottom: 5, fontSize: 13, fontWeight: 'bold', color: '#36ce00'}}>BARU</Text>
              }
            </TouchableOpacity>
            )
          }
        </View>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(MailPartials);

const styles = StyleSheet.create({
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
