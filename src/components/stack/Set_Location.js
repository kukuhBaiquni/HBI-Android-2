import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { ORIGIN_POINT } from '../basic/supportFunction';
import { withNavigationFocus } from 'react-navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

    render() {
        if (this.props.isFocused) {
            return(
                <View>
                    <MapView
                        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                        initialRegion={{...ORIGIN_POINT, latitudeDelta: 0, longitudeDelta: 0.5}}
                        >
                    </MapView>
                    <View style={styles.infoContainer}>
                        <View style={styles.floatingInfo}>
                            <Text style={{...TYPOGRAPHY.subHeader}}>Ketuk pada peta untuk memilih lokasi</Text>
                        </View>
                    </View>
                </View>
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
    floatingInfo: { backgroundColor: COLORS.PURE_WHITE, elevation: 5, width: SCREEN_WIDTH*0.8, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 20}
});

export default withNavigationFocus(SetLocation);
