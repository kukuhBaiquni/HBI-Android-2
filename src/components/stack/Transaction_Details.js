import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { SERVER_URL, IDR_FORMAT, LOCALE_DAY }from '../basic/supportFunction';
import moment from 'moment';
import { loadSingleTransaction } from '../../actions/Load_Single_Transaction';
import { FREE_ONGKIR, BACKDARKRED } from '../../images';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';

class TransactionDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Detail Transaksi',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
    }
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    beforeRender() {
        if (this.props.navigation.state.params.transaction === undefined) {
            const trx = this.props.navigation.state.params.trx;
            this.props.dispatch(loadSingleTransaction(trx));
        }else{
            this.setState({data: this.props.navigation.state.params.transaction})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.transaction !== this.props.transaction) {
            this.setState({data: this.props.transaction})
        }
    }

    render() {
        const { navigation } = this.props;
        const { data } = this.state;
        const color = ['', '#ffbf00', '#4d2e9b', '#01adbc', '#0038bc', '#00b71e']
        const trackingTitle = ['','Menunggu Konfirmasi Pembayaran', 'Pembayaran Sudah Dikonfirmasi', 'Pesanan Sedang Diproses', 'Pesanan Sedang Dikirim', 'Pesanan Sudah Sampai'];
        return(
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                {
                    data.address !== undefined &&
                    <View>
                        <ScrollView>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.container}>
                                    <Text style={styles.subTitle}>ID Transaksi</Text>
                                    <Text style={styles.defaultParagraph}>{data.trx}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={[styles.subTitle]}>Waktu Pemesanan</Text>
                                    <Text style={styles.defaultParagraph}>{LOCALE_DAY[new Date(data.start_date).getDay()] + ', ' + moment(data.start_date).format('DD MMM YYYY') + ' - ' + moment(data.start_date).format('HH:mm')}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={[styles.subTitle, {marginBottom: 5}]}>Alamat Pengiriman</Text>
                                    <Text style={styles.defaultParagraph}>{data.address.receiver}</Text>
                                    <Text style={styles.defaultParagraph}>0{data.address.receiver_phone}</Text>
                                    <Text style={styles.defaultParagraph}>Jl.{data.address.streets} No.{data.address.no} Rt.0{data.address.rt} Rw.0{data.address.rw}</Text>
                                    <Text style={styles.defaultParagraph}>Kecamatan {data.address.districts}</Text>
                                    <Text style={styles.defaultParagraph}>Kelurahan {data.address.villages}</Text>
                                    <Text style={styles.defaultParagraph}>{data.address.cities}</Text>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.subTitle}>Lacak Pesanan</Text>
                                    {
                                        data.status !== 'expired'
                                        ?
                                        data.tracking_history.map((x, i) =>
                                            <View key={i} style={{marginTop: 10}}>
                                                <Text style={styles.defaultParagraph}>{LOCALE_DAY[new Date(x.time).getDay()] + ', ' + moment(x.time).format('DD MMM YYYY') + ' - ' + moment(x.time).format('HH:mm')}</Text>
                                                <Text style={{...TYPOGRAPHY.subHeader, color: color[x.tracking_type]}}>{trackingTitle[x.tracking_type]}</Text>
                                            </View>
                                        )
                                        :
                                        <Text style={{color: '#a5a5a5'}}>Anda tidak menyelesaikan pembayaran untuk transaksi ini.</Text>
                                    }
                                </View>
                                <View style={[styles.container, {padding: 5}]}>
                                    <Text style={[styles.subTitle, {padding: 10}]}>Detail Pesanan</Text>
                                </View>
                                {
                                    data.detail_items.map((x, i) =>
                                        <View key={i} style={styles.container}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                    resizeMode='cover'
                                                    style={styles.imageStyles}
                                                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                                    />
                                                <View style={styles.detailContainer}>
                                                    <Text numberOfLines={1} style={styles.productNameText}>{x.product_name}</Text>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={{...TYPOGRAPHY.p}}>Harga: </Text>
                                                        <Text style={styles.defaultRightText}>{IDR_FORMAT(x.price)}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={{...TYPOGRAPHY.p}}>Kuantitas: </Text>
                                                        <Text style={styles.defaultRightText}>{x.qty} {this.props.listProducts.filter((r) => r.id === x.id ).map((x) => x.unit)}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text></Text>
                                                    <Text></Text>
                                                    <Text></Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%', flexDirection: 'row'}}>
                                                <Text style={styles.subtotalText}>Subtotal </Text>
                                                <View style={{width: '100%', position: 'absolute'}}>
                                                    <Text style={styles.subtotalValue}>{IDR_FORMAT(x.price * x.qty)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.footer}>
                                    <Text style={styles.totalPriceText}>Total Belanja</Text>
                                    <View style={{width: '100%', position: 'absolute'}}>
                                        <Text style={styles.totalPriceValue}>{IDR_FORMAT(data.total_price - data.ongkir)}</Text>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={{padding: 10, marginLeft: 83, ...TYPOGRAPHY.p}}>Ongkos Kirim</Text>
                                    <View style={{width: '100%', position: 'absolute'}}>
                                        {
                                            data.ongkir === 0
                                            ?
                                            <Image resizeMode='contain' style={styles.freeOngkirImage} source={FREE_ONGKIR}/>
                                            :
                                            <Text style={styles.totalPriceValue}>{IDR_FORMAT(data.ongkir)}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={[styles.footer, {backgroundColor: '#fff9fa'}]}>
                                    <Text style={{padding: 10, ...TYPOGRAPHY.p, marginLeft: 83}}>Total Pembayaran</Text>
                                    <View style={{width: '100%', position: 'absolute'}}>
                                        <Text style={styles.totalPriceValue}>{IDR_FORMAT(data.total_price)}</Text>
                                    </View>
                                </View>
                            </View>
                        <View style={{height: 10}} />
                    </ScrollView>
                </View>
                }
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(TransactionDetails);

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: '#7c0c10'
    },
    container: {
        backgroundColor: 'white',
        width: '95%',
        marginTop: 10,
        padding: 10,
        elevation: 1,
        borderRadius: 5
    },
    subTitle: {
        ...TYPOGRAPHY.subHeader,
        color: COLORS.PRIMARY
    },
    footer: {
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 0,
        flexDirection: 'row',
        width: '95%',
        elevation: 1,
        borderRadius: 5
    },
    defaultParagraph: {
        ...TYPOGRAPHY.p,
        color: COLORS.GRAY_TEXT,
    },
    detailContainer: {
        marginLeft: 10,
        marginTop: -5,
        width: 252
    },
    productNameText: {
        ...TYPOGRAPHY.subHeader,
        color: COLORS.PRIMARY,
        ...TYPOGRAPHY.f15
    },
    subtotalText: {
        marginTop: 5,
        marginLeft: 80,
        ...TYPOGRAPHY.p
    },
    subtotalValue: {
        marginTop: 5,
        textAlign: 'right',
        ...TYPOGRAPHY.priceTextModal
    },
    defaultRightText: {
        ...TYPOGRAPHY.p,
        textAlign: 'right',
        position: 'absolute',
        right: 10
    },
    imageStyles: {
        width: 70,
        height: 70,
        borderColor: COLORS.GRAY_BORDER,
        borderWidth: 1,
        borderRadius: 3
    },
    totalPriceText: {
        ...TYPOGRAPHY.p,
        padding: 10,
        fontSize: 15,
        marginLeft: 80
    },
    totalPriceValue: {
        padding: 10,
        ...TYPOGRAPHY.priceTextModal,
        textAlign: 'right'
    },
    freeOngkirImage: {
        height: 30,
        width: 70,
        position: 'absolute',
        right: 10,
        top: 5
    },
})
