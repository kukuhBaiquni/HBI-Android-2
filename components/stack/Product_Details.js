import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Picker, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Right, Button, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
import { BarIndicator } from 'react-native-indicators';
import Swipable from '../Swipable';
import RNParallax from '../Parallax_Header';
import CartIcon from '../Cart_Icon';
import Modal from "react-native-modal";
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { countItem } from '../../actions/Counting_Items';
import { addToCart, forceResetATC } from '../../actions/Add_To_Cart';

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      isLoggedIn: false,
      loading: false,
      token: '',
      showModalContent: false,
      itemCount: 1 // data
    }
  }

  changeCount(x) {
    let count = this.state.itemCount
    if (x === 'inc') {
      count ++
      this.setState({itemCount: count, loading: true})
    }else{
      if (count > 1) {
        count --
        this.setState({itemCount: count, loading: true})
      }
    }
    var data = {
      token: this.state.token,
      id: this.props.navigation.state.params.id,
      qty: count
    }
    this.props.dispatch(countItem(data))
  }

  addToCart(v) {
    this.setState({showModal: false})
    const item = {
      token: this.state.token,
      id: this.props.navigation.state.params.id,
      qty: this.state.itemCount
    }
    this.props.dispatch(addToCart(item));
  }

  showModal() {
    if (this.state.isLoggedIn) {
      this.setState({
        showModal: true
      })
    }else{
      Alert.alert(
        'Kesalahan',
        'Anda harus login untuk berbelanja, login sekarang?',
        [
          {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
          {text: 'TIDAK'}
        ],
        { cancelable: false }
      );
    }
  }

  checkToken = async () => {
    try {
      const val = await AsyncStorage.getItem('access_token');
      if (val !== null) {
        this.setState({isLoggedIn: true, token: JSON.parse(val)})
      }else{
        this.setState({isLoggedIn: false})
      }
    } catch (error) {
      this.setState({isLoggedIn: false})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resultCounting !== this.props.resultCounting) {
      this.setState({loading: false})
    }
    if (this.props.status.addToCart.error !== this.props.status.addToCart.success) {
      if (this.props.status.addToCart.error) {
        showMessage({
          message: 'Gagal',
          description: 'Proses gagal, silahkan ulangi permintaan anda',
          type: 'danger',
        });
        this.props.dispatch(forceResetATC())
      }
      if (this.props.status.addToCart.success) {
        showMessage({
          message: 'Sukses',
          description: 'Produk berhasil ditambahkan ke keranjang.',
          type: 'success',
        });
        this.props.dispatch(forceResetATC())
      }
    }
  }

  directPurchase = async () => {
    try{
      if (this.state.token !== '') {
        const item = this.props.navigation.state.params;
        await AsyncStorage.setItem('direct_purchase', JSON.stringify(item))
        this.props.navigation.navigate('DirectPayment')
      }else{
        Alert.alert(
          'Kesalahan',
          'Anda harus login untuk berbelanja, login sekarang?',
          [
            {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
            {text: 'TIDAK'}
          ],
          { cancelable: false }
        );
      }
    }catch(error) {}
  }

  removeStorage = async () => {
    try{
      await AsyncStorage.removeItem('direct_purchase');
    }catch(error) {}
  }

  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onDidFocus={() => this.checkToken()}
          onWillFocus={() => this.removeStorage()}
          />
        <RNParallax
          headerMinHeight={55}
          headerMaxHeight={200}
          extraScrollHeight={20}
          navbarColor='white'
          scrollEventThrottle={5}
          title={navigation.state.params.productname}
          backgroundColor='#e2e2e2'
          titleStyle={styles.productName}
          backgroundImage={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
          backgroundImageScale={2}
          renderNavBar={() => (
            <View style={styles.fixedNavbar}>
              <View style={{position: 'absolute', left: 0, marginLeft: 10}}>
                <Icon onPress={() => navigation.navigate('Shopping')} name='arrow-back' color='#7c0c10' />
              </View>
              <TouchableOpacity style={{position: 'absolute', right: 20, borderRadius: 50, height: 30, width: 30, justifyContent: 'center'}}>
                <CartIcon navigation={navigation} bcolor='#7c0c10'/>
              </TouchableOpacity>
            </View>
          )}
          renderBackButton={() => (
            <Icon onPress={() => navigation.navigate('Shopping')} name='arrow-back' color='white' />
          )}
          renderCartIcon={() => (
            <CartIcon navigation={navigation} />
          )}
          renderContent={() => (
            <ScrollView style={{backgroundColor: '#e2e2e2'}}>
              <View style={{backgroundColor: 'white', height: 50}}></View>
              <View style={styles.viewContainer}>
                <Text style={styles.subtitle}>Deskripsi Produk</Text>
                <Text style={styles.text}>{navigation.state.params.description}</Text>
              </View>
              <View style={[styles.viewContainer, {marginBottom: 10}]}>
                <Text style={styles.subtitle}>Harga</Text>
                <Text style={styles.text}>Harga Member: {idrFormat(navigation.state.params.resellerprice)}</Text>
                <Text style={styles.text}>Harga Normal: {idrFormat(navigation.state.params.enduserprice)}</Text>
              </View>
              <Swipable navigation={ navigation } />
              <View style={{height: 50}} />
            </ScrollView>
          )}
        />
        <TouchableNativeFeedback>
          <View style={styles.footerWrapper}>
            <TouchableOpacity  style={{backgroundColor: 'white', width: '20%', height: 50, justifyContent: 'center'}} onPress={() => this.showModal()}>
              <Icon name='add-shopping-cart' size={28} color='#7c0c10'/>
            </TouchableOpacity>
            <TouchableNativeFeedback onPress={() => this.directPurchase()}>
              <View style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Beli Sekarang</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </TouchableNativeFeedback>
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
                      source={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
                      />
                  </View>
                  <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                    <Text style={{fontSize: 16, width: 140, textAlign: 'left', color: '#919191'}}>{navigation.state.params.productname}</Text>
                    {
                      this.state.loading
                      ?
                      <View style={{height: 24, width: 80, paddingTop: 7, alignItems: 'center'}}>
                        <BarIndicator count={5} size={15} color='#919191' />
                      </View>
                      :
                      <Text style={{fontWeight: 'bold', marginTop: 5}}>{idrFormat(this.state.itemCount === 1 ? navigation.state.params.enduserprice : this.props.resultCounting)}</Text>
                    }
                    {/*Increment Button*/}
                    <View style={{flexDirection: 'row', width: 110, height: 40, marginTop: 20, justifyContent: 'space-between'}}>
                      <TouchableNativeFeedback onPress={(x) => this.changeCount('dec')}>
                        <View style={{height: 30, width: 30, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                          <Text style={{color: 'white', fontSize: 22}}>-</Text>
                        </View>
                      </TouchableNativeFeedback>
                      <View style={{width: 40, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 3}}>
                        <Text>{this.state.itemCount}</Text>
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
                  <TouchableOpacity onPress={(x) => this.addToCart(navigation.state.params)}>
                    <View style={{height: 45, width: 260, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                      <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            }
          </View>
        </Modal>
        <FlashMessage
          position='top'
          floating={true}
          duration={3000}
          ref='suc'
          icon={this.state.isLoggedIn ? {icon: 'success', position: 'left'} : {icon: 'danger', position: 'left'}}
          />
      </View>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(ProductDetails);

const styles = StyleSheet.create({
  productName: {
    color: '#7c0c10',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: -40,
    marginBottom: -25,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  },
  viewContainer: {
    backgroundColor: 'white',
    padding: 25,
    marginTop: 10
  },
  text: {
    textAlign: 'left',
    paddingTop: 10,
    color: '#9b9b9b'
  },
  containerWithIcon: {
    backgroundColor: 'white',
    paddingTop: 13,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row'
  },
  fixedCartLeft: {
    height: 45,
    width: 80,
    borderRadius: 5,
    marginTop: -53,
    justifyContent: 'center',
    position: 'absolute',
    marginLeft: 10,
    zIndex: 5,
  },
  fixedNavbar: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55
  },
  footerWrapper: {
    backgroundColor: '#7c0c10',
    height: 50, width: '100%',
    right: 0,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopColor: '#7c0c10',
    borderTopWidth: 1
  }
});
