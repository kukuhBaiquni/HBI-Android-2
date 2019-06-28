import React, { Component } from 'react';
import { StatusBar, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, TouchableNativeFeedback, AsyncStorage, ToastAndroid, BackHandler } from 'react-native';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import ProductsTab from '../Products_Tab';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import CartIcon from '../Cart_Icon';
import { setTargetMember } from '../../actions/Set_Target_Member';
import Modal from "react-native-modal";
import { WaveIndicator } from 'react-native-indicators';
import { loadCart } from '../../actions/Load_Cart';
import { withNavigationFocus } from 'react-navigation';
import { MODAL } from '../basic/template/loading';
import { COLORS } from '../basic/colors';

class ShopPageMember extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            isProductsVisible: false,
            loading: true,
            isFocused: false,
            activeTab: 0
        }
    };

    _afterRender = () => {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
        const token = this.props.token.type.token;
        const id = this.props.userData.data._id;
        this.setState({isFocused: true, isProductsVisible: true, loading: false});
        this.props.dispatch(loadCart({token, id}));
    };

    _handleBackButton = () => {
        const { navigation } = this.props;
        navigation.navigate('Beranda');
        return true;
    };

    _beforeBlur = () => {
        this.setState({isFocused: false});
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
    };

    render() {
        const { navigation, listProducts, userData } = this.props;
        const { isProductsVisible, isFocused } = this.state;
        return(
            <Container>
                <NavigationEvents
                    onDidFocus={this._afterRender}
                    onWillBlur={this._beforeBlur}
                    />
                <Header style={styles.headerColor}>
                    <Left>
                        <TouchableOpacity onPress={() => navigation.navigate('Beranda')}>
                            <Icon name='arrow-back' color='white' />
                        </TouchableOpacity>
                    </Left>
                    <Item style={{borderBottomColor: COLORS.PRIMARY}}>
                        <TouchableNativeFeedback onPress={() => navigation.navigate('SearchAutocomplete')}>
                            <View style={styles.input}>
                                <Text style={{color: '#a2a2a2', paddingTop: 7, paddingLeft: 5, fontSize: 16}}>Cari Produk</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Item>
                    <Right>
                        <Button transparent>
                            <View>
                                {/* add navigation props */}
                                <CartIcon navigation={navigation}/>
                            </View>
                        </Button>
                    </Right>
                </Header>
                {
                    isProductsVisible && isFocused &&
                    <Tabs onChangeTab={(x) => this.setState({activeTab: x.i})} tabBarUnderlineStyle={{backgroundColor: COLORS.PRIMARY}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: 'white', height: 45}} />}>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: COLORS.PRIMARY}} activeTabStyle={{backgroundColor: COLORS.PURE_WHITE}} tabStyle={{backgroundColor: COLORS.PURE_WHITE}} heading="Daging Sapi">
                            <ProductsTab status={userData.data.personalIdentity.status} navigation = { navigation } products = { listProducts.data.filter(x => x.category === 'sapi') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: COLORS.PRIMARY}} activeTabStyle={{backgroundColor: COLORS.PURE_WHITE}} tabStyle={{backgroundColor: COLORS.PURE_WHITE}} heading="Daging Ayam">
                            <ProductsTab status={userData.data.personalIdentity.status} navigation = { navigation } products = { listProducts.data.filter(x => x.category === 'ayam') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: COLORS.PRIMARY}} activeTabStyle={{backgroundColor: COLORS.PURE_WHITE}} tabStyle={{backgroundColor: COLORS.PURE_WHITE}} heading="Daging Ikan">
                            <ProductsTab status={userData.data.personalIdentity.status} navigation = { navigation } products = { listProducts.data.filter(x => x.category === 'ikan') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: COLORS.PRIMARY}} activeTabStyle={{backgroundColor: COLORS.PURE_WHITE}} tabStyle={{backgroundColor: COLORS.PURE_WHITE}} heading="Olahan">
                            <ProductsTab status={userData.data.personalIdentity.status} navigation = { navigation } products = { listProducts.data.filter(x => x.category === 'olahan') } />
                        </Tab>
                    </Tabs>
                }
                <MODAL isVisible={this.state.loading} message='Memuat Produk' />
                <StatusBar
                    backgroundColor={COLORS.PRIMARY}
                    barStyle='light-content'
                    />
            </Container>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(ShopPageMember);

const styles = StyleSheet.create({
    input : {
        width: 260,
        marginLeft: 10,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    headerColor: {
        backgroundColor: COLORS.PRIMARY
    },
    badge: {
        height: 18,
        width: 18,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: '#ff8c19',
        zIndex: 1,
        position: 'absolute',
        marginLeft: 15,
        marginTop: -10
    },
    text: {
        color: 'white',
        marginLeft: -15,
        fontSize: 14,
        fontWeight: 'bold'
    }
});
