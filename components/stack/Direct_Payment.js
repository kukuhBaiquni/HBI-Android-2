import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView, Alert, Picker, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
import { BarIndicator, DotIndicator, WaveIndicator } from 'react-native-indicators';
import { forceResetRoot } from '../../actions/Load_Cities';
import Modal from "react-native-modal";
import { directPurchase } from '../../actions/Direct_Purchase';
import moment from 'moment';
import { loadTransactionTypePending } from '../../actions/Load_Transaction_Type_Pending';
import { countItem } from '../../actions/Counting_Items';
import { resetTransactionState } from '../../actions/Direct_Purchase';
import * as Animatable from 'react-native-animatable';

class DirectPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAddressValid: false,
            token: '',
            loading: false,
            loadingCount: false,
            transactionContent: false,
            transactionLoading: true,
            ongkir: 0,
            data: {},
            qty: 1,
            editMode: false,
            isFreeOngkir: false,
            changeAmount: false,
            subtotal: 0,
            productPrice: 0,
            showModalContent: false,
            showContent: false
        }
    };

    beforeRender = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (token !== null) {
                const raw = JSON.parse(token)
                this.setState({token: raw})
                this.props.dispatch(fetchUser(raw))
            }
        }catch (error) {

        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resultCounting !== this.props.resultCounting) {
            this.setState({loadingCount: false, subtotal: this.props.resultCounting})
        }
        if (prevProps.userData !== this.props.userData) {
            if (this.props.userData.address.street !== '') {
                this.setState({isAddressValid: true})
            }else{
                if (this.props.navigation.state.params !== undefined) {
                    this.setState({isAddressValid: true})
                }
            }
        }
        if (prevProps.transaction !== this.props.transaction) {
            if (this.state.transactionLoading) {
                this.setState({transactionLoading: false})
                this.props.dispatch(loadTransactionTypePending(this.state.token))
            }
        }
        if (prevProps.status.transaction.error !== this.props.status.transaction.error) {
            if (this.state.transactionLoading) {
                this.setState({transactionLoading: false})
                this.props.dispatch(resetTransactionState())
            }
        }
    };

    submitTransaction() {
        const { navigation, userData } = this.props;
        let data = {};
        if (this.state.isAddressValid) {
            if (navigation.state.params === undefined) {
                data = {
                    name: userData.name,
                    phone: userData.phone,
                    street: userData.address.street,
                    city: userData.address.city,
                    district: userData.address.district,
                    village: userData.address.village,
                    no: userData.address.no,
                    rt: userData.address.rt,
                    rw: userData.address.rw,
                    token: this.state.token,
                    id: this.state.data.id,
                    qty: this.state.qty,
                    targetMember: this.props.targetMember.id,
                    ongkir: Number(this.props.targetMember.ongkir)
                };
            }else{
                data = {
                    name: navigation.state.params.name,
                    phone: navigation.state.params.phone,
                    street: navigation.state.params.street,
                    city: navigation.state.params.city,
                    district: navigation.state.params.district,
                    village: navigation.state.params.village,
                    no: navigation.state.params.no,
                    rt: navigation.state.params.rt,
                    rw: navigation.state.params.rw,
                    token: this.state.token,
                    id: this.state.data.id,
                    qty: this.state.qty,
                    targetMember: this.props.targetMember.id,
                    ongkir: Number(this.props.targetMember.ongkir)
                };
            }
            this.setState({loading: true, changeAmount: false, transactionContent: true})
            this.props.dispatch(directPurchase(data))
        }else{
            Alert.alert(
                'Kesalahan',
                'Alamat yang anda berikan kurang lengkap, silahkan lengkapi dahulu alamat anda.',
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
        }
    };

    loadData = async () => {
        try {
            const data = await AsyncStorage.getItem('direct_purchase');
            if (data !== null) {
                const parsed = JSON.parse(data);
                let realPrice = 0;
                if (this.props.userData.status === 'Non Member') {
                    realPrice = parsed.enduserprice;
                }else{
                    realPrice = parsed.resellerprice;
                }
                this.setState({data: parsed, productPrice: realPrice});
                setTimeout(
                    () => {
                        this.setState({showContent: true})
                    }, 10
                )
            }else{
                Alert.alert(
                    'Kesalahan',
                    'Gagal memuat data',
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            }
        }catch (error) {
            Alert.alert('Kesalahan', 'Gagal memuat data', [{text: 'OK'} ], { cancelable: false });
        }
    };

    changeCount(x) {
        let count = this.state.qty;
        if (x === 'inc') {
            count ++
            this.setState({qty: count, loadingCount: true})
            if (this.state.data.packing * count > 23) {
                this.setState({isFreeOngkir: true});
            }else{
                this.setState({isFreeOngkir: false});
            }
        }else{
            if (count > 1) {
                count --
                this.setState({qty: count, loadingCount: true})
                if (this.state.data.packing * count > 23) {
                    this.setState({isFreeOngkir: true});
                }else{
                    this.setState({isFreeOngkir: false});
                }
            }
        }
        var data = {
            token: this.state.token,
            id: this.state.data.id,
            qty: count
        };
        this.props.dispatch(countItem(data));
    };

    onSave() {
        this.setState({loading: false});
    };

    queueRouting() {
        this.props.navigation.popToTop();
        this.props.navigation.navigate('MyTransaction');
    };

    checkIsFreeOngkir(x) {
        this.setState({qty: Number(x)});

    ;}

    showInfo() {
        Alert.alert('Gratis Ongkir', 'Mininum pembelian diatas 12kg.', [{text: 'OK'}], { cancelable: true });
    };

    _ticketTransaction = () => {
        return(
            <View style={styles.successTicket}>
                <View style={styles.headerTicket}>
                    <Text style={styles.headerTitleTicket}>Konfirmasi Sukses</Text>
                </View>
                <ScrollView style={styles.ticketMainBG}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.transactionCodeText}>Kode Transaksi</Text>
                        <Text style={styles.transactionCodeVal}>{this.props.transaction.trx}</Text>
                        <Text style={{color: '#bababa'}}>Jumlah Tagiahan Anda</Text>
                        <Text style={styles.mab10foz18}>{this.props.transaction.total_price === undefined ? '' : idrFormat(this.props.transaction.total_price)}</Text>
                        <Text style={{color: '#bababa', marginBottom: 5}}>Metode Pembayaran</Text>
                        <Text>Transfer ke rekening BCA</Text>
                        <Text style={styles.mab10foz18}>2820260417</Text>
                        <Text style={styles.tacColba}>Jumlah transfer pembayaran harus sesuai</Text>
                        <Text style={styles.tacColba}>dengan jumlah tagihan (hingga 3 digit terakhir)</Text>
                        <Text style={[styles.tacColba, {marginBottom: 10}]}>Isi Nomor Transaksi pada kolom Detail Transfer</Text>
                        <Text style={{color: '#bababa', marginBottom: 10}}>Lakukan pembayaran sebelum</Text>
                        <Text style={styles.mabFoz20}>{moment(this.props.transaction.due_date).format('DD MMM YYYY HH:mm')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.queueRouting()} style={styles.button}>
                        <Text style={{color: '#228200'}}>Lihat</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    render() {
        let params = {}
        if (this.props.navigation.state.params === undefined) {
            params = this.props.userData
        }else{
            params = {
                name: this.props.navigation.state.params.name,
                phone: this.props.navigation.state.params.phone,
                address: {
                    street: this.props.navigation.state.params.street,
                    city: this.props.navigation.state.params.city,
                    district: this.props.navigation.state.params.district,
                    village: this.props.navigation.state.params.village,
                    no: this.props.navigation.state.params.no,
                    rt: this.props.navigation.state.params.rt,
                    rw: this.props.navigation.state.params.rw
                }
            }
        }
        const newParams = Object.assign({}, params, {token: this.state.token});
        if (this.state.data === Object.assign({})) {
            return(
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Memuat Data...</Text>
                </View>
            )
        }else{
            return(
                <View style={{flex: 1}}>
                    <NavigationEvents
                        onWillFocus={() => this.beforeRender()}
                        onDidFocus={() => this.loadData()}
                        />
                    <Modal
                        isVisible={this.state.loading}
                        style={{alignItems: 'center'}}
                        onModalShow={() => this.setState({showModalContent: false})}
                        onModalHide={() => this.setState({showModalContent: false})}
                        hideModalContentWhileAnimating={true}
                        useNativeDriver
                        >
                        {
                            this.state.transactionContent
                            ?
                            this.state.transactionLoading
                            ?
                            <View style={styles.loadingModalWrapper}>
                                <Text style={styles.pleaseWaitText}>Mohon Tunggu</Text>
                                <DotIndicator
                                    color='#7c0c10'
                                    size={8}
                                    />
                            </View>
                            :
                            this._ticketTransaction()
                            :
                            <View style={styles.modificatorModal}>
                                <View style={styles.modificatorModalHeader}>
                                    <Text style={styles.modificatorModalHeaderTitle}>Pilihan Anda</Text>
                                </View>
                                <ScrollView>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.modificatorModalPhotoWrapper}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles.modificatorImageStyle}
                                                source={{uri: `${SERVER_URL}images/products/${this.state.data.photo}`}}
                                                />
                                        </View>
                                        <View style={styles.modalProductName}>
                                            <Text style={styles.productNameText}>{this.state.data.productname}</Text>
                                            {
                                                this.state.loadingCount
                                                ?
                                                <View style={styles.priceLoaderWrapper}>
                                                    <BarIndicator count={5} size={15} color='#919191' />
                                                </View>
                                                :
                                                <Text style={{fontWeight: 'bold', marginTop: 5}}>{idrFormat(this.state.qty === 1 ? Number(this.state.productPrice) : Number(this.props.resultCounting))}</Text>
                                            }
                                            {/*Increment Button*/}
                                            <View style={styles.modificatorModalModifier}>
                                                <TouchableNativeFeedback onPress={(x) => this.changeCount('dec')}>
                                                    <View style={styles.buttonModifier}>
                                                        <Text style={{color: 'white', fontSize: 22}}>-</Text>
                                                    </View>
                                                </TouchableNativeFeedback>
                                                <View style={styles.modalQTY}>
                                                    <Text>{this.state.qty}</Text>
                                                </View>
                                                <TouchableNativeFeedback onPress={(x) => this.changeCount('inc')}>
                                                    <View style={styles.buttonModifier}>
                                                        <Text style={{color: 'white', fontSize: 18}}>+</Text>
                                                    </View>
                                                </TouchableNativeFeedback>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{alignItems: 'center', marginTop: 10, marginBottom:20}}>
                                        <TouchableOpacity onPress={() => this.onSave()}>
                                            <View style={styles.saveButton}>
                                                <Text style={{color: 'white'}}>Simpan perubahan</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        }
                    </Modal>
                    {
                        this.state.showContent &&
                        <ScrollView>
                            <View style={{alignItems: 'center', marginTop: 15}}>
                                <View style={styles.userInformation}>
                                    <View>
                                        <Text style={styles.titleUserInformation}>Informasi Pembeli</Text>
                                        <TouchableOpacity style={styles.editAddress} onPress={() => this.props.navigation.navigate('EditAddressDP', newParams)}>
                                            <Text style={{color: '#7c0c10', fontSize: 15}}>Ubah</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        this.props.navigation.state.params === undefined
                                        ?
                                        this.state.isAddressValid
                                        ?
                                        <View>
                                            <Text style={styles.nameProp}>Nama</Text>
                                            <Text style={styles.nameVal}>{this.props.userData.name}</Text>
                                            <Text style={styles.nameProp}>Nomor Telepon</Text>
                                            <Text style={styles.nameVal}>0{this.props.userData.phone}</Text>
                                            <Text style={styles.nameProp}>Alamat Pengiriman</Text>
                                            <Text style={styles.f13}>
                                                Jl.{this.props.userData.address.street} No.{this.props.userData.address.no} Rt.{this.props.userData.address.rt} Rw.{this.props.userData.address.rw}
                                            </Text>
                                            <Text style={styles.f13}>Kecamatan {capital(this.props.userData.address.district)}</Text>
                                            <Text style={styles.f13}>Kelurahan {capital(this.props.userData.address.village)}</Text>
                                            <Text style={styles.f13}>{capital(this.props.userData.address.city)}</Text>
                                        </View>
                                        :
                                        <Text style={{fontStyle: 'italic', color: '#bababa'}}>Alamat belum lengkap</Text>
                                        :
                                        <View>
                                            <Text style={styles.nameProp}>Nama</Text>
                                            <Text style={styles.nameVal}>{this.props.navigation.state.params.name}</Text>
                                            <Text style={styles.nameProp}>Nomor Telepon</Text>
                                            <Text style={styles.nameVal}>{this.props.navigation.state.params.phone}</Text>
                                            <Text style={styles.nameProp}>Alamat Pengiriman</Text>
                                            <Text style={styles.f13}>
                                                Jl.{this.props.userData.address.street} No.{this.props.navigation.state.params.no} Rt.{this.props.userData.address.rt} Rw.{this.props.userData.address.rw}
                                            </Text>
                                            <Text style={styles.f13}>Kecamatan {capital(this.props.navigation.state.params.district)}</Text>
                                            <Text style={styles.f13}>Kelurahan {capital(this.props.navigation.state.params.village)}</Text>
                                            <Text style={styles.f13}>{capital(this.props.navigation.state.params.city)}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <View style={styles.detailOrderWrapper}>
                                    <View>
                                        <Text style={styles.titleDetailOrder}>Detail Pesanan</Text>
                                        <TouchableOpacity onPress={() => this.setState({loading: true, changeAmount: true})} style={styles.changeButton}>
                                            <Text style={{color: '#7c0c10', fontSize: 15}}>Ubah</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={styles.productNameVal}>{this.state.data.productname}</Text>
                                        <View style={styles.productDetails}>
                                            <Image
                                                resizeMode='contain'
                                                style={styles.productImage}
                                                source={{uri: `${SERVER_URL}images/products/${this.state.data.photo}`}}
                                                />
                                            <View style={styles.mb5w25perc}>
                                                <Text style={styles.male10fob}>Harga</Text>
                                                <Text style={styles.male10fob}>Kuantitas</Text>
                                                <Text style={styles.totalText}>Total</Text>
                                            </View>
                                            <View style={styles.mb5w45perc}>
                                                <Text style={styles.tarCol9b}>{this.props.userData.status === 'Non Member' ? idrFormat(Number(this.state.data.enduserprice)) : idrFormat(Number(this.state.data.resellerprice))}</Text>
                                                <Text style={styles.tarCol9b}>{this.state.qty} {this.state.data.unit}</Text>
                                                <Text style={styles.priceDisplay}>
                                                    {
                                                        this.props.userData.status === 'Non Member'
                                                        ? idrFormat(Number(this.state.data.enduserprice) * Number(this.state.qty))
                                                        : idrFormat(Number(this.state.data.resellerprice) * Number(this.state.qty))
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <View style={styles.divider} />
                                        </View>
                                    </View>
                                    <View style={styles.toBe}>
                                        <Text style={styles.lastChapter}>Total Belanja</Text>
                                        <Text style={styles.priceDisplay2}>
                                            {
                                                this.props.userData.status === 'Non Member'
                                                ? idrFormat((Number(this.state.data.enduserprice) * Number(this.state.qty)))
                                                : idrFormat((Number(this.state.data.resellerprice) * Number(this.state.qty)))
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.ongkirWr}>
                                        <Text style={styles.lastChapter}>Ongkir</Text>
                                        <TouchableOpacity onPress={() => this.showInfo()} style={styles.infosOngkir}>
                                            <Text style={styles.iconText}>i</Text>
                                        </TouchableOpacity>
                                        {
                                            this.state.isFreeOngkir
                                            ?
                                            <Image resizeMode='contain' style={styles.infoIcon} source={require('../../android/app/src/main/assets/custom/FreeOngkir.png')}/>
                                            :
                                            <Text style={styles.ongkirText}>
                                                {idrFormat(Number(this.props.targetMember.ongkir))}
                                            </Text>
                                        }
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <View style={styles.divider} />
                                    </View>
                                    <View style={{alignItems: 'center', marginTop: 3}}>
                                        <View style={styles.divider} />
                                    </View>
                                    <View style={styles.pt2x10}>
                                        <Text style={styles.toBa}>Total Bayar</Text>
                                        <Text style={styles.totalText2}>
                                            {
                                                this.props.userData.status === 'Non Member'
                                                ? (this.state.isFreeOngkir ? idrFormat(Number(this.state.data.enduserprice) * Number(this.state.qty)) : idrFormat((Number(this.state.data.enduserprice) * Number(this.state.qty)) + Number(this.props.targetMember.ongkir)))
                                                : (this.state.isFreeOngkir ? idrFormat(Number(this.state.data.resellerprice) * Number(this.state.qty)) : idrFormat((Number(this.state.data.resellerprice) * Number(this.state.qty)) + Number(this.props.targetMember.ongkir)))
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.confirmationWrapper}>
                                <TouchableOpacity onPress={() => this.submitTransaction()} style={styles.confirmationButton}>
                                    <Text style={styles.confirmationButtonTitle}>Konfirmasi Pemesanan</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    }
                    <Modal
                        isVisible={!this.state.showContent}
                        style={{alignItems: 'center'}}
                        hideModalContentWhileAnimating={true}
                        useNativeDriver
                        backdropColor='white'
                        backdropOpacity={0.5}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                        >
                        <View style={{ backgroundColor: 'transparent', width: 230, height: 90, borderRadius: 3, alignItems: 'center'}}>
                            <WaveIndicator
                                color='#4f4f4f'
                                />
                        </View>
                    </Modal>
                </View>
            )
        }
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
    productHeader: {
        borderColor: '#eaeaea',
        height: 50,
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center',
        width: '100%'
    },
    productDetails: {
        backgroundColor: 'white',
        height: 100,
        flexDirection: 'row',
        marginLeft: 12
    },
    button: {
        marginBottom: 40,
        width: 250,
        height: 45,
        backgroundColor: '#c4dbc0',
        borderColor: '#228200',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    successTicket: {
        backgroundColor: '#cce8c2',
        borderRadius: 5,
        width: 300
    },
    headerTicket: {
        borderBottomColor: '#98c189',
        borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleTicket: {
        fontSize: 18,
        color: '#228200'
    },
    ticketMainBG: {
        backgroundColor: '#f7fff4',
        padding: 20,
        height: 400
    },
    loadingModalWrapper: {
        backgroundColor: 'white',
        width: 130,
        height: 90,
        borderRadius: 3,
        alignItems: 'center'
    },
    pleaseWaitText: {
        fontWeight: 'bold',
        top: 15,
        marginTop: 5
    },
    modificatorModal: {
        backgroundColor: 'white',
        width: 300,
        height: 250,
        borderRadius: 4
    },
    modificatorModalHeader: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        width: '100%'
    },
    modificatorModalHeaderTitle: {
        textAlign: 'left',
        padding: 15,
        color: '#919191',
        fontSize: 16
    },
    modificatorModalPhotoWrapper: {
        elevation: 1,
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 20
    },
    modificatorImageStyle: {
        width: 120,
        height: 120,
        borderColor: '#e2e2e2',
        borderWidth: 1
    },
    modalProductName: {
        height: 120,
        width: 140,
        marginTop: 10,
        paddingLeft: 10
    },
    productNameText: {
        fontSize: 16,
        width: 140,
        textAlign: 'left',
        color: '#919191'
    },
    priceLoaderWrapper: {
        height: 24,
        width: 80,
        paddingTop: 7,
        alignItems: 'center'
    },
    modificatorModalModifier: {
        flexDirection: 'row',
        width: 110,
        height: 40,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    buttonModifier: {
        height: 30,
        width: 30,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    modalQTY: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 3
    },
    saveButton: {
        height: 45,
        width: 260,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    userInformation: {
        backgroundColor: 'white',
        padding: 10,
        width: '95%',
        elevation: 3,
        borderRadius: 3
    },
    titleUserInformation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7c0c10',
        marginBottom: 10
    },
    nameProp: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    nameVal: {
        marginBottom: 5,
        fontSize: 13
    },
    detailOrderWrapper: {
        backgroundColor: 'white',
        marginTop: 10,
        width: '95%',
        borderRadius: 3,
        elevation: 3
    },
    titleDetailOrder: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
        color: '#7c0c10'
    },
    productNameVal: {
        marginLeft: 12,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    changeButton: {
        position: 'absolute',
        right: 18,
        top: 15
    },
    productImage: {
        width: 90,
        height: 90,
        borderColor: '#eaeaea',
        borderWidth: 1
    },
    f13: {fontSize: 13},
    male10fob: {marginLeft: 10, fontWeight: 'bold'},
    totalText: {marginLeft: 10, fontWeight: 'bold', position: 'absolute', bottom: 3},
    mb5w25perc: {marginBottom: 5, width: '25%'},
    mb5w45perc: {marginBottom: 5, width: '45%'},
    tarCol9b: {textAlign: 'right', color: '#9b9b9b'},
    priceDisplay: {textAlign: 'right', position: 'absolute', right: 0, fontWeight: 'bold', bottom: 3},
    divider: {backgroundColor: '#d7d7d7', height: 1, width: '95%'},
    toBe: {paddingTop: 10, paddingLeft: 10, paddingRight: 10},
    lastChapter: {fontWeight: 'bold', fontSize: 15},
    priceDisplay2: {fontSize: 15, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'},
    ongkirWr: {paddingLeft: 10, paddingRight: 10, marginBottom: 10},
    infosOngkir: {position: 'absolute', left: 60, top: 4, borderWidth: 2, borderColor: 'red', borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center'},
    infoIcon: {height: 30, width: 70, position: 'absolute', right: 10},
    editAddress: {position: 'absolute', right: 10, top: 0},
    iconText: {color: 'red', fontWeight: 'bold', fontSize: 11},
    ongkirText: {fontSize: 15, position: 'absolute', right: 10, fontWeight: 'bold', textAlign: 'right'},
    pt2x10: {paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 10},
    toBa: {fontWeight: 'bold', fontSize: 17},
    totalText2: {fontSize: 17, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'},
    confirmationWrapper: {justifyContent: 'center', alignItems: 'center', marginBottom: 10},
    confirmationButton: {marginTop: 10, borderRadius: 3, height: 50, width: 350, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'},
    confirmationButtonTitle: {color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1.5},
    transactionCodeText: {color: '#bababa', marginBottom: 2},
    transactionCodeVal: {fontSize: 20, marginBottom: 10},
    mab10foz18: {marginBottom: 10, fontSize: 18},
    tacColba: {textAlign: 'center', color:'#bababa'},
    mabFoz20: {fontSize: 20, marginBottom: 20},
    baseSkeleton: {height: 10, backgroundColor: '#6d6d6d', opacity: 0.4, borderRadius: 5, marginBottom: 12},
});

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(DirectPayment);
