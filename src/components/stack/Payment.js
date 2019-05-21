import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../../../config';
import { idrFormat } from '../../../config';
import { forceResetRoot } from '../../actions/Load_Cities';
import Modal from "react-native-modal";
import { DotIndicator, WaveIndicator } from 'react-native-indicators';
import { confirmTransaction } from '../../actions/Confirm_Transaction';
import { loadTransactionTypePending } from '../../actions/Load_Transaction_Type_Pending';
import { resetTransactionState } from '../../actions/Direct_Purchase';
import moment from 'moment';
import { FREE_ONGKIR, BACKDARKRED } from '../../images';

class Payment extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Pembayaran',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> )
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            isAddressValid: false,
            token: '',
            ongkir: 0,
            loading: false,
            transactionLoading: true,
            isFreeOngkir: false,
            showContent: false
        }
    }
    beforeRender = async () => {
        this.props.dispatch(resetTransactionState())
        let acu = 0;
        this.props.cart.map(x => acu += x.freeOngkirConsideration)
        if (acu > 23) {
            this.setState({isFreeOngkir: true})
        }
        this.props.dispatch(forceResetRoot())
        if (this.props.navigation.state.params !== undefined) {
            const village = this.props.navigation.state.params.village;
        }
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

    _afterRender = () => {
        setTimeout(() => {
            this.setState({showContent: true});
        }, 10);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userData !== this.props.userData) {
            if (this.props.userData.address.street !== '') {
                this.setState({isAddressValid: true});
            }else{
                if (this.props.navigation.state.params !== undefined) {
                    this.setState({isAddressValid: true});
                }
            }
        }
        if (prevProps.transaction !== this.props.transaction) {
            if (this.state.transactionLoading) {
                this.setState({transactionLoading: false});
                this.props.dispatch(loadTransactionTypePending(this.state.token));
            }
        }
        if (prevProps.status.transaction.error !== this.props.status.transaction.error) {
            if (this.state.transactionLoading) {
                this.setState({transactionLoading: false});
                this.props.dispatch(resetTransactionState());
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
                    token: this.state.token,
                    no: userData.address.no,
                    rt: userData.address.rt,
                    rw: userData.address.rw,
                    targetMember: this.props.targetMember.id,
                    ongkir: Number(this.props.targetMember.ongkir)
                }
            }else{
                data = {
                    name: navigation.state.params.name,
                    phone: navigation.state.params.phone,
                    street: navigation.state.params.street,
                    city: navigation.state.params.city,
                    district: navigation.state.params.district,
                    village: navigation.state.params.village,
                    token: this.state.token,
                    no: navigation.state.params.address.no,
                    rt: navigation.state.params.address.rt,
                    rw: navigation.state.params.address.rw,
                    targetMember: this.props.targetMember.id,
                    ongkir: Number(this.props.targetMember.ongkir)
                }
            }
            this.setState({loading: true});
            this.props.dispatch(confirmTransaction(data));
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
    }

    queueRouting() {
        this.props.navigation.popToTop();
        this.props.navigation.navigate('MyTransaction');
    }

    showInfo() {
        Alert.alert('Gratis Ongkir', 'Mininum pembelian diatas 12kg.', [{text: 'OK'}], { cancelable: true });
    }

    render() {
        const listData = this.props.cart.filter(x => x.status === true);
        let total = 0;
        const loop = this.props.cart.map(x => total += x.subtotal);
        let params = {};
        if (this.props.navigation.state.params === undefined) {
            params = this.props.userData;
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
            };
        }
        const newParams = Object.assign({}, params, {token: this.state.token});
        return(
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    onDidFocus={() => this._afterRender()}
                    />
                <Modal
                    isVisible={this.state.loading}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    {
                        this.state.transactionLoading
                        ?
                        <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
                            <DotIndicator
                                color='#7c0c10'
                                size={8}
                                />
                        </View>
                        :
                        <View style={{backgroundColor: '#cce8c2', borderRadius: 5, width: 300}}>
                            <View style={{borderBottomColor: '#98c189', borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 18, color: '#228200'}}>Konfirmasi Sukses</Text>
                            </View>
                            <ScrollView style={{backgroundColor: '#f7fff4', padding: 20, height: 400}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{color: '#bababa', marginBottom: 2}}>Kode Transaksi</Text>
                                    <Text style={{fontSize: 20, marginBottom: 10}}>{this.props.transaction.trx}</Text>
                                    <Text style={{color: '#bababa'}}>Jumlah Tagiahan Anda</Text>
                                    <Text style={{marginBottom: 10, fontSize: 18}}>{idrFormat(this.props.transaction.total_price)}</Text>
                                    <Text style={{color: '#bababa', marginBottom: 5}}>Metode Pembayaran</Text>
                                    <Text>Transfer ke rekening BCA</Text>
                                    <Text style={{fontSize: 17, marginBottom: 10}}>2820260417</Text>
                                    <Text style={{textAlign: 'center', color:'#bababa'}}>Jumlah transfer pembayaran harus sesuai</Text>
                                    <Text style={{textAlign: 'center', color:'#bababa'}}>dengan jumlah tagihan (hingga 3 digit terakhir)</Text>
                                    <Text style={{textAlign: 'center', color:'#bababa', marginBottom: 10}}>Isi Nomor Transaksi pada kolom Detail Transfer</Text>
                                    <Text style={{color: '#bababa', marginBottom: 10}}>Lakukan pembayaran sebelum</Text>
                                    <Text style={{fontSize: 20, marginBottom: 20}}>{moment(this.props.transaction.due_date).format('DD MMM YYYY HH:mm')}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.queueRouting()} style={styles.button}>
                                    <Text style={{color: '#228200'}}>Lihat</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    }
                </Modal>
                {
                    this.state.showContent &&
                    <ScrollView>
                        <View style={{alignItems: 'center', marginTop: 15}}>
                            <View style={{backgroundColor: 'white', padding: 10, width: '95%', elevation: 3, borderRadius: 3}}>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#7c0c10', marginBottom: 10}}>Informasi Pembeli</Text>
                                    <TouchableOpacity style={{position: 'absolute', right: 10, top: 0}} onPress={() => this.props.navigation.navigate('EditAddress', newParams)}>
                                        <Text style={{color: '#7c0c10', fontSize: 15}}>Ubah</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.props.navigation.state.params === undefined
                                    ?
                                    <View>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Nama</Text>
                                        <Text style={{marginBottom: 5, fontSize: 13}}>{this.props.userData.name}</Text>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Nomor Telepon</Text>
                                        <Text style={{marginBottom: 5, fontSize: 13}}>0{this.props.userData.phone}</Text>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Alamat Pengiriman</Text>
                                        {
                                            this.state.isAddressValid
                                            ?
                                            <View>
                                                <Text style={{fontSize: 13}}>
                                                    Jl.{this.props.userData.address.street} No.{this.props.userData.address.no}
                                                    Rt.{this.props.userData.address.rt} Rw.{this.props.userData.address.rw}
                                                </Text>
                                                <Text style={{fontSize: 13}}>Kecamatan {this.props.userData.address.district}</Text>
                                                <Text style={{fontSize: 13}}>Kelurahan {this.props.userData.address.village}</Text>
                                                <Text style={{fontSize: 13}}>{this.props.userData.address.city}</Text>
                                            </View>
                                            :
                                            <Text style={{fontStyle: 'italic', color: '#bababa'}}>Alamat belum lengkap</Text>
                                        }
                                    </View>
                                    :
                                    <View>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Nama</Text>
                                        <Text style={{marginBottom: 5, fontSize: 13}}>{this.props.navigation.state.params.name}</Text>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Nomor Telepon</Text>
                                        <Text style={{marginBottom: 5, fontSize: 13}}>{this.props.navigation.state.params.phone}</Text>
                                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>Alamat Pengiriman</Text>
                                        {
                                            this.state.isAddressValid
                                            ?
                                            <View>
                                                <Text style={{fontSize: 13}}>
                                                    Jl.{this.props.navigation.state.params.street} No.{this.props.navigation.state.params.no}
                                                    Rt.{this.props.navigation.state.params.rt} Rw.{this.props.navigation.state.params.rw}
                                                </Text>
                                                <Text style={{fontSize: 13}}>Kecamatan {this.props.navigation.state.params.district}</Text>
                                                <Text style={{fontSize: 13}}>Kelurahan {this.props.navigation.state.params.village}</Text>
                                                <Text style={{fontSize: 13}}>{this.props.navigation.state.params.city}</Text>
                                            </View>
                                            :
                                            <Text style={{fontStyle: 'italic', color: '#bababa'}}>Alamat belum lengkap</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{backgroundColor: 'white', marginTop: 10, width: '95%', borderRadius: 3, elevation: 3}}>
                            <View>
                                <Text style={{fontSize: 20, padding: 10, fontWeight: 'bold', color: '#7c0c10'}}>Detail Pesanan</Text>
                            </View>
                            {
                                listData.map((x, i) =>
                                <View key={i}>
                                    <Text style={{marginLeft: 12, fontWeight: 'bold', fontSize: 16, marginBottom: 5, marginTop: 12}}>{x.product_name}</Text>
                                    <View style={styles.productDetails}>
                                        <Image
                                            resizeMode='contain'
                                            style={{width: 90, height: 90, borderColor: '#eaeaea', borderWidth: 1}}
                                            source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                            />
                                        <View style={{marginBottom: 5, width: '25%'}}>
                                            <Text style={{marginLeft: 10, color: '#a3a3a3'}}>Harga</Text>
                                            <Text style={{marginLeft: 10, color: '#a3a3a3'}}>Kuantitas</Text>
                                            <Text style={{marginLeft: 10, color: '#a3a3a3', position: 'absolute', bottom: 3}}>Subtotal</Text>
                                        </View>
                                        <View style={{marginBottom: 5, width: '45%'}}>
                                            <Text style={{textAlign: 'right', color: '#9b9b9b'}}>{idrFormat(x.price)}</Text>
                                            <Text style={{textAlign: 'right', color: '#9b9b9b'}}>{x.qty}</Text>
                                            <Text style={{textAlign: 'right', position: 'absolute', bottom: 3, right: 0}}>
                                                {idrFormat(x.subtotal)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <View style={{backgroundColor: '#d7d7d7', height: 1, width: '95%'}} />
                                    </View>
                                </View>
                            )
                        }
                        <View style={{paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Total Belanja</Text>
                            <Text style={{fontSize: 15, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'}}>
                                {idrFormat(total)}
                            </Text>
                        </View>
                        <View style={{paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Ongkir</Text>
                            <TouchableOpacity onPress={() => this.showInfo()} style={{position: 'absolute', left: 60, top: 4, borderWidth: 2, borderColor: 'red', borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 11}}>i</Text>
                            </TouchableOpacity>
                            {
                                this.state.isFreeOngkir
                                ?
                                <Image resizeMode='contain' style={{height: 30, width: 70, position: 'absolute', right: 10}} source={FREE_ONGKIR}/>
                                :
                                <Text style={{fontSize: 15, position: 'absolute', right: 10, fontWeight: 'bold', textAlign: 'right'}}>
                                    {idrFormat(Number(this.props.targetMember.ongkir))}
                                </Text>
                            }
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{backgroundColor: '#d7d7d7', height: 1, width: '95%'}} />
                        </View>
                        <View style={{alignItems: 'center', marginTop: 3}}>
                            <View style={{backgroundColor: '#d7d7d7', height: 1, width: '95%'}} />
                        </View>
                        <View style={{paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Total Bayar</Text>
                            <Text style={{fontSize: 17, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'}}>
                                {this.state.isFreeOngkir ? idrFormat(total) : idrFormat(total + Number(this.props.targetMember.ongkir))}
                            </Text>
                        </View>
                    </View>
                        {/**/}
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <TouchableOpacity onPress={() => this.submitTransaction()} style={{marginTop: 10, borderRadius: 3, height: 50, width: 350, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 16}}>Konfirmasi Pemesanan</Text>
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
    productWrapper: {
        alignItems: 'center'
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
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20
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
    }
})

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Payment);
