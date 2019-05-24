import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { LOCALE_DAY,TRACKING_COLOR_STATUS, TRACKING_MESSAGE_STATUS } from '../basic/supportFunction';

export default class MailPartials extends Component {

    render() {
        const { userData, type, navigation } = this.props;
        const data = userData.data.notifications[type].slice(0, 3).reverse();
        if (userData.data.notifications[type].length === 0) {
            return(
                <View style={{paddingTop: 15, paddingBottom: 15}}>
                    <Text style={styles.emptyNotifText}>Belum ada notifikasi</Text>
                </View>
            )
        }else{
            return(
                <View style={{alignItems: 'center'}}>
                    {
                        data.map((x, i) =>
                            <TouchableOpacity onPress={() => navigation.navigate('NotificationDetails', {data: x, type})} key={i} style={x.status ? [styles.listItem, {backgroundColor: '#eaeaea'}] : [styles.listItem, {backgroundColor: 'white'}]}>
                                <Text>Nomor Transaksi</Text>
                                <Text style={{position: 'absolute', right: 10, top: 7, fontWeight: 'bold'}}>{x.trx}</Text>
                                <Text style={{fontSize: 12, color: '#a3a3a3'}}>{LOCALE_DAY[new Date(x.date).getDay()] + ', ' + moment(x.date).format('DD MMM YYYY') + ' - ' + moment(x.date).format('HH:mm')}</Text>
                                <Text style={{color: TRACKING_COLOR_STATUS[x.tracking]}}>{TRACKING_MESSAGE_STATUS[x.tracking]}</Text>
                                {
                                    !x.status &&
                                    <Text style={styles.newNotifText}>BARU</Text>
                                }
                            </TouchableOpacity>
                        )
                    }
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    listItem: {
        width: '95%',
        marginTop: 5,
        borderRadius: 5,
        height: 70,
        paddingTop: 5,
        paddingLeft: 15,
        elevation: 3
    },
    newNotifText: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#36ce00'
    },
    emptyNotifText: {
        fontStyle: 'italic',
        color: '#a3a3a3',
        textAlign: 'center'
    }
})
