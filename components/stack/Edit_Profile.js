import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { loadBank } from '../../actions/Load_Bank';
import { NavigationEvents } from 'react-navigation';
import { loadCities, resetDistricts, resetVillages } from '../../actions/Load_Cities';
import { loadDistricts } from '../../actions/Load_Districts';
import { loadVillages } from '../../actions/Load_Villages';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';

class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nameHandler: '',
      phoneHandler: '',
      gender: 'male',
      cityHandler: '',
      districtHandler: '',
      villageHandler: '',
      streetHandler: '',
      loading: true
    }
  }

  beforeRender() {
    let gender = this.props.navigation.state.params.gender;
    let phone = this.props.navigation.state.params.phone
    if (gender === undefined || gender === '') {
      this.setState({gender: 'male'})
    }
    if (phone !== undefined) {
      phone = '0' + this.props.navigation.state.params.phone;
    }else{
      phone = ''
    }
    this.setState({
      nameHandler: this.props.navigation.state.params.name,
      phoneHandler: phone,
      gender,
      streetHandler: this.props.navigation.state.params.address.street
    })
    this.props.dispatch(loadCities())
  }

  citySelected(x, i) {
    this.props.dispatch(resetDistricts());
    this.props.dispatch(resetVillages());
    this.props.dispatch(loadDistricts(this.props.territorial.cities[i].kode_kota))
    this.setState({cityHandler: x, districtHandler: '', villageHandler: ''})
  }

  districtSelected(x, i) {
    this.props.dispatch(resetVillages());
    this.props.dispatch(loadVillages(this.props.territorial.districts[i].kode_kecamatan))
    this.setState({districtHandler: x, villageHandler: ''})
  }

  villageSelected(x) {
    this.setState({villageHandler: x})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.territorial.cities !== this.props.territorial.cities) {
      if (this.state.cityHandler === '') {
        const index = this.props.territorial.cities.map(x => x.nama_kota).indexOf(this.props.navigation.state.params.address.city);
        let code = null
        if (index !== -1) {
          code = this.props.territorial.cities[index].kode_kota;
          this.props.dispatch(loadDistricts(code))
        }
        this.setState({cityHandler: this.props.navigation.state.params.address.city})
      }
    }
    if (prevProps.territorial.districts !== this.props.territorial.districts) {
      if (this.state.districtHandler === '') {
        const index = this.props.territorial.districts.map(x => x.nama_kecamatan).indexOf(this.props.navigation.state.params.address.district);
        let code = null;
        if (index !== -1) {
          code = this.props.territorial.districts[index].kode_kecamatan
          this.props.dispatch(loadVillages(code))
        }
        this.setState({districtHandler: this.props.navigation.state.params.address.district})
      }
    }
    if (prevProps.territorial.villages !== this.props.territorial.villages) {
      if (this.state.villageHandler === '') {
        const index = this.props.territorial.villages.map(x => x.nama_kota).indexOf(this.props.navigation.state.params.address.village);
        this.setState({villageHandler: this.props.navigation.state.params.address.village})
      }
    }
    if (this.props.navigation.state.params.address.city !== '') {
      const { cityHandler, districtHandler, villageHandler } = this.state
      if (cityHandler !== '' && districtHandler !== '' && villageHandler !== '') {
        if (this.state.loading) {
          this.setState({loading: false})
        }
      }
    }else{
      if (this.state.loading) {
        this.setState({loading: false})
      }
    }
  }

  render(){
    const { navigation, territorial } = this.props;
    return(
      <ScrollView style={{flex: 1}}>
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
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profil</Text>
        </View>
        <Form>
          <Item stackedLabel style={{width: 330, borderBottomColor: '#a8a8a8'}}>
            <Label style={{color: '#a8a8a8'}}>Nama</Label>
            <Input
              onChangeText={(x) => this.setState({nameHandler: x})}
              value={this.state.nameHandler}
              />
          </Item>
          <Item stackedLabel style={{width: 330, borderBottomColor: '#a8a8a8'}}>
            <Label style={{color: '#a8a8a8'}}>Telepon</Label>
            <Input
              onChangeText={(x) => this.setState({phoneHandler: x})}
              value={this.state.phoneHandler}
              />
          </Item>
          <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Jenis Kelamin</Label>
          <Item picker style={{width: 335, marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.gender}
              onValueChange={(x) => this.setState({gender: x})}
              >
              <Picker.Item label='Pria' value='male' />
              <Picker.Item label='Wanita' value='female' />
            </Picker>
          </Item>
          <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kota / Kabupaten</Label>
          <Item picker style={{width: 335, marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.cityHandler}
              onValueChange={(x, i) => this.citySelected(x, i)}
              >
              {
                this.props.territorial.cities.map((x, i) =>
                  <Picker.Item key={i} label={x.nama_kota} value={x.nama_kota} />
                )
              }
            </Picker>
          </Item>
          <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kecamatan</Label>
          <Item picker style={{width: 335, marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.districtHandler}
              onValueChange={(x, i) => this.districtSelected(x, i)}
              >
              {
                this.props.territorial.districts.map((x, i) =>
                  <Picker.Item key={i} label={x.nama_kecamatan} value={x.nama_kecamatan} />
                )
              }
            </Picker>
          </Item>
          <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kelurahan</Label>
          <Item picker style={{width: 335, marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.villageHandler}
              onValueChange={(x) => this.setState({villageHandler: x})}
              >
              {
                this.props.territorial.villages.map((x, i) =>
                  <Picker.Item key={i} label={x.nama_kelurahan} value={x.nama_kelurahan} />
                )
              }
            </Picker>
          </Item>
          <Item stackedLabel style={{width: 330, borderBottomColor: '#a8a8a8'}}>
            <Label style={{color: '#a8a8a8'}}>Alamat Lengkap</Label>
            <Input
              onChangeText={(x) => this.setState({streetHandler: x})}
              value={this.state.streetHandler}
              />
          </Item>
        </Form>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c0c10', width: 330, height: 50, borderRadius: 5}}>
            <Text style={{color: 'white'}}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

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


function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(EditProfile);
