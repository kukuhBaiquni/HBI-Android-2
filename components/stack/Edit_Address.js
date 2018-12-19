import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Picker } from 'native-base';

class EditAddress extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedCity: '-',
      selectedDistrict: '-',
      selectedVillage: '-',
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ubah Alamat</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', width: '100%'}}>
            <Form>
              <Item stackedLabel style={{width: 330}}>
                <Label>Nama Penerima</Label>
                <Input />
              </Item>
              <Item stackedLabel style={{width: 330}}>
                <Label>Nomor Telepon Penerima</Label>
                <Input />
              </Item>
              <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10}}>Kota</Label>
              <Item picker style={{width: 330, marginLeft: 12}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Pilih Kota"
                  placeholderStyle={{ color: "red" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selectedCity}
                  onValueChange={(x) => this.setState({selectedCity: x})}
                >
                  <Picker.Item label="Pilih Kota" value="-" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Item>
            </Form>
          </View>
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
)(EditAddress);

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
  }
})
