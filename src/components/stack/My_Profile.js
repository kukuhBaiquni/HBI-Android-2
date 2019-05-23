import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../../config';
import LinearGradient from 'react-native-linear-gradient';
import { fetchUser } from '../../actions/Get_User_Data';
import moment from 'moment';
import { BACKDARKRED } from '../../images';

class MyProfile extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profil Saya',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> )
        }
    };

    render() {
        const { userData, dispatch, navigation } = this.props;
        let gender = userData.data.gender;
        if (gender === 'male') {
            gender = 'Pria'
        }else{
            gender = 'Wanita'
        }
        return(
            <ScrollView>
                <View style={{height: 50, backgroundColor: '#f4f4f4', marginTop: 10, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={{fontSize: 17}}>Informasi Pribadi</Text>
                </View>
                <View style={{backgroundColor: 'white', height: 245, padding: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Nama Lengkap</Text>
                    <Text style={styles.dataUser}>{userData.data.name}</Text>
                    <Text style={styles.propertyName}>Jenis Kelamin</Text>
                    <Text style={styles.dataUser}>{userData.data.gender === undefined ? 'Belum diatur' : gender}</Text>
                    <Text style={styles.propertyName}>Tanggal Lahir</Text>
                    <Text style={styles.dataUser}>{userData.data.ttl === undefined ? 'Belum diatur' : moment(userData.data.ttl).format('DD MMM YYYY')}</Text>
                    <Text style={styles.propertyName}>Nomor Ponsel</Text>
                    <Text style={styles.dataUser}>{userData.data.phone === '' || userData.data.phone === undefined ? 'Belum diatur' : '0' + userData.data.phone}</Text>
                    <Text style={styles.propertyName}>Email</Text>
                    <Text style={styles.dataUser}>{userData.data.email}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={{fontSize: 17}}>Informasi Alamat</Text>
                </View>
                <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text style={styles.dataUser}>Jl.{userData.data.address.street} No.{userData.data.address.no} Rt.{userData.data.address.rt} Rw.{userData.data.address.rw}</Text>
                    <Text style={styles.dataUser}>Kecamatan {capital(userData.data.address.district)}</Text>
                    <Text style={styles.dataUser}>Kelurahan {capital(userData.data.address.village)}</Text>
                    <Text style={styles.dataUser}>{capital(userData.data.address.city)}</Text>
                </View>
            </ScrollView>
        )
    }
}

function capital(x) {
    var cs = x.split(' ')
    var as = cs.map(r => r.toLowerCase())
    var result = []
    for (var i = 0; i < as.length; i++) {
        result.push(as[i].charAt(0).toUpperCase() + as[i].slice(1))
    }
    return result.join(' ')
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
    },
    headerMenu: {
        height: 50,
        paddingTop: 15,
        paddingLeft: 8,
        backgroundColor: '#bfbfbf',
        marginTop: 10
    },
    listMenu: {
        height: 55,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        padding: 6,
        backgroundColor: 'white'
    },
    menuTitle: {
        fontSize: 16
    },
    dataUser: {
        color: '#9e9e9e'
    },
    propertyName: {
        fontWeight: 'bold',
        marginTop: 10
    },
    addressContainer: {
        height: 50,
        backgroundColor: '#f4f4f4',
        marginTop: 10,
        justifyContent: 'center',
        paddingLeft: 10
    }
});


function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(MyProfile);
