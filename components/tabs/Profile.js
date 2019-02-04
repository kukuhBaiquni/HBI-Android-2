import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, AsyncStorage, Alert, TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchUser, logOutRequest } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
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

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      showModal: false,
      mode: '',
      whichPhoto: true,
      coverHandler: '',
      fpHandler: '',
      showDialog: false,
      loading: false,
      showIconAddPhoto: true,
      progress : 0,
      isVisible: false
    }
  }

  beforeRender = async () => {
    try {
      const val = await AsyncStorage.getItem('access_token');
      if (val !== null) {
        const raw = JSON.parse(val)
        this.setState({token: raw})
        this.props.dispatch(fetchUser(raw))
      }
    } catch (error) {
      this.props.navigation.goBack()
      this.props.navigation.navigate('ProfilePrevention')
    }
  }

  changeMode(x) {
    this.setState({mode: x, whichPhoto: false})
  }

  launchMode(x) {
    if (x === 'cm') {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          this.setState({showModal: false, whichPhoto: true})
        }
        if (response.uri) {
          if (this.state.mode === 'fc') {
            this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: '', showDialog: true, showIconAddPhoto: false})
          }else{
            this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: '', showDialog: true, showIconAddPhoto: false})
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
            this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: '', showDialog: true, showIconAddPhoto: false})
          }else{
            this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: '', showDialog: true, showIconAddPhoto: false})
          }
        }
      });
    }
  }

  cancelSave() {
    this.setState({showDialog: false, coverHandler: '', fpHandler: '', showIconAddPhoto: true})
  }

  onSave() {
    let data = {}
    if (this.state.coverHandler !== '') {
      data.cover = this.state.coverHandler
    }
    if (this.state.fpHandler !== '') {
      data.fp = this.state.fpHandler
    }
    data.token = this.state.token
    this.setState({loading: true, showModal: true})
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
    futch(`${SERVER_URL}profile/android/upload-photo/${this.state.token}`, {
      method: 'post',
      body: form
    }, (e) => {
      const progress = e.loaded / e.total
      this.setState({progress})
    })
    .then((res) => {
      this.setState({loading: false, showModal: false, showDialog: false, coverHandler: '', fpHandler: '', showIconAddPhoto: true})
      ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      this.props.dispatch(fetchUser(this.state.token))
    })
  }

  render() {
    const { userData, navigation } = this.props;
    return(
      <ScrollView style={{flex:1}}>
        <NavigationEvents
          onDidFocus={() => this.beforeRender()}
          />
        <Modal
          isVisible={this.state.showModal}
          style={{alignItems: 'center'}}
          hideModalContentWhileAnimating={true}
          useNativeDriver
          >
          {
            this.state.loading
            ?
            <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
              <DotIndicator
                color='#7c0c10'
                size={8}
                />
            </View>
            :
            this.state.whichPhoto
            ?
            <View style={{ backgroundColor: 'white', padding: 10, width: 280, height: 230, borderRadius: 3, alignItems: 'center'}}>
              <Text style={{paddingBottom: 30, fontSize: 16}}>Foto mana yang ingin diganti ?</Text>
              <TouchableOpacity onPress={(x) => this.changeMode('fp')} style={{marginBottom: 10, backgroundColor: '#7c0c10', width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                <Text style={{color: 'white', fontSize: 16}}>Foto Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={(x) => this.changeMode('fc')} style={{backgroundColor: 'white', borderColor: '#7c0c10', borderWidth: 1, width: 260, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                <Text style={{color: '#7c0c10', fontSize: 16}}>Foto Sampul</Text>
              </TouchableOpacity>
              <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: '', showIconAddPhoto: true})} style={{fontSize: 16, paddingTop: 25}}>Batal</Text>
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
                <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: '', showIconAddPhoto: true})} style={{fontSize: 16, position: 'absolute', right: -90, top: 20}}>Batal</Text>
              </View>
            </View>
          }
        </Modal>
        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
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
        </View>
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
            {
              this.state.showIconAddPhoto &&
              <TouchableOpacity style={{position: 'absolute', right: 20, bottom: 35}} onPress={() => this.setState({showModal: true})}>
                <Icon name='create' color='#e2e2e2' />
              </TouchableOpacity>
            }
          </View>
          {
            this.state.showDialog &&
            <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: 330, backgroundColor: 'white', height: 110, padding: 10, elevation: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', color: '#828282'}}>Profil anda mengalami perubahan, apakah anda ingin menyimpannya?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => this.onSave()} style={{width: 100, height: 40, backgroundColor: '#7c0c10', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Text style={{color: 'white'}}>Ya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.cancelSave()} style={{borderColor: '#7c0c10', borderWidth: 1, marginLeft: 10, width: 100, height: 40, backgroundColor: 'white', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Text style={{color: '#7c0c10'}}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          {/*LIST MENU*/}
          <View style={{marginTop: 20, marginBottom: 20}}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('MyProfile', {token: this.state.token})}>
              <View style={styles.listMenu}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon name='face' />
                  <Text style={[styles.menuTitle, {marginLeft: 10}]}>Profil Saya</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('MyRekening')}>
              <View style={styles.listMenu}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon name='account-balance' />
                  <Text style={[styles.menuTitle, {marginLeft: 10}]}>Rekening Bank</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.setState({isVisible: !this.state.isVisible})}>
              <View style={styles.listMenu}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon name='compare-arrows' />
                  <Text style={[styles.menuTitle, {marginLeft: 10}]}>Transaksi</Text>
                  <View style={{position: 'absolute', right: 10, top: 10}}>
                    <Icon name={this.state.isVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
            {
              this.state.isVisible &&
              <View>
                <TouchableNativeFeedback onPress={() => navigation.navigate('MyTransaction', {token: this.state.token})}>
                  <View style={styles.listMenu}>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <Text style={[styles.menuTitle, {marginLeft: 30}]}>Transaksi Saya</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionRecords', {token: this.state.token})}>
                  <View style={styles.listMenu}>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <Text style={[styles.menuTitle, {marginLeft: 30}]}>Riwayat Transaksi</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
            }
            <TouchableNativeFeedback onPress={() => navigation.navigate('Settings', {token: this.state.token})}>
              <View style={styles.listMenu}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Icon name='settings' />
                  <Text style={[styles.menuTitle, {marginLeft: 10}]}>Pengaturan</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
      </ScrollView>
    )
  }
};

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
  headerMenu: {
    height: 50,
    paddingTop: 15,
    paddingLeft: 8,
    backgroundColor: '#bfbfbf',
    marginTop: 10
  }
})

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(Profile);
