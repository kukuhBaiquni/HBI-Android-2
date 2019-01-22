import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';

class Timeline extends Component {
  constructor(props) {
    super(props)

  }

  beforeRender() {

  }

  render() {
    const dummy = ['1', '2', '3', '4', '5']
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
          <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Timeline</Text>
        </View>
        <ScrollView>
          <View style={{backgroundColor: 'white', marginTop: 10, elevation: 3}}>
            <Text style={{paddingTop: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Kata Mereka</Text>
            <TouchableNativeFeedback>
              <View style={{position: 'absolute', right: 20, top: 8, borderRadius: 4}}>
                <Icon name='more-horiz' size={28} />
              </View>
            </TouchableNativeFeedback>
            <ScrollView horizontal={true} contentContainerStyle={{paddingTop: 10, paddingBottom: 10}} showsHorizontalScrollIndicator={false}>
              {
                dummy.map((x, i) =>
                <View key={i} style={{backgroundColor: 'red', height: 150, width: 150, borderRightColor: 'white', borderRightWidth: 1, borderRadius: 20, marginLeft: 10}}>
                  <Text>Master {x}</Text>
                </View>
                )
              }
            </ScrollView>
          </View>
          <View style={{backgroundColor: 'white', marginTop: 10, elevation: 3}}>
            <Text style={{paddingTop: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Event Kami</Text>
            <TouchableNativeFeedback>
              <View style={{position: 'absolute', right: 20, top: 8, borderRadius: 4}}>
                <Icon name='more-horiz' size={28} />
              </View>
            </TouchableNativeFeedback>
            <ScrollView horizontal={true} contentContainerStyle={{paddingTop: 10, paddingBottom: 10}} showsHorizontalScrollIndicator={false}>
              {
                dummy.map((x, i) =>
                <View key={i} style={{backgroundColor: 'red', height: 150, width: 150, borderRightColor: 'white', borderRightWidth: 1, borderRadius: 20, marginLeft: 10}}>
                  <Text>Master {x}</Text>
                </View>
                )
              }
            </ScrollView>
          </View>
          <View style={{backgroundColor: 'white', marginTop: 10, elevation: 3, marginBottom: 10}}>
            <Text style={{paddingTop: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Berita</Text>
            <TouchableNativeFeedback>
              <View style={{position: 'absolute', right: 20, top: 8, borderRadius: 4}}>
                <Icon name='more-horiz' size={28} />
              </View>
            </TouchableNativeFeedback>
            <ScrollView horizontal={true} contentContainerStyle={{paddingTop: 10, paddingBottom: 10}} showsHorizontalScrollIndicator={false}>
              {
                dummy.map((x, i) =>
                <View key={i} style={{backgroundColor: 'red', height: 150, width: 150, borderRightColor: 'white', borderRightWidth: 1, borderRadius: 20, marginLeft: 10}}>
                  <Text>Master {x}</Text>
                </View>
                )
              }
            </ScrollView>
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
