import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
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
const candidate = ['administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3'];

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
            region: null,
            fakePosition: null,
            pcd: '',
            addressHandler: '',
            isAddressValid: true
        };
    };

    componentDidMount() {
        this.setState({
            region: {
                ...ORIGIN_POINT, latitudeDelta: 0, longitudeDelta: 0.5
            }
        })
    };

    _getLocation(location) {
        this.setState({fakePosition: location});
        fetch(googleApis + location.latitude + `,` + location.longitude + `&key=${API_KEY}`)
        .then(res => res.json())
        .then(resJson => {
            let result = [];
            for (var i = 0; i < resJson.results[0].address_components.length; i++) {
                for (var j = 0; j < candidate.length; j++) {
                    if (resJson.results[0].address_components[i].types[0] === candidate[j]) {
                        result.push(resJson.results[0].address_components[i].long_name);
                    }
                };
            };
            this.setState({
                pcd: result.join(', ')
            })
        })
        .catch((err) => {
            console.log(err);
        });
    };

    _submit = () => {
        if (this.state.addressHandler.length > 9 && this.state.addressHandler !== '') {
            this.props.navigation.navigate('Payment', {destinationPoint: this.state.fakePosition, addressString: this.state.addressHandler, pcd: this.state.pcd});
        }else{
            this.setState({isAddressValid: false})
        }
    };

    _onChangeText(x) {
        this.setState({
            addressHandler: x
        });
    };

    render() {
        console.log(this.state.fakePosition);
        if (this.props.isFocused) {
            return(
                <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                    <View>
                        <MapView
                            ref={map => this.map = map}
                            style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                            initialRegion={this.state.region}
                            onRegionChangeComplete={(x) => this._getLocation(x)}
                            showsCompass={false}
                            showsUserLocation={false}
                            showsMyLocationButton={false}
                            >
                        </MapView>
                        <View style={styles.markerFixed}>
                            <Icon name='location-pin' size={29} color={COLORS.ORANGE_DEFAULT} />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.floatingInfo}>
                                <Text style={{...TYPOGRAPHY.subHeader}}>Ketuk pada peta untuk memilih lokasi</Text>
                            </View>
                        </View>
                        <View style={styles.absoluteBottom}>
                            <View style={styles.userInput}>
                                <ScrollView>
                                    <Text style={{...TYPOGRAPHY.subHeader}}>Lokasi Anda (Provinsi, Kota, Kecamatan)</Text>
                                    <Text style={{...TYPOGRAPHY.p}}>{this.state.pcd === '' ? 'Anda belum memilih lokasi..' : this.state.pcd}</Text>
                                    <Item stackedLabel style={{width: 310, marginTop: 5}}>
                                        <Label style={{...TYPOGRAPHY.subHeader}}>Alamat Lengkap</Label>
                                        <Input
                                            onChangeText={(x) => this._onChangeText(x)}
                                            value={this.state.addressHandler}
                                            editable={true}
                                            placeholder='Jalan, Nomor, Rt, Rw'
                                            style={{...TYPOGRAPHY.p}}
                                            />
                                    </Item>
                                    {!this.state.isAddressValid && <Label style={{...TYPOGRAPHY.p, color: 'red', marginLeft: 10}}>Alamat belum lengkap..</Label>}
                                    <TouchableOpacity style={styles.doneButton} onPress={this._submit}>
                                        <Text style={{...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f15, color: COLORS.PURE_WHITE}}>Selesai</Text>
                                    </TouchableOpacity>
                                </ScrollView>
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
    userInput: { backgroundColor: COLORS.PURE_WHITE, height: 220, width: SCREEN_WIDTH*0.95, borderRadius: 5, elevation: 5, padding: 10},
    doneButton: {backgroundColor: COLORS.PRIMARY, width: '100%', height: 45, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 25},
    markerFixed: { left: '50%', position: 'absolute', top: '40%' }

});

export default withNavigationFocus(SetLocation);
