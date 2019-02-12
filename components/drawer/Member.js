import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, AsyncStorage, Image, ScrollView, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';
import Swiper from 'react-native-swiper';

class Member extends Component {

  beforeRender = async () => {
    try{
      const id = await AsyncStorage.getItem('PlayerID')
      const token = await AsyncStorage.getItem('access_token');
      if (id !== null && token !== null) {
        const ids = JSON.parse(id)
        const tokens = JSON.parse(token)
        this.props.dispatch(setInitialToken(tokens))
        this.props.dispatch(setPlayerId({ids, token: tokens}))
      }
    }catch(error) {
    }
  }

  moveToBrowser() {
    let url = `${SERVER_URL}register/member`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  }

  render() {
    const data = ['1', '2', '3', '4'];
    const { navigation } = this.props;
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name='menu' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Halal Beef Indonesia</Text>
        </View>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image style={{height: 280, flex: 1, marginBottom: 10}} resizeMode='contain' source={require('../../android/app/src/main/assets/custom/BG1.jpg')} />
          </View>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
              <Image style={{width: 147, height: 129.3, marginTop: 130}} source={require('../../android/app/src/main/assets/custom/talk.png')} />
            </View>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
              <Text style={{fontSize: 13, paddingTop: 10, color: 'white', fontWeight: 'bold'}}>Ingin jadi member reseller <Text style={{fontSize: 16}}>Halal Beef Indonesia?..</Text></Text>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 10, color: '#27ff23'}}>Bisa Hasilkan uang langsung dan penghasilan tanpa batas!</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 20}}>Bergabung menjadi member reseller</Text>
              <Text style={{fontWeight: 'bold', textAlign: 'right', marginRight: 20, fontSize: 20}}>Halal Beef Indonesia</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 20}}>Apa saja <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>KEUNTUNGAN</Text> nya?</Text>
            </View>
            <View style={{alignItems: 'center', borderBottomColor: '#999999', borderBottomWidth: 1, marginBottom: 20}}>
              <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10, width: '90%', height: 100, backgroundColor: 'yellow', borderRadius: 5, elevation: 5, marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 17, fontWeight: 'bold', padding: 5}}>EFISIENSI BIAYA KONSUMSI</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'center'}}>Dengan mengkonsumsi produk Halal Beef Indonesia, rasakan manfaat lebih Hemat, Praktis, Higienis.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10, width: '90%', height: 100, backgroundColor: 'yellow', borderRadius: 5, elevation: 5, marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 17, fontWeight: 'bold', padding: 5}}>KEUNTUNGAN BERJUALAN DIRUMAH</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'center'}}>Dapatkan keuntungan dari setiap transaksi penjualan.Didukung penjualan online melalui aplikasi yang akan sangat membantu anda.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10, width: '90%', height: 100, backgroundColor: 'yellow', borderRadius: 5, elevation: 5, marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 17, fontWeight: 'bold', padding: 5}}>BONUS REFERRAL</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'center'}}>Kami memberikan anda bonus Rp.500.000 untuk setiap member reseller baru yang anda referensikan.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10, width: '90%', height: 100, backgroundColor: 'yellow', borderRadius: 5, elevation: 5, marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: 17, fontWeight: 'bold', padding: 5}}>ACHIEVEMENT</Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, textAlign: 'center'}}>Anda akan mendapatkan bonus lainnya, sebagai Rewards prestasi anda.</Text>
              </TouchableOpacity>
              <View style={{marginTop: 30, alignItems: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>MASIH BANYAK LAGI BISNIS YANG DAPAT</Text>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>ANDA KEMBANGKAN</Text>
                <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>BERSAMA <Text style={{color: 'red', fontSize: 18}}>HALAL BEEF INDONESIA</Text></Text>
              </View>
              <Text style={{marginTop: 10, fontWeight: 'bold'}}>Penasaran? Lihat cerita member reseller Kami.</Text>
                <View style={styles.slideContainer}>
                  <Swiper
                    height={270}
                    horizontal={true}
                    autoplay
                    autoplayTimeout={4}
                    activeDotColor='#7c0c10'
                    paginationStyle={{bottom: 5}}
                    >
                    {
                      data.map((x, i) =>
                      <TouchableOpacity key={i}>
                        <View style={styles.slide}>
                          <Text direction='alternate' animation='zoomIn' iterationCount={1} style={{color: '#474747', fontSize: 16, fontStyle: 'italic', position: 'absolute', zIndex: 3, bottom: 30}}>Member Name. "Enterpreneur"</Text>
                          <Text direction='alternate' animation='zoomIn' iterationCount={1} style={{color: '#999999', fontSize: 14, fontStyle: 'italic', position: 'absolute', zIndex: 3, bottom: -30, textAlign: 'center'}}>"Sekarang bisnis saya berkembang dengan dukungan produk dari Halal Beef Indonesia. Semoga sukses selalu."</Text>
                          <Image
                           style={{width: 160, height: 120, marginBottom: 70, borderRadius: 10, marginTop: 40}}
                           source={require('../../android/app/src/main/assets/custom/BG1.jpg')}
                           direction='alternate'
                           animation='flipInX'
                           iterationCount={1}
                          />
                        </View>
                      </TouchableOpacity>
                      )
                    }
                  </Swiper>
                </View>
            </View>
            <Text style={{textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: 15}}>Bagaimana cara menjadi member reseller Kami?</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 14, marginTop: 10, marginBottom: 5}}>Dengan hanya membeli paket member senilai Rp.8.000.000, Anda akan mendapatkan:</Text>
            <View style={{alignItems: 'center'}}>
              <Image style={{height: 250, marginTop: 20}} source={require('../../android/app/src/main/assets/custom/BG2.jpg')} resizeMode='contain'/>
              <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-around', flexDirection: 'row'}}>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 50, width: 70}} source={require('../../android/app/src/main/assets/custom/Beranda/Freezer.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>1 Unit Freezer</Text>
                </View>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 50, width: 50}} source={require('../../android/app/src/main/assets/custom/Beranda/Produk.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Produk senilai</Text>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Rp.3.000.000</Text>
                </View>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 63, width: 55}} source={require('../../android/app/src/main/assets/custom/Beranda/MediaMarketing.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Media Offline</Text>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Marketing</Text>
                </View>
              </View>
              <View style={{position: 'absolute', left: 0, right: 0, bottom: -58, justifyContent: 'space-around', flexDirection: 'row'}}>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 70, width: 70}} source={require('../../android/app/src/main/assets/custom/Beranda/HargaProdukSpesialMember.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Harga Spesial</Text>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Member Reseller</Text>
                </View>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 55, width: 75}} source={require('../../android/app/src/main/assets/custom/Beranda/ForumDiskusi.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Grup Diskusi</Text>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>24 jam</Text>
                </View>
                <View>
                  <TouchableOpacity style={{backgroundColor: 'yellow', height: 100, width: 100, borderRadius: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5}}>
                    <Image style={{height: 55, width: 75}} source={require('../../android/app/src/main/assets/custom/Beranda/Mentoring.png')} />
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>Mentoring</Text>
                </View>
              </View>
            </View>
            <View style={{height: 90}} />
            <Text style={{textAlign: 'center', fontSize: 18, color: 'red', fontWeight: 'bold'}}>Tertarik dengan member reseller Kami?</Text>
            <TouchableOpacity onPress={() => this.moveToBrowser()}>
              <Text style={{textAlign: 'center', fontSize: 18, color: 'red', fontWeight: 'bold', marginBottom: 20, marginTop: 10}}>DAFTAR DISINI</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(Member)

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
  slide: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 35,
    width: '90%',
    elevation: 5,
    borderRadius: 3,
    marginTop: 10
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
