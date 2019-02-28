import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableNativeFeedback, StatusBar, AsyncStorage, Dimensions } from 'react-native';
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
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class ListMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -6.949364630440158,
        longitude: 107.613774407655,
        latitudeDelta: 0.01754357210323132,
        longitudeDelta: 0.00994127243757248
      },
      camera: {
        center: {
          latitude: -6.949364630440158,
          longitude: 107.613774407655
        },
        pitch: 0,
        heading: 1,
        altitude: 0,
        zoom: 13
      },
      member: [
        {
          center: {
            latitude: -6.919689366190346,
            longitude: 107.59468043223023
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        },
        {
          center: {
            latitude: -6.94248461157722,
            longitude: 107.57586942985654
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        },
        {
          center: {
            latitude: -6.98863485873917,
            longitude: 107.57206605747342
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        },
        {
          center: {
            latitude: -7.033653849522472,
            longitude: 107.5832569040358
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        },
        {
          center: {
            latitude: -7.025569213896901,
            longitude: 107.64357374981046
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        },
        {
          center: {
            latitude: -6.977922716807315,
            longitude: 107.68835322931409
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 13
        }
      ]
    }
  }

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

  componentDidMount() {
    Geolocation.getCurrentPosition(
        (position) => {
            this.map.animateCamera({
              center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              },
              pitch: 1,
              heading: 1,
              altitude: 1,
              zoom: 14
            })
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  test(i) {
    this.map.animateCamera({
      center: {
        latitude: this.state.member[i].center.latitude,
        longitude: this.state.member[i].center.longitude
      },
      pitch: 1,
      heading: 1,
      altitude: 1,
      zoom: 13
    })
  }

  render() {
    const data = Array(10).fill('Master')
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
        <MapView
          ref={map => this.map = map}
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          initialRegion={this.state.region}
          onRegionChangeComplete={(x) => console.log(x)}
          showsUserLocation={true}
        >
        {
          this.state.member.map((x, i) =>
            <Marker
              key={i}
              coordinate={x.center}
              title='Member'
              description='Jualan Daging'
            />
          )
        }
      </MapView>
        <View style={{position: 'absolute', bottom: 0, right: 0, width: SCREEN_WIDTH, alignItems: 'center'}}>
          <Swiper
            horizontal={true}
            autoplay={false}
            showsPagination={false}
            activeDotColor='#7c0c10'
            style={{backgroundColor: 'transparent', width: SCREEN_WIDTH, height: 120}}
            >
            {
              this.state.member.map((x, i) =>
              <View key={i} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableNativeFeedback onPress={(x) => this.test(i)} background={TouchableNativeFeedback.Ripple('darkred')}>
                  <View style={{width: SCREEN_WIDTH*0.85, height: 100, backgroundColor: '#7a7a7a', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 22}}>Toko {i+1}</Text>
                    <Text style={{color: 'white'}}>latitude: {this.state.region.latitude}</Text>
                    <Text style={{color: 'white'}}>longitude: {this.state.region.longitude}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              )
            }
          </Swiper>
        </View>
      </View>
    )
  }
}

// <View style={{height: 200}}>
  // <Swiper
  //   horizontal={true}
  //   autoplay={true}
  //   autoplayTimeout={2.5}
  //   activeDotColor='#7c0c10'
  //   >
  //   {
  //     data.map((x, i) =>
  //     <TouchableOpacity key={i}>
  //       <Image
  //        style={{width: '100%', height: 200}}
  //        source={require('../../android/app/src/main/assets/custom/discount.png')}
  //       />
  //     </TouchableOpacity>
  //     )
  //   }
  // </Swiper>
//   <TouchableOpacity style={styles.floatingButton}>
//     <Text style={styles.productName}>Lihat Promo Lainnya</Text>
//   </TouchableOpacity>
// </View>
// <View style={{width: '100%', alignItems: 'center'}}>
//   <View style={{width: '95%', marginBottom: 10}}>
//     <Text style={{fontSize: 16, fontWeight: 'bold', color: '#7c0c10', marginTop: 15}}>Toko Terdekat dari Anda</Text>
//   </View>
//   <ScrollView showsVerticalScrollIndicator={false}>
//     {
//       this.props.listMarket.data.map((x, i) =>
//         <TouchableNativeFeedback onPress={(q) => this.setMemberToReducer(x)} key={i} background={TouchableNativeFeedback.Ripple('#7a7a7a')}>
//           <View style={{width: '100%', backgroundColor: 'white', padding: 10, borderRadius: 3, elevation: 3, marginBottom: 10}}>
//             <View style={{flexDirection: 'row'}}>
//               <Image style={{height: 80, width: 80}} source={require('../../android/app/src/main/assets/custom/Contoh2.png')}/>
//               <View style={{width: 220}}>
//                 <Text style={{fontWeight: 'bold', color: '#7c0c10', marginLeft: 10, fontSize: 17}}>Belanja Disini!</Text>
//                 <Text style={{marginLeft: 10, fontSize: 11}}>Jl.{x.address.street} No.{x.address.no}</Text>
//                 <Text style={{marginLeft: 10, fontSize: 11}}>Rt.0{x.address.rt} Rw.0{x.address.rw}</Text>
//                 <Text style={{marginLeft: 10, fontSize: 11}}>{x.address.district} {x.address.village}</Text>
//                 <Text style={{marginLeft: 10, fontSize: 11}}>{x.address.city} 0{x.phone}</Text>
//               </View>
//             </View>
//             <View style={{alignItems: 'flex-end', marginTop: 5}}>
//               <TouchableOpacity style={{width: 100, height: 40, borderRadius: 5, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'}}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Cek Ongkir</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableNativeFeedback>
//       )
//     }
//     <View style={{height: 245}} />
//   </ScrollView>
// </View>


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
