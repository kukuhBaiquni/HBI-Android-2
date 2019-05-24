import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

const SUCCESS_DIALOG = (props) => {
    return(
        <View style={styles.STmain}>
            <View style={styles.STheader}>
                <Text style={styles.STtext}> {STRINGS.mainTitle} </Text>
            </View>
            <ScrollView style={styles.STscrollable}>
                <View style={styles.alignCenter}>
                    <Text style={styles.STtransactionCodeText}> {STRINGS.transCodeProp} </Text>
                    <Text style={styles.STtransactionCodeValue}> {transaction.trx} </Text>
                    <Text style={styles.colorText}> {STRINGS.totalBill} </Text>
                    <Text style={styles.STtransactionTotalPriceValue}> {idrFormat(transaction.total_price)} </Text>
                    <Text style={[{marginBottom: 5}, styles.colorText]}> {STRINGS.paymentMethod} </Text>
                    <Text> {STRINGS.transTo} </Text>
                    <Text style={styles.STtrxText}> {STRINGS.noRek} </Text>
                    <Text style={[styles.colorText, styles.centeringItems]}> {STRINGS.instruction1} </Text>
                    <Text style={[styles.colorText, styles.centeringItems]}> {STRINGS.instruction2} </Text>
                    <Text style={[styles.colorText, styles.centeringItems, {marginBottom: 10}]}> {STRINGS.instruction3} </Text>
                    <Text style={[{marginBottom: 10}, styles.colorText]}> {STRINGS.instruction4} </Text>
                    <Text style={styles.STdateText}>{moment(transaction.due_date).format('DD MMM YYYY HH:mm')}</Text>
                </View>
                <TouchableOpacity onPress={() => this.queueRouting()} style={styles.button}>
                    <Text style={color: COLORS.GREEN_DARK}}> {STRINGS.buttonText} </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const STRINGS = {
    mainTitle: 'Konfirmasi Sukses',
    transCodeProp: 'Kode Transaksi',
    totalBill: 'Jumlah Tagihan Anda',
    paymentMethod: 'Metode Pembayaran',
    transTo: 'Transfer ke rekening BCA',
    noRek: 2820260417,
    instruction1: 'Jumlah transfer pembayaran harus sesuai',
    instruction2: 'dengan jumlah tagihan (hingga 3 digit terakhir)',
    instruction3: 'Isi Nomor Transaksi pada kolom detail transfer',
    instruction4: 'Lakukan pembayaran sebelum',
    buttonText: 'Lihat'
};

const styles = StyleSheet.create({
    STmain: {backgroundColor: COLORS.GREEN_FADE, borderRadius: 5, width: 300},
    STheader: {borderBottomColor: COLORS.GREEN_DARK, borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'},
    STtext: {fontSize: TYPOGRAPHY.f18, color: COLORS.GREEN_DARK},
    STscrollable: {backgroundColor: COLORS.GREEN_SEMI_WHITE, padding: 20, height: 400},
    STtransactionCodeText: {color: COLORS.GRAY_FADE, marginBottom: 2},
    STtransactionCodeValue: {fontSize: TYPOGRAPHY.f20, marginBottom: 10},
    STtransactionTotalPriceValue: {marginBottom: 10, fontSize: TYPOGRAPHY.f18},
    STtrxText: {fontSize: TYPOGRAPHY.f17, marginBottom: 10},
    STdateText: {fontSize: TYPOGRAPHY.f20, marginBottom: 20},
    button: {
        marginBottom: 40,
        width: 250,
        height: 45,
        backgroundColor: COLORS.GREEN_FADE,
        borderColor: COLORS.GREEN_DARK,
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
