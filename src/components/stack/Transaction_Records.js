import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { BACKDARKRED } from '../../images';

class TransactionRecords extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Riwayat Transaksi',
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
            loading: true
        }
    };

    render() {
        const { transactionRecords, navigation } = this.props;
        const token = navigation.state.params.token;
        return(
            <View style={{flex: 1}}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionList', {token, type: 0})}>
                    <View style={[styles.listMenu, {backgroundColor: 'white', marginTop: 5}]}>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Text style={[styles.menuTitle, {marginLeft: 10}]}>Sukses</Text>
                            {/*<View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{data1.length}</Text>
                            </View>*/}
                            <View style={{position: 'absolute', right: 10, top: 10}}>
                                <Icon name='chevron-right' color='#545454' />
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionList', {token, type: 1})}>
                    <View style={[styles.listMenu, {backgroundColor: 'white'}]}>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Text style={[styles.menuTitle, {marginLeft: 10}]}>Gagal</Text>
                            {/*<View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{data1.length}</Text>
                            </View>*/}
                            <View style={{position: 'absolute', right: 10, top: 10}}>
                                <Icon name='chevron-right' color='#545454' />
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('TransactionList', {token, type: 2})}>
                    <View style={[styles.listMenu, {backgroundColor: 'white'}]}>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Text style={[styles.menuTitle, {marginLeft: 10}]}>Kadaluarsa</Text>
                            {/*<View style={[styles.badge, {backgroundColor: '#fcbe05'}]}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{data1.length}</Text>
                            </View>*/}
                            <View style={{position: 'absolute', right: 10, top: 10}}>
                                <Icon name='chevron-right' color='#545454' />
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: '#7c0c10'
    },
    headerMenu: {
        height: 50,
        paddingTop: 15,
        paddingLeft: 8,
        backgroundColor: '#bfbfbf',
        marginTop: 10
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
        fontWeight: 'bold',
        color: '#545454'
    },
});

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(TransactionRecords);
