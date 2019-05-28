import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { fetchUser } from '../../actions/Get_User_Data';
import { SERVER_URL } from '../basic/supportFunction';
import { IDR_FORMAT } from '../basic/supportFunction';
import { forceResetRoot } from '../../actions/Load_Cities';
import Modal from "react-native-modal";
import { DotIndicator, WaveIndicator } from 'react-native-indicators';
import { confirmTransaction } from '../../actions/Confirm_Transaction';
import { loadTransactionTypePending } from '../../actions/Load_Transaction_Type_Pending';
import { resetTransactionState } from '../../actions/Direct_Purchase';
import moment from 'moment';
import { FREE_ONGKIR, BACKDARKRED } from '../../images';
import { SUCCESS_DIALOG } from '../basic/successDialog';
import { MODAL } from '../basic/loading';
import { ADDRESS_INFO } from '../basic/editAddressPayment';

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
    };

    // beforeRender = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('access_token');
    //         if (token !== null) {
    //             const raw = JSON.parse(token)
    //             this.setState({token: raw})
    //             dispatch(fetchUser(raw))
    //         }
    //     }catch (error) {
    //
    //     }
    // };

    _afterRender = () => {
        const { dispatch, cart, navigation } = this.props;
        dispatch(resetTransactionState())
        let acu = 0;
        cart.map(x => acu += x.freeOngkirConsideration)
        if (acu > 23) {
            this.setState({isFreeOngkir: true})
        }
        dispatch(forceResetRoot())
        if (navigation.state.params !== undefined) {
            const village = navigation.state.params.village;
        }
        setTimeout(() => {
            this.setState({showContent: true});
        }, 10);
    };

    componentDidUpdate(prevProps, prevState) {
        const { userData, dispatch, status } = this.props;
        if (prevProps.userData.data !== userData.data) {
            if (userData.data.address.street !== '') {
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
                dispatch(loadTransactionTypePending(this.state.token));
            }
        }
        if (prevProps.status.transaction.error !== status.transaction.error) {
            if (this.state.transactionLoading) {
                this.setState({transactionLoading: false});
                dispatch(resetTransactionState());
            }
        }
    };

    submitTransaction() {
        const { navigation, userData, targetMember, dispatch } = this.props;
        let data = {};
        if (this.state.isAddressValid) {
            if (navigation.state.params === undefined) {
                data = {
                    name: userData.data.name,
                    phone: userData.data.phone,
                    street: userData.data.address.street,
                    city: userData.data.address.city,
                    district: userData.data.address.district,
                    village: userData.data.address.village,
                    token: this.state.token,
                    no: userData.data.address.no,
                    rt: userData.data.address.rt,
                    rw: userData.data.address.rw,
                    targetMember: targetMember.id,
                    ongkir: Number(targetMember.ongkir)
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
                    targetMember: targetMember.id,
                    ongkir: Number(targetMember.ongkir)
                }
            }
            this.setState({loading: true});
            dispatch(confirmTransaction(data));
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

    _queueRouting = () => {
        this.props.navigation.popToTop();
        this.props.navigation.navigate('MyTransaction');
    };

    showInfo() {
        Alert.alert('Gratis Ongkir', 'Mininum pembelian diatas 12kg.', [{text: 'OK'}], { cancelable: true });
    };

    render() {
        const { userData, navigation, cart, transaction, targetMember } = this.props;
        const listData = cart.filter(x => x.status === true);
        let total = 0;
        const loop = cart.map(x => total += x.subtotal);
        let params = {};
        if (navigation.state.params === undefined) {
            params = userData.data;
        }else{
            params = {
                name: navigation.state.params.name,
                phone: navigation.state.params.phone,
                address: {
                    street: navigation.state.params.street,
                    city: navigation.state.params.city,
                    district: navigation.state.params.district,
                    village: navigation.state.params.village,
                    no: navigation.state.params.no,
                    rt: navigation.state.params.rt,
                    rw: navigation.state.params.rw
                }
            };
        };
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
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    useNativeDriver
                    >
                    {
                        this.state.transactionLoading
                        ?
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalWaitText}>Mohon Tunggu</Text>
                            <DotIndicator
                                color='#7c0c10'
                                size={8}
                                />
                        </View>
                        :
                        <SUCCESS_DIALOG toDetail={this._queueRouting} data={transaction} />
                    }
                </Modal>
                {
                    this.state.showContent &&
                    <ScrollView>

                        <ADDRESS_INFO
                            navigation={navigation}
                            userData={userData}                             
                            />

                        <View style={{alignItems: 'center'}}>
                            <View style={itemDetails.container}>
                                <View>
                                    <Text style={itemDetails.headerTitle}>Detail Pesanan</Text>
                                </View>
                                {
                                    listData.map((x, i) =>
                                        <View key={i}>
                                            <Text style={itemDetails.productName}>{x.product_name}</Text>
                                            <View style={itemDetails.productDetails}>
                                                <Image
                                                    resizeMode='contain'
                                                    style={itemDetails.imageStyle}
                                                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                                    />
                                                <View style={itemDetails.orderInfo}>
                                                    <Text style={itemDetails.propertyText}>Harga</Text>
                                                    <Text style={itemDetails.propertyText}>Kuantitas</Text>
                                                    <Text style={itemDetails.subtotalText}>Subtotal</Text>
                                                </View>
                                                <View style={{marginBottom: 5, width: '45%'}}>
                                                    <Text style={itemDetails.valueText}>{IDR_FORMAT(x.price)}</Text>
                                                    <Text style={itemDetails.valueText}>{x.qty}</Text>
                                                    <Text style={itemDetails.subtotalValue}>
                                                        {IDR_FORMAT(x.subtotal)}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems: 'center'}}>
                                                <View style={styles.separator} />
                                            </View>
                                        </View>
                                    )
                                }
                                <View style={result.totalPrice}>
                                    <Text style={result.propText}>Total Belanja</Text>
                                    <Text style={result.rightTotalPrice}>
                                        {IDR_FORMAT(total)}
                                    </Text>
                                </View>
                                <View style={result.ongkirContainer}>
                                    <Text style={result.propText}>Ongkir</Text>
                                    <TouchableOpacity onPress={() => this.showInfo()} style={result.infoFreeOngkir}>
                                        <Text style={result.fakeIconInfo}>i</Text>
                                    </TouchableOpacity>
                                    {
                                        this.state.isFreeOngkir
                                        ?
                                        <Image resizeMode='contain' style={result.freeOngkirImage} source={FREE_ONGKIR}/>
                                        :
                                        <Text style={result.ongkirPrice}>
                                            {IDR_FORMAT(Number(targetMember.ongkir))}
                                        </Text>
                                    }
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.separator} />
                                </View>
                                <View style={{alignItems: 'center', marginTop: 3}}>
                                    <View style={styles.separator} />
                                </View>
                                <View style={result.footerContainer}>
                                    <Text style={result.totalPricePropText}>Total Bayar</Text>
                                    <Text style={result.totalPriceValue}>
                                        {this.state.isFreeOngkir ? IDR_FORMAT(total) : IDR_FORMAT(total + Number(targetMember.ongkir))}
                                    </Text>
                                </View>
                            </View>
                            {/**/}
                        </View>
                        <View style={result.confirmationButtonContainer}>
                            <TouchableOpacity onPress={() => this.submitTransaction()} style={result.confirmationTouchableArea}>
                                <Text style={result.confirmationButtonText}>Konfirmasi Pemesanan</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
                <MODAL message='Mohon Tunggu' isVisible={!this.state.showContent} />
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Payment);

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
    modalContainer: { backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'},
    modalWaitText: {fontWeight: 'bold', top: 15, marginTop: 5},
    STmain: {backgroundColor: '#cce8c2', borderRadius: 5, width: 300},
    STheader: {borderBottomColor: '#98c189', borderBottomWidth: 1, height: 50, justifyContent: 'center', alignItems: 'center'},
    STtext: {fontSize: 18, color: '#228200'},
    STscrollable: {backgroundColor: '#f7fff4', padding: 20, height: 400},
    STtransactionCodeText: {color: '#bababa', marginBottom: 2},
    STtransactionCodeValue: {fontSize: 20, marginBottom: 10},
    STtransactionTotalPriceValue: {marginBottom: 10, fontSize: 18},
    STtrxText: {fontSize: 17, marginBottom: 10},
    STdateText: {fontSize: 20, marginBottom: 20},
    colorText: {color: '#bababa'},
    centeringItems: {textAlign: 'center'},
    alignCenter: {alignItems: 'center'},
    font13: {fontSize: 13},
    separator: {backgroundColor: '#d7d7d7', height: 1, width: '95%'},
    modalBase: { backgroundColor: 'transparent', width: 230, height: 90, borderRadius: 3, alignItems: 'center'}
});

