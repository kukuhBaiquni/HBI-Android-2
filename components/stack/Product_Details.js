import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Picker, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Right, Button, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../../config';
import { idrFormat } from '../../config';
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

class ProductDetails extends Component {
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
    }

    componentDidMount() {
        let list = [];
        let arr = [];
        let exception = this.props.listProducts.map(function(e) { return e.id }).indexOf(this.props.navigation.state.params.id);
        while(list.length < 5){
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

    changeCount(x) {
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

    addToCart(v) {
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

    _renderModal = () => {
        const { navigation } = this.props;
        return(
            <Modal
                isVisible={this.state.showModal}
                style={{alignItems: 'center'}}
                onBackdropPress={() => this.setState({showModal: false})}
                onBackButtonPress={() => this.setState({showModal: false})}
                onModalShow={() => this.setState({showModalContent: true})}
                onModalHide={() => this.setState({showModalContent: false})}
                hideModalContentWhileAnimating={true}
                useNativeDriver
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>Pilihan Anda</Text>
                        <TouchableOpacity style={styles.closeButtonHeader}>
                            <Icon name='clear' color='#919191' size={22} onPress={() => this.setState({showModal: false})}/>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.showModalContent &&
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.imageModalContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.imageStyle}
                                        source={{uri: `${SERVER_URL}images/products/${navigation.state.params.photo}`}}
                                        />
                                </View>
                                <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                                    <Text style={styles.productnameText}>{navigation.state.params.productname}</Text>
                                    {
                                        this.state.loading
                                        ?
                                        <View style={styles.loadingContainer}>
                                            <BarIndicator count={5} size={15} color='#919191' />
                                        </View>
                                        :
                                        <Text style={styles.priceTextModal}>{idrFormat(this.state.itemCount === 1 ? (this.props.userData.status === 'Non Member' ? navigation.state.params.enduserprice : navigation.state.params.resellerprice) : this.props.resultCounting)}</Text>
                                    }
                                    {/*Increment Button*/}
                                    <View style={styles.interactionButtonContainer}>
                                        <TouchableNativeFeedback onPress={(x) => this.changeCount('dec')}>
                                            <View style={styles.pmButton}>
                                                <Text style={styles.pmButtonText}>-</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                        <View style={styles.counterText}>
                                            <Text>{this.state.itemCount}</Text>
                                        </View>
                                        <TouchableNativeFeedback onPress={(x) => this.changeCount('inc')}>
                                            <View style={styles.pmButton}>
                                                <Text style={styles.pmButtonText}>+</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonAddToCartModal}>
                                <TouchableOpacity onPress={(x) => this.addToCart(navigation.state.params)}>
                                    <View style={styles.buttonAddTocartExe}>
                                        <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
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
                    <Modal
                        isVisible={!this.state.isVisibleMain}
                        style={{alignItems: 'center'}}
                        hideModalContentWhileAnimating={true}
                        useNativeDriver
                        backdropColor='white'
                        backdropOpacity={0.5}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                        >
                        <View style={{ backgroundColor: 'transparent', width: 230, height: 90, borderRadius: 3, alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', marginTop: 10}}>Sedang mempersiapkan produk..</Text>
                            <WaveIndicator
                                color='#4f4f4f'
                                />
                        </View>
                    </Modal>
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
                                        source={require('../../android/app/src/main/assets/custom/BackDarkred.png')}
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
                                source={require('../../android/app/src/main/assets/custom/BackDarkred.png')}
                                />
                        )}
                        renderCartIcon={() => (
                            <CartIcon navigation={navigation} bcolor='#7c0c10'/>
                        )}
                        renderContent={() => (
                            <ScrollView style={{backgroundColor: '#e2e2e2', marginTop: -10}}>
                                <View style={[styles.viewContainer, styles.viewBackgroundStyle]}>
                                    <View style={{width: '35%'}}>
                                        <Text style={styles.normalPriceText}>Harga Normal</Text>
                                        <Text style={styles.normalPriceText}>{idrFormat(navigation.state.params.enduserprice)}</Text>
                                    </View>
                                    <View style={{width: '35%'}}>
                                        <Text style={styles.memberPriceText}>Harga Member</Text>
                                        <Text style={styles.memberPriceText}>{idrFormat(navigation.state.params.resellerprice)}</Text>
                                    </View>
                                    <View style={{width: '20%'}}>
                                        <Text style={{fontSize: 10, color: 'red'}}>Discount</Text>
                                        <View style={styles.discountEllipse}>
                                            <Text style={{color: 'red', fontSize: 12}}>15% OFF</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.viewContainer}>
                                    <Text style={styles.subtitle}>Deskripsi Produk</Text>
                                    <Text style={styles.text}>{navigation.state.params.description}</Text>
                                </View>
                                <Swipable renderItems={this.state.renderItems} navigation={ navigation } />
                                <View style={{height: 50}} />
                            </ScrollView>
                        )}
                    />
                }
                <TouchableNativeFeedback>
                    <View style={styles.footerWrapper}>
                        <TouchableOpacity style={[styles.button, {borderColor: '#7c0c10'}]} onPress={() => this.directPurchase()}>
                            <Text style={{color: '#7c0c10'}}>Beli Sekarang</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {borderColor: '#7c0c10', backgroundColor: '#7c0c10'}]} onPress={() => this.showModal()}>
                            <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableNativeFeedback>
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
        fontWeight: 'bold'
    },
    viewContainer: {
        backgroundColor: 'white',
        padding: 25,
        marginTop: 10,
        marginBottom: 40,
        elevation: 3
    },
    text: {
        textAlign: 'left',
        paddingTop: 10,
        color: '#9b9b9b'
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
    modalContainer: {
        backgroundColor: 'white',
        width: 300,
        height: 250,
        borderRadius: 4
    },
    modalHeader: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        width: '100%'
    },
    modalHeaderTitle: {
        textAlign: 'left',
        padding: 15,
        color: '#919191',
        fontSize: 16
    },
    closeButtonHeader: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    imageModalContainer: {
        elevation: 1,
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 20
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderColor: '#e2e2e2',
        borderWidth: 1
    },
    productnameText: {
        fontSize: 16,
        width: 140,
        textAlign: 'left',
        color: '#919191'
    },
    loadingContainer: {
        height: 24,
        width: 80,
        paddingTop: 7,
        alignItems: 'center'
    },
    priceTextModal: {
        fontWeight: 'bold',
        marginTop: 5
    },
    interactionButtonContainer: {
        flexDirection: 'row',
        width: 110,
        height: 40,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    pmButton: {
        height: 30,
        width: 30,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    pmButtonText: {
        color: 'white',
        fontSize: 22
    },
    counterText: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 3
    },
    buttonAddToCartModal: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom:20
    },
    buttonAddTocartExe: {
        height: 45,
        width: 260,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
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
    }
});
