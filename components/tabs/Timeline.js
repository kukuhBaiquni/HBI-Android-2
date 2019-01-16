import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';

class Timeline extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
          <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Timeline</Text>
        </View>
        <ScrollView>
          <View style={{backgroundColor: 'white', height: 200, marginTop: 10}}>
            <Text style={{fontSize: 17, marginLeft: 10}}>Kata Mereka</Text>
          </View>
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
)(Timeline);
