import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class Animate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xHorizontal: new Animated.Value(0),
    }
  }

  loader() {
    return this.state.xHorizontal.interpolate({
      inputRange: [0, 500],
      outputRange: [0, SCREEN_WIDTH],
      extrapolate: 'clamp'
    })
  }

  render() {
    const a = Array(100).fill('z')
    return(
      <View style={{justifyContent: 'center', flex: 1}}>
        <Animated.View style={{width: this.loader(), height: 5, backgroundColor: 'red'}} />
        <ScrollView onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.xHorizontal}}}]
          )}>
          {
            a.map((x, i) =>
              <View key={i} style={{height:30}}></View>
            )
          }
        </ScrollView>
      </View>
    )
  }
}
