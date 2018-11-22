import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { SERVER_URL } from '../config';

class Swipable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderItems: []
    }
  }

  componentDidMount() {
    let list = [];
    let arr = [];
    let exception = this.props.listProducts.map(function(e) { return e.id }).indexOf(this.props.navigation.state.params.id);
    while(list.length < 5){
      var random = Math.floor(Math.random()*this.props.listProducts.length);
      if(arr.indexOf(random) > -1 || random == exception) continue;
      arr[arr.length] = random;
      list.push(this.props.listProducts[random])
    }
    this.setState({renderItems: list})
  }

  render() {
    const { navigation } = this.props;
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
            this.state.renderItems.map((x, i) =>
            <TouchableNativeFeedback key={i} onPress={() => navigation.replace('ProductDetails', x)}>
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
            </TouchableNativeFeedback>
            )
          }
        </Swiper>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Swipable);

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
