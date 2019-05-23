import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { locale, idrFormat, TRACKING_COLOR_STATUS, TRACKING_MESSAGE_STATUS } from '../../../config';
import moment from 'moment';
import { readingNotification } from '../../actions/Reading_Notification';
import { NavigationEvents } from 'react-navigation';
import { BACKDARKRED } from '../../images';

class NotificationDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Detail Notifikasi',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 16, width: 16}} source={BACKDARKRED} /> )
        };
    };

    beforeRender() {
        const token = this.props.token;
        const type = this.props.navigation.state.params.type;
        const data = this.props.navigation.state.params.data;
        if (!data.status) {
            this.props.dispatch(readingNotification({token, type, id: data._id}));
        }
    };

    render() {
        const { navigation,  } = this.props;
        const data = navigation.state.params.data;
        const header2 = ['', 'Pesanan Anda sedang dalam antrian.', 'Pembayaran pesanan anda berhasil dikonfirmasi.', 'Proses pengiriman pesanan anda sedang dilakukan.', 'Telah berbelanja di Halal Beef Indonesia.'];
        return(
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <View style={styles.container}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Terima Kasih!</Text>
                        <Text>{header2[data.tracking]}</Text>
                        <Text style={{color: '#a3a3a3', fontSize: 13}}>{locale[new Date(data.date).getDay()] +', '+ moment(data.date).format('DD MMM YYYY') + ' '+ moment(data.date).format('HH:mm')}</Text>
                        <View style={{height: 40}} />
                        {
                            data.tracking === 1 &&
                            <View>
                                <View style={{alignItems: 'center', borderBottomColor: '#a3a3a3', borderBottomWidth: 1, marginBottom: 25}}>
                                    <Text style={{color: '#a3a3a3'}}>Dan segera lakukan pembayaran sebelum:</Text>
                                    <Text style={{fontSize: 20, marginBottom: 5, color: '#a3a3a3'}}>{locale[new Date(data.content.due_date).getDay()] +', '+ moment(data.content.due_date).format('DD MMM YYYY') + ' '+ moment(data.content.due_date).format('HH:mm')}</Text>
                                </View>
                                <View style={{alignItems: 'center', borderBottomColor: '#a3a3a3', borderBottomWidth: 1, marginBottom: 25}}>
                                    <Text style={{color: '#a3a3a3'}}>Metode Pembayaran:</Text>
                                    <Text style={{color: '#a3a3a3', fontSize: 16, marginBottom: 10}}>Transfer ke <Text style={{fontWeight: 'bold'}}>rekening BCA 2820260417</Text></Text>
                                    <Text style={{color: '#a3a3a3', fontStyle: 'italic'}}>Jumlah transfer pembayaran harus sesuai</Text>
                                    <Text style={{color: '#a3a3a3', fontStyle: 'italic'}}>dengan jumlah tagihan (hingga 3 digit terakhir).</Text>
                                    <Text style={{color: '#a3a3a3', fontStyle: 'italic'}}>Tulis Nomor Transaksi pada kolom Detail Transfer,</Text>
                                    <Text style={{color: '#a3a3a3', fontStyle: 'italic', marginBottom: 15}}>untuk kelancaran proses pembayaran Anda.</Text>
                                </View>
                            </View>
                        }
                        <Text style={{fontSize: 18, color: '#a3a3a3'}}>Detail Pesanan Anda:</Text>
                        <View style={{borderBottomColor: '#a3a3a3', borderBottomWidth: 1, marginBottom: 15}}>
                            <Text style={{color: '#a3a3a3'}}>Nomor Transaksi</Text>
                            <Text style={{position: 'absolute', right: 0, color: '#a3a3a3'}}>{data.trx}</Text>
                            {
                                data.tracking === 1 &&
                                <View>
                                    <Text style={{color: '#a3a3a3', marginBottom: 10}}>Jumlah Tagihan</Text>
                                    <Text style={{position: 'absolute', right: 0, fontWeight: 'bold'}}>{idrFormat(data.content.amount)}</Text>
                                </View>
                            }
                            {
                                data.tracking !== 1 &&
                                <View>
                                    <Text style={{color: '#a3a3a3', marginBottom: 10}}>Status</Text>
                                    <Text style={{position: 'absolute', right: 0, color: TRACKING_COLOR_STATUS[data.tracking], fontWeight: 'bold'}}>{TRACKING_MESSAGE_STATUS[data.tracking]}</Text>

                                </View>
                            }
                        </View>
                        {
                            data.tracking === 3 &&
                            <View style={{marginBottom: 20, marginTop: 20}}>
                                <Text style={{color: 'black', marginBottom: 15, textAlign: 'center'}}>Konfimasi apabila pesanan anda sudah sampai.</Text>
                                <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#7c0c10', borderRadius: 3, elevation: 3}}>
                                    <Text style={{color: 'white', padding: 15, fontSize: 16, fontWeight: 'bold'}}>Pesanan sudah saya terima</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('TransactionDetails', {trx: data.trx})}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#7c0c10'}}>Lihat Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(NotificationDetails);

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
    container: {
        width: '95%',
        borderRadius: 3,
        elevation: 3,
        padding: 15
    }
});
