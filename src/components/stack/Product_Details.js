import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Picker, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Right, Button, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import Swipable from '../Swipable';
import RNParallax from '../Parallax_Header';
import CartIcon from '../Cart_Icon';
import Modal from "react-native-modal";
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { NavigationEvents } from 'react-navigation';
import { countItem } from '../../actions/Counting_Items';
import { addToCart, resetAddToCart } from '../../actions/Add_To_Cart';
import { withNavigationFocus } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import { WaveIndicator } from 'react-native-indicators';
import { STATIC_RES_URL, IDR_FORMAT, UNIT_CONVERTER } from '../basic/supportFunction';
import { BACKDARKRED } from '../../images';
import { MODAL } from '../basic/template/loading';
import { COLORS } from '../basic/colors';
import { MODAL_QUANTITY_EDITOR } from '../basic/template/modalQuantityEditor';
import { TYPOGRAPHY } from '../basic/typography';
import { singleTransaction, resetSingleTransaction } from '../../actions/SingleTransaction';

class ProductDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            isLoggedIn: false,
            loading: false,
            token: '',
            showModalContent: false,
            itemCount: 1, // data
            renderItems: [],
            isVisibleMain: false
        }

        this._showModalContent = this._showModalContent.bind(this);
        this._addToCart = this._addToCart.bind(this);
    };

    componentDidMount() {
        const { listProducts, navigation } = this.props;
        let list = [];
        let arr = [];
        let exception = listProducts.data.map(function(e) { return e.id }).indexOf(navigation.state.params.id);
        while(list.length < 6){
            var random = Math.floor(Math.random()*listProducts.data.length);
            if(arr.indexOf(random) > -1 || random == exception) continue;
            arr[arr.length] = random;
            list.push(listProducts.data[random]);
        };
        this._showMain(list);
    };

    _showMain = (list) => {
        setTimeout(() => {
            this.setState({
                isVisibleMain: true,
                renderItems: list
            });
        }, 10);
    };

    _incrementValue = () => {
        let count = this.state.itemCount;
        count ++;
        this.setState({itemCount: count, loading: true});
        var data = {
            token: this.state.token,
            productId: this.props.navigation.state.params.id,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    _decrementValue = () => {
        let count = this.state.itemCount;
        count --;
        this.setState({itemCount: count, loading: true});
        var data = {
            token: this.state.token,
            productId: this.props.navigation.state.params.id,
            qty: count,
            status: this.props.userData.data.personalIdentity.status
        };
        this.props.dispatch(countItem(data));
    };

    _addToCart(v) {
        this.setState({showModal: false});
        const item = {
            token: this.state.token,
            userId: this.props.userData.data._id,
            qty: this.state.itemCount,
            packing: this.props.navigation.state.params.packing,
            id: this.props.navigation.state.params.id,
            productName: this.props.navigation.state.params.productname
        }
        this.props.dispatch(addToCart(item));
    };

    _showModal = () => {
        if (this.state.isLoggedIn) {
            this.setState({
                showModal: true
            })
        }else{
            Alert.alert(
                'Kesalahan',
                'Anda harus login untuk berbelanja, login sekarang?',
                [
                    {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
                    {text: 'TIDAK'}
                ],
                { cancelable: false }
            );
        }
    };

    _checkToken = () => {
        this.props.dispatch(resetSingleTransaction());
        if (this.props.token.type.token !== '') {
            this.setState({isLoggedIn: true, token: this.props.token.type.token});
        }else{
            this.setState({isLoggedIn: false, token: ''});
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resultCounting !== this.props.resultCounting) {
            this.setState({loading: false});
        }

        if (prevProps.cart.success !== this.props.cart.success) {
            if (this.props.cart.success) {
                showMessage({
                    message: 'Sukses',
                    description: 'Produk berhasil ditambahkan ke keranjang.',
                    type: 'success',
                });
                this.props.dispatch(resetAddToCart());
            }
        }

        if (prevProps.cart.error !== this.props.cart.error) {
            if (this.props.cart.error) {
                showMessage({
                    message: 'Gagal',
                    description: 'Proses gagal, silahkan ulangi permintaan anda',
                    type: 'danger',
                });
                this.props.dispatch(resetAddToCart());
            }
        }
    };

    _directPurchase = () => {
        const data = this.props.navigation.state.params;
        if (this.state.isLoggedIn) {
            this.props.dispatch(singleTransaction([data]));
            this.props.navigation.navigate('Payment');
        }else{
            Alert.alert(
                'Kesalahan',
                'Anda harus login untuk berbelanja, login sekarang?',
                [
                    {text: 'YA', onPress: () => this.props.navigation.navigate('Login')},
                    {text: 'TIDAK'}
                ],
                { cancelable: false }
            );
        }
    };

    _showModalContent = () => {
        this.setState({ showModalContent: true });
    };

    _hideModalContent = () => {
        this.setState({ showModalContent: false });
    };

    _closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    _renderModal = () => {
        const { navigation, userData, resultCounting } = this.props;
        return(
            <MODAL_QUANTITY_EDITOR
                closeModal={this._closeModal}
                showModalContent={this._showModalContent}
                hideModalContent={this._hideModalContent}
                addToCart={this._addToCart}
                onChangeValueIncrement={this._incrementValue}
                onChangeValueDecrement={this._decrementValue}

                isContentVisible={this.state.showModalContent}
                isVisible={this.state.showModal}
                loadingPrice={this.state.loading}
                itemCount={this.state.itemCount}

                data={navigation.state.params}
                userStatus={userData.data.status}
                resultCounting={resultCounting}
                buttonText='Tambah ke Keranjang'
                routeName={navigation.state.routeName}
                />
        )
    };

    _renderHorizontalScoller = () => {
        return(
            <View style={{marginBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.renderItems.map((x, i) =>
                            <TouchableOpacity key={i} style={styles.basicCard} onPress={() => this.props.navigation.replace('ProductDetails', x)}>
                                <Image
                                    source={{uri: `${STATIC_RES_URL}products/${x.photo}`}}
                                    style={{height: 150, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5}}
                                    resizeMode='cover'
                                    />
                                <View style={{padding: 5}}>
                                    <Text style={{...TYPOGRAPHY.p}}>{x.productname}</Text>
                                    <Text style={{...TYPOGRAPHY.p}}>{IDR_FORMAT(x.enduserprice)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
                <Text>Master</Text>
            </View>
        )
    };

    render() {
        const { navigation, isFocused } = this.props;
        return(
            <View style={{flex: 1, backgroundColor: COLORS.BASE_BACKGROUND}}>
                <NavigationEvents
                    onDidFocus={() => this._checkToken()}
                    />
                <MODAL isVisible={!this.state.isVisibleMain} message='Memuat Produk' />
                {
                    this.state.isVisibleMain &&
                    <RNParallax
                        headerMinHeight={55}
                        headerMaxHeight={260}
                        extraScrollHeight={20}
                        navbarColor='white'
                        scrollEventThrottle={5}
                        title={navigation.state.params.productname}
                        backgroundColor='#f4f4f4'
                        titleStyle={styles.productName}
                        backgroundImage={{uri: `${STATIC_RES_URL}products/${navigation.state.params.photo}`}}
                        backgroundImageScale={2}
                        renderNavBar={() => (
                            <View style={styles.fixedNavbar}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navigationArrowBack}>
                                    <Image
                                        resizeMode='contain'
                                        style={{height: 19, width: 19}}
                                        source={BACKDARKRED}
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cartIconContainer}>
                                    <CartIcon navigation={navigation} bcolor='#7c0c10'/>
                                </TouchableOpacity>
                            </View>
                        )}
                        renderBackButton={() => (
                            <Image
                                onPress={() => navigation.goBack()}
                                resizeMode='contain'
                                style={{height: 19, width: 19}}
                                source={BACKDARKRED}
                                />
                        )}
                        renderCartIcon={() => (
                            <CartIcon navigation={navigation} bcolor='#7c0c10'/>
                        )}
                        renderContent={() => (
                            <ScrollView style={{backgroundColor: '#e2e2e2', marginTop: -5}}>

                                <View style={styles.viewContainer}>
                                    <Text style={styles.productNameText}>{navigation.state.params.productname}</Text>
                                    <Text style={styles.normalPriceText}>Harga Normal {IDR_FORMAT(navigation.state.params.enduserprice)}</Text>
                                    <View style={styles.vipRowMember}>
                                        <Text style={styles.memberPriceText}>Harga Member {IDR_FORMAT(navigation.state.params.resellerprice)}</Text>
                                        <View style={styles.badgeVip}>
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 11}}>VIP</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.viewContainer}>
                                    <Text style={styles.subtitle}>Informasi Produk</Text>
                                    <Text style={{...TYPOGRAPHY.p}}>Packing {UNIT_CONVERTER(navigation.state.params.packing)}/pack</Text>
                                    <View style={{height: 8}} />
                                    <Text style={styles.subtitle}>Deskripsi Produk</Text>
                                    <Text style={{...TYPOGRAPHY.p}}>{navigation.state.params.description}</Text>
                                </View>
                                <View style={styles.viewContainer}>
                                    <Text style={styles.subtitle}>Lihat Produk Lainnya</Text>
                                </View>

                                {this._renderHorizontalScoller()}

                                <View style={{height: 25}} />
                            </ScrollView>
                        )}
                    />
                }
                <View style={styles.footerWrapper}>
                    <TouchableOpacity style={[styles.button, {borderColor: '#7c0c10'}]} onPress={this._directPurchase}>
                        <Text style={{color: COLORS.PRIMARY, ...TYPOGRAPHY.buttonText}}>Beli Sekarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {borderColor: COLORS.PRIMARY, backgroundColor: COLORS.PRIMARY}]} onPress={this._showModal}>
                        <Text style={{color: COLORS.PURE_WHITE, ...TYPOGRAPHY.buttonText}}>Tambah ke Keranjang</Text>
                    </TouchableOpacity>
                </View>
                {this._renderModal()}
                <FlashMessage
                    floating={true}
                    ref='suc'
                    icon={this.state.isLoggedIn ? {icon: 'success', position: 'left'} : {icon: 'danger', position: 'left'}}
                    />
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(withNavigationFocus(ProductDetails));

const styles = StyleSheet.create({
    productName: {
        color: '#7c0c10',
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: -40,
        marginBottom: -25,
    },
    subtitle: {
        textAlign: 'left',
        ...TYPOGRAPHY.subHeader,
        color: COLORS.BLACK_NORMAL
    },
    viewContainer: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 10,
        elevation: 1
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    containerWithIcon: {
        backgroundColor: 'white',
        paddingTop: 13,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row'
    },
    fixedCartLeft: {
        height: 45,
        width: 80,
        borderRadius: 5,
        marginTop: -53,
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 10,
        zIndex: 5,
    },
    fixedNavbar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55
    },
    footerWrapper: {
        backgroundColor: 'white',
        height: 60, width: '100%',
        right: 0,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-around',
        elevation: 3
    },
    button: {
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        height: 40
    },
    navigationArrowBack: {
        position: 'absolute',
        left: 0,
        marginLeft: 10
    },
    cartIconContainer: {
        position: 'absolute',
        right: 17,
        borderRadius: 50,
        height: 30,
        width: 30,
        justifyContent: 'center'
    },
    productNameText: {fontSize: 20, color: COLORS.BLACK_NORMAL, fontWeight: 'bold', marginBottom: 5},
    vipRowMember: {flexDirection: 'row', alignItems: 'center', marginTop: 3},
    badgeVip: {backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', width: 30, height: 16, borderRadius: 10, marginLeft: 5},
    memberPriceText: {...TYPOGRAPHY.memberPriceText},
    normalPriceText: {...TYPOGRAPHY.normalPriceText},
    basicCard: {height: 230, width: 160, backgroundColor: COLORS.PURE_WHITE, margin: 5, borderRadius: 5, elevation: 1}
});
