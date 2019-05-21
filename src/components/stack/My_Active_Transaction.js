import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { loadTransactionTypePending } from '../../actions/Load_Transaction_Type_Pending';
import moment from 'moment';
import { idrFormat, locale } from '../../../config';
import { BACKDARKRED } from '../../images';

class MyActiveTransaction extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Transaksi Saya',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={BACKDARKRED} /> )
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            isOpen4: false
        }
    };

    beforeRender (){
        const token = this.props.navigation.state.params.token;
        this.props.dispatch(loadTransactionTypePending(token))
    };

    render() {
        const { navigation, transactionTypePending } = this.props;
        const data1 = transactionTypePending.filter(x => x.tracking === 1);
        const data2 = transactionTypePending.filter(x => x.tracking === 2);
        const data3 = transactionTypePending.filter(x => x.tracking === 3);
        const data4 = transactionTypePending.filter(x => x.tracking === 4);
        return(
            <View>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <ScrollView>
                    <View style={{height: 10}} />
                    <TouchableNativeFeedback onPress={() => this.setState({isOpen1: !this.state.isOpen1})}>
                        <View style={[styles.listMenu, {backgroundColor: '#f2f2f2'}]}>
                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={[styles.menuTitle, {marginLeft: 10}]}>Menunggu Pembayaran</Text>
                                <View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{data1.length}</Text>
                                </View>
                                <View style={{position: 'absolute', right: 10, top: 10}}>
                                    <Icon name={this.state.isOpen1 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    {
                        this.state.isOpen1 &&
                        data1.map((x, i) =>
                        <TouchableNativeFeedback key={i} onPress={() => navigation.navigate('TransactionDetails', x)}>
                            <View style={[styles.listMenu, {height: 70, flexDirection: 'row'}]}>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={[styles.menuTitle, {color: '#bababa', fontSize: 15}]}>Nomor Transaksi</Text>
                                    <Text>{x.trx}</Text>
                                    <Text>{moment(x.start_date).format('HH:mm') + ' - ' + locale[new Date(x.start_date).getDay()] + ', ' + moment(x.start_date).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={{position: 'absolute', right: 10, padding: 6, paddingTop: 15}}>
                                    <Text style={{color: '#bababa', textAlign: 'right'}}>Total Belanja</Text>
                                    <Text style={{textAlign: 'right'}}>{idrFormat(x.total_price)}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )
                }
                <TouchableNativeFeedback onPress={() => this.setState({isOpen2: !this.state.isOpen2})}>
                    <View style={[styles.listMenu, {backgroundColor: '#f2f2f2'}]}>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Text style={[styles.menuTitle, {marginLeft: 10}]}>Pesanan sedang Diproses</Text>
                            <View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{data2.length}</Text>
                            </View>
                            <View style={{position: 'absolute', right: 10, top: 10}}>
                                <Icon name={this.state.isOpen2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                {
                    this.state.isOpen2 &&
                    data2.map((x, i) =>
                    <TouchableNativeFeedback key={i} onPress={() => navigation.navigate('TransactionDetails', x)}>
                        <View style={[styles.listMenu, {height: 70, flexDirection: 'row'}]}>
                            <View style={{paddingLeft: 10}}>
                                <Text style={[styles.menuTitle, {color: '#bababa', fontSize: 15}]}>Nomor Transaksi</Text>
                                <Text>{x.trx}</Text>
                                <Text>{moment(x.start_date).format('HH:mm') + ' - ' + locale[new Date(x.start_date).getDay()] + ', ' + moment(x.start_date).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={{position: 'absolute', right: 10, padding: 6, paddingTop: 15}}>
                                <Text style={{color: '#bababa', textAlign: 'right'}}>Total Belanja</Text>
                                <Text style={{textAlign: 'right'}}>{idrFormat(x.total_price)}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                )
            }
            <TouchableNativeFeedback onPress={() => this.setState({isOpen3: !this.state.isOpen3})}>
                <View style={[styles.listMenu, {backgroundColor: '#f2f2f2'}]}>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <Text style={[styles.menuTitle, {marginLeft: 10}]}>Pesanan sedang Dikirim</Text>
                        <View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{data3.length}</Text>
                        </View>
                        <View style={{position: 'absolute', right: 10, top: 10}}>
                            <Icon name={this.state.isOpen3 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
            {
                this.state.isOpen3 &&
                data3.map((x, i) =>
                <TouchableNativeFeedback key={i} onPress={() => navigation.navigate('TransactionDetails', x)}>
                    <View style={[styles.listMenu, {height: 70, flexDirection: 'row'}]}>
                        <View style={{paddingLeft: 10}}>
                            <Text style={[styles.menuTitle, {color: '#bababa', fontSize: 15}]}>Nomor Transaksi</Text>
                            <Text>{x.trx}</Text>
                            <Text>{moment(x.start_date).format('HH:mm') + ' - ' + locale[new Date(x.start_date).getDay()] + ', ' + moment(x.start_date).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={{position: 'absolute', right: 10, padding: 6, paddingTop: 15}}>
                            <Text style={{color: '#bababa', textAlign: 'right'}}>Total Belanja</Text>
                            <Text style={{textAlign: 'right'}}>{idrFormat(x.total_price)}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )
        }
        <TouchableNativeFeedback onPress={() => this.setState({isOpen4: !this.state.isOpen4})}>
            <View style={[styles.listMenu, {backgroundColor: '#f2f2f2'}]}>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <Text style={[styles.menuTitle, {marginLeft: 10}]}>Pesanan Sudah Sampai</Text>
                    <View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>{data4.length}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: 10}}>
                        <Icon name={this.state.isOpen4 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
        {
            this.state.isOpen4 &&
            data4.map((x, i) =>
            <TouchableNativeFeedback key={i} onPress={() => navigation.navigate('TransactionDetails', x)}>
                <View style={[styles.listMenu, {height: 70, flexDirection: 'row'}]}>
                    <View style={{paddingLeft: 10}}>
                        <Text style={[styles.menuTitle, {color: '#bababa', fontSize: 15}]}>Nomor Transaksi</Text>
                        <Text>{x.trx}</Text>
                        <Text>{moment(x.start_date).format('HH:mm') + ' - ' + locale[new Date(x.start_date).getDay()] + ', ' + moment(x.start_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 10, padding: 6, paddingTop: 15}}>
                        <Text style={{color: '#bababa', textAlign: 'right'}}>Total Belanja</Text>
                        <Text style={{textAlign: 'right'}}>{idrFormat(x.total_price)}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
    <View style={{height: 70}} />
</ScrollView>
</View>
)
}
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(MyActiveTransaction);

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bababa',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    },
    listMenu: {
        height: 55,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        padding: 6,
        backgroundColor: 'white'
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    badge: {
        height: 22,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 2
    }
});
