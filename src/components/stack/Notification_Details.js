import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { LOCALE_DAY,IDR_FORMAT, TRACKING_COLOR_STATUS, TRACKING_MESSAGE_STATUS } from '../basic/supportFunction';
import moment from 'moment';
import { readingNotification } from '../../actions/Reading_Notification';
import { NavigationEvents } from 'react-navigation';
import { BACKDARKRED } from '../../images';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

const options = {
    title: 'Pilihan',
    takePhotoButtonTitle: 'Buka kamera',
    chooseFromLibraryButtonTitle: 'Pilih dari galeri',
    cancelButtonTitle: 'Batal',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class NotificationDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Detail Notifikasi',
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
            photoHandler: '',
            showPreview: false
        }
    };

    beforeRender() {
        const token = this.props.token;
        const type = this.props.navigation.state.params.type;
        const data = this.props.navigation.state.params.data;
        if (!data.status) {
            this.props.dispatch(readingNotification({token, type, id: data._id}));
        }
    };

    _showPicker = (x) => {
        if (this.state.photoHandler === '' || x === 'force') {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.uri) {
                    this.setState({
                        showPreview: true,
                        photoHandler: response.uri
                    });
                }
            });
        }else{

        }
    };

    _changePhoto = () => {
        this.setState({showPreview: false});
        this._showPicker('force');
    };

    render() {
        const { navigation,  } = this.props;
        const data = navigation.state.params.data;
        const header2 = [
            '',
            'Pesanan Anda sedang dalam antrian.',
            'Pembayaran pesanan anda berhasil dikonfirmasi.',
            'Pesanan Anda sedang diproses.',
            'Proses pengiriman pesanan anda sedang dilakukan.',
            'Telah berbelanja di Halal Beef Indonesia.'
        ];
        return(
            <View style={{flex: 1}}>
                <Modal
                    isVisible={this.state.showPreview}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    hideModalContentWhileAnimating={true}
                    onBackdropPress={() => this.setState({showPreview: false})}
                    useNativeDriver
                    >
                    <View style={styles.modalContainer}>
                        <Image
                            source={{uri: this.state.photoHandler}}
                            style={{height: '85%', width: '95%'}}
                            resizeMode='cover'
                            />
                        <View style={styles.modalFooter}>
                            <TouchableOpacity onPress={() => this.setState({showPreview: false})} style={styles.miniButton}>
                                <Text style={styles.miniButtonText}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._changePhoto} style={styles.miniButton}>
                                <Text style={styles.miniButtonText}>Ganti</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <ScrollView>
                    <View style={{alignItems: 'center', marginTop: 10, marginBottom: 5}}>
                        <View style={styles.container}>
                            {
                                data.tracking !== 3 && data.tracking !== 4 &&
                                <Text style={[TYPOGRAPHY.subHeader, TYPOGRAPHY.f20]}>Terima Kasih!</Text>
                            }

                            <Text style={styles.trackingLevel}>{header2[data.tracking]}</Text>
                            <Text style={styles.timeText}>{LOCALE_DAY[new Date(data.date).getDay()] +', '+ moment(data.date).format('DD MMM YYYY') + ' '+ moment(data.date).format('HH:mm')}</Text>
                            <View style={{height: 20}} />
                            {
                                data.tracking === 1 &&
                                <View>
                                    <View style={styles.dueDateContainer}>
                                        <Text style={styles.dueDateInfoText}>Dan segera lakukan pembayaran sebelum:</Text>
                                        <Text style={styles.dueDateText}>{LOCALE_DAY[new Date(data.content.due_date).getDay()] +', '+ moment(data.content.due_date).format('DD MMM YYYY') + ' '+ moment(data.content.due_date).format('HH:mm')}</Text>
                                    </View>
                                    <View style={styles.paymentMethodContainer}>
                                        <Text style={{color: COLORS.GRAY_ICON, ...TYPOGRAPHY.p}}>Metode Pembayaran:</Text>
                                        <Text style={styles.mixTransferTo}>Transfer ke <Text style={{...TYPOGRAPHY.h1, color: COLORS.PRIMARY}}>rekening BCA 2820260417</Text></Text>
                                        <Text style={styles.noteItalic}>Jumlah transfer pembayaran harus sesuai dengan jumlah tagihan (hingga 3 digit terakhir). Tulis Nomor Transaksi pada kolom Detail Transfer,</Text>
                                        <Text style={[styles.noteItalic, {marginBottom: 15}]}>untuk kelancaran proses pembayaran Anda.</Text>
                                    </View>
                                </View>
                            }
                            <Text style={styles.detailOrderText}>Detail Pesanan Anda:</Text>
                            <View style={styles.orderDetailContainer}>
                                <Text style={styles.trxText}>Nomor Transaksi</Text>
                                <Text style={styles.trxTextVal}>{data.trx}</Text>
                                {
                                    data.tracking === 1 &&
                                    <View>
                                        <Text style={[styles.trxText, {marginBottom: 10}]}>Jumlah Tagihan</Text>
                                        <Text style={[styles.trxTextVal, {...TYPOGRAPHY.priceTextModal}]}>{IDR_FORMAT(data.content.amount)}</Text>
                                    </View>
                                }
                                {
                                    data.tracking !== 1 &&
                                    <View>
                                        <Text style={[styles.trxText, {marginBottom: 10}]}>Status</Text>
                                        <Text style={{position: 'absolute', right: 0, ...TYPOGRAPHY.subHeader, color: TRACKING_COLOR_STATUS[data.tracking]}}>{TRACKING_MESSAGE_STATUS[data.tracking]}</Text>

                                    </View>
                                }
                            </View>
                            {
                                data.tracking === 4 &&
                                <View style={{marginBottom: 20, marginTop: 20}}>
                                    <Text style={styles.textAboveButton}>Konfimasi apabila pesanan anda sudah sampai.</Text>
                                    <TouchableOpacity style={styles.buttonReceived}>
                                        <Text style={styles.buttonText}>Pesanan sudah saya terima</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('TransactionDetails', {trx: data.trx})}>
                                <Text style={styles.toDetail}>Lihat Detail</Text>
                            </TouchableOpacity>
                            {
                                this.state.photoHandler !== '' &&
                                <TouchableOpacity onPress={() => this.setState({showPreview: true})}>
                                    <Image
                                        resizeMode='cover'
                                        source={{uri: this.state.photoHandler}}
                                        style={{height: 70, width: 70, borderRadius: 3}}
                                        />
                                </TouchableOpacity>
                            }
                        </View>
                        {
                            data.tracking === 1 &&
                            <View style={styles.fixedBottom}>
                                <TouchableOpacity onPress={this._showPicker} style={styles.buttonReceived}>
                                    <Text style={styles.buttonText}>Unggah Bukti Pembayaran</Text>
                                    <View style={styles.iconContainer}>
                                        <Icon name={this.state.photoHandler === '' ? 'camera' : 'upload'} color={COLORS.PURE_WHITE} size={18} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </ScrollView>
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
    },
    trackingLevel: {
        ...TYPOGRAPHY.p
    },
    timeText: {
        color: COLORS.GRAY_ICON,
        ...TYPOGRAPHY.p
    },
    dueDateContainer: {
        alignItems: 'center',
        borderBottomColor: COLORS.GRAY_ICON,
        borderBottomWidth: 1,
        marginBottom: 25,
    },
    dueDateInfoText: {
        color: COLORS.GRAY_ICON,
        ...TYPOGRAPHY.p
    },
    dueDateText: {
        marginBottom: 5,
        ...TYPOGRAPHY.subHeader,
        ...TYPOGRAPHY.f20,
        color: COLORS.GRAY_ICON
    },
    paymentMethodContainer: {
        alignItems: 'center',
        borderBottomColor: COLORS.GRAY_ICON,
        borderBottomWidth: 1,
        marginBottom: 25
    },
    mixTransferTo: {
        color: COLORS.GRAY_ICON,
        ...TYPOGRAPHY.p,
        ...TYPOGRAPHY.f14,
        marginBottom: 10
    },
    noteItalic: {
        color: COLORS.GRAY_ICON,
        ...TYPOGRAPHY.italicDefault,
        ...TYPOGRAPHY.f13,
        textAlign: 'center',
        lineHeight: 18
    },
    detailOrderText: {
        ...TYPOGRAPHY.subHeader,
        ...TYPOGRAPHY.f15,
        color: COLORS.BLACK_NORMAL
    },
    orderDetailContainer: {
        borderBottomColor: COLORS.GRAY_ICON,
        borderBottomWidth: 1,
        marginBottom: 15
    },
    trxText: {
        ...TYPOGRAPHY.p,
    },
    trxTextVal: {
        position: 'absolute',
        right: 0,
        ...TYPOGRAPHY.p
    },
    toDetail: {
        ...TYPOGRAPHY.subHeader,
        color: COLORS.PRIMARY,
        ...TYPOGRAPHY.f17
    },
    buttonReceived: {
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 3,
        elevation: 1
    },
    textAboveButton: {
        ...TYPOGRAPHY.p,
        color: COLORS.PURE_BLACK,
        marginBottom: 15,
        textAlign: 'center'
    },
    buttonText: {
        padding: 15,
        ...TYPOGRAPHY.subHeader,
        color: COLORS.PURE_WHITE,
        ...TYPOGRAPHY.f16
    },
    iconContainer: {
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        right: 20
    },
    fixedBottom: {
        width: '95%',
        marginTop: 10
    },
    modalContainer: {
        height: SCREEN_HEIGHT * 0.8,
        width: SCREEN_WIDTH * 0.95,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.PURE_WHITE
    },
    miniButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 3,
        width: '49%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    miniButtonText: {
        ...TYPOGRAPHY.subHeader,
        color: COLORS.PURE_WHITE,
        ...TYPOGRAPHY.f17
    },
    modalFooter: {
        marginTop: 10,
        width: '95%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
