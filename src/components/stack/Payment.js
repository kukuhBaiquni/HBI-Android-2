import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { STATIC_RES_URL, IDR_FORMAT, ONGKIR } from '../basic/supportFunction';
import { forceResetRoot } from '../../actions/Load_Cities';
import Modal from "react-native-modal";
import { DotIndicator, WaveIndicator } from 'react-native-indicators';
import { confirmTransaction } from '../../actions/Confirm_Transaction';
import { loadTransactionTypePending } from '../../actions/Load_Transaction_Type_Pending';
import { resetTransactionState } from '../../actions/Direct_Purchase';
import moment from 'moment';
import { FREE_ONGKIR, BACKDARKRED } from '../../images';
import { SUCCESS_DIALOG } from '../basic/template/successDialog';
import { MODAL } from '../basic/template/loading';
import { ADDRESS_INFO } from '../basic/template/addressInfo';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { MODAL_QUANTITY_EDITOR } from '../basic/template/modalQuantityEditor';
import { countItem } from '../../actions/Counting_Items';
import { directPurchase } from '../../actions/Direct_Purchase';
import { DRAWER_DEFAULT } from '../../images';

import MapAddressOngkir from '../basic/template/MapAddressOngkir';

class Payment extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Pembayaran',
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
            isAddressValid: false,
            token: '',
            ongkir: 0,
            loading: false,
            transactionLoading: true,
            isFreeOngkir: false,
            showContent: false,
            itemCount: 1,
            data: [],
            showModal: false,
            showModalContent: false,
            loadingPrice: false,
            idProduct: 0,
            subtotalHandler: 0,

            editModeBasic: false,
            editModeAddress: false,

            customData: {
                name: '',
                phone: '',
                address: {
                    city: '',
                    district: '',
                    street: ''
                }
            }
        }
    };

    _afterRender = () => {
        const { dispatch, cart, navigation, singleTransaction, userData } = this.props;
        if (singleTransaction.length > 0) {
            if (this.state.itemCount > 29) {
                this.setState({isFreeOngkir: true});
            }else{
                this.setState({isFreeOngkir: false});
            }
        }else{
            let acu = 0;
            cart.data.map(x => acu += x.qty);
            if (acu > 29) {
                this.setState({isFreeOngkir: true});
            }else{
                this.setState({isFreeOngkir: false});
            }
        }

        let data = Object.assign({}, this.state.customData, {
            name: userData.data.personalIdentity.name,
            phone: userData.data.personalIdentity.phone,
            address: {
                ...this.state.customData.address,
                city: userData.data.personalIdentity.address.city.name,
                district: userData.data.personalIdentity.address.district.name,
                street: userData.data.personalIdentity.address.street
            }
        });
        if (this.props.singleTransaction.length > 0) {
            this.setState({showContent: true, token: this.props.token.type.token, data: this.props.singleTransaction, idProduct: singleTransaction[0].id, customData: data});
        }else{
            this.setState({showContent: true, token: this.props.token.type.token, data: cart.data, customData: data});
        }
        this._totalMapping();
    };

    componentDidUpdate(prevProps, prevState) {
        const { userData, dispatch, status, resultCounting } = this.props;
        if (prevProps.resultCounting !== resultCounting) {
            this.setState({loadingPrice: false, subtotalHandler: resultCounting});
        }
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
        const { navigation, userData, targetMember, dispatch, singleTransaction } = this.props;
        console.log(navigation.state.params);
        let data = {};
        console.log({...this.state.customData, ongkir: this.state.ongkir});
        // if (userData.data.address.street !== '' || navigation.state.params !== undefined) {
        //     if (navigation.state.params === undefined) {
        //         data = {
        //             name: userData.data.name,
        //             phone: userData.data.phone,
        //             street: userData.data.address.street,
        //             city: userData.data.address.city,
        //             district: userData.data.address.district,
        //             village: userData.data.address.village,
        //             no: userData.data.address.no,
        //             rt: userData.data.address.rt,
        //             rw: userData.data.address.rw,
        //             token: this.state.token,
        //             targetMember: targetMember.id,
        //             ongkir: Number(targetMember.ongkir)
        //         };
        //     }else{
        //         data = {
        //             name: navigation.state.params.name,
        //             phone: navigation.state.params.phone,
        //             street: navigation.state.params.street,
        //             city: navigation.state.params.city,
        //             district: navigation.state.params.district,
        //             village: navigation.state.params.village,
        //             no: navigation.state.params.address.no,
        //             rt: navigation.state.params.address.rt,
        //             rw: navigation.state.params.address.rw,
        //             token: this.state.token,
        //             targetMember: targetMember.id,
        //             ongkir: Number(targetMember.ongkir)
        //         };
        //     }
        //     this.setState({loading: true});
        //     if (singleTransaction.length > 0) {
        //         const xData = Object.assign({}, data, {
        //             id: this.state.idProduct,
        //             qty: this.state.itemCount
        //         });
        //         dispatch(directPurchase(xData));
        //     }else{
        //         dispatch(confirmTransaction(data));
        //     }
        // }else{
        //     Alert.alert(
        //         'Kesalahan',
        //         'Alamat yang anda berikan kurang lengkap, silahkan lengkapi dahulu alamat anda.',
        //         [
        //             {text: 'OK'}
        //         ],
        //         { cancelable: false }
        //     );
        // }
    };

    _queueRouting = () => {
        this.props.navigation.navigate('Beranda');
    };

    showInfo() {
        Alert.alert('Gratis Ongkir', 'Mininum pembelian diatas 15kg.', [{text: 'OK'}], { cancelable: true });
    };


    _propertyMapping = () => {
        const { cart, singleTransaction, userData } = this.props;
        if (singleTransaction.length > 0) {
            const basic = singleTransaction[0];
            const isMember = userData.data.personalIdentity.status === 'Member' ? true : false;
            const data = [
                Object.assign({}, basic, {
                    productName: basic.productname,
                    price: isMember ? basic.resellerprice : basic.enduserprice,
                    qty: this.state.itemCount
                })
            ];
            return data;
        }else{
            return cart.data;
        }
    };

    _totalMapping = () => {
        const { cart, singleTransaction, userData } = this.props;
        if (singleTransaction.length > 0) {
            const basic = singleTransaction[0];
            const isMember = userData.data.personalIdentity.status === 'Member' ? true : false;
            const result = isMember ? basic.resellerprice * this.state.itemCount : basic.enduserprice * this.state.itemCount;
            this.setState({subtotalHandler: result});
        }else{
            this.setState({subtotalHandler: this.props.cart.total});
        }
    };

    _incrementValue = () => {
        let count = this.state.itemCount;
        count ++;
        this.setState({itemCount: count, loadingPrice: true});
        if (count > 29) {
            this.setState({isFreeOngkir: true})
        }else{
            this.setState({isFreeOngkir: false})
        }
        var data = {
            token: this.state.token,
            productId: this.state.idProduct,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    _decrementValue = () => {
        let count = this.state.itemCount;
        count --;
        this.setState({itemCount: count, loadingPrice: true});
        if (count > 29) {
            this.setState({isFreeOngkir: true})
        }else{
            this.setState({isFreeOngkir: false})
        }
        var data = {
            token: this.state.token,
            productId: this.state.idProduct,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    _showModalContent = () => {
        this.setState({showModalContent: true});
    };

    _hideModalContent = () => {
        this.setState({showModalContent: false});
    };

    _openModal = () => {
        const { singleTransaction } = this.props;
        this.setState({
            showModal: true
        });
    };

    _closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    _renderQuantityEditor = () => {
        const { navigation, singleTransaction } = this.props;
        if (singleTransaction.length > 0) {
            const basic = singleTransaction[0];
            const data = {
                idProduct: basic.id,
                productname: basic.productname,
                itemCount: this.state.itemCount,
                category: '',
                resellerprice: basic.resellerprice,
                enduserprice: basic.enduserprice,
                photo: basic.photo,
                description: ''
            };
            return(
                <MODAL_QUANTITY_EDITOR
                    closeModal={this._closeModal}
                    showModalContent={this._showModalContent}
                    hideModalContent={this._hideModalContent}
                    onSave={this._closeModal}

                    onChangeValueIncrement={this._incrementValue}
                    onChangeValueDecrement={this._decrementValue}

                    isContentVisible={this.state.showModalContent}
                    isVisible={this.state.showModal}
                    loadingPrice={this.state.loadingPrice}

                    itemCount={this.state.itemCount}
                    data={data}

                    userStatus={this.props.userData.data.status}
                    resultCounting={this.props.resultCounting}
                    buttonText='Simpan'
                    routeName={navigation.state.routeName}
                    />
            )
        }
    };

    _changeEditModeAddress = () => {
        this.setState(function(prevState) {
            return {
                editModeAddress: !prevState.editModeAddress
            }
        });
    };

    _changeEditModeBasic = () => {
        this.setState(function(prevState) {
            return {
                editModeBasic: !prevState.editModeBasic
            }
        });
    };

    _onChangeText = (params, value) => {
        let clone = Object.assign({}, this.state.customData, {
            [params]: value
        });
        this.setState({
            customData: clone
        });
    };

    _getOngkir = (distance) => {
        this.setState({
            ongkir: ONGKIR(distance)
        });
    };

    render() {
        const { userData, navigation, cart, transaction, targetMember, singleTransaction } = this.props;
        let total = 0;
        cart.data.map(x => total += x.subtotal);
        let params = {};
        if (navigation.state.params === undefined) {
            params = {
                name: userData.data.personalIdentity.name,
                phone: userData.data.personalIdentity.phone,
                address: {
                    street: userData.data.personalIdentity.address.street,
                    city: userData.data.personalIdentity.address.city.name,
                    district: userData.data.personalIdentity.address.district.name,
                    village: userData.data.personalIdentity.address.village.name
                }
            };
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
            <View style={{flex: 1, backgroundColor: COLORS.BASE_BACKGROUND}}>
                <NavigationEvents
                    onDidFocus={() => this._afterRender()}
                    />
                {this._renderQuantityEditor()}
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
                                color={COLORS.PRIMARY}
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
                            userData={userData.data}
                            customData={this.state.customData}
                            editModeBasic={this.state.editModeBasic}
                            changeEditMode={this._changeEditModeBasic}
                            onChangeText={this._onChangeText}
                            />
                        <MapAddressOngkir
                            address={userData.data.personalIdentity.address}
                            editModeAddress={this.state.editModeAddress}
                            customData={this.state.customData}
                            changeEditMode={this._changeEditModeAddress}
                            navigation={navigation}
                            getOngkir={this._getOngkir}
                            />

                        <View style={{alignItems: 'center'}}>
                            <View style={itemDetails.container}>
                                <View>
                                    <Text style={itemDetails.headerTitle}>Detail Pesanan</Text>
                                </View>
                                {
                                    this._propertyMapping().map((x, i) =>
                                        <View key={i}>
                                            <Text style={itemDetails.productName}>{x.productName}</Text>
                                            <View style={itemDetails.productDetails}>
                                                <Image
                                                    resizeMode='cover'
                                                    style={itemDetails.imageStyle}
                                                    source={{uri: `${STATIC_RES_URL}products/${x.photo}`}}
                                                    />
                                                <View style={itemDetails.orderInfo}>
                                                    <Text style={itemDetails.propertyText}>Harga</Text>
                                                    <Text style={itemDetails.propertyText}>Kuantitas</Text>
                                                    <Text style={itemDetails.subtotalText}>Subtotal</Text>
                                                </View>
                                                <View style={{marginBottom: 5, width: '45%'}}>
                                                    <Text style={itemDetails.valueText}>{IDR_FORMAT(x.price)}</Text>
                                                    <Text style={itemDetails.valueText}>{x.qty}</Text>
                                                    {
                                                        singleTransaction.length > 0 &&
                                                        <TouchableOpacity onPress={this._openModal}>
                                                            <Text style={styles.changeDetails}>Ubah Rincian</Text>
                                                        </TouchableOpacity>
                                                    }
                                                    <Text style={itemDetails.subtotalValue}>
                                                        {
                                                            IDR_FORMAT(x.price * x.qty)
                                                        }
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
                                        {IDR_FORMAT(this.state.subtotalHandler)}
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
                                            {IDR_FORMAT(Number(this.state.ongkir))}
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
                                    <Text style={result.totalPricePropText}>Total yang harus dibayar</Text>
                                    <Text style={result.totalPriceValue}>
                                        {this.state.isFreeOngkir ? IDR_FORMAT(this.state.subtotalHandler) : IDR_FORMAT(this.state.subtotalHandler + Number(this.state.ongkir))}
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
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Payment);

const styles = StyleSheet.create({
    header                              : { height: 60, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderBottomColor: '#cecece', borderBottomWidth: 1  },
    headerTitle                         : { ...TYPOGRAPHY.header  },
    productName                         : { fontWeight: 'bold', fontSize: 16, marginLeft: 20  },
    button                              : { marginBottom: 40, width: 250, height: 45, backgroundColor: '#c4dbc0', borderColor: '#228200', borderRadius: 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center'  },
    modalContainer                      : { backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center' },
    modalWaitText                       : { fontWeight: 'bold', top: 15, marginTop: 5 },
    separator                           : { backgroundColor: '#d7d7d7', height: 1, width: '95%' },
    changeDetails                       : { textAlign: 'right', marginTop: 13, ...TYPOGRAPHY.specialActionText },
});

const itemDetails = StyleSheet.create({
    container                   : { backgroundColor: 'white', marginTop: 10, width: '95%', borderRadius: 3, elevation: 1 },
    headerTitle                 : { ...TYPOGRAPHY.header, color: COLORS.PRIMARY, ...TYPOGRAPHY.f16, marginLeft: 10, marginTop: 10 },
    productName                 : { marginLeft: 12, ...TYPOGRAPHY.subHeader, marginBottom: 5, marginTop: 12 },
    productDetails              : { backgroundColor: 'white', height: 100, flexDirection: 'row', marginLeft: 12 },
    imageStyle                  : { width: 90, height: 90, borderColor: COLORS.GRAY_BORDER, borderRadius: 3, borderWidth: 1 },
    orderInfo                   : { marginBottom: 5, width: '25%' },
    propertyText                : { marginLeft: 10, ...TYPOGRAPHY.p },
    subtotalText                : { marginLeft: 10, ...TYPOGRAPHY.p, position: 'absolute', bottom: 3 },
    valueText                   : { textAlign: 'right', ...TYPOGRAPHY.normalPriceText },
    subtotalValue               : { textAlign: 'right', ...TYPOGRAPHY.priceTextModal, position: 'absolute', bottom: 3, right: 0 },
});

const result = StyleSheet.create({
    totalPrice                      : { paddingTop: 10, paddingLeft: 10, paddingRight: 10 },
    propText                        : { ...TYPOGRAPHY.normalPriceText },
    rightTotalPrice                 : { position: 'absolute', right: 10, top: 10, textAlign: 'right', ...TYPOGRAPHY.normalPriceText, color: COLORS.PRIMARY },
    ongkirPrice                     : { position: 'absolute', right: 10, textAlign: 'right', ...TYPOGRAPHY.normalPriceText, color: COLORS.CYAN_BASE },
    ongkirContainer                 : { paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
    infoFreeOngkir                  : { position: 'absolute', left: 55, top: 2, borderWidth: 2, borderColor: COLORS.CYAN_BASE, borderRadius: 10, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
    fakeIconInfo                    : { color: COLORS.CYAN_BASE, fontWeight: 'bold', fontSize: 11 },
    freeOngkirImage                 : { height: 30, width: 70, position: 'absolute', right: 10 },
    footerContainer                 : { paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
    totalPricePropText              : { ...TYPOGRAPHY.normalPriceText, ...TYPOGRAPHY.f16 },
    totalPriceValue                 : { position: 'absolute', right: 10, top: 10, textAlign: 'right', ...TYPOGRAPHY.memberPriceText, ...TYPOGRAPHY.f16 },
    confirmationButtonContainer     : { justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    confirmationTouchableArea       : { marginTop: 10, borderRadius: 3, height: 50, width: 350, backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', elevation: 1 },
    confirmationButtonText          : { ...TYPOGRAPHY.buttonText, color: COLORS.PURE_WHITE, ...TYPOGRAPHY.f16 }
});
