import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { SERVER_URL, idrFormat } from '../../config';
import moment from 'moment';

export default class TransactionDetails extends Component {
  render() {
    console.log(this.props.navigation.state.params);
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Transaksi</Text>
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.container}>
              <Text style={styles.subTitle}>ID Transaksi</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.trx}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Status</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.status}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Waktu Pemesanan</Text>
              <Text style={{color: '#a5a5a5'}}>{moment(navigation.state.params.start_date).format('DD-MMM-YYYY (HH:mm)')}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Batas Akhir Pembayaran</Text>
              <Text style={{color: '#a5a5a5'}}>{moment(navigation.state.params.due_date).format('DD-MMM-YYYY (HH:mm)')}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.subTitle}>Alamat Pengiriman</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.address.streets}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Kota / Kabupaten</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.address.cities}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Kecamatan</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.address.districts}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Kelurahan</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.address.villages}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Nama Penerima</Text>
              <Text style={{color: '#a5a5a5'}}>{navigation.state.params.address.receiver}</Text>
              <Text style={[styles.subTitle, {marginTop: 5}]}>Nomor Telepon Penerima</Text>
              <Text style={{color: '#a5a5a5'}}>0{navigation.state.params.address.receiver_phone}</Text>
            </View>
            <View style={{backgroundColor: '#f7f7f7', marginTop: 10, width: '100%'}}>
              <Text style={{fontWeight: 'bold', padding: 10, marginLeft: 5}}>List Item</Text>
            </View>
            {
              navigation.state.params.detail_items.map((x, i) =>
              <View key={i} style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    resizeMode='contain'
                    style={{width: 70, height: 70, borderColor: '#e2e2e2', borderWidth: 1}}
                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                    />
                  <View style={{marginLeft: 10, marginTop: -5, width: 140}}>
                    <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16}}>{x.product_name}</Text>
                    <Text>Harga: <Text style={{color: '#a5a5a5'}}>{idrFormat(x.price)}</Text></Text>
                    <Text>Proses: <Text style={{color: '#a5a5a5'}}>{x.selected_process}</Text></Text>
                    <Text>Kuantitas: <Text style={{color: '#a5a5a5'}}>{x.qty}</Text></Text>
                    <Text style={{marginTop: 10, fontWeight: 'bold'}}>Subtotal </Text>
                  </View>
                  <View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{marginTop: 6}}>{idrFormat(x.price * x.qty)}</Text>
                  </View>
                </View>
              </View>
              )
            }
          </View>
          <View style={{backgroundColor: 'white', marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text style={{padding: 10, fontSize: 18, marginLeft: 83}}>Total Harga</Text>
            <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', marginLeft: 27}}>{idrFormat(navigation.state.params.total_price)}</Text>
          </View>
        </ScrollView>
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
  container: {
    backgroundColor: 'white',
    width: 350,
    marginTop: 10,
    padding: 10
  },
  subTitle: {
    fontWeight: 'bold'
  }
})
