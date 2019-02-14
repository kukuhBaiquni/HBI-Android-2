import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { SERVER_URL } from '../../config';

export default class Join extends Component {

  moveToBrowser() {
    let url = `${SERVER_URL}register/member`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Image source={require('../../android/app/src/main/assets/custom/BG2.jpg')}  style={{height: 210, width: '100%', marginTop: -4}} resizeMode='contain'/>
          <View style={{height: 202, width: '100%', backgroundColor: 'black', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, opacity: 0.3}}/>
          <View style={{position: 'absolute', top: 70, bottom: 0, right: 0, left: 0}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>Bagaimana cara menjadi Member Reseller</Text>
            <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>Halal Beef Indonesia</Text>
          </View>
          <View style={{marginTop: 40, alignItems: 'center'}}>
            <View>
              <Text style={{fontSize: 16, textAlign: 'left'}}>Untuk bergabung menjadi Member Reseller</Text>
              <Text style={{fontSize: 16, textAlign: 'left'}}><Text style={{fontWeight: 'bold'}}>Halal Beef Indonesia</Text> Anda cukup melakukan</Text>
              <Text style={{fontSize: 16, textAlign: 'left'}}>registrasi dengan biaya senilai Rp. 8.000.000,</Text>
              <Text style={{fontSize: 16, textAlign: 'left'}}>Anda akan mendapatkan:</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/Freezer.png')} style={{height: 100, width: 100}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold'}}>1 Unit Freezer (100 Liter)</Text>
              <Text>(Hak kepemilikan Anda)</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/Produk.png')} style={{height: 80, marginTop: 10, marginLeft: -10, width: 100}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold', marginTop: 10}}>Produk senilai Rp. 3.000.000</Text>
              <Text>(Hak kepemilikan Anda)</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/MediaMarketing.png')} style={{height: 80, width: 100, marginTop: 10}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold', marginTop: 10}}>Media Offline Marketing</Text>
              <Text>(Kebutuhan penjualan dirumah Anda)</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/HargaProdukSpesialMember.png')} style={{height: 80, width: 100, marginTop: 10}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold', marginTop: 10}}>Harga Member Reseller</Text>
              <Text>(Berlaku selamanya)</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/ForumDiskusi.png')} style={{height: 80, width: 100, marginTop: 10}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold', marginTop: 10}}>Grup Diskusi 24jam</Text>
              <Text>(Membantu keperluan informasi Anda)</Text>
            </View>
            <View style={{height: 160, width: '90%', marginTop: 20, borderRadius: 3, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../android/app/src/main/assets/custom/Beranda/Mentoring.png')} style={{height: 80, width: 100, marginTop: 10}} resizeMode='contain' />
              <Text style={{fontWeight: 'bold', marginTop: 10}}>Mentoring</Text>
              <Text>(Panduan dari team profesional dibidangnya)</Text>
            </View>
          </View>
          <Text onPress={() => this.moveToBrowser()} style={{marginTop: 20, color: 'red', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>DAFTAR DISINI</Text>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    )
  }
}
