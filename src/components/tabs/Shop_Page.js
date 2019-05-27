import React, { Component } from 'react';
import { StatusBar, StyleSheet, TextInput, View, TouchableOpacity, ScrollView, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { Container, Header, Item, Text, Right, Button, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Icon } from 'react-native-elements';
import ProductsTab from '../Products_Tab';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import CartIcon from '../Cart_Icon';
import { setTargetMember } from '../../actions/Set_Target_Member';
import Modal from "react-native-modal";
import { WaveIndicator } from 'react-native-indicators';
import { MODAL } from '../basic/loading';

class ShopPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            isProductsVisible: false,
            loading: true
        };
    };

    _afterRender = () => {
        const { navigation, targetMember } = this.props;
        this.props.dispatch(setTargetMember(navigation.state.params.member, navigation.state.params.ongkir));
        setTimeout(() => {
            this.setState({
                isProductsVisible: true
            });
        });
    };

    _onAnimationEnd = () => {
        this.setState({ loading: false });
    };

    render() {
        const { navigation, targetMember } = this.props;
        return(
            <Container>
                <NavigationEvents
                    onDidFocus={this._afterRender}
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
                    this.state.isProductsVisible &&
                    <Tabs tabBarUnderlineStyle={{backgroundColor: '#7c0c10'}} renderTabBar={()=> <ScrollableTab style={{borderBottomColor: 'white', height: 45}} />}>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Sapi">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} navigation = { navigation } products = { targetMember.stock.filter(x => x.category === 'sapi') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ayam">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} navigation = { navigation } products = { targetMember.stock.filter(x => x.category === 'ayam') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Daging Ikan">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} navigation = { navigation } products = { targetMember.stock.filter(x => x.category === 'ikan') } />
                        </Tab>
                        <Tab textStyle={{color: '#9e9e9e'}} activeTextStyle={{color: '#7c0c10'}} activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}} heading="Olahan">
                            <ProductsTab onAnimationEnd={this._onAnimationEnd} navigation = { navigation } products = { targetMember.stock.filter(x => x.category === 'olahan') } />
                        </Tab>
                    </Tabs>
                }
                <MODAL isVisible={this.state.loading} message='Memuat Produk' />
                <StatusBar
                    backgroundColor='#7c0c10'
                    barStyle='light-content'
                    />
            </Container>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(ShopPage);

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
