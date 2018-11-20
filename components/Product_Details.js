import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Right, Button, Body, ListItem, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../config';
import { idrFormat } from '../config';
import * as Animatable from 'react-native-animatable';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { UIActivityIndicator } from 'react-native-indicators';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProcess: false,
      showOptions: false,
      changeAnimation: false,
      loading: false
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

  toggleOptions() {
    this.setState(function(prevState) {
      return {changeAnimation: !prevState.changeAnimation}
    })
    this.setState({showOptions: true})
  }

  testing(e) {
    if (this.state.changeAnimation && e === 'a') {
      this.props.navigation.navigate('Cart')
    }
    if (this.state.changeAnimation && e === 'b') {
      showMessage({
        message: 'Sukses',
        description: 'Produk berhasil ditambahkan ke keranjang',
        type: 'success'
      })
    }
    if (this.state.changeAnimation && e === 'c') {
      this.setState(function(prevState) {
        return {loading: !prevState.loading}
      })
    }
  }

  render() {
    return(
      <View>
        <ScrollView>
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{uri: `${SERVER_URL}images/products/${this.props.navigation.state.params.photo}`}}
            />
          <View style={styles.viewContainer}>
            <Text style={styles.subtitle}>Deskripsi Produk</Text>
            <Text style={styles.text}>{this.props.navigation.state.params.description}</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.subtitle}>Harga</Text>
            <Text style={styles.text}>Harga Member: {idrFormat(this.props.navigation.state.params.resellerprice)}</Text>
            <Text style={styles.text}>Harga Normal: {idrFormat(this.props.navigation.state.params.enduserprice)}</Text>
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
                    this.props.navigation.state.params.process.cut.length === 0
                    ?
                    <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                    :
                    <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                  }
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{paddingLeft: 25, paddingBottom: 25}}>Slicing</Text>
                  {
                    this.props.navigation.state.params.process.slice.length === 0
                    ?
                    <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                    :
                    <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                  }
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{paddingLeft: 25, paddingBottom: 25}}>Grinding</Text>
                  {
                    this.props.navigation.state.params.process.grind === null || this.props.navigation.state.params.process.grind
                    ?
                    <Icon color='red' iconStyle={{marginLeft: 10, marginTop: -23}} name="cancel" />
                    :
                    <Icon color='#00ff0c' iconStyle={{marginLeft: 10, marginTop: -23}} name="check-circle" />
                  }
                </View>
              </View>
            </TouchableNativeFeedback>
          }
          <View style={{height: 50}}></View>
        </ScrollView>
        <View>
          <TouchableOpacity onPress={() => this.toggleOptions()} style={[styles.fixedCart, {backgroundColor: '#7c0c10', right: 0}]}>
            <Icon name='more-horiz' size={35} color='white'/>
          </TouchableOpacity>
          {
            this.state.showOptions &&
            <View>
              <TouchableOpacity onPress={(e) => this.testing('a')} style={[styles.fixedCart, {right: 50}]}>
                <Animatable.View
                  animation={this.state.changeAnimation ? 'fadeInRight' : 'fadeOutRight'}
                  iterationCount={1}
                  duration={this.state.changeAnimation ? 500 : 1000}
                  style={[styles.fixedCart, {backgroundColor: '#c4c4c4'}]}
                  >
                  <Icon name='shopping-cart' size={22} color='#7c0c10'/>
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={(e) => this.testing('b')} style={[styles.fixedCart, {right: 100}]}>
                <Animatable.View
                  animation={this.state.changeAnimation ? 'fadeInRight' : 'fadeOutRight'}
                  iterationCount={1}
                  duration={this.state.changeAnimation ? 750 : 750}
                  style={[styles.fixedCart, {backgroundColor: '#c4c4c4'}]}
                  >
                  <Icon name='remove-shopping-cart' size={22} color='#7c0c10'/>
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={(e) => this.testing('c')} style={[styles.fixedCart, {right: 150}]}>
                <Animatable.View
                  animation={this.state.changeAnimation ? 'fadeInRight' : 'fadeOutRight'}
                  iterationCount={1}
                  duration={this.state.changeAnimation ? 1000 : 500}
                  style={[styles.fixedCart, {backgroundColor: '#c4c4c4'}]}
                  >
                  {
                    this.state.loading
                    ? <UIActivityIndicator color='#7c0c10' size={20} />
                    : <Icon name='add-shopping-cart' size={22} color='#7c0c10'/>
                  }
                </Animatable.View>
              </TouchableOpacity>
            </View>
          }
        </View>
        <FlashMessage
          position='top'
          duration={3000}
          icon={{icon: 'success', position: 'left'}}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: 300,
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
    marginBottom: 10
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
    zIndex: 5
  }
});
