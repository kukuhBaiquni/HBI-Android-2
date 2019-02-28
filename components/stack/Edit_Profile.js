import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, TouchableNativeFeedback, StyleSheet, ScrollView, ToastAndroid, DatePickerAndroid, Keyboard, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Form, Item, Input, Label, Picker, Radio } from 'native-base';
import { loadBank } from '../../actions/Load_Bank';
import { NavigationEvents } from 'react-navigation';
import { loadCities, resetDistricts, resetVillages } from '../../actions/Load_Cities';
import { loadDistricts } from '../../actions/Load_Districts';
import { loadVillages } from '../../actions/Load_Villages';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { editProfile, forceResetEP, editBannerSuccess, editPhotoSuccess } from '../../actions/Edit_Profile';
import { addressParser, SERVER_URL } from '../../config';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import futch from '../../actions/Fetch';

const options = {
  title: 'Pilihan',
  takePhotoButtonTitle: 'Buka kamera',
  chooseFromLibraryButtonTitle: 'Pilih dari galeri',
  cancelButtonTitle: 'Batal',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
      loading: true,
      nomorHandler: '',
      rtHandler: '',
      rwHandler: '',
      ttlHandler: '',
      ttl: 0,
      rOne: false,
      rTwo: false,
      showModal: false,
      mode: '',
      whichPhoto: true,
      coverHandler: '',
      fpHandler: ''
    }
  }

  beforeRender() {
    let gender = this.props.userData.gender;
    let phone = this.props.userData.phone
    if (gender === undefined || gender === '') {
      this.setState({gender: 'male', rOne: true})
    }
    if (gender === 'male') {
      this.setState({gender: 'male', rOne: true})
    }
    if (gender === 'female') {
      this.setState({gender: 'female', rTwo: true})
    }
    if (phone !== undefined) {
      phone = '0' + this.props.userData.phone;
    }else{
      phone = ''
    }
    let ttlHandler = '';
    if (this.props.userData.ttl !== undefined) {
      ttlHandler = moment(this.props.userData.ttl).format('DD MMM YYYY')
    }
    this.setState({
      nameHandler: this.props.userData.name,
      phoneHandler: phone,
      gender: gender,
      streetHandler: this.props.userData.address.street,
      nomorHandler: this.props.userData.address.no,
      rtHandler: this.props.userData.address.rt,
      rwHandler: this.props.userData.address.rw,
      ttlHandler,
      ttl: this.props.userData.ttl
    });
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
        const index = this.props.territorial.cities.map(x => x.nama_kota).indexOf(this.props.userData.address.city);
        let code = null
        if (index !== -1) {
          code = this.props.territorial.cities[index].kode_kota;
          this.props.dispatch(loadDistricts(code))
        }
        this.setState({cityHandler: this.props.userData.address.city})
      }
    }
    if (prevProps.territorial.districts !== this.props.territorial.districts) {
      if (this.state.districtHandler === '') {
        const index = this.props.territorial.districts.map(x => x.nama_kecamatan).indexOf(this.props.userData.address.district);
        let code = null;
        if (index !== -1) {
          code = this.props.territorial.districts[index].kode_kecamatan
          this.props.dispatch(loadVillages(code))
        }
        this.setState({districtHandler: this.props.userData.address.district})
      }
    }
    if (prevProps.territorial.villages !== this.props.territorial.villages) {
      if (this.state.villageHandler === '') {
        const index = this.props.territorial.villages.map(x => x.nama_kota).indexOf(this.props.userData.address.village);
        this.setState({villageHandler: this.props.userData.address.village})
      }
    }
    if (this.props.userData.address.city !== '') {
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
    if (prevProps.status.editProfile.success !== this.props.status.editProfile.success) {
      if (this.props.status.editProfile.success) {
        this.props.dispatch(forceResetEP())
        ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      }
    }
  }

  datePicker = async () => {
    Keyboard.dismiss()
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'calendar'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day).getTime();
        const formatedDate = moment(newDate).format('DD MMM YYYY')
        this.setState({ttlHandler: formatedDate, ttl: newDate})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  radioPicker(x) {
    if (x === '1') {
      this.setState({rOne: true, rTwo: false, gender: 'male'})
    }else{
      this.setState({rTwo: true, rOne: false, gender: 'female'})
    }
  }

  onSave() {
    const data = {
      name: this.state.nameHandler,
      phone: this.state.phoneHandler,
      gender: this.state.gender,
      city: this.state.cityHandler,
      district: this.state.districtHandler,
      village: this.state.villageHandler,
      street: this.state.streetHandler,
      token: this.props.navigation.state.params.token,
      no: this.state.nomorHandler,
      rt: this.state.rtHandler,
      rw: this.state.rwHandler,
      ttl: this.state.ttl
    }
    this.setState({loading: true})
    this.props.dispatch(editProfile(data))
  }

  onSaveFile() {
    let form = new FormData()
    let a = Date.now() + Math.random() * 12 + 'hbi';
    if (this.state.coverHandler !== '') {
      let filename = 'cv' + a.replace('.','') + '.jpg';
      form.append('photo', {
        uri: this.state.coverHandler,
        type: 'image/jpeg',
        name: filename
      });
    }
    if (this.state.fpHandler !== '') {
      let filename = 'fp' + a.replace('.','') + '.jpg';
      form.append('photo', {
        uri: this.state.fpHandler,
        type: 'image/jpeg',
        name: filename
      })
    }
    this.setState({loading: true})
    futch(`${SERVER_URL}profile/android/upload-photo/${this.props.navigation.state.params.token}`, {
      method: 'post',
      body: form
    }, (e) => {
      const progress = e.loaded / e.total
      this.setState({progress})
    })
    .then((res) => {
      const data = JSON.parse(res._response);
      if (data.data.banner) {
        this.props.dispatch(editBannerSuccess(data.data.banner))
      }else if(data.data.photo) {
        this.props.dispatch(editPhotoSuccess(data.data.photo))
      }
      this.setState({loading: false, coverHandler: '', fpHandler: ''})
      ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    })
  }

  changeMode(x) {
    this.setState({mode: x, whichPhoto: false})
  }

  cancelSave() {
    this.setState({coverHandler: '', fpHandler: '', showIconAddPhoto: true})
  }

  launchMode(x) {
    if (x === 'cm') {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          this.setState({showModal: false, whichPhoto: true})
        }
        if (response.uri) {
          if (this.state.mode === 'fc') {
            this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: ''})
            this.onSaveFile()
          }else{
            this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: ''})
            this.onSaveFile()
          }
        }
      });
    }else{
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          this.setState({showModal: false, whichPhoto: true})
        }
        if (response.uri) {
          if (this.state.mode === 'fc') {
            this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: ''})
            this.onSaveFile()
          }else{
            this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: ''})
            this.onSaveFile()
          }
        }
      });
    }
  }

  render(){
    const { navigation, territorial, userData } = this.props;
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
          <Modal
            isVisible={this.state.showModal}
            style={{alignItems: 'center'}}
            hideModalContentWhileAnimating={true}
            useNativeDriver
            >
            {
              this.state.whichPhoto
              ?
              <View  style={{ backgroundColor: 'white', padding: 10, width: 280, height: 220, borderRadius: 3, alignItems: 'center'}}>
                <Text style={{paddingBottom: 15, fontSize: 16}}>Foto mana yang ingin diganti ?</Text>
                <TouchableOpacity onPress={(x) => this.changeMode('fp')} style={{marginBottom: 10, backgroundColor: '#7c0c10', width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                  <Text style={{color: 'white', fontSize: 16}}>Foto Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(x) => this.changeMode('fc')} style={{backgroundColor: 'white', borderColor: '#7c0c10', borderWidth: 1, width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                  <Text style={{color: '#7c0c10', fontSize: 16}}>Foto Sampul</Text>
                </TouchableOpacity>
                <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: ''})} style={{fontSize: 16, paddingTop: 20}}>Batal</Text>
              </View>
              :
              <View style={{ backgroundColor: 'white', padding: 10, width: 280, height: 230, borderRadius: 3, alignItems: 'center'}}>
                <Text style={{paddingBottom: 30, fontSize: 16}}>Ganti <Text style={{fontWeight: 'bold'}}>{this.state.mode === 'fp' ? 'Foto Profil' : 'Foto Sampul'}</Text></Text>
                <TouchableOpacity onPress={(x) => this.launchMode('cm')} style={{marginBottom: 10, backgroundColor: '#7c0c10', width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                  <Text style={{color: 'white', fontSize: 16}}>Buka kamera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(x) => this.launchMode('lb')} style={{backgroundColor: 'white', borderColor: '#7c0c10', borderWidth: 1, width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                  <Text style={{color: '#7c0c10', fontSize: 16}}>Pilih dari galeri</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <Text onPress={() => this.setState({whichPhoto: true, mode: ''})} style={{fontSize: 16, position: 'absolute', left: -100, top: 20}}>Kembali</Text>
                  <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: ''})} style={{fontSize: 16, position: 'absolute', right: -90, top: 20}}>Batal</Text>
                </View>
              </View>
            }
          </Modal>
        <ScrollView>
          <TouchableOpacity onPress={() => this.setState({showModal: true})} style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
            {
              this.state.coverHandler === ''
              ?
              userData.banner === '' || userData.banner === undefined
              ?
              <LinearGradient
              colors={['transparent', 'black']}
                style={{height: 170}}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 2}}
                >
              </LinearGradient>
              :
              <View>
                <Image
                  source={{uri: `${SERVER_URL}images/dummy/${userData.banner}`}}
                  style={{height: 170, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                  >
                </Image>
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={{height: 170}}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 2}}
                  >
                </LinearGradient>
              </View>
              :
              <View>
                <Image
                  source={{uri: this.state.coverHandler}}
                  style={{height: 170, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                  >
                </Image>
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={{height: 170}}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 2}}
                  >
                </LinearGradient>
              </View>
            }
          </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 100, marginLeft: 20}}>
              {
                this.state.fpHandler === ''
                ?
                <Image
                  source={{uri: `${SERVER_URL}images/dummy/${userData.photo}`}}
                  style={{height: 70, width: 70, borderRadius: 35, borderWidth: 2, borderColor: 'white', marginTop: 25}}>
                </Image>
                :
                <Image
                  source={{uri: this.state.fpHandler}}
                  style={{height: 70, width: 70, borderRadius: 35, borderWidth: 2, borderColor: 'white', marginTop: 25}}>
                </Image>
              }
              <View style={{marginLeft: 12, marginTop: 26}}>
                <Text style={{color: 'white', fontSize: 17}}>{userData.name}</Text>
                <Text style={{color: '#e2e2e2', fontSize: 12}}>Bergabung sejak {userData.join}</Text>
              </View>
            </View>
          <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 20}}>
            <View style={{backgroundColor: 'white', width: '95%', elevation: 3, marginTop: 10, borderRadius: 3, paddingBottom: 30}}>
              <Text style={{paddingTop: 10, paddingLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Informasi Pribadi</Text>
              <Form>
                <Item stackedLabel style={{width: '90%', borderBottomColor: '#a8a8a8'}}>
                  <Label style={{color: '#a8a8a8'}}>Nama</Label>
                  <Input
                    onChangeText={(x) => this.setState({nameHandler: x})}
                    value={this.state.nameHandler}
                    autoFocus
                    />
                </Item>
                <Item stackedLabel style={{width: '90%', borderBottomColor: '#a8a8a8'}}>
                  <Label style={{color: '#a8a8a8'}}>Tanggal Lahir</Label>
                  <Input
                    onFocus={() => this.datePicker()}
                    value={this.state.ttlHandler}
                    />
                </Item>
                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Jenis Kelamin</Label>
                <View style={{flexDirection: 'row', paddingLeft: 16, paddingTop: 10}}>
                  <Radio
                    color={"#a0a0a0"}
                    selectedColor={"#7c0c10"}
                    selected={this.state.rOne}
                    onPress={(x) => this.radioPicker('1')}
                  />
                  <Text style={{fontSize: 16, marginLeft: 10}}>Pria</Text>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 16, paddingTop: 10, marginBottom: 10}}>
                  <Radio
                    color={"#a0a0a0"}
                    selectedColor={"#7c0c10"}
                    selected={this.state.rTwo}
                    onPress={(x) => this.radioPicker('2')}
                  />
                  <Text style={{fontSize: 16, marginLeft: 10}}>Wanita</Text>
                </View>
                <Item stackedLabel style={{width: '90%', borderBottomColor: '#a8a8a8'}}>
                  <Label style={{color: '#a8a8a8'}}>Telepon</Label>
                  <Input
                    onChangeText={(x) => this.setState({phoneHandler: x})}
                    value={this.state.phoneHandler}
                    />
                </Item>
              </Form>
            </View>
            <View style={{backgroundColor: 'white', width: '95%', elevation: 3, marginTop: 10, borderRadius: 3, paddingBottom: 30}}>
              <Text style={{paddingTop: 10, paddingLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Informasi Pribadi</Text>
              <Form>
                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kota / Kabupaten</Label>
                <Item picker style={{width: '90%', marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
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
                <Item picker style={{width: '90%', marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
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
                <Item picker style={{width: '90%', marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
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
                <Item stackedLabel style={{width: '90%'}}>
                  <Label style={{color: '#a0a0a0'}}>Jalan</Label>
                  <Input
                    value={this.state.streetHandler}
                    onChangeText={(x) => this.setState({streetHandler: x})}
                     />
                </Item>
                <Item stackedLabel style={{width: '90%'}}>
                  <Label style={{color: '#a0a0a0'}}>Nomor</Label>
                  <Input
                    keyboardType='numeric'
                    value={this.state.nomorHandler}
                    onChangeText={(x) => this.setState({nomorHandler: x})}
                     />
                </Item>
                <Item stackedLabel style={{width: '90%'}}>
                  <Label style={{color: '#a0a0a0'}}>RT</Label>
                  <Input
                    keyboardType='numeric'
                    value={this.state.rtHandler}
                    onChangeText={(x) => this.setState({rtHandler: x})}
                     />
                </Item>
                <Item stackedLabel style={{width: '90%'}}>
                  <Label style={{color: '#a0a0a0'}}>RW</Label>
                  <Input
                    keyboardType='numeric'
                    value={this.state.rwHandler}
                    onChangeText={(x) => this.setState({rwHandler: x})}
                     />
                </Item>
              </Form>
              <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity onPress={() => this.onSave()} style={{borderRadius: 3, width: '95%', height: 50, backgroundColor: '#7c0c10', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#7c0c10',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3
  },
  headerTitle: {
    fontSize: 18,
    color: 'white'
  }
})


function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(EditProfile);
