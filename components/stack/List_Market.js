import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableNativeFeedback, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { SERVER_URL, idrFormat } from '../../config';
import { NavigationEvents } from 'react-navigation';
import { getAllProducts } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';
import { getMarket } from '../../actions/Get_Market';
import { setTargetMember } from '../../actions/Set_Target_Member';

class ListMarket extends Component {

  beforeRender = async () => {
    try{
      const id = await AsyncStorage.getItem('PlayerID')
      const token = await AsyncStorage.getItem('access_token');
      if (id !== null && token !== null) {
        const ids = JSON.parse(id)
        const tokens = JSON.parse(token)
        if (this.props.token === '') {
          this.props.dispatch(setInitialToken(tokens))
        }
        if (this.props.userData.playerID !== ids) {
          this.props.dispatch(setPlayerId({ids, token: tokens}))
        }
        if (this.props.userData.name === '') {
          this.props.dispatch(fetchUser(tokens))
        }
      }
      if (this.props.listProducts.length === 0) {
        this.props.dispatch(getAllProducts());
      }
      if (this.props.listMarket.data.length === 0) {
        this.props.dispatch(getMarket())
      }
    }catch(error) {
    }
  }

  setMemberToReducer(x) {
    this.props.dispatch(setTargetMember(x))
    this.props.navigation.navigate('ListProducts')
  }

  render() {
    const data = Array(5).fill('Master')
    const { navigation } = this.props;
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='#7c0c10'
          barStyle='light-content'
          />
        <NavigationEvents
          onWillFocus={() => this.beforeRender()}
          />
        <View style={{height: 200}}>
          <Swiper
            horizontal={true}
            autoplay={true}
            autoplayTimeout={2.5}
            activeDotColor='#7c0c10'
            >
            {
              data.map((x, i) =>
              <TouchableOpacity key={i}>
                <Image
                 style={{width: '100%', height: 200}}
                 source={require('../../android/app/src/main/assets/custom/discount.png')}
                />
              </TouchableOpacity>
              )
            }
          </Swiper>
          <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.productName}>Lihat Promo Lainnya</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '95%', marginBottom: 10}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#7c0c10', marginTop: 15}}>Toko Terdekat dari Anda</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.props.listMarket.data.map((x, i) =>
                <TouchableNativeFeedback onPress={(q) => this.setMemberToReducer(x)} key={i} background={TouchableNativeFeedback.Ripple('#7a7a7a')}>
                  <View style={{width: '100%', backgroundColor: 'white', padding: 10, borderRadius: 3, elevation: 3, marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image style={{height: 80, width: 80}} source={require('../../android/app/src/main/assets/custom/Contoh2.png')}/>
                      <View style={{width: 220}}>
                        <Text style={{fontWeight: 'bold', color: '#7c0c10', marginLeft: 10, fontSize: 17}}>Belanja Disini!</Text>
                        <Text style={{marginLeft: 10, fontSize: 11}}>Jl.{x.address.street} No.{x.address.no}</Text>
                        <Text style={{marginLeft: 10, fontSize: 11}}>Rt.0{x.address.rt} Rw.0{x.address.rw}</Text>
                        <Text style={{marginLeft: 10, fontSize: 11}}>{x.address.district} {x.address.village}</Text>
                        <Text style={{marginLeft: 10, fontSize: 11}}>{x.address.city} 0{x.phone}</Text>
                      </View>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 5}}>
                      <TouchableOpacity style={{width: 100, height: 40, borderRadius: 5, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>Cek Ongkir</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              )
            }
            <View style={{height: 245}} />
          </ScrollView>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(ListMarket)

const styles = StyleSheet.create({
  slide: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 40,
    elevation: 3
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold'
  },
  productName: {color: '#7c0c10', fontSize: 12, fontWeight: 'bold'},
  floatingButton: {
    position: 'absolute',
    zIndex: 3,
    bottom: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7c0c10',
    elevation: 5
  }
})
