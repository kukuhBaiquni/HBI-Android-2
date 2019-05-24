import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { SERVER_URL, IDR_FORMAT } from '../components/basic/supportFunction';

export default class Swipable extends Component {
  render() {
    const { navigation, renderItems } = this.props;
    return(
      <View style={styles.slideContainer}>
        <Text style={[styles.subtitle, {color: '#333333'}]}>Rekomendasi Produk Lainnya</Text>
        <Swiper
          height={320}
          horizontal={true}
          autoplay
          autoplayTimeout={4}
          activeDotColor='#7c0c10'
          >
          {
            this.props.renderItems.map((x, i) =>
            <TouchableOpacity key={i} onPress={() => navigation.replace('ProductDetails', x)}>
              <View style={styles.slide}>
                <View style={{width: 240, alignItems: 'center', elevation: 3, height: 260, borderRadius: 3}}>
                  <Image
                   style={{width: 160, height: 140, marginBottom: 70, borderRadius: 10, marginTop: 30}}
                   source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                   direction='alternate'
                   animation='flipInX'
                   iterationCount={1}
                  />
                <Text direction='alternate' animation='zoomIn' iterationCount={1} style={styles.productName}>{x.productname}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom: 25}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 12, }}>Harga Normal</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 12, color: 'red'}}>Harga Member</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'right'}}>{IDR_FORMAT(x.enduserprice)}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'right', color: 'red'}}>{IDR_FORMAT(x.resellerprice)}</Text>
                  </View>
                </View>
                </View>
              </View>
            </TouchableOpacity>
            )
          }
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 40,
    elevation: 3
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  },
  productName: {color: '#7c0c10', fontSize: 18, fontWeight: 'bold', position: 'absolute', zIndex: 3, bottom: 60}
})