const itemDetails = StyleSheet.create({
    container: {backgroundColor: 'white', marginTop: 10, width: '95%', borderRadius: 3, elevation: 3},
    headerTitle: {fontSize: 20, padding: 10, fontWeight: 'bold', color: '#7c0c10'},
    productName: {marginLeft: 12, fontWeight: 'bold', fontSize: 16, marginBottom: 5, marginTop: 12},
    productDetails: {backgroundColor: 'white', height: 100, flexDirection: 'row', marginLeft: 12},
    imageStyle: {width: 90, height: 90, borderColor: '#eaeaea', borderWidth: 1},
    orderInfo: {marginBottom: 5, width: '25%'},
    propertyText: {marginLeft: 10, color: '#a3a3a3'},
    subtotalText: {marginLeft: 10, color: '#a3a3a3', position: 'absolute', bottom: 3},
    valueText: {textAlign: 'right', color: '#9b9b9b'},
    subtotalValue: {textAlign: 'right', position: 'absolute', bottom: 3, right: 0},
});

const result = StyleSheet.create({
    totalPrice: {paddingTop: 10, paddingLeft: 10, paddingRight: 10},
    propText: {fontWeight: 'bold', fontSize: 15},
    rightTotalPrice: {fontSize: 15, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'},
    ongkirContainer: {paddingLeft: 10, paddingRight: 10, marginBottom: 10},
    infoFreeOngkir: {position: 'absolute', left: 60, top: 4, borderWidth: 2, borderColor: 'red', borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center'},
    fakeIconInfo: {color: 'red', fontWeight: 'bold', fontSize: 11},
    freeOngkirImage: {height: 30, width: 70, position: 'absolute', right: 10},
    ongkirPrice: {fontSize: 15, position: 'absolute', right: 10, fontWeight: 'bold', textAlign: 'right'},
    footerContainer: {paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 10},
    totalPricePropText: {fontWeight: 'bold', fontSize: 17},
    totalPriceValue: {fontSize: 17, position: 'absolute', right: 10, top: 10, fontWeight: 'bold', textAlign: 'right'},
    confirmationButtonContainer: {justifyContent: 'center', alignItems: 'center', marginBottom: 10},
    confirmationTouchableArea: {marginTop: 10, borderRadius: 3, height: 50, width: 350, backgroundColor: '#7c0c10', justifyContent: 'center', alignItems: 'center'},
    confirmationButtonText: {color: 'white', fontSize: 16}
});
