import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, AsyncStorage, Alert, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { loadCart } from '../../actions/Load_Cart';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';

class Cart extends Component {

  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keranjang Belanja</Text>
        </View>
        <ScrollView style={{backgroundColor: '#d9d9d9'}}>
          {
            navigation.state.params.map((x, i) =>
            <View key={i} style={styles.productWrapper}>
              <View style={styles.productHeader}>
                <CheckBox
                  containerStyle={{backgroundColor: 'transparent', position: 'absolute', borderWidth: 0}}
                  iconType='material'
                  checkedIcon='check-box'
                  uncheckedIcon='check-box-outline-blank'
                  checked={true}
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
                  <TouchableOpacity style={{marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold', textDecorationLine: 'underline', color: '#942A2A'}}>Ubah Rincian</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
            )
          }
        </ScrollView>
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
