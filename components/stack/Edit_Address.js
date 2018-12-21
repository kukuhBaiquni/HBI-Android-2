import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { loadCities, resetDistricts, resetVillages } from '../../actions/Load_Cities';
import { loadDistricts } from '../../actions/Load_Districts';
import { loadVillages } from '../../actions/Load_Villages';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { saveAddress } from '../../actions/Save_Address';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';

class EditAddress extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedCity: '-',
      selectedDistrict: '-',
      selectedVillage: '-',
      cityName: '',
      districtName: '',
      villageName: '',
      nameHandler: '',
      phoneHandler: '',
      addressHandler: '',
      saveState: 'default',
      index: 0,
      loading: false,
      token: ''
    }
  }

  beforeRender() {
    this.setState({
      nameHandler: this.props.navigation.state.params.name,
      token: this.props.navigation.state.params.token,
      phoneHandler: '0' + this.props.navigation.state.params.phone,
      addressHandler: this.props.navigation.state.params.address.street
    })
    this.props.dispatch(loadCities())
  }

  citySelected(x, f) {
    if (f === 0) {
      this.props.dispatch(resetDistricts());
      this.props.dispatch(resetVillages());
    }
    this.props.dispatch(loadDistricts(x));
    this.setState({selectedCity: x, cityName: this.props.territorial.cities[f].nama_kota, selectedDistrict: '', selectedVillage: ''})
  }

  districtSelected(x, f) {
    if (f === 0) {
      this.props.dispatch(resetVillages());
    }
    this.props.dispatch(loadVillages(x))
    this.setState({selectedDistrict: x, districtName: this.props.territorial.districts[f].nama_kecamatan, selectedVillage: ''})
  }

  villageSelected(x, f) {
    this.setState({selectedVillage: x, villageName: this.props.territorial.villages[f].nama_kelurahan})
  }

  onValueChange(x) {
    let target = 0
    if (x === 'default') {
      target = 0
    }else{
      target = 1
    }
    this.setState({index: target, saveState: x})
  }

  onSave() {
    const data = {
      token: this.state.token,
      name: this.state.nameHandler,
      phone: this.state.phoneHandler,
      street: this.state.addressHandler,
      city: this.state.cityName,
      district: this.state.districtName,
      village: this.state.villageName
    }
    const { cityName, districtName, villageName, nameHandler, phoneHandler, addressHandler } = this.state;
    if (cityName !== '' && districtName !== '' && villageName !== '' && nameHandler !== '' && phoneHandler !== '' && addressHandler !== '') {
      this.setState({loading: true})
      if (this.state.saveState === 'default') {
        this.props.dispatch(saveAddress(data))
      }else{
        this.props.navigation.navigate('Payment', data)
      }
    }else{
      Alert.alert(
        'Kesalahan',
        'Form yang anda isi tidak valid atau belum lengkap, silahkan perbaiki form',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.territorial.cities !== this.props.territorial.cities) {
      let indexer = 0;
      this.props.territorial.cities.map((x, i) => {
        if (x.nama_kota === this.props.navigation.state.params.address.city) {
          indexer = i
        }
      })
      if (this.props.navigation.state.params.address.city !== '') {
        const code = this.props.territorial.cities[indexer].kode_kota;
        this.props.dispatch(loadDistricts(code))
        this.setState({selectedCity: this.props.territorial.cities[indexer].kode_kota, cityName: this.props.territorial.cities[indexer].nama_kota})
      }
    }
    if (prevProps.territorial.districts !== this.props.territorial.districts) {
      let indexer = 0;
      this.props.territorial.districts.map((x, i) => {
        if (x.nama_kecamatan === this.props.navigation.state.params.address.district) {
          indexer = i
        }
      })
      if (this.props.navigation.state.params.address.district !== '') {
        if (this.state.selectedDistrict === '-') {
          const code = this.props.territorial.districts[indexer].kode_kecamatan;
          this.props.dispatch(loadVillages(code));
          this.setState({selectedDistrict: this.props.territorial.districts[indexer].kode_kecamatan, districtName: this.props.territorial.districts[indexer].nama_kecamatan})
        }
      }
    }
    if (prevProps.territorial.villages !== this.props.territorial.villages) {
      let indexer = 0;
      this.props.territorial.villages.map((x, i) => {
        if (x.nama_kelurahan === this.props.navigation.state.params.address.village) {
          indexer = i
        }
      })
      if (this.props.navigation.state.params.address.village !== '') {
        if (this.state.selectedVillage === '-') {
          this.setState({selectedVillage: this.props.territorial.villages[indexer].kode_kelurahan, villageName: this.props.territorial.villages[indexer].nama_kelurahan});
        }
      }
    }
    if (prevProps.status.saveAddress.success !== this.props.status.saveAddress.success) {
      if (this.props.status.saveAddress.success) {
        this.props.navigation.navigate('Payment');
      }
    }
    if (prevProps.status.saveAddress.error !== this.props.status.saveAddress.error) {
      if (this.props.status.saveAddress.error) {
        Alert.alert(
          'Kesalahan',
          'Server sibuk, silahkan ulangi permintaan anda.',
          [
            {text: 'OK', onPress: () => this.setState({loading: false})}
          ],
          { cancelable: false }
        );
      }
    }
  }

  render() {
    const options =[
      {label: 'Simpan sebagai default', value: 'default'},
      {label: 'Hanya gunakan untuk transaksi ini', value: 'temp'}
    ];
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
          <Modal
            isVisible={this.state.loading}
            style={{alignItems: 'center'}}
            hideModalContentWhileAnimating={true}
            useNativeDriver
            >
            <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
              <DotIndicator
                color='#7c0c10'
                size={8}
                />
            </View>
          </Modal>
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ubah Alamat</Text>
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', width: '100%'}}>
              <Form>
                <Item stackedLabel style={{width: 330}}>
                  <Label style={{color: '#a0a0a0'}}>Nama Penerima</Label>
                  <Input
                    onChangeText={(x) => this.setState({nameHandler: x})}
                    value={this.state.nameHandler}
                    editable={this.state.saveState === 'default' ? false : true}
                    style={this.state.saveState === 'default' ? {color: '#a0a0a0'} : {color: 'black'}}
                    />
                </Item>
                <Item stackedLabel style={{width: 330}}>
                  <Label style={{color: '#a0a0a0'}}>Nomor Telepon Penerima</Label>
                  <Input
                    keyboardType='numeric'
                    onChangeText={(x) => this.setState({phoneHandler: x})}
                    value={this.state.phoneHandler}
                     />
                </Item>
                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kota/Kabupaten</Label>
                <Item picker style={{width: 335, marginLeft: 10}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.selectedCity}
                    onValueChange={(x, f) => this.citySelected(x, f)}
                  >
                      {
                        this.props.territorial.cities.map((x, i) =>
                          <Picker.Item key={i} label={x.nama_kota} value={x.kode_kota} />
                        )
                      }
                  </Picker>
                </Item>
                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kecamatan</Label>
                <Item picker style={{width: 335, marginLeft: 10}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.selectedDistrict}
                    onValueChange={(x, f) => this.districtSelected(x, f)}
                  >
                      {
                        this.props.territorial.districts.map((x, i) =>
                          <Picker.Item key={i} label={x.nama_kecamatan} value={x.kode_kecamatan} />
                        )
                      }
                  </Picker>
                </Item>
                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kelurahan</Label>
                <Item picker style={{width: 335, marginLeft: 10}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    selectedValue={this.state.selectedVillage}
                    onValueChange={(x, f) => this.villageSelected(x, f)}
                  >
                      {
                        this.props.territorial.villages.map((x, i) =>
                          <Picker.Item key={i} label={x.nama_kelurahan} value={x.kode_kelurahan} />
                        )
                      }
                  </Picker>
                </Item>
                <Item stackedLabel style={{width: 330}}>
                  <Label style={{color: '#a0a0a0'}}>Alamat Lengkap</Label>
                  <Input
                    value={this.state.addressHandler}
                    onChangeText={(x) => this.setState({addressHandler: x})}
                     />
                </Item>
              </Form>
            </View>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 20}}>
            <RadioForm
              formHorizontal={false}
              animation={true}
              >
              {
                options.map((x, i) =>
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={x}
                    index={i}
                    onPress={(x) => this.onValueChange(x)}
                    borderWidth={1}
                    buttonInnerColor={'#7c0c10'}
                    buttonOuterColor={this.state.index === i ? '#7c0c10' : '#919191'}
                    isSelected={this.state.index === i}
                    buttonSize={12}
                    buttonOuterSize={20}
                    />
                  <RadioButtonLabel
                    obj={x}
                    index={i}
                    labelHorizontal={true}
                    onPress={(x) => this.onValueChange(x)}
                    labelStyle={this.state.index === i ? {fontSize: 14, color: '#7c0c10', marginTop: -2} : {fontSize: 12, color: '#919191', marginTop: -2}}
                  />
                  </RadioButton>
                )
              }
            </RadioForm>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => this.onSave()} style={{width: 350, borderRadius: 3, marginBottom: 5, backgroundColor: '#7c0c10', height: 50, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 16}}>Simpan</Text>
            </TouchableOpacity>
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
