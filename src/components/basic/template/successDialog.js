import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';
import { IDR_FORMAT } from '../supportFunction';
import moment from 'moment';
import { FONT_TYPE } from '../Fonts';

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
                    <Text style={{...TYPOGRAPHY.p}}> {STRINGS.totalBill} </Text>
                    <Text style={styles.STtransactionTotalPriceValue}> {IDR_FORMAT(data.total_price)} </Text>
                    <Text style={styles.paymentMethod}> {STRINGS.paymentMethod} </Text>
                    <Text style={{...TYPOGRAPHY.p}}> {STRINGS.transTo} </Text>
                    <Text style={styles.STtrxText}> {STRINGS.noRek} </Text>
                    <Text style={styles.instruction}> {STRINGS.instruction1} </Text>
                    <Text style={styles.instruction3}> {STRINGS.instruction3} </Text>
                    <Text style={styles.instruction4}> {STRINGS.instruction4} </Text>
                    <Text style={styles.STdateText}>{moment(data.due_date).format('DD MMM YYYY HH:mm')}</Text>
                </View>
                <TouchableOpacity onPress={() => toDetail()} style={styles.button}>
                    <Text style={{...TYPOGRAPHY.subHeader, color: COLORS.GREEN_DARK}}> {STRINGS.buttonText} </Text>
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
    instruction1            : 'Jumlah transfer pembayaran harus sesuai dengan jumlah tagihan (hingga 3 digit terakhir).',
    instruction3            : 'Isi Nomor Transaksi pada kolom detail transfer',
    instruction4            : 'Lakukan pembayaran sebelum',
    buttonText              : 'Kembali'
};

const styles = StyleSheet.create({
    alignCenter                     : {alignItems: 'center'},
    STmain                          : {backgroundColor: COLORS.GREEN_FADE, borderRadius: 5, width: 300},
    STheader                        : {borderBottomColor: COLORS.GREEN_DARK, borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'},
    STtext                          : {...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f16, color: COLORS.GREEN_DARK},
    STscrollable                    : {backgroundColor: COLORS.GREEN_SEMI_WHITE, padding: 20, height: 400},
    STtransactionCodeText           : {...TYPOGRAPHY.p, marginBottom: 2},
    paymentMethod                   : {marginBottom: 5, ...TYPOGRAPHY.p},
    STtransactionCodeValue          : {...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f17, marginBottom: 10},
    STtransactionTotalPriceValue    : {marginBottom: 10, ...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f17},
    STtrxText                       : {...TYPOGRAPHY.subHeader, ...TYPOGRAPHY.f15, marginBottom: 10},
    STdateText                      : {...TYPOGRAPHY.subHeader, marginBottom: 20},
    button                          : {marginBottom: 40, width: 250, height: 45, backgroundColor: COLORS.GREEN_FADE, borderColor: COLORS.GREEN_DARK, borderRadius: 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    instruction                     : {...TYPOGRAPHY.p, textAlign: 'center'},
    instruction3                    : {...TYPOGRAPHY.p, marginBottom: 10, textAlign: 'center'},
    instruction4                    : {marginBottom: 10, ...TYPOGRAPHY.p}
});
