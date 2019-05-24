import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { IDR_FORMAT } from './supportFunction';
import moment from 'moment';
import { FONT_TYPE } from './Fonts';

export const SUCCESS_DIALOG = (props) => {
    const { data, toDetail } = props;
    return(
        <View style={styles.STmain}>
            <View style={styles.STheader}>
                <Text style={styles.STtext}> {STRINGS.mainTitle} </Text>
            </View>
            <ScrollView style={styles.STscrollable}>
                <View style={styles.alignCenter}>
                    <Text style={styles.STtransactionCodeText}> {STRINGS.transCodeProp} </Text>
                    <Text style={styles.STtransactionCodeValue}> {data.trx} </Text>
                    <Text style={{color: COLORS.GRAY_FADE}}> {STRINGS.totalBill} </Text>
                    <Text style={styles.STtransactionTotalPriceValue}> {IDR_FORMAT(data.total_price)} </Text>
                    <Text style={styles.paymentMethod}> {STRINGS.paymentMethod} </Text>
                    <Text> {STRINGS.transTo} </Text>
                    <Text style={styles.STtrxText}> {STRINGS.noRek} </Text>
                    <Text style={styles.instruction}> {STRINGS.instruction1} </Text>
                    <Text style={styles.instruction}> {STRINGS.instruction2} </Text>
                    <Text style={styles.instruction3}> {STRINGS.instruction3} </Text>
                    <Text style={styles.instruction4}> {STRINGS.instruction4} </Text>
                    <Text style={[styles.instruction4, {...FONT_TYPE.medium}]}> {STRINGS.instruction4} </Text>
                    <Text style={styles.STdateText}>{moment(data.due_date).format('DD MMM YYYY HH:mm')}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text onPress={() => toDetail()} style={{color: COLORS.GREEN_DARK}}> {STRINGS.buttonText} </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

SUCCESS_DIALOG.propTypes = {
  toDetail: PropTypes.func.isRequired,

};

const STRINGS = {
    mainTitle               : 'Konfirmasi Sukses',
    transCodeProp           : 'Kode Transaksi',
    totalBill               : 'Jumlah Tagihan Anda',
    paymentMethod           : 'Metode Pembayaran',
    transTo                 : 'Transfer ke rekening BCA',
    noRek                   : 2820260417,
    instruction1            : 'Jumlah transfer pembayaran harus sesuai',
    instruction2            : 'dengan jumlah tagihan (hingga 3 digit terakhir)',
    instruction3            : 'Isi Nomor Transaksi pada kolom detail transfer',
    instruction4            : 'Lakukan pembayaran sebelum',
    buttonText              : 'Lihat'
};

const styles = StyleSheet.create({
    alignCenter                     : {alignItems: 'center'},
    STmain                          : {backgroundColor: COLORS.GREEN_FADE, borderRadius: 5, width: 300},
    STheader                        : {borderBottomColor: COLORS.GREEN_DARK, borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'},
    STtext                          : {...TYPOGRAPHY.f18, color: COLORS.GREEN_DARK},
    STscrollable                    : {backgroundColor: COLORS.GREEN_SEMI_WHITE, padding: 20, height: 400},
    STtransactionCodeText           : {color: COLORS.GRAY_FADE, marginBottom: 2},
    paymentMethod                   : {marginBottom: 5, color: COLORS.GRAY_FADE},
    STtransactionCodeValue          : {...TYPOGRAPHY.f20, marginBottom: 10},
    STtransactionTotalPriceValue    : {marginBottom: 10, ...TYPOGRAPHY.f18},
    STtrxText                       : {...TYPOGRAPHY.f17, marginBottom: 10},
    STdateText                      : {...TYPOGRAPHY.f20, marginBottom: 20},
    button                          : {marginBottom: 40, width: 250, height: 45, backgroundColor: COLORS.GREEN_FADE, borderColor: COLORS.GREEN_DARK, borderRadius: 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    instruction                     : {color: COLORS.GRAY_FADE, textAlign: 'center'},
    instruction3                    : {color: COLORS.GRAY_FADE, marginBottom: 10, textAlign: 'center'},
    instruction4                    : {color: COLORS.GRAY_FADE, marginBottom: 10, ...FONT_TYPE.regular}
});
