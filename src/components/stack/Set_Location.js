import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { ORIGIN_POINT, API_KEY } from '../basic/supportFunction';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Item, Input, Label } from 'native-base';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const googleApis = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

class SetLocation extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Ubah Alamat Pengiriman',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            coordinate: {
                latitude: '',
                longitude: ''
            },
            addresshandler: ''
        };
    };

    _getLocation(location) {
        fetch(googleApis + location.latitude + `,` + location.longitude + `&key=${API_KEY}`)
        .then(res => res.json())
        .then(resJson => {
            this.setState({coordinate: location});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    _renderManualPosition = () => {
        const { coordinate } = this.state;
        if (coordinate.latitude !== '' && coordinate.longitude !== '') {
            return(
                <Marker
                    coordinate={this.state.coordinate}
                    title='Posisi Saya'
                    description='{this.state.addressHandler}'
                    showsCompass={false}
                    >
                    <Icon name='man' size={20} color={COLORS.PRIMARY} />
                </Marker>
            )
        }
    };

    render() {
        console.log(this.state.coordinate);
        if (this.props.isFocused) {
            return(
                <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                    <View>
                        <MapView
                            ref={map => this.map = map}
                            style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                            initialRegion={{...ORIGIN_POINT, latitudeDelta: 0, longitudeDelta: 0.5}}
                            showsCompass={false}
                            onRegionChangeComplete={(x) => this.setState({coordinate: x})}
                            onPress={(e) => this._getLocation(e.nativeEvent.coordinate)}
                            >
                            {this._renderManualPosition()}
                        </MapView>
                        <View style={styles.infoContainer}>
                            <View style={styles.floatingInfo}>
                                <Text style={{...TYPOGRAPHY.subHeader}}>Ketuk pada peta untuk memilih lokasi</Text>
                            </View>
                        </View>
                        <View style={styles.absoluteBottom}>
                            <View style={styles.userInput}>
                                <Text style={{...TYPOGRAPHY.subHeader}}>Lokasi Anda (Provinsi, Kota, Kecamatan)</Text>
                                <Text style={{...TYPOGRAPHY.p}}>Anda belum memilih lokasi..</Text>
                                <Item stackedLabel style={{width: 310, marginTop: 5}}>
                                    <Label style={{...TYPOGRAPHY.subHeader}}>Alamat Lengkap</Label>
                                    <Input
                                        onChangeText={(x) => onChangeText('name', x)}
                                        value=''
                                        editable={true}
                                        placeholder='Jalan, Rt, Rw, Nomor'
                                        style={{...TYPOGRAPHY.p}}
                                        />
                                </Item>
                                <TouchableOpacity style={styles.doneButton}>
                                    <Text style={{...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f15, color: COLORS.PURE_WHITE}}>Selesai</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            )
        }else{
            return(
                <View></View>
            )
        }
    }
};

const styles = StyleSheet.create({
    infoContainer: { alignItems: 'center', width: SCREEN_WIDTH, position: 'absolute', top: 10, left: 0 },
    floatingInfo: { backgroundColor: COLORS.PURE_WHITE, elevation: 5, width: SCREEN_WIDTH*0.8, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 20},
    absoluteBottom: {position: 'absolute', bottom: 85, left: 0, width: SCREEN_WIDTH, alignItems: 'center'},
    userInput: { backgroundColor: COLORS.PURE_WHITE, height: 200, width: SCREEN_WIDTH*0.95, borderRadius: 5, elevation: 5, padding: 10},
    doneButton: {backgroundColor: COLORS.PRIMARY, width: '100%', height: 45, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 25}
});

export default withNavigationFocus(SetLocation);
