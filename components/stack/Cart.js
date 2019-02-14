import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Alert, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity, Image, Picker, TouchableNativeFeedback } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { countItem } from '../../actions/Counting_Items';
import { BarIndicator } from 'react-native-indicators';
import { saveChanges, forceResetSC } from '../../actions/Save_Changes';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { cartCheckPartial, forceResetCP } from '../../actions/Cart_Check_Partial';
import { cartCheckAll, forceResetCA } from '../../actions/Cart_Check_All';
import { removeItem, forceResetRI } from '../../actions/Remove_Item';
import { withNavigationFocus } from 'react-navigation';

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      showModalContent: false,
      token: '',
      loading: false,
      index: 0,
      idProduct: 0,
      id_Product: '',
      productName: '',
      productPrice: 0,
      subtotal: 0,
      qty: 0,
      productPhoto: '',
      number: 0
    }
  }

  checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token !== null) {
        const raw = JSON.parse(token);
        this.setState({token: raw, number: this.props.cart.length})
      }else{
        Alert.alert(
          'Kesalahan',
          'Anda harus login untuk melihat keranjang, login sekarang?',
          [
            {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
            {text: 'TIDAK'}
          ],
          { cancelable: false }
        );
      }
    }catch (error) {
      Alert.alert(
        'Kesalahan',
        'Anda harus login untuk melihat keranjang, login sekarang?',
        [
          {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
          {text: 'TIDAK'}
        ],
        { cancelable: false }
      );
    }
  }

  changeCount(x) {
    let count = this.state.qty
    if (x === 'inc') {
      count ++
      this.setState({qty: count, loading: true})
    }else{
      if (count > 1) {
        count --
        this.setState({qty: count, loading: true})
      }
    }
    var data = {
      token: this.state.token,
      id: this.state.idProduct,
      qty: count
    }
    this.props.dispatch(countItem(data))
  }

  showSpecificModal(x) {
    this.props.dispatch(forceResetSC())
    const { cart } = this.props;
    this.setState({
      idProduct: cart[x].id,
      id_Product: cart[x]._id,
      showModal: true,
      productName: cart[x].product_name,
      subtotal: cart[x].subtotal,
      productPrice: cart[x].price,
      productPhoto: cart[x].photo,
      qty: cart[x].qty,
      index: x
    });
  }

  onSave() {
    this.setState({showModal: false, showModalContent: false})
    const data = {
      token: this.state.token,
      id: this.state.idProduct,
      _id: this.state.id_Product,
      qty: this.state.qty
    }
    this.props.dispatch(saveChanges(data))
  }

  removeSingleItem(n) {
    this.props.dispatch(forceResetRI())
    const { cart } = this.props;
    const data = {
      id: cart[n]._id,
      token: this.state.token
    }
    Alert.alert(
      'Hapus Produk',
      'Apakah anda yakin ingin menghapus produk ini?',
      [
        {text: 'YA', onPress: () => this.props.dispatch(removeItem(data))},
        {text: 'TIDAK'}
      ],
      { cancelable: false }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resultCounting !== this.props.resultCounting) {
      this.setState({loading: false, subtotal: this.props.resultCounting})
    }
    if (prevProps.status.saveChanges.success !== this.props.status.saveChanges.success) {
      if (this.props.status.saveChanges.success) {
        showMessage({
          message: 'Sukses',
          description: 'Perubahan berhasil disimpan',
          type: 'success'
        });
      }
    }
    if (prevProps.status.saveChanges.error !== this.props.status.saveChanges.error) {
      if (this.props.status.saveChanges.error) {
        showMessage({
          message: 'Gagal',
          description: 'Perubahan gagal disimpan',
          type: 'error'
        });
      }
    }
    if (prevProps.cart !== this.props.cart) {
      let count = 0;
      this.props.cart.forEach(x => {
        if (x.status) {
          count++
        }
      })
      this.setState({number: count})
      if (count === this.props.cart.length) {
        this.setState({checkControl: true})
      }else{
        this.setState({checkControl: false})
      }
    }
    if (prevProps.status.checkPartial.error !== this.props.status.checkPartial.error) {
      if (this.props.status.checkPartial.error) {
        Alert.alert(
          'Kesalahan',
          'Silahkan ulangi permintaan anda.',
          [
            {text: 'OK', onPress: () => this.props.dispatch(forceResetCP())},
          ],
          { cancelable: false }
        );
      }
    }
    if (prevProps.status.checkAll.error !== this.props.status.checkAll.error) {
      if (this.props.status.checkAll.error) {
        Alert.alert(
          'Kesalahan',
          'Silahkan ulangi permintaan anda.',
          [
            {text: 'OK', onPress: () => this.props.dispatch(forceResetCA())},
          ],
          { cancelable: false }
        );
      }
    }
    if (prevProps.status.removeItem.error !== this.props.status.removeItem.error) {
      if (this.props.status.removeItem.error) {
        Alert.alert(
          'Kesalahan',
          'Silahkan ulangi permintaan anda.',
          [
            {text: 'OK', onPress: () => this.props.dispatch(forceResetRI())},
          ],
          { cancelable: false }
        );
      }
    }
    if (prevProps.status.removeItem.success !== this.props.status.removeItem.success) {
      if (this.props.status.removeItem.success) {
        showMessage({
          message: 'Sukses',
          description: 'Produk berhasil dihapus',
          type: 'success'
        });
      }
    }
  }

  render() {
    const { navigation, cart, isFocused } = this.props;
    let total = 0
    cart.forEach(x => total += x.subtotal)
    if (isFocused) {
      return(
        <View style={{flex: 1}}>
          <NavigationEvents
            onWillFocus={() => this.checkToken()}
            />
            {/*=============================================*/}
            <Modal
              isVisible={this.state.showModal}
              style={{alignItems: 'center'}}
              onBackdropPress={() => this.setState({showModal: false})}
              onBackButtonPress={() => this.setState({showModal: false})}
              onModalShow={() => this.setState({showModalContent: true})}
              onModalHide={() => this.setState({showModalContent: false})}
              hideModalContentWhileAnimating={true}
              useNativeDriver
              >
                <View style={{ backgroundColor: 'white', width: 300, height: 250, borderRadius: 4}}>
                  <View style={{borderBottomColor: '#e0e0e0', borderBottomWidth: 1, width: '100%'}}>
                    <Text style={{textAlign: 'left', padding: 15, color: '#919191', fontSize: 16}}>Pilihan Anda</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}>
                      <Icon name='clear' color='#919191' size={22} onPress={() => this.setState({showModal: false})}/>
                    </TouchableOpacity>
                  </View>
                  {
                    this.state.showModalContent &&
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{elevation: 1, width: 120, height: 120, marginTop: 10, marginLeft: 20}}>
                        <Image
                          resizeMode='contain'
                          style={{width: 120, height: 120, borderColor: '#e2e2e2', borderWidth: 1}}
                          source={{uri: `${SERVER_URL}images/products/${this.state.productPhoto}`}}
                          />
                      </View>
                      <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                        <Text style={{fontSize: 16, width: 140, textAlign: 'left', color: '#919191'}}>{this.state.productName}</Text>
                        {
                          this.state.loading
                          ?
                          <View style={{height: 24, width: 80, paddingTop: 7, alignItems: 'center'}}>
                            <BarIndicator count={5} size={15} color='#919191' />
                          </View>
                          :
                          <Text style={{fontWeight: 'bold', marginTop: 5}}>{idrFormat(this.state.qty === 1 ? this.state.productPrice : this.state.subtotal)}</Text>
                        }
                        {/*Increment Button*/}
                        <View style={{flexDirection: 'row', width: 110, height: 40, marginTop: 20, justifyContent: 'space-between'}}>
                          <TouchableNativeFeedback onPress={(x) => this.changeCount('dec')}>
                            <View style={{height: 30, width: 30, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                              <Text style={{color: 'white', fontSize: 22}}>-</Text>
                            </View>
                          </TouchableNativeFeedback>
                          <View style={{width: 40, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 3}}>
                            <Text>{this.state.qty}</Text>
                          </View>
                          <TouchableNativeFeedback onPress={(x) => this.changeCount('inc')}>
                            <View style={{height: 30, width: 30, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                              <Text style={{color: 'white', fontSize: 18}}>+</Text>
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                      </View>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 10, marginBottom:20}}>
                      <TouchableOpacity onPress={() => this.onSave()}>
                        <View style={{height: 45, width: 260, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                          <Text style={{color: 'white'}}>Simpan perubahan</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                }
              </View>
            </Modal>
            {/*=============================================*/}
          {
            cart.length !== 0
            ?
            <View style={{flex: 1}}>
              <ScrollView style={{backgroundColor: '#d9d9d9'}}>
                {
                  cart.map((x, i) =>
                    <View key={i} style={{alignItems: 'center'}}>
                      <View style={{backgroundColor: 'white', marginTop: 10, width: '95%', borderRadius: 3, elevation: 3}}>
                        <View style={{marginBottom: 15}}>
                          <Text style={styles.productName}>{x.product_name}</Text>
                          <TouchableOpacity style={{position: 'absolute', right: 5, top: 5}} onPress={(x) => this.removeSingleItem(i)}>
                            <Icon name='delete' color='#9b9b9b' />
                          </TouchableOpacity>
                          <View style={styles.productDetails}>
                            <Image
                              resizeMode='contain'
                              style={{width: 90, height: 90, borderColor: '#eaeaea', borderWidth: 1}}
                              source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                              />
                            <View style={{marginBottom: 5, width: '45%'}}>
                              <Text style={{marginLeft: 10, color: '#a3a3a3'}}>Harga</Text>
                              <Text style={{marginLeft: 10, color: '#a3a3a3'}}>Kuantitas</Text>
                              <Text style={{marginLeft: 10, color: '#a3a3a3', position: 'absolute', bottom: 3}}>Subtotal</Text>
                            </View>
                            <View style={{marginBottom: 5}}>
                              <Text style={{textAlign: 'right', color: '#9b9b9b'}}>{idrFormat(Number(x.price))}</Text>
                              <Text style={{textAlign: 'right', color: '#9b9b9b'}}>{x.qty}</Text>
                              <Text onPress={(x) => this.showSpecificModal(i)} style={{textAlign: 'right', fontWeight: 'bold', marginTop: 13, color: '#7c0c10'}}>Ubah Rincian</Text>
                              <Text style={{textAlign: 'right', right: 0, position: 'absolute', bottom: 3, fontWeight: 'bold'}}>
                                {idrFormat(Number(x.price) * Number(x.qty))}
                              </Text>
                            </View>
                          </View>
                          <View style={{alignItems: 'center'}}>
                            <View style={{backgroundColor: '#d7d7d7', height: 1, width: '95%'}} />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }
              </ScrollView>
              <View style={[styles.productHeader, {height: 60, paddingLeft: 20, position: 'absolute', bottom: 0}]}>
                <View>
                  <Text style={{fontSize: 14}}>Total Harga</Text>
                  <Text style={{color: '#7c0c10', fontSize: 20}}>{idrFormat(total)}</Text>
                </View>
                {
                  this.state.number !== 0 &&
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c0c10', width: 80, height: 40, position: 'absolute', right: 20, borderRadius: 3}}>
                    <Text style={{color: 'white', fontSize: 16}}>Bayar</Text>
                  </TouchableOpacity>
                }
              </View>
              <FlashMessage
                position='top'
                floating={true}
                duration={3000}
                ref='suc-cart'
                icon={this.props.status.saveChanges.success ? {icon: 'success', position: 'left'} : {icon: 'danger', position: 'left'}}
                />
            </View>
            :
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Image style={{height: 80, width: 80}} source={require('../../android/app/src/main/assets/custom/emptycart.png')} />
              <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 24, marginTop: 20}}>Oops..</Text>
              <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>Keranjang Belanja Anda kosong!</Text>
            </View>
          }
        </View>
      )
    }else{
      return(
        <View></View>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(withNavigationFocus(Cart));

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: 0
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
    marginLeft: 12,
    marginBottom: 5,
    marginTop: 10
  },
  productDetails: {
    backgroundColor: 'white',
    height: 100,
    flexDirection: 'row',
    marginLeft: 12
  },
})
