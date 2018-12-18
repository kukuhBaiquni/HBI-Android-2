import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Alert, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity, Image, Picker, TouchableNativeFeedback } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { idrFormat, processParser } from '../../config';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { countItem } from '../../actions/Counting_Items';
import { BarIndicator } from 'react-native-indicators';
import { saveChanges, forceResetSC } from '../../actions/Save_Changes';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { cartCheckPartial } from '../../actions/Cart_Check_Partial';
import { cartCheckAll } from '../../actions/Cart_Check_All';

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      showModalContent: false,
      token: '',
      loading: false,
      options: [{label: 'None', value: 'None'}, {label: 'Cut', value: 'Cut'}, {label: 'Slice', value: 'Slice'}, {label: 'Grind', value: 'Grind'}],
      picked: 'None',
      selected: '',
      index: 0,
      idProduct: 0,
      id_Product: '',
      productName: '',
      productPrice: 0,
      subtotal: 0,
      qty: 0,
      productPhoto: '',
      productProcess: {},
      selected_process: {},
      number: 0,
      checkControl: true
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

  checkPartial(n, id) {
    let mode = '';
    if (this.props.cart[n].status) {
      mode = 'uchecking'
    }else{
      mode = 'checking'
    }
    const data = {
      token: this.state.token,
      id,
      mode
    }
    this.props.dispatch(cartCheckPartial(data))
  }

  checkAll() {
    let mode = '';
    if (this.state.checkControl) {
      mode = 'unchecking'
    }else{
      mode = 'checking'
    }
    const data = {
      token: this.state.token,
      mode
    }
    this.props.dispatch(cartCheckAll(data))
  }

  onValueChange(val) {
    let target = 0
    if (val === 'Cut') {
      target = 1
    }else if(val === 'Slice') {
      target = 2
    }else if(val === 'Grind') {
      target = 3
    }else{
      target = 0
    }
    let spCopy = Object.assign({}, this.state.selected_process);
    spCopy.index = target;
    this.setState({picked: val, selected_process: spCopy})
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
    const process = processParser(cart[x].selected_process);
    this.setState({
      idProduct: cart[x].id,
      id_Product: cart[x]._id,
      showModal: true,
      productName: cart[x].product_name,
      subtotal: cart[x].subtotal,
      productPrice: cart[x].price,
      productPhoto: cart[x].photo,
      qty: cart[x].qty,
      productProcess: cart[x].process,
      selected_process: process,
      picked: process.process,
      selected: process.size,
      index: x
    });
  }

  onSave() {
    this.setState({showModal: false, showModalContent: false})
    const process = this.state.picked + ' ' + this.state.selected;
    const data = {
      token: this.state.token,
      id: this.state.idProduct,
      _id: this.state.id_Product,
      qty: this.state.qty,
      selected_process: process
    }
    this.props.dispatch(saveChanges(data))
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
    }
  }

  render() {
    const { navigation, cart } = this.props;
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
              <View style={{ backgroundColor: 'white', width: 300, height: 395, borderRadius: 4}}>
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
                  <View style={{alignItems: 'center', marginTop: 10}}>
                    <View style={{height: 195, width: 260, borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 3, padding: 5}}>
                      <Text style={{color: '#919191', marginRight: 5}}>Pilihan Proses</Text>
                        <View style={{height: 50, width: 165, marginTop: 10, marginBottom: 45}}>
                          <RadioForm
                            formHorizontal={false}
                            animation={true}
                            >
                            {
                              this.state.options.map((x, i) =>
                              <RadioButton labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                  obj={x}
                                  index={i}
                                  onPress={(x) => this.onValueChange(x)}
                                  borderWidth={1}
                                  buttonInnerColor={'#7c0c10'}
                                  buttonOuterColor={this.state.selected_process.index === i ? '#7c0c10' : '#919191'}
                                  isSelected={this.state.selected_process.index === i}
                                  buttonSize={10}
                                  buttonOuterSize={20}
                                  buttonWrapStyle={{marginLeft: 10}}
                                  />
                                <RadioButtonLabel
                                  obj={x}
                                  index={i}
                                  labelHorizontal={true}
                                  onPress={(x) => this.onValueChange(x)}
                                  labelStyle={this.state.selected_process.index === i ? {fontSize: 12, color: '#7c0c10', marginTop: -2, fontWeight: 'bold'} : {fontSize: 12, color: '#919191', marginTop: -2}}
                                />
                                </RadioButton>
                              )
                            }
                          </RadioForm>
                        </View>
                        {
                          this.state.picked === 'None' &&
                          <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Anda dapat memilih proses untuk pemesanan setiap produk.</Text>
                        }
                        {
                          this.state.picked === 'Cut' &&
                          <View>
                            {
                              this.state.productProcess.cut.length > 0
                              ?
                              <View style={{marginTop: 10}}>
                                <Text>Pilih Ukuran</Text>
                                <Picker
                                  note
                                  mode='dropdown'
                                  style={{ width: 80, height: 20, marginTop: 5 }}
                                  selectedValue={this.state.selected}
                                  onValueChange={(x) => this.setState({selected: x})}
                                  >
                                  <Picker.Item label='-' value='0' style={{color: 'red'}} />
                                  {
                                    this.state.productProcess.cut.map((x, i) => {
                                      return <Picker.Item key={i} label={x + 'cm'} value={x + 'cm'} style={{color: 'red'}} />
                                    })
                                  }
                                </Picker>
                              </View>
                              :
                              <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses tidak tersedia</Text>
                            }
                          </View>
                        }
                        {
                          this.state.picked === 'Slice' &&
                          <View>
                            {
                              this.state.productProcess.slice.length > 0
                              ?
                              <View style={{marginTop: 10}}>
                                <Text>Pilih Ukuran</Text>
                                <Picker
                                  note
                                  mode='dropdown'
                                  style={{ width: 80, height: 20, marginTop: 5 }}
                                  selectedValue={this.state.selected}
                                  onValueChange={(x) => this.setState({selected: x})}
                                  >
                                  <Picker.Item label='-' value='0' style={{color: 'red'}} />
                                  {
                                    this.state.productProcess.slice.map((x, i) => {
                                      return <Picker.Item key={i} label={x + 'mm'} value={x + 'mm'} style={{color: 'red'}} />
                                    })
                                  }
                                </Picker>
                              </View>
                              :
                              <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses tidak tersedia</Text>
                            }
                          </View>
                        }
                        {
                          this.state.picked === 'Grind' &&
                          <View>
                            {
                              this.state.productProcess.grind === null
                              ?
                              <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses tidak tersedia</Text>
                              :
                              <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses <Text style={{color: '#7c0c10'}}>"Grind"</Text> tersedia</Text>
                            }
                          </View>
                        }
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
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keranjang Belanja</Text>
        </View>
        <View style={[styles.productHeader, {marginTop: 0}]}>
          <CheckBox
            containerStyle={{backgroundColor: 'transparent', position: 'absolute', borderWidth: 0}}
            iconType='material'
            checkedIcon='check-box'
            uncheckedIcon='check-box-outline-blank'
            checked={this.state.checkControl}
            checkedColor='#7c0c10'
            uncheckedColor='#a5a5a5'
            onPress={() => this.checkAll()}
            />
          <Text style={styles.productName}>Pilih semua ({this.state.number}/{this.props.cart.length})</Text>
        </View>
        <ScrollView style={{backgroundColor: '#d9d9d9'}}>
          {
            cart.map((x, i) =>
            <View key={i} style={styles.productWrapper}>
              <View style={styles.productHeader}>
                <CheckBox
                  onPress={(c, d) => this.checkPartial(i, x._id)}
                  containerStyle={{backgroundColor: 'transparent', position: 'absolute', borderWidth: 0}}
                  iconType='material'
                  checkedIcon='check-box'
                  uncheckedIcon='check-box-outline-blank'
                  checked={this.props.cart[i].status}
                  checkedColor='#7c0c10'
                  uncheckedColor='#a5a5a5'
                  />
                <Text style={styles.productName}>{x.product_name}</Text>
                <TouchableOpacity style={{position: 'absolute', right: 15}}>
                  <Icon name='delete' color='#9b9b9b' />
                </TouchableOpacity>
              </View>
              <View style={styles.productDetails}>
                <Image
                  resizeMode='contain'
                  style={{width: 120, height: 120, borderColor: '#eaeaea', borderWidth: 1}}
                  source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                  />
                <View>
                  <View style={{marginBottom: 3, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Harga :</Text>
                    <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{idrFormat(x.price)}</Text>
                  </View>
                  <View style={{marginBottom: 3, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Kuantitas :</Text>
                    <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{x.qty}</Text>
                  </View>
                  <View style={{marginBottom: 3, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Pilihan Proses :</Text>
                    <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{x.selected_process.includes('None') ? '-' : x.selected_process}</Text>
                  </View>
                  <View style={{marginBottom: 3, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Subtotal :</Text>
                    <Text style={{marginLeft: 10, color: '#9b9b9b'}}>{idrFormat(x.subtotal)}</Text>
                  </View>
                  <TouchableOpacity style={{marginTop: 10, flexDirection: 'row'}} onPress={(x) => this.showSpecificModal(i)}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold', textDecorationLine: 'underline', color: '#942A2A'}}>Ubah Rincian</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
            )
          }
        </ScrollView>
        <View style={[styles.productHeader, {marginTop: 0, height: 60, paddingLeft: 20}]}>
          <View>
            <Text style={{fontSize: 14}}>Total Harga</Text>
            <Text style={{color: '#7c0c10', fontSize: 20}}>{idrFormat(this.props.cartTotal)}</Text>
          </View>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c0c10', width: 80, height: 40, position: 'absolute', right: 20, borderRadius: 3}}>
            <Text style={{color: 'white', fontSize: 16}}>Bayar</Text>
          </TouchableOpacity>
        </View>
        <FlashMessage
          position='top'
          floating={true}
          duration={3000}
          ref='suc-cart'
          icon={this.props.status.saveChanges.success ? {icon: 'success', position: 'left'} : {icon: 'danger', position: 'left'}}
          />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Cart);

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
    marginLeft: 55
  },
  productDetails: {
    backgroundColor: 'white',
    height: 160,
    width: '100%',
    padding: 20,
    flexDirection: 'row'
  }
})
