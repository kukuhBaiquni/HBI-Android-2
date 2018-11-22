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
import ReactNativeParallaxHeader from 'react-native-parallax-header';

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

  render() {
    const { navigation } = this.props;
    const Animation = this.state.scrollY.interpolate({
      inputRange: [0, 145],
      outputRange: [50, 0],
      extrapolate: 'clamp'
    });
    return(
      <View style={{flex: 1}}>
        <ReactNativeParallaxHeader
          headerMinHeight={55}
          headerMaxHeight={200}
          extraScrollHeight={20}
          navbarColor='white'
          title={navigation.state.params.productname}
          backgroundColor='#e2e2e2'
          titleStyle={styles.productName}
          backgroundImage={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
          backgroundImageScale={2}
          renderNavBar={() => (
            <View style={styles.fixedNavbar}>
              <View style={{position: 'absolute', left: 0, marginLeft: 10}}>
                <Icon onPress={() => navigation.navigate('ShopPage')} name='arrow-back' color='#7c0c10' />
              </View>
            </View>
          )}
          renderBackButton={() => (
            <Icon onPress={() => navigation.navigate('ShopPage')} name='arrow-back' color='#7c0c10' />
          )}
          renderContent={() => (
            <ScrollView
              style={{backgroundColor: '#e2e2e2'}}
              onScroll={
                Animated.event(
                  [{ nativeEvent: {
                      contentOffset: {
                        y: this.state.scrollY
                      }
                    }
                  }]
                )
              }
              >
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
              <View style={{height: 60}}></View>
            </ScrollView>
          )}
        />
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={[styles.fixedCart, {backgroundColor: '#7c0c10', right: 0}]}>
            <View
              style={styles.badge}
              animation={this.state.changeAnimation ? 'zoomOut' : 'zoomIn'}
              delay={1000}
              duration={700}
              >
              <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', color: 'white'}}>2</Text>
            </View>
            <Icon name='shopping-cart' size={20} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={(r) => this.testing('b')} style={[styles.fixedCartLeft, {backgroundColor: '#7c0c10', left: 0}]}>
            {
              this.state.loading
              ? <UIActivityIndicator color='white' size={20} />
              :
              <View>
                <Icon name='add-shopping-cart' size={20} color='white'/>
                <Text style={{color: 'white', textAlign: 'center'}}>Add to Cart</Text>
              </View>
            }
          </TouchableOpacity>
        </View>
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
  fixedCart: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginTop: -53,
    justifyContent: 'center',
    position: 'absolute',
    marginRight: 10,
    zIndex: 5,
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
  badge: {
    position: 'absolute',
    height: 20,
    width: 20,
    backgroundColor: 'orange',
    borderRadius: 10,
    right: -5,
    top: -5,
    zIndex: 1,
    justifyContent: 'center',
  },
  fixedNavbar: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55
  }
});
