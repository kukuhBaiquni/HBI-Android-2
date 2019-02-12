import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class Tracking extends Component {
  render() {
    const { navigation } = this.props;
    return(
      <View>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Image style={{height: 18, width: 18}} source={require('../../android/app/src/main/assets/custom/BackDarkred.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tracking</Text>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Tracking);

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cecece',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: '#7c0c10'
  },
})
