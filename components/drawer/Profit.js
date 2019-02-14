import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default class Profit extends Component {
  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <Image source={require('../../android/app/src/main/assets/custom/Beranda/EfisiensiBiaya.png')} style={{height: 250, width: '100%'}} />
          <View style={{padding: 20, marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Efisiensi Biaya Konsumsi</Text>
            <Text style={{fontSize: 13, marginTop: 10}}>Dengan mengkonsumsi produk Halal Beef Indonesia,</Text>
            <Text style={{fontSize: 13}}>Anda sudah melakukan efisiensi biaya bahan makanan</Text>
            <Text style={{fontSize: 13}}>dirumah Anda</Text>
          </View>
          <Image source={require('../../android/app/src/main/assets/custom/Beranda/BerjualanDirumah.png')} style={{height: 250, width: '100%'}} />
          <View style={{padding: 20, marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Keuntungan Berjualan Dirumah</Text>
            <Text style={{fontSize: 13, marginTop: 10}}>Dapatkan KEUNTUNGAN DARI SETIAP TRANSAKSI</Text>
            <Text style={{fontSize: 13}}>penjualan produk Halal Beef Indonesia.</Text>
            <Text style={{fontSize: 13}}>Didukung dengan penjualan online melalui seluruh</Text>
            <Text style={{fontSize: 13}}>platform Halal Beef Indonesia yang akan sangat</Text>
            <Text style={{fontSize: 13}}>membantu Anda.</Text>
          </View>
          <Image source={require('../../android/app/src/main/assets/custom/Beranda/BonusReferal.png')} style={{height: 250, width: '100%'}} />
          <View style={{padding: 20, marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Bonus Referral</Text>
            <Text style={{fontSize: 13, marginTop: 10}}>Untuk setiap member reseller baru yang Anda</Text>
            <Text style={{fontSize: 13}}>referensikan. Kami memberikan BONUS REFERRAL</Text>
            <Text style={{fontSize: 13}}>langsung senilai Rp. 500.000.</Text>
            <Text style={{fontSize: 13}}>Yang tentunya akan menambah penghasilan Anda.</Text>
          </View>
          <Image source={require('../../android/app/src/main/assets/custom/Beranda/Achievement.png')} style={{height: 250, width: '100%'}} />
          <View style={{padding: 20, marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Rewards Achievement</Text>
            <Text style={{fontSize: 13, marginTop: 10}}>Banyak hadiah yang akan Anda dapatkan, berdasarkan</Text>
            <Text style={{fontSize: 13}}>prestasi yang Anda capai.</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
