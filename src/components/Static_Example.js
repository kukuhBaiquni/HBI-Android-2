import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { SERVER_URL } from '../components/basic/supportFunction';

const HEADER_EXPANDED_HEIGHT = 220;
const HEADER_COLLAPSED_HEIGHT = 60;

const { width: SCREEN_WIDTH } = Dimensions.get("screen")

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    const customize = this.state.scrollY.interpolate({
      inputRange: [0, 300-300],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28, opacity: headerTitleOpacity}}>Title</Animated.Text>
          <Animated.Text style={{textAlign: 'center', fontSize: 32, color: 'black', position: 'absolute', bottom: 16, left: 16, opacity: heroTitleOpacity}}>
            HEADER
          </Animated.Text>
          <Animated.Image
            resizeMode='contain'
            style={[styles.image, {opacity: heroTitleOpacity, height: headerHeight, width: SCREEN_WIDTH}]}
            source={{uri: `${SERVER_URL}images/products/Baso.jpg`}}
            />
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: {
              contentOffset: {
                y: this.state.scrollY
              }
            }
          }])
        }
        scrollEventThrottle={16}>
        <Text style={styles.title}>This is Title</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
        <Text style={styles.content}>Very Long Text</Text>
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: 220,
    marginTop: -70,
    marginBottom: -25,
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: HEADER_EXPANDED_HEIGHT
  },
  header: {
    backgroundColor: '#7c0c10',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999
  },
  title: {
    marginVertical: 16,
    color: "black",
    fontWeight: "bold",
    fontSize: 24
  }
});
