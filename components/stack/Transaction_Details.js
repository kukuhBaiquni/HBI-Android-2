import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL, idrFormat } from '../../config';
import moment from 'moment';

class TransactionDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  beforeRender() {
    if (this.props.navigation.state.params === undefined) {
      this.setState({data: this.props.transaction})
    }else{
      this.setState({data: this.props.navigation.state.params})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.data) === JSON.stringify({})) {
      this.setState({data: this.props.transaction})
    }
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
        />
      {
        data.address !== undefined &&
        <View>
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
                <Text style={{color: '#a5a5a5'}}>{data.trx}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Status</Text>
                <Text style={{color: '#a5a5a5'}}>{data.status}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Waktu Pemesanan</Text>
                <Text style={{color: '#a5a5a5'}}>{moment(data.start_date).format('DD-MMM-YYYY (HH:mm)')}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Batas Akhir Pembayaran</Text>
                <Text style={{color: '#a5a5a5'}}>{moment(data.due_date).format('DD-MMM-YYYY (HH:mm)')}</Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.subTitle}>Alamat Pengiriman</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.streets}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Kota / Kabupaten</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.cities}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Kecamatan</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.districts}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Kelurahan</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.villages}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Nama Penerima</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.receiver}</Text>
                <Text style={[styles.subTitle, {marginTop: 5}]}>Nomor Telepon Penerima</Text>
                <Text style={{color: '#a5a5a5'}}>0{data.address.receiver_phone}</Text>
              </View>
              <View style={{backgroundColor: '#f7f7f7', marginTop: 10, width: '100%'}}>
                <Text style={{fontWeight: 'bold', padding: 10, marginLeft: 5}}>List Item</Text>
              </View>
              {
                data.detail_items.map((x, i) =>
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
                      <Text>Kuantitas: <Text style={{color: '#a5a5a5'}}>{x.qty}</Text></Text>
                    </View>
                    <View>
                      <Text></Text>
                      <Text></Text>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, marginLeft: 80, fontWeight: 'bold'}}>Subtotal </Text>
                    <View style={{width: '100%', position: 'absolute'}}>
                      <Text style={{marginTop: 5, textAlign: 'right'}}>{idrFormat(x.price * x.qty)}</Text>
                    </View>
                  </View>
                </View>
                )
              }
            </View>
            <View style={{backgroundColor: 'white', marginTop: 10, marginBottom: 0, flexDirection: 'row'}}>
              <Text style={{padding: 10, fontSize: 16, marginLeft: 83}}>Ongkir</Text>
              <View style={{width: '100%', position: 'absolute'}}>
                <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.ongkir)}</Text>
              </View>
            </View>
            <View style={{backgroundColor: 'white', marginTop: 10, marginBottom: 0, flexDirection: 'row'}}>
              <Text style={{padding: 10, fontSize: 16, marginLeft: 83}}>Total Belanja</Text>
              <View style={{width: '100%', position: 'absolute'}}>
                <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.total_price - data.ongkir)}</Text>
              </View>
            </View>
            <View style={{backgroundColor: 'white', marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
              <Text style={{padding: 10, fontSize: 16, marginLeft: 83}}>Total Pembayaran</Text>
              <View style={{width: '100%', position: 'absolute'}}>
                <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.total_price)}</Text>
              </View>
            </View>
            <View style={{marginTop: 50}}></View>
          </ScrollView>
        </View>
      }
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(TransactionDetails);

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
