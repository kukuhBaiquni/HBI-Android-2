import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
import { forceResetRoot } from '../../actions/Load_Cities';
import { forceResetSA } from '../../actions/Save_Address';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { confirmTransaction } from '../../actions/Confirm_Transaction';
import { checkOngkir } from '../../actions/Check_Ongkir';

import moment from 'moment';

class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddressValid: false,
      token: '',
      ongkir: 0,
      loading: false,
      transactionLoading: true
    }
  }
  beforeRender = async () => {
    this.props.dispatch(forceResetSA())
    this.props.dispatch(forceResetRoot())
    if (this.props.navigation.state.params !== undefined) {
      const village = this.props.navigation.state.params.village;
      this.props.dispatch(checkOngkir(village))
    }
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token !== null) {
        const raw = JSON.parse(token)
        this.setState({token: raw})
        this.props.dispatch(fetchUser(raw))
      }
    }catch (error) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData) {
      if (this.props.userData.address.street !== '') {
        this.setState({isAddressValid: true})
      }else{
        if (this.props.navigation.state.params !== undefined) {
          this.setState({isAddressValid: true})
        }
      }
      if (this.props.userData.address.village !== '' && this.props.navigation.state.params === undefined) {
        this.setState({ongkir: this.props.userData.ongkir})
      }
    }
    if (prevProps.transaction !== this.props.transaction) {
      this.setState({transactionLoading: false})
    }
    if (prevProps.ongkir !== this.props.ongkir) {
      this.setState({ongkir: this.props.ongkir})
    }
  }

  submitTransaction() {
    const { navigation, userData } = this.props;
    let data = {}
    if (this.state.isAddressValid) {
      if (navigation.state.params === undefined) {
        data = {
          name: userData.name,
          phone: userData.phone,
          street: userData.address.street,
          city: userData.address.city,
          district: userData.address.district,
          village: userData.address.village,
          token: this.state.token
        }
      }else{
        data = {
          name: navigation.state.params.name,
          phone: navigation.state.params.phone,
          street: navigation.state.params.street,
          city: navigation.state.params.city,
          district: navigation.state.params.district,
          village: navigation.state.params.village,
          token: this.state.token
        }
      }
      this.setState({loading: true})
      this.props.dispatch(confirmTransaction(data))
    }else{
      Alert.alert(
        'Kesalahan',
        'Alamat yang anda berikan kurang lengkap, silahkan lengkapi dahulu alamat anda.',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  queueRouting() {
    this.props.navigation.popToTop();
    this.props.navigation.navigate('Profile');
  }

  render() {
    const listData = this.props.cart.filter(x => x.status === true)
    let total = 0;
    const loop = this.props.cart.map(x => total += x.subtotal)
    let params = {}
    if (this.props.navigation.state.params === undefined) {
        params = this.props.userData
    }else{
      params = {
        name: this.props.navigation.state.params.name,
        phone: this.props.navigation.state.params.phone,
        address: {
          street: this.props.navigation.state.params.street,
          city: this.props.navigation.state.params.city,
          district: this.props.navigation.state.params.district,
          village: this.props.navigation.state.params.village
        }
      }
    }
    const newParams = Object.assign({}, params, {token: this.state.token})
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <Modal
          isVisible={this.state.loading}
          style={{alignItems: 'center'}}
          hideModalContentWhileAnimating={true}
          useNativeDriver
          >
          {
            this.state.transactionLoading
            ?
            <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
              <DotIndicator
                color='#7c0c10'
                size={8}
              />
            </View>
            :
            <View style={{backgroundColor: '#cce8c2', borderRadius: 5, width: 300}}>
              <View style={{borderBottomColor: '#98c189', borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: '#228200'}}>Konfirmasi Sukses</Text>
              </View>
              <ScrollView style={{backgroundColor: '#f7fff4', padding: 20, height: 400}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#bababa', marginBottom: 2}}>Kode Transaksi</Text>
                  <Text style={{fontSize: 20, marginBottom: 10}}>{this.props.transaction.trx}</Text>
                  <Text style={{color: '#bababa'}}>Jumlah Tagiahan Anda</Text>
                  <Text style={{marginBottom: 10, fontSize: 18}}>{idrFormat(this.props.transaction.total_price)}</Text>
                  <Text style={{color: '#bababa', marginBottom: 5}}>Metode Pembayaran</Text>
                  <Text>Transfer ke rekening BCA</Text>
                  <Text style={{fontSize: 17, marginBottom: 10}}>2820260417</Text>
                  <Text style={{textAlign: 'center', color:'#bababa'}}>Jumlah transfer pembayaran harus sesuai</Text>
                  <Text style={{textAlign: 'center', color:'#bababa'}}>dengan jumlah tagihan (hingga 3 digit terakhir)</Text>
                  <Text style={{textAlign: 'center', color:'#bababa', marginBottom: 10}}>Isi Nomor Transaksi pada kolom Detail Transfer</Text>
                  <Text style={{color: '#bababa', marginBottom: 10}}>Lakukan pembayaran sebelum</Text>
                  <Text style={{fontSize: 20, marginBottom: 20}}>{moment(this.props.transaction.due_date).format('DD MMM YYYY HH:mm')}</Text>
                </View>
                <TouchableOpacity onPress={() => this.queueRouting()} style={styles.button}>
                  <Text style={{color: '#228200'}}>Lihat Detail</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          }
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pembayaran</Text>
        </View>
        <ScrollView>
          <View style={{backgroundColor: 'white', padding: 20}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 10}}>Alamat Pengiriman</Text>
            {
              this.props.navigation.state.params === undefined
              ?
              this.state.isAddressValid
              ?
              <View>
                <Text>{this.props.userData.address.street}</Text>
                <Text>Kecamatan {this.props.userData.address.district}</Text>
                <Text>Kelurahan {this.props.userData.address.village}</Text>
                <Text>{this.props.userData.address.city}</Text>
                <Text>Penerima <Text style={{fontWeight: 'bold'}}>{this.props.userData.name}</Text></Text>
                <Text>Nomor Telepon Penerima: 0{this.props.userData.phone}</Text>
              </View>
              :
              <Text style={{fontStyle: 'italic', color: '#bababa'}}>Alamat belum lengkap</Text>
              :
              <View>
                <Text>{this.props.navigation.state.params.street}</Text>
                <Text>Kecamatan {this.props.navigation.state.params.district}</Text>
                <Text>Kelurahan {this.props.navigation.state.params.village}</Text>
                <Text>{this.props.navigation.state.params.city}</Text>
                <Text>Penerima <Text style={{fontWeight: 'bold'}}>{this.props.navigation.state.params.name}</Text></Text>
                <Text>Nomor Telepon Penerima: {this.props.navigation.state.params.phone}</Text>
              </View>
            }
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditAddress', newParams)} style={{marginTop: 20, height: 40, width: 70, backgroundColor: '#bcbcbc', borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'white', paddingTop: 10}}>
            <Text style={{textAlign: 'center', fontSize: 20, padding: 10}}>Detail Pesanan</Text>
            {
              listData.map((x, i) =>
              <View key={i} style={styles.productWrapper}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{x.product_name}</Text>
                </View>
                <View style={styles.productDetails}>
                  <Image
                    resizeMode='contain'
                    style={{width: 120, height: 120, borderColor: '#eaeaea', borderWidth: 1}}
                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                    />
                  <View>
                    <View style={{marginBottom: 12, flexDirection: 'row'}}>
                      <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Harga :</Text>
                      <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{idrFormat(x.price)}</Text>
                    </View>
                    <View style={{marginBottom: 12, flexDirection: 'row'}}>
                      <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Kuantitas :</Text>
                      <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{x.qty}</Text>
                    </View>
                    <View style={{marginBottom: 12, flexDirection: 'row'}}>
                      <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Subtotal :</Text>
                      <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{idrFormat(x.subtotal)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              )
            }
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', backgroundColor: 'white'}}>
            <Text style={{fontSize: 18, padding: 10, marginLeft: 10}}>Ongkos Kirim</Text>
            <Text style={{fontSize: 16, position: 'absolute', right: 45, top: 10}}>
              {idrFormat(Number(this.state.ongkir))}
            </Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', backgroundColor: 'white'}}>
            <Text style={{fontSize: 18, padding: 10, marginLeft: 10}}>Total Belanja</Text>
            <Text style={{fontSize: 18, position: 'absolute', right: 45, top: 10, fontWeight: 'bold'}}>{idrFormat(total)}</Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', backgroundColor: 'white'}}>
            <Text style={{fontSize: 18, padding: 10, marginLeft: 10}}>Total Pembayaran</Text>
            <Text style={{fontSize: 18, position: 'absolute', right: 45, top: 10, fontWeight: 'bold'}}>{idrFormat(total + this.state.ongkir)}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
            <TouchableOpacity onPress={() => this.submitTransaction()} style={{marginTop: 10, borderRadius: 3, height: 50, width: 350, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 16}}>Konfirmasi Pemesanan</Text>
            </TouchableOpacity>
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
  productWrapper: {
    alignItems: 'center'
  },
  productHeader: {
    borderColor: '#eaeaea',
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    width: '100%'
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20
  },
  productDetails: {
    backgroundColor: 'white',
    height: 160,
    width: '100%',
    padding: 20,
    flexDirection: 'row'
  },
  button: {
    marginBottom: 40,
    width: 250,
    height: 45,
    backgroundColor: '#c4dbc0',
    borderColor: '#228200',
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Payment);
