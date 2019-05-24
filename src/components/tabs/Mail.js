import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Right, Button, Body, Header, Title, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import MailPartials from './Mail_Partials';
import { SERVER_URL } from '../basic/supportFunction';
import { connect } from 'react-redux';
import { NOTIFIKASI_C, NOTIFIKASI } from '../../images';
import BadgeNotification from '../Badge_Notification';

class Mail extends Component {
    render() {
        const { navigation, userData } = this.props;
        return(
            <View>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Notifikasi</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => navigation.navigate('ListNotifications', {type: 1})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='local-mall' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Notifikasi Order</Text>
                            </Left>
                            <View syle={styles.arrowNavigation}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MailPartials userData={this.props.userData} navigation={navigation} type='order' />
                    <TouchableOpacity onPress={() => navigation.navigate('ListNotifications', {type: 2})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='notifications' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Notifikasi Sistem</Text>
                            </Left>
                            <View syle={styles.arrowNavigation}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MailPartials userData={this.props.userData} navigation={navigation} type='system' />
                    <TouchableOpacity onPress={() => navigation.navigate('ListNotifications', {type: 3})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='drafts' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Inbox</Text>
                            </Left>
                            <View syle={styles.arrowNavigation}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MailPartials userData={this.props.userData} navigation={navigation} type='inbox' />
                    <View style={{height: 70}} />
                </ScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
}

export default connect(
    mapDispatchToProps
)(Mail);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    headerText: {
        color: '#7c0c10',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10
    },
    arrowNavigation: {
        position: 'absolute',
        right: 20,
        top: '50%'
    },
    viewContent: {
        paddingLeft: 27,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15
    },
    subtitle: {
        marginLeft: 10,
        color: '#515151',
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold'
    },
    containerWithIcon: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: '#e2e2e2',
        flexDirection: 'row',
        marginTop: 5
    }
})
