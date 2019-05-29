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
import { addToCart, forceResetATC } from '../../actions/Add_To_Cart';
import { withNavigationFocus } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import { WaveIndicator } from 'react-native-indicators';
import { SERVER_URL, IDR_FORMAT, UNIT_CONVERTER } from '../basic/supportFunction';
import { BACKDARKRED } from '../../images';
import { MODAL } from '../basic/template/loading';
import { COLORS } from '../basic/colors';
import ModalQuantityEditor from '../basic/template/modalQuantityEditor';

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
        this._changeCount = this._changeCount.bind(this);
        this._addToCart = this._addToCart.bind(this);
    }

    componentDidMount() {
        let list = [];
        let arr = [];
        let exception = this.props.listProducts.map(function(e) { return e.id }).indexOf(this.props.navigation.state.params.id);
        while(list.length < 6){
            var random = Math.floor(Math.random()*this.props.listProducts.length);
            if(arr.indexOf(random) > -1 || random == exception) continue;
            arr[arr.length] = random;
            list.push(this.props.listProducts[random]);
        };
        this._showMain(list);
    };

    _showMain = (list) => {
        setTimeout(() => {
            this.setState({
                isVisibleMain: true,
                renderItems: list
            })
        }, 10);
    };

    _changeCount(x) {
        let count = this.state.itemCount
        if (x === 'inc') {
            count ++
            this.setState({itemCount: count, loading: true})
        }else{
            if (count > 1) {
                count --
                this.setState({itemCount: count, loading: true})
            }
        }
        var data = {
            token: this.state.token,
            id: this.props.navigation.state.params.id,
            qty: count
        }
        this.props.dispatch(countItem(data))
    };

    _addToCart(v) {
        this.setState({showModal: false})
        const item = {
            token: this.state.token,
            id: this.props.navigation.state.params.id,
            qty: this.state.itemCount
        }
        this.props.dispatch(addToCart(item));
    };

    showModal() {
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

    checkToken = () => {
        setTimeout( async () => {
            try {
                const val = await AsyncStorage.getItem('access_token');
                if (val !== null) {
                    this.setState({isLoggedIn: true, token: JSON.parse(val)});
                }else{
                    this.setState({isLoggedIn: false});
                }
            } catch (error) {
                this.setState({isLoggedIn: false});
            }
        }, 10);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.resultCounting !== this.props.resultCounting) {
            this.setState({loading: false})
        }
        if (this.props.status.addToCart.error !== this.props.status.addToCart.success) {
            if (this.props.status.addToCart.error) {
                showMessage({
                    message: 'Gagal',
                    description: 'Proses gagal, silahkan ulangi permintaan anda',
                    type: 'danger',
                });
                this.props.dispatch(forceResetATC())
            }
            if (this.props.status.addToCart.success) {
                showMessage({
                    message: 'Sukses',
                    description: 'Produk berhasil ditambahkan ke keranjang.',
                    type: 'success',
                });
                this.props.dispatch(forceResetATC())
            }
        }
    };

    directPurchase = async () => {
        try{
            if (this.state.token !== '') {
                const item = this.props.navigation.state.params;
                await AsyncStorage.setItem('direct_purchase', JSON.stringify(item))
                this.props.navigation.navigate('DirectPayment')
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
        }catch(error) {}
    };

    removeStorage = async () => {
        try{
            await AsyncStorage.removeItem('direct_purchase');
        }catch(error) {}
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
        const { navigation } = this.props;
        return(
            <ModalQuantityEditor
                closeModal={this._closeModal}
                showModalContent={this._showModalContent}
                hideModalContent={this._hideModalContent}
                addToCart={this._addToCart}
                onChangeValue={this._changeCount}
                onChangeValueDecrement={this._changeCount}

                isContentVisible={this.state.showModalContent}
                isVisible={this.state.showModal}
                loadingPrice={this.state.loading}
                itemCount={this.state.itemCount}

                data={navigation.state.params}
                userStatus={this.props.userData.status}
                resultCounting={this.props.resultCounting}
                />
        )
    };

    _renderHorizontalScoller = () => {
        return(
            <View style={{marginBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.renderItems.map((x, i) =>
                            <TouchableOpacity key={i} style={{height: 230, width: 160, backgroundColor: 'white', margin: 5, borderRadius: 5, elevation: 1}}>
                                <Image
                                    source={{uri: `${SERVER_URL}images/products/${x.photo}`}}
                                    style={{height: 150, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5}}
                                    resizeMode='cover'
                                    />
                                <View style={{padding: 5}}>
                                    <Text>{x.productname}</Text>
                                    <Text>{IDR_FORMAT(x.enduserprice)}</Text>
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
            <View style={{flex: 1}}>
                <NavigationEvents
                    onDidFocus={() => this.checkToken()}
                    onWillFocus={() => this.removeStorage()}
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
                        backgroundImage={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
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
                                    <Text>Harga Normal {IDR_FORMAT(navigation.state.params.enduserprice)}</Text>
                                    <View style={styles.vipRowMember}>
                                        <Text style={{color: COLORS.PRIMARY}}>Harga Member {IDR_FORMAT(navigation.state.params.resellerprice)}</Text>
                                        <View style={styles.badgeVip}>
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 11}}>VIP</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.viewContainer}>
                                    <Text style={styles.subtitle}>Informasi Produk</Text>
                                    <Text>Packing {UNIT_CONVERTER(navigation.state.params.packing)}/pack</Text>
                                    <View style={{height: 8}} />
                                    <Text style={styles.subtitle}>Deskripsi Produk</Text>
                                    <Text>{navigation.state.params.description}</Text>
                                </View>
                                <View style={styles.viewContainer}>
                                    <Text style={styles.subtitle}>Lihat Produk Lainnya</Text>
                                </View>

                                {this._renderHorizontalScoller()}

                                <View style={{height: 150}} />
                            </ScrollView>
                        )}
                    />
                }
                <View style={styles.footerWrapper}>
                    <TouchableOpacity style={[styles.button, {borderColor: '#7c0c10'}]} onPress={() => this.directPurchase()}>
                        <Text style={{color: '#7c0c10'}}>Beli Sekarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {borderColor: '#7c0c10', backgroundColor: '#7c0c10'}]} onPress={() => this.showModal()}>
                        <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                    </TouchableOpacity>
                </View>
                {this._renderModal()}
                <FlashMessage
                    position='top'
                    floating={true}
                    duration={3000}
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
        fontSize: 15,
        fontWeight: 'bold',
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
    viewBackgroundStyle: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 3
    },
    normalPriceText: {
        fontSize: 15,
        color: '#666666',
        fontWeight: 'bold'
    },
    memberPriceText: {
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold'
    },
    discountEllipse: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#ffc4c4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 3
    },
    productNameText: {fontSize: 20, color: COLORS.BLACK_NORMAL, fontWeight: 'bold', marginBottom: 5},
    vipRowMember: {flexDirection: 'row', alignItems: 'center', marginTop: 3},
    badgeVip: {backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', width: 30, height: 16, borderRadius: 10, marginLeft: 5}
});
