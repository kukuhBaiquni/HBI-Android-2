import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { fetchUser } from '../../actions/Get_User_Data';
import moment from 'moment';

class MyProfile extends Component {
    render() {
        const userData = this.props.userData;
        let gender = userData.gender;
        if (gender === 'male') {
            gender = 'Pria'
        }else{
            gender = 'Wanita'
        }
        return(
            <ScrollView>
                <NavigationEvents
                    onWillFocus={() => this.props.dispatch(fetchUser(this.props.navigation.state.params.token))}
                    />
                <View style={{height: 50, backgroundColor: '#f4f4f4', marginTop: 10, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={{fontSize: 17}}>Informasi Pribadi</Text>
                </View>
                <View style={{backgroundColor: 'white', height: 245, padding: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Nama Lengkap</Text>
                    <Text style={styles.dataUser}>{userData.name}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 10}}>Jenis Kelamin</Text>
                    <Text style={styles.dataUser}>{userData.gender === undefined ? 'Belum diatur' : gender}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 10}}>Tanggal Lahir</Text>
                    <Text style={styles.dataUser}>{userData.ttl === undefined ? 'Belum diatur' : moment(userData.ttl).format('DD MMM YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 10}}>Nomor Ponsel</Text>
                    <Text style={styles.dataUser}>{userData.phone === '' || userData.phone === undefined ? 'Belum diatur' : '0' + userData.phone}</Text>
                    <Text style={{fontWeight: 'bold', marginTop: 10}}>Email</Text>
                    <Text style={styles.dataUser}>{userData.email}</Text>
                </View>
                <View style={{height: 50, backgroundColor: '#f4f4f4', marginTop: 10, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={{fontSize: 17}}>Informasi Alamat</Text>
                </View>
                <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text style={styles.dataUser}>Jl.{userData.address.street} No.{userData.address.no} Rt.{userData.address.rt} Rw.{userData.address.rw}</Text>
                    <Text style={styles.dataUser}>Kecamatan {capital(userData.address.district)}</Text>
                    <Text style={styles.dataUser}>Kelurahan {capital(userData.address.village)}</Text>
                    <Text style={styles.dataUser}>{capital(userData.address.city)}</Text>
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
    }
})


function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(MyProfile);
