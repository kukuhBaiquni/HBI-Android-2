import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Alert, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity, Image, Picker, TouchableNativeFeedback } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { countItem } from '../../actions/Counting_Items';
import { BarIndicator } from 'react-native-indicators';
import { saveChanges } from '../../actions/Save_Changes';
import { resetAddToCart } from '../../actions/Add_To_Cart'
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { removeItem, forceResetRI } from '../../actions/Remove_Item';
import { withNavigationFocus } from 'react-navigation';
import { EMPTY_CART, BACKDARKRED } from '../../images';
import { STATIC_RES_URL, IDR_FORMAT } from '../basic/supportFunction';
import { MODAL_QUANTITY_EDITOR } from '../basic/template/modalQuantityEditor';
import { MODAL } from '../basic/template/loading';
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { PRODUCT_ORDER_DETAILS } from '../basic/template/productOrderDetails';

class Cart extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Keranjang Belanja',
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
            showModal: false,
            showModalContent: false,
            token: '',
            loading: false,
            index: 0,
            idProduct: 0,
            id_Product: '',
            productName: '',
            productPrice: 0,
            packing: 0,
            subtotal: 0,
            qty: 0,
            productPhoto: '',
            number: 0
        }
        this.showSpecificModal = this.showSpecificModal.bind(this);
        this.removeSingleItem = this.removeSingleItem.bind(this);
        this.onSave = this.onSave.bind(this);
    };

    _checkToken = () => {
        const { userData, token, cart, navigation } = this.props;
        if (userData.data.personalIdentity.name !== undefined) {
            this.setState({
                token: token.type.token,
                number: cart.data.length
            });
        }else{
            Alert.alert(
                'Kesalahan',
                'Anda harus login untuk melihat keranjang, login sekarang?',
                [
                    {text: 'YA', onPress: () => navigation.navigate('Login')},
                    {text: 'TIDAK'}
                ],
                { cancelable: false }
            );
        }
    };

    _incrementValue = () => {
        let count = this.state.qty;
        count ++;
        this.setState({qty: count, loading: true});
        var data = {
            token: this.state.token,
            productId: this.state.idProduct,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    _decrementValue = () => {
        let count = this.state.qty;
        count --;
        this.setState({qty: count, loading: true});
        var data = {
            token: this.state.token,
            productId: this.state.idProduct,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    showSpecificModal(x) {
        this.props.dispatch(resetAddToCart());
        const { cart } = this.props;
        this.setState({
            idProduct: cart.data[x].productId,
            showModal: true,
            productName: cart.data[x].productName,
            productPrice: cart.data[x].price,
            productPhoto: cart.data[x].photo,
            qty: cart.data[x].qty,
            index: x,
            packing: cart.data[x].packing
        });
    };

    onSave() {
        this.setState({showModal: false, showModalContent: false});
        const data = {
            token: this.state.token,
            id: this.state.idProduct,
            userId: this.props.userData.data._id,
            qty: this.state.qty,
            productName: this.state.productName,
            packing: this.state.packing
        };
        this.props.dispatch(saveChanges(data));
    };

    removeSingleItem(n) {
        const { cart } = this.props;
        const data = {
            id: cart.data[n].productId,
            token: this.state.token,
            userId: this.props.userData.data._id
        };
        Alert.alert(
            'Hapus Produk',
            `Apakah anda yakin ingin menghapus ${cart.data[n].productName}?`,
            [
                {text: 'YA', onPress: () => this.props.dispatch(removeItem(data))},
                {text: 'TIDAK'}
            ],
            { cancelable: false }
        );
    };

    _showModalContent = () => {
        this.setState({showModalContent: true});
    };

    _hideModalContent = () => {
        this.setState({showModalContent: false});
    };

    _closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    _renderModal = () => {
        const { navigation } = this.props;
        const { id_Product, productName, idProduct, qty, productPrice, productPhoto, description } = this.state;
        const data = {
            _id: id_Product,
            idProduct,
            productname: productName,
            itemCount: qty,
            category: '',
            resellerprice: productPrice,
            enduserprice: productPrice,
            photo: productPhoto,
            description: ''
        };
        return(
            <MODAL_QUANTITY_EDITOR
                closeModal={this._closeModal}
                showModalContent={this._showModalContent}
                hideModalContent={this._hideModalContent}
                onSave={this.onSave}
                onChangeValueIncrement={this._incrementValue}
                onChangeValueDecrement={this._decrementValue}

                isContentVisible={this.state.showModalContent}
                isVisible={this.state.showModal}
                loadingPrice={this.state.loading}
                itemCount={qty}
                data={data}

                userStatus={this.props.userData.data.personalIdentity.status}
                resultCounting={this.props.resultCounting}
                buttonText='Simpan'
                routeName={navigation.state.routeName}
                />
        )
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resultCounting !== this.props.resultCounting) {
            this.setState({loading: false, subtotal: this.props.resultCounting});
        }

        if (prevProps.cart.success !== this.props.cart.success) {
            if (this.props.cart.success) {
                showMessage({
                    message: 'Sukses',
                    description: 'Perubahan berhasil disimpan',
                    type: 'success'
                });
                this.props.dispatch(resetAddToCart());
            }
        }

        if (prevProps.cart.error !== this.props.cart.error) {
            if (this.props.cart.error) {
                showMessage({
                    message: 'Gagal',
                    description: 'Perubahan gagal disimpan',
                    type: 'error'
                });
                this.props.dispatch(resetAddToCart());
            }
        }

        if (prevProps.status.removeItem.error !== this.props.status.removeItem.error) {
            if (this.props.status.removeItem.error) {
                Alert.alert(
                    'Kesalahan',
                    'Silahkan ulangi permintaan anda.',
                    [
                        {text: 'OK', onPress: () => this.props.dispatch(forceResetRI())},
                    ],
                    { cancelable: false }
                );
            }
        }

        if (prevProps.status.removeItem.success !== this.props.status.removeItem.success) {
            if (this.props.status.removeItem.success) {
                showMessage({
                    message: 'Sukses',
                    description: 'Produk berhasil dihapus',
                    type: 'success'
                });
            }
        }
    }

    render() {
        const { navigation, cart, isFocused } = this.props;
        let total = cart.total;
        if (isFocused) {
            return(
                <View style={{flex: 1}}>
                    <NavigationEvents
                        onDidFocus={() => this._checkToken()}
                        />
                    {/*=============================================*/}

                    {this._renderModal()}

                    {/*=============================================*/}
                    {
                        cart.data.length !== 0
                        ?
                        <View style={{flex: 1}}>
                            <ScrollView style={{backgroundColor: COLORS.BASE_BACKGROUND}}>
                                {
                                    cart.data.map((x, i) =>
                                        <View key={i} style={{alignItems: 'center'}}>
                                            <View style={{backgroundColor: 'white', marginTop: 10, width: '95%', borderRadius: 3, elevation: 3}}>
                                                <View style={{marginBottom: 15}}>
                                                    <Text style={styles.productNameText}>{x.productName}</Text>
                                                    <TouchableOpacity style={{position: 'absolute', right: 5, top: 5}} onPress={() => this.removeSingleItem(i)}>
                                                        <Icon name='delete' color='#9b9b9b' />
                                                    </TouchableOpacity>

                                                    <View style={styles.productDetails}>
                                                        <Image
                                                            resizeMode='cover'
                                                            style={styles.imageStyle}
                                                            source={{uri: `${STATIC_RES_URL}products/${x.photo}`}}
                                                            />
                                                        <View style={styles.partials25}>
                                                            <Text style={styles.propText}>Harga</Text>
                                                            <Text style={styles.propText}>Kuantitas</Text>
                                                            <Text style={styles.propTextSubtotal}>Subtotal</Text>
                                                        </View>
                                                        <View style={styles.partial45}>
                                                            <Text style={styles.valText}>{IDR_FORMAT(Number(x.price))}</Text>
                                                            <Text style={styles.valText}>{x.qty}</Text>
                                                            <TouchableOpacity onPress={(x) => this.showSpecificModal(i)}>
                                                                <Text style={styles.changeDetails}>Ubah Rincian</Text>
                                                            </TouchableOpacity>
                                                            <Text style={styles.subTotal}>
                                                                {IDR_FORMAT(Number(x.price) * Number(x.qty))}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View style={{alignItems: 'center'}}>
                                                        <View style={{backgroundColor: '#d7d7d7', height: 1, width: '95%'}} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }

                                <View style={{height: 70}} />
                            </ScrollView>
                            <View style={[styles.productHeader, {height: 60, paddingLeft: 20, position: 'absolute', bottom: 0}]}>
                                <View>
                                    <Text style={{...TYPOGRAPHY.p}}>Total Harga</Text>
                                    <Text style={{...TYPOGRAPHY.buttonText, ...TYPOGRAPHY.f20, color: COLORS.PRIMARY}}>{IDR_FORMAT(total)}</Text>
                                </View>
                                {
                                    this.state.number !== 0 &&
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')} style={styles.paymentButton}>
                                        <Text style={{color: 'white', fontSize: 16}}>Bayar</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <FlashMessage
                                position='top'
                                floating={true}
                                duration={3000}
                                ref='suc-cart'
                                icon={this.props.status.saveChanges.success ? {icon: 'success', position: 'left'} : {icon: 'danger', position: 'left'}}
                                />
                        </View>
                        :
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Image style={{height: 80, width: 80}} source={EMPTY_CART} />
                            <Text style={{color: COLORS.PRIMARY, fontWeight: 'bold', fontSize: 24, marginTop: 20}}>Oops..</Text>
                            <Text style={{color: COLORS.PRIMARY, fontWeight: 'bold', fontSize: 16, marginTop: 10}}>Keranjang Belanja Anda kosong!</Text>
                        </View>
                    }
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(withNavigationFocus(Cart));

const styles = StyleSheet.create({
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
        marginLeft: 12,
        marginBottom: 5,
        marginTop: 10
    },
    productDetails: {
        backgroundColor: 'white',
        height: 100,
        flexDirection: 'row',
        marginLeft: 12
    },
    paymentButton: {justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.PRIMARY, width: 80, height: 40, position: 'absolute', right: 20, borderRadius: 3},

    basicCard               : { backgroundColor: COLORS.PURE_WHITE, marginTop: 10, width: '95%', borderRadius: 3, elevation: 1 },

    touchableRemoveItem     : { position: 'absolute', right: 5, top: 5 },

    imageStyle              : { width: 90, height: 90, borderColor: COLORS.GRAY_ICON, borderWidth: 1 },

    productDetails          : { backgroundColor: COLORS.PURE_WHITE, height: 100, flexDirection: 'row', marginLeft: 12 },

    partials25              : { marginBottom: 5, width: '25%' },

    productNameText         : { ...TYPOGRAPHY.subHeader, marginLeft: 12, marginBottom: 5, marginTop: 10 },

    propText                : { marginLeft: 10, ...TYPOGRAPHY.p },

    propTextSubtotal        : { marginLeft: 10, ...TYPOGRAPHY.p, position: 'absolute', bottom: 3 },

    partial45               : { marginBottom: 5, width: '45%' },

    valText                 : { textAlign: 'right', ...TYPOGRAPHY.normalPriceText },

    changeDetails           : { textAlign: 'right', marginTop: 13, ...TYPOGRAPHY.specialActionText },

    subTotal                : { textAlign: 'right', right: 0, position: 'absolute', bottom: 3, ...TYPOGRAPHY.priceTextModal },

    separator               : { backgroundColor: '#d7d7d7', height: 1, width: '95%' }
});
