import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class Help extends Component {
  render() {
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bantuan</Text>
        </View>
        <TouchableNativeFeedback>
          <View style={[styles.listMenu, {marginTop: 10}]}>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <Icon name='account-balance' />
              <Text style={[styles.menuTitle, {marginLeft: 10}]}>Syarat & Ketentuan</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.listMenu}>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <Icon name='account-balance' />
              <Text style={[styles.menuTitle, {marginLeft: 10}]}>Kebijakan Privasi</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listMenu: {
    height: 55,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    padding: 6,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 16
  },
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
  }
})

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Help);
