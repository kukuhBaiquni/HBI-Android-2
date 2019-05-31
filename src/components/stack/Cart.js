import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Alert, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity, Image, Picker, TouchableNativeFeedback } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { countItem } from '../../actions/Counting_Items';
import { BarIndicator } from 'react-native-indicators';
import { saveChanges, forceResetSC } from '../../actions/Save_Changes';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { cartCheckPartial, forceResetCP } from '../../actions/Cart_Check_Partial';
import { cartCheckAll, forceResetCA } from '../../actions/Cart_Check_All';
import { removeItem, forceResetRI } from '../../actions/Remove_Item';
import { withNavigationFocus } from 'react-navigation';
import { EMPTY_CART, BACKDARKRED } from '../../images';
import { SERVER_URL, IDR_FORMAT } from '../basic/supportFunction';
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
            subtotal: 0,
            qty: 0,
            productPhoto: '',
            number: 0
        }
        this.showSpecificModal = this.showSpecificModal.bind(this);
        this.removeSingleItem = this.removeSingleItem.bind(this);
        this.onSave = this.onSave.bind(this);
    };

    checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (token !== null) {
                const raw = JSON.parse(token);
                this.setState({token: raw, number: this.props.cart.length});
            }else{
                Alert.alert(
                    'Kesalahan',
                    'Anda harus login untuk melihat keranjang, login sekarang?',
                    [
                        {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
                        {text: 'TIDAK'}
                    ],
                    { cancelable: false }
                );
            }
        }catch (error) {
            Alert.alert(
                'Kesalahan',
                'Anda harus login untuk melihat keranjang, login sekarang?',
                [
                    {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
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
            id: this.state.idProduct,
            qty: count
        };
        this.props.dispatch(countItem(data));
    };

    _decrementValue = () => {
        let count = this.state.qty;
        count --;
        this.setState({qty: count, loading: true});
        var data = {
            token: this.state.token,
            id: this.state.idProduct,
            qty: count
        };
        this.props.dispatch(countItem(data));
    };

    showSpecificModal(x) {
        this.props.dispatch(forceResetSC());
        const { cart } = this.props;
        this.setState({
            idProduct: cart[x].id,
            id_Product: cart[x]._id,
            showModal: true,
            productName: cart[x].product_name,
            subtotal: cart[x].subtotal,
            productPrice: cart[x].price,
            productPhoto: cart[x].photo,
            qty: cart[x].qty,
            index: x
        });
    };

    onSave() {
        this.setState({showModal: false, showModalContent: false});
        const data = {
            token: this.state.token,
            id: this.state.idProduct,
            _id: this.state.id_Product,
            qty: this.state.qty
        };
        this.props.dispatch(saveChanges(data));
    };

    removeSingleItem(n) {
        this.props.dispatch(forceResetRI());
        const { cart } = this.props;
        const data = {
            id: cart[n]._id,
            token: this.state.token
        };
        Alert.alert(
            'Hapus Produk',
            'Apakah anda yakin ingin menghapus produk ini?',
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

                userStatus={this.props.userData.data.status}
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
        if (prevProps.status.saveChanges.success !== this.props.status.saveChanges.success) {
            if (this.props.status.saveChanges.success) {
                showMessage({
                    message: 'Sukses',
                    description: 'Perubahan berhasil disimpan',
                    type: 'success'
                });
            }
        }
        if (prevProps.status.saveChanges.error !== this.props.status.saveChanges.error) {
            if (this.props.status.saveChanges.error) {
                showMessage({
                    message: 'Gagal',
                    description: 'Perubahan gagal disimpan',
                    type: 'error'
                });
            }
        }
        if (prevProps.cart !== this.props.cart) {
            let count = 0;
            this.props.cart.forEach(x => {
                if (x.status) {
                    count++;
                }
            })
            this.setState({number: count})
            if (count === this.props.cart.length) {
                this.setState({checkControl: true});
            }else{
                this.setState({checkControl: false});
            }
        }
        if (prevProps.status.checkPartial.error !== this.props.status.checkPartial.error) {
            if (this.props.status.checkPartial.error) {
                Alert.alert(
                    'Kesalahan',
                    'Silahkan ulangi permintaan anda.',
                    [
                        {text: 'OK', onPress: () => this.props.dispatch(forceResetCP())},
                    ],
                    { cancelable: false }
                );
            }
        }
        if (prevProps.status.checkAll.error !== this.props.status.checkAll.error) {
            if (this.props.status.checkAll.error) {
                Alert.alert(
                    'Kesalahan',
                    'Silahkan ulangi permintaan anda.',
                    [
                        {text: 'OK', onPress: () => this.props.dispatch(forceResetCA())},
                    ],
                    { cancelable: false }
                );
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
        let total = 0;
        cart.forEach(x => total += x.subtotal)
        if (isFocused) {
            return(
                <View style={{flex: 1}}>
                    <NavigationEvents
                        onWillFocus={() => this.checkToken()}
                        />
                    {/*=============================================*/}

                    {this._renderModal()}

                    {/*=============================================*/}
                    {
                        cart.length !== 0
                        ?
                        <View style={{flex: 1}}>
                            <ScrollView style={{backgroundColor: COLORS.BASE_BACKGROUND}}>
                                {
                                    cart.map((x, i) =>
                                        <PRODUCT_ORDER_DETAILS
                                            key={i}
                                            data={x}
                                            openModal={this.showSpecificModal}
                                            index={i}
                                            removeItem={this.removeSingleItem}
                                            routeName={navigation.state.routeName}
                                            />
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#7c0c10', width: 80, height: 40, position: 'absolute', right: 20, borderRadius: 3}}>
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
});
