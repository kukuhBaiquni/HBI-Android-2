import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';

export default class PrivacyPolicy extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor = '#7c0c10'
          barStyle = 'light-content'
          />
        <View style={styles.header}>
          <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' color='#7c0c10' />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', width: 300}}>
          <Text style={{textAlign: 'left'}}>
            Kami melindungi dan menjaga kepentingan setiap pengguna atas hak privasi
            dan keamanan terhadap setiap informasi pribadi yang diberikan.

            Kebijakan Privasi ini adalah komitmen kami akan kerahasiaan dan keamanan informasi
            pengguna dalam melakukan seluruh akses Halal Beef Indonesia.

            Tujuan perolehan Informasi adalah untuk kepentingan transaksi yang dilakukan sesuai
            perundang-undangan yang berlaku.

            Data yang diperoleh dalam Aplikasi dan Situs Halal Beef Indonesia adalah :
            1. Alamat Internet Protokol (IP)
            2. Jenis Perangkat
            3. Jenis Mesin Pencarian
            4. Informasi Pribadi

            Penyebaran informasi yang dilakukan Halal Beef Indonesia adalah secara anonim dan berdasarkan
            jumlah keseluruhan, jenis data ini tidak terhubung dengan setiap informasi yang diidentifikasi.

            Halal Beef Indonesia dapat sewaktu-waktu melakukan pembaruan terhadap kebijakan privasi ini,
            dan menyarankan agar pengguna membaca dengan seksama halaman Kebijakan Privasi ini dari waktu ke waktu
            untuk mengetahui pembaruan apapun.

            Dengan melakukan akses dan menggunakan Aplikasi dan Situs Halal Beef Indonesia, pengguna mengakui
            telah membaca dan memahami Kebijakan Privasi yang tertulis.

            Apabila terdapat informasi pribadi yang hilang atau dicuri atau digunakan tanpa izin, kami
            mengharapkan agar pengguna segera mengirim surel Halal Beef Indonesia di
            halalbeef@admin.co.id
          </Text>
        </View>
      </View>
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
