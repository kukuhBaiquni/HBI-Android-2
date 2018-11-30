import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Right, Button, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../config';
import { idrFormat } from '../config';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { UIActivityIndicator } from 'react-native-indicators';
import Swipable from './Swipable';
import RNParallax from './Parallax_Header';
import CartIcon from './Cart_Icon';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProcess: false,
      loading: false,
      scrollY : new Animated.Value(0)
    }
  }

  // componentDidMount() {
  //   console.log(this.props.navigation.state.params);
  // }

  showProcess() {
    this.setState({showProcess: true})
  }

  hideProcess() {
    this.setState({showProcess: false})
  }

  testing(e) {
    showMessage({
      message: 'Sukses',
      description: 'Produk berhasil ditambahkan ke keranjang',
      type: 'success'
    })
    this.setState(function(prevState) {
      return {loading: !prevState.loading}
    })
  }

  addToCart() {
    showMessage({
      message: 'Sukses',
      description: 'Produk berhasil ditambahkan ke keranjang',
      type: 'success'
    })
  }

  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
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
              <View style={{position: 'absolute', right: 20}}>
                <CartIcon navigation={navigation} bcolor='#7c0c10'/>
              </View>
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
              <View style={styles.viewContainer}>
                <Text style={styles.subtitle}>Harga</Text>
                <Text style={styles.text}>Harga Member: {idrFormat(navigation.state.params.resellerprice)}</Text>
                <Text style={styles.text}>Harga Normal: {idrFormat(navigation.state.params.enduserprice)}</Text>
              </View>
              {
                !this.state.showProcess
                ?
                <TouchableNativeFeedback onPress={() => this.showProcess()}>
                  <View style={styles.containerWithIcon}>
                    <Text style={styles.subtitle}>Pilihan Proses</Text>
                    <Right>
                      <Icon name='chevron-right'/>
                    </Right>
                  </View>
                </TouchableNativeFeedback>
                :
                <TouchableNativeFeedback onPress={() => this.hideProcess()}>
                  <View style={{backgroundColor: 'white', marginBottom: 20}}>
                    <View style={styles.containerWithIcon}>
                      <Text style={styles.subtitle}>Pilihan Proses</Text>
                      <Right>
                        <Icon name='expand-more'/>
                      </Right>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 25, paddingBottom: 25}}>Cutting</Text>
                      {
                        navigation.state.params.process.cut.length === 0
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                        : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 25, paddingBottom: 25}}>Slicing</Text>
                      {
                        navigation.state.params.process.slice.length === 0
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                        : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 25, paddingBottom: 25}}>Grinding</Text>
                      {
                        navigation.state.params.process.grind === null || navigation.state.params.process.grind
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                        : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                      }
                    </View>
                  </View>
                </TouchableNativeFeedback>
              }
              <Swipable navigation={ navigation } />
              <View style={{height: 50}} />
            </ScrollView>
          )}
        />
        <TouchableNativeFeedback>
          <View style={styles.footerWrapper}>
            <TouchableOpacity  style={{backgroundColor: 'white', width: '20%', height: 50, justifyContent: 'center'}} onPress={() => this.addToCart()}>
              <Icon name='add-shopping-cart' size={28} color='#7c0c10'/>
            </TouchableOpacity>
            <TouchableNativeFeedback>
              <View style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Beli Sekarang</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </TouchableNativeFeedback>
        <FlashMessage
          position='top'
          duration={2000}
          floating={true}
          icon={{icon: 'success', position: 'left'}}
          />
      </View>
    )
  }
}
// <TouchableOpacity onPress={(r) => this.testing('b')} style={[styles.fixedCartLeft, {backgroundColor: '#7c0c10', left: 0}]}>
//   {
//     this.state.loading
//     ? <UIActivityIndicator color='white' size={20} />
//     :
//     <View>
//       <Icon name='add-shopping-cart' size={20} color='white'/>
//       <Text style={{color: 'white', textAlign: 'center'}}>Add to Cart</Text>
//     </View>
//   }
// </TouchableOpacity>

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

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
