import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableNativeFeedback, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import { LOCALE_DAY,TRACKING_COLOR_STATUS, TRACKING_MESSAGE_STATUS } from '../basic/supportFunction';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BACKDARKRED } from '../../images';

const { width: SCREEN_WIDTH} = Dimensions.get('window');

class ListNotifications extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Telusuri Notifikasi',
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
            showPannel: false,
            markMode: false,
            listData: [],
        };
    };

    componentWillMount() {
        this._clearMark();
    };

    _clearMark() {
        const { navigation, userData } = this.props;
        const fetchinx = ['', 'order', 'system', 'inbox'];
        const data = userData.data.notifications[fetchinx[navigation.state.params.type]].map(x => Object.assign({}, x, {marked: false}));
        this.setState({
            listData: data.reverse(),
            markMode: false,
            showPannel: false
        });
    };

    _longPress(i) {
        let clone = [...this.state.listData];
        clone[i].marked = true;
        this.setState({showPannel: true, markMode: true, listData: clone});
    };

    _marking(i) {
        let clone = [...this.state.listData];
        clone[i].marked = !clone[i].marked;
        this.setState({listData: clone});
    };

    _toDetail(x, type, index) {
        if (!this.state.markMode) this.props.navigation.navigate('NotificationDetails', {data: x, type});
        this._marking(index);
    };

    render() {
        const { navigation, userData } = this.props;
        const { listData, markMode } = this.state;
        const display = ['', 'Order', 'Sistem', 'Inbox'];
        const fetchinx = ['', 'order', 'system', 'inbox'];
        const data = userData.data.notifications[fetchinx[navigation.state.params.type]];
        const type = fetchinx[navigation.state.params.type];
        return(
            <View style={{flex: 1}}>
                {
                    this.state.showPannel &&
                    <View style={styles.pannelContainer}>
                        <View style={styles.pannelBox}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('white')}
                                >
                                <View style={styles.actionContainer}>
                                    <Icon name='trash' size={25} color='white' />
                                </View>
                            </TouchableNativeFeedback>
                            <Text onPress={() => this._clearMark()} style={styles.cancelAction}>Batal</Text>
                        </View>
                    </View>
                }
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {
                            listData.map((x, i) =>
                                <View style={{width: '95%'}} key={i}>
                                    <TouchableOpacity
                                        onLongPress={() => this._longPress(i)}
                                        onPress={() => this._toDetail(x, type, i)}
                                        style={x.status ? readed : unread}
                                        >
                                        {
                                            x.marked && markMode &&
                                            <TouchableNativeFeedback
                                                onPress={() => this._marking(i)}
                                                background={TouchableNativeFeedback.Ripple('black')}
                                                >
                                                <View style={styles.markerOverlay} />
                                            </TouchableNativeFeedback>
                                        }
                                        <Text>Nomor Transaksi</Text>
                                        <Text style={styles.trxText}>{x.trx}</Text>
                                        <Text style={styles.dateText}>
                                            {LOCALE_DAY[new Date(x.date).getDay()] + ', ' + moment(x.date).format('DD MMM YYYY') + ' - ' + moment(x.date).format('HH:mm')}
                                        </Text>
                                        <Text style={{color: TRACKING_COLOR_STATUS[x.tracking]}}>{TRACKING_MESSAGE_STATUS[x.tracking]}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                    <View style={{height: 10}} />
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
)(ListNotifications);

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
    listItem: {
        marginTop: 5,
        borderRadius: 5,
        height: 70,
        paddingTop: 5,
        paddingLeft: 15,
        elevation: 3
    },
    trxText: {position: 'absolute', right: 10, top: 7, fontWeight: 'bold'},
    dateText: {fontSize: 12, color: '#a3a3a3'},
    pannelContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pannelBox: {
        width: '95%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    actionContainer: {
        width: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7c0c10',
        height: '80%',
        borderRadius: 5,
        marginLeft: 5
    },
    markerOverlay: {
        width: SCREEN_WIDTH*1.1,
        height: 70,
        backgroundColor: '#42bcf4',
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        right: 0,
        left: -10,
        zIndex: 10
    },
    dipilih: {
        justifyContent: 'center',
    },
    dipilihText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7c0c10',
        marginLeft: 5
    },
    cancelAction: {
        marginRight: 15,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#7c0c10'
    }
});

const readed = [styles.listItem, {backgroundColor: '#eaeaea'}];
const unread = [styles.listItem, {backgroundColor: 'white'}];
