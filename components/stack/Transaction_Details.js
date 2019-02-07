import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL, idrFormat, locale } from '../../config';
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
    const trackingTitle = ['Menunggu Konfirmasi Pembayaran', 'Pesanan Sedang Diproses', 'Pesanan Sedang Dikirim', 'Pesanan Sudah Sampai']
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
              </View>
              <View style={styles.container}>
                <Text style={[styles.subTitle]}>Waktu Pemesanan</Text>
                <Text style={{color: '#a5a5a5'}}>{locale[new Date(data.start_date).getDay()] + ', ' + moment(data.start_date).format('DD MMM YYYY') + ' - ' + moment(data.start_date).format('HH:mm')}</Text>
              </View>
              <View style={styles.container}>
                <Text style={[styles.subTitle, {marginBottom: 5}]}>Alamat Pengiriman</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.receiver}</Text>
                <Text style={{color: '#a5a5a5'}}>0{data.address.receiver_phone}</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.streets}</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.cities}</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.districts}</Text>
                <Text style={{color: '#a5a5a5'}}>{data.address.villages}</Text>
              </View>
              <View style={styles.container}>
                <Text style={[styles.subTitle, {marginBottom: 5}]}>Lacak Pesanan</Text>

              </View>
              <View style={[styles.container, {padding: 5}]}>
                <Text style={{fontWeight: 'bold', padding: 10, color: '#7c0c10', fontSize: 17}}>Detail Pesanan</Text>
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
                    <View style={{marginLeft: 10, marginTop: -5, width: 252}}>
                      <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16, color: '#7c0c10'}}>{x.product_name}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Harga: </Text>
                        <Text style={{color: '#a5a5a5', textAlign: 'right', position: 'absolute', right: 10}}>{idrFormat(x.price)}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Kuantitas: </Text>
                        <Text style={{color: '#a5a5a5', textAlign: 'right', position: 'absolute', right: 10}}>{x.qty}</Text>
                      </View>
                    </View>
                    <View>
                      <Text></Text>
                      <Text></Text>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <Text style={{marginTop: 5, marginLeft: 80, fontWeight: 'bold', color: '#7c0c10'}}>Subtotal </Text>
                    <View style={{width: '100%', position: 'absolute'}}>
                      <Text style={{marginTop: 5, textAlign: 'right'}}>{idrFormat(x.price * x.qty)}</Text>
                    </View>
                  </View>
                </View>
                )
              }
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.footer}>
                <Text style={[styles.subTitle, {padding: 10, fontSize: 15, marginLeft: 83}]}>Total Belanja</Text>
                <View style={{width: '100%', position: 'absolute'}}>
                  <Text style={{padding: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.total_price - data.ongkir)}</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={[styles.subTitle, {padding: 10, fontSize: 15, marginLeft: 83}]}>Ongkos Kirim</Text>
                <View style={{width: '100%', position: 'absolute'}}>
                  <Text style={{padding: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.ongkir)}</Text>
                </View>
              </View>
              <View style={[styles.footer, {backgroundColor: '#fff9fa'}]}>
                <Text style={[styles.subTitle, {padding: 10, fontSize: 15, marginLeft: 83}]}>Total Pembayaran</Text>
                <View style={{width: '100%', position: 'absolute'}}>
                  <Text style={{padding: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'right'}}>{idrFormat(data.total_price)}</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 70}}></View>
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
    width: '95%',
    marginTop: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 5
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#7c0c10'
  },
  footer: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 0,
    flexDirection: 'row',
    width: '95%',
    elevation: 3,
    borderRadius: 5
  }
})
