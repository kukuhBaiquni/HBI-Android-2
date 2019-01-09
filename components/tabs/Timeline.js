import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';

class Timeline extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#7c0c10', padding: 10, flexDirection: 'row'}}>
          <Image
            resizeMode='contain'
            style={{width: 50, height: 50, borderRadius: 120}}
            source={{uri: `${SERVER_URL}images/logos/logo.png`}}
            />
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, paddingTop: 10, paddingLeft: 10}}>Timeline</Text>
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
)(Timeline);
