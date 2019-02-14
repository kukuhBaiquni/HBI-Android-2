import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { SERVER_URL, locale } from '../../config';
import moment from 'moment';

export default class ContentDetails extends Component {
  render() {
    const data = this.props.navigation.state.params.data;
    const { navigation } = this.props;
    const x1 = locale[new Date(data.start_date).getDay()] + ', ' + moment(data.start_date).format('DD MMM YYYY');
    const x2 = locale[new Date(data.end_date).getDay()] + ', ' + moment(data.end_date).format('DD MMM YYYY');
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <View style={{backgroundColor: 'white', width: '95%', padding: 10, elevation: 3, borderRadius: 5}}>
              <Image
                source={{uri: `${SERVER_URL}images/custom content/${data.photo}`}}
                style={{width: '100%', height: 200}}
                />
              <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold', padding: 10}}>{data.title}</Text>
              <Text style={{color: '#a3a3a3'}}>Diterbitkan: {locale[new Date(data.created).getDay()] + ', ' + moment(data.created).format('DD MMM YYYY')}</Text>
              {
                data.start_date !== 0 && data.end_date !== 0 &&
                <View>
                  <Text style={{color: '#a3a3a3'}}>Periode Mulai: {x1}</Text>
                  <Text style={{color: '#a3a3a3'}}>Periode Berakhir: {x2}</Text>
                </View>
              }
              <Text style={{color: '#a3a3a3'}}>Kategori: {data.tag}</Text>
              <Text style={{marginTop: 20}}>{data.content}</Text>
            </View>
          </View>
          <View style={{height: 10}} />
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
    borderBottomColor: '#cecece',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 18,
    color: 'white'
  }
})
