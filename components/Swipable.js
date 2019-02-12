import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { SERVER_URL } from '../config';

export default class Swipable extends Component {
  render() {
    const { navigation, renderItems } = this.props;
    return(
      <View style={styles.slideContainer}>
        <Text style={[styles.subtitle, {marginBottom: 10, color: 'white'}]}>Lihat juga</Text>
        <Swiper
          height={200}
          horizontal={true}
          autoplay
          autoplayTimeout={4}
          activeDotColor='white'
          >
          {
            this.props.renderItems.map((x, i) =>
            <TouchableOpacity key={i} onPress={() => navigation.replace('ProductDetails', x)}>
              <View style={styles.slide}>
                <Text direction='alternate' animation='zoomIn' iterationCount={1} style={{color: 'white', fontSize: 18, fontWeight: 'bold', position: 'absolute', zIndex: 3, bottom: 45}}>{x.productname}</Text>
                <Image
                 style={{width: 160, height: 120, marginBottom: 70, borderRadius: 10}}
                 source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                 direction='alternate'
                 animation='flipInX'
                 iterationCount={1}
                />
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
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    backgroundColor: '#a8a8a8',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#a0a0a0'
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
