import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Right, Button, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
import { UIActivityIndicator } from 'react-native-indicators';
import Swipable from '../Swipable';
import RNParallax from '../Parallax_Header';
import CartIcon from '../Cart_Icon';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProcess: false,
      showModal: false,
      isLoggedIn: false,
      picked: 'None', // data
      selected: null, //data
      options: [{label: 'None', value: 'None'}, {label: 'Cut', value: 'Cut'}, {label: 'Slice', value: 'Slice'}, {label: 'Grind', value: 'Grind'}],
      index: 0,
      showModalContent: false,
      itemCount: 1 // data
    }
  }

  // componentDidMount() {
  //   console.log(this.props.navigation.state.params);
  // }

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
    this.setState({picked: val, index: target})
  }

  changeCount(x) {
    let count = this.state.itemCount
    if (x === 'inc') {
      count ++
      this.setState({itemCount: count})
    }else{
      if (count > 1) {
        count --
        this.setState({itemCount: count})
      }
    }
  }

  addToCart(v) {
    this.setState({showModal: false})
    if (this.state.isLoggedIn) {
      showMessage({
        message: 'Sukses',
        description: 'Produk berhasil ditambahkan ke keranjang.',
        type: 'success',
      })
    }else{
      showMessage({
        message: 'Gagal',
        description: 'Anda harus login terlebih dahulu untuk berbelanja.',
        type: 'danger',
      })
    }
  }

  goToCartHideModal() {
    this.setState({showModal: false})
    this.props.navigation.navigate('Cart')
  }

  showProcess() {
    this.setState({showProcess: true})
  }

  hideProcess() {
    this.setState({showProcess: false})
  }

  showModal() {
    this.setState({
      showModal: true
    })
  }

  checkToken = async () => {
    try {
      const val = await AsyncStorage.getItem('access_token');
      if (val !== null) {
        console.log(val);
      }
    } catch (error) {
      console.log('Error Cok');
    }
  }

  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onDidFocus={() => this.checkToken()}
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
                      <Text style={{paddingLeft: 25, paddingBottom: 15}}>Cutting</Text>
                      {
                        navigation.state.params.process.cut.length === 0
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -15}} name="cancel" />
                      : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -15}} name="check-circle" />
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 25, paddingBottom: 15}}>Slicing</Text>
                      {
                        navigation.state.params.process.slice.length === 0
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -15}} name="cancel" />
                      : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -15}} name="check-circle" />
                      }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{paddingLeft: 25, paddingBottom: 15}}>Grinding</Text>
                      {
                        navigation.state.params.process.grind === null
                        ? <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -15}} name="cancel" />
                      : <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -15}} name="check-circle" />
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
            <TouchableOpacity  style={{backgroundColor: 'white', width: '20%', height: 50, justifyContent: 'center'}} onPress={() => this.showModal()}>
              <Icon name='add-shopping-cart' size={28} color='#7c0c10'/>
            </TouchableOpacity>
            <TouchableNativeFeedback>
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
                      source={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
                      />
                  </View>
                  <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                    <Text style={{fontSize: 16, width: 140, textAlign: 'left', color: '#919191'}}>{navigation.state.params.productname}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 5}}>{idrFormat(navigation.state.params.enduserprice)}</Text>
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
                                buttonOuterColor={this.state.index === i ? '#7c0c10' : '#919191'}
                                isSelected={this.state.index === i}
                                buttonSize={10}
                                buttonOuterSize={20}
                                buttonWrapStyle={{marginLeft: 10}}
                                />
                              <RadioButtonLabel
                                obj={x}
                                index={i}
                                labelHorizontal={true}
                                onPress={(x) => this.onValueChange(x)}
                                labelStyle={this.state.index === i ? {fontSize: 12, color: '#7c0c10', marginTop: -2, fontWeight: 'bold'} : {fontSize: 12, color: '#919191', marginTop: -2}}
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
                            navigation.state.params.process.cut.length > 0
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
                                  navigation.state.params.process.cut.map((x, i) => {
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
                            navigation.state.params.process.slice.length > 0
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
                                  navigation.state.params.process.slice.map((x, i) => {
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
                            navigation.state.params.process.grind === null
                            ?
                            <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses tidak tersedia</Text>
                            :
                            <Text style={{marginLeft: 5, color: '#919191', marginTop: 10}}>Proses <Text style={{color: '#7c0c10'}}>"Grind"</Text> tersedia</Text>
                          }
                        </View>
                      }
                  </View>
                </View>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                  <TouchableOpacity onPress={(x) => this.addToCart(navigation.state.params)}>
                    <View style={{height: 45, width: 260, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
                      <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                  <TouchableOpacity onPress={() => this.goToCartHideModal()}>
                    <View style={{height: 45, width: 260, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 3, borderWidth: 1, borderColor: '#7c0c10'}}>
                      <Text style={{color: '#7c0c10'}}>Lihat keranjang</Text>
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
