import React, { Component } from 'react';
import { StatusBar, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, TouchableNativeFeedback, AsyncStorage, ToastAndroid } from 'react-native';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import ProductsTab from '../Products_Tab';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import CartIcon from '../Cart_Icon';
import { setTargetMember } from '../../actions/Set_Target_Member';
import Modal from "react-native-modal";
import { WaveIndicator } from 'react-native-indicators';
import { getAllProducts } from '../../actions/Get_All_Products';
import { fetchUser } from '../../actions/Get_User_Data';
import { setPlayerId } from '../../actions/Set_Player_Id';
import { setInitialToken } from '../../actions/Set_Initial_Token';
import { withNavigationFocus } from 'react-navigation';

class ShopPageMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProductsVisible: false,
            loading: true,
            isFocused: false
        }
    };

    _afterRender = () => {
        this.setState({isFocused: true})
        const { navigation } = this.props;
        this.props.dispatch(getAllProducts());
        setTimeout(async () => {
            this.setState({
                isProductsVisible: true
            });
            try{
                const id = await AsyncStorage.getItem('PlayerID');
                const token = await AsyncStorage.getItem('access_token');
                if (id !== null && token !== null) {
                    const ids = JSON.parse(id);
                    const tokens = JSON.parse(token);
                    this.setState({token: tokens});
                    if (this.props.token === '') this.props.dispatch(setInitialToken(tokens));
                    if (this.props.userData.playerID !== ids) this.props.dispatch(setPlayerId({ids, token: tokens}));
                    if (this.props.userData.name === '') this.props.dispatch(fetchUser(tokens));
                }
                if (this.props.listProducts.length === 0) this.props.dispatch(getAllProducts());
            }catch(error) {
                ToastAndroid.show('Data tidak dapat diakses.', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            };
        });
    };

    _beforeBlur = () => {
        this.setState({isFocused: false});
    };

    _onAnimationEnd = () => {
        this.setState({ loading: false });
    };

    render() {
        const { navigation, listProducts } = this.props;
        const { isProductsVisible, isFocused } = this.state;
        return(
            <Container>
                <NavigationEvents
                    onDidFocus={this._afterRender}
                    onWillBlur={this._beforeBlur}
                    />
                <Header style={styles.headerColor}>
                    <Item style={{borderBottomColor: '#7c0c10'}}>
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
                    <Tabs onChangeTab={(x) => console.log(x)} tabBarUnderlineStyle={{backgroundColor: '#7c0c10'}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: 'white', height: 45}} />}>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Sapi">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} status={this.props.userData.status} navigation = { navigation } products = { listProducts.filter(x => x.category === 'sapi') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ayam">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} status={this.props.userData.status} navigation = { navigation } products = { listProducts.filter(x => x.category === 'ayam') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ikan">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} status={this.props.userData.status} navigation = { navigation } products = { listProducts.filter(x => x.category === 'ikan') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Olahan">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} status={this.props.userData.status} navigation = { navigation } products = { listProducts.filter(x => x.category === 'olahan') } />
                        </Tab>
                    </Tabs>
                }
                <Modal
                    isVisible={this.state.loading}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    backdropColor='white'
                    backdropOpacity={0.5}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    >
                    <View style={{ backgroundColor: 'transparent', width: 230, height: 90, borderRadius: 3, alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', marginTop: 10, color: '#4f4f4f'}}>Memuat Produk..</Text>
                        <WaveIndicator
                            color='#4f4f4f'
                            />
                    </View>
                </Modal>
                <StatusBar
                    backgroundColor='#7c0c10'
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
        width: 280,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    headerColor: {
        backgroundColor: '#7c0c10'
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
