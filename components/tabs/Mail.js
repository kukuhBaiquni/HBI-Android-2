import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableNativeFeedback, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Right, Button, Body, Header, Title, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import MailPartials from './Mail_Partials';
import io from 'socket.io-client';
import { SERVER_URL } from '../../config';
import { connect } from 'react-redux';

class Mail extends Component {
    constructor(props) {
        super(props)

        this.socket = io(SERVER_URL);
        this.socket.on('delete-notifications-success', (data) => {
            console.log(data);
        })

        this.deleteNotifications = (id) => {
            this.socket.emit('delete-notifications', id)
        }
    }
    render() {
        const { navigation } = this.props;
        return(
            <View>
                {/*<TouchableOpacity
                    onPress={() => this.deleteNotifications(this.props.userData.id)}
                    style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'hotpink', height: 50, width: 100}}
                    >
                    <Text>DELETE</Text>
                </TouchableOpacity>*/}
                <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                    <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Notifikasi</Text>
                </View>
                <ScrollView>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('ListNotifications', {type: 1})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='local-mall' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Notifikasi Order</Text>
                            </Left>
                            <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <MailPartials navigation={navigation} type='order' />
                    <TouchableNativeFeedback onPress={() => navigation.navigate('ListNotifications', {type: 2})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='notifications' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Notifikasi Sistem</Text>
                            </Left>
                            <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <MailPartials navigation={navigation} type='system' />
                    <TouchableNativeFeedback onPress={() => navigation.navigate('ListNotifications', {type: 3})}>
                        <View style={styles.containerWithIcon}>
                            <Icon name='drafts' size={20} color='#515151'/>
                            <Left>
                                <Text style={styles.subtitle}>Inbox</Text>
                            </Left>
                            <View syle={{position: 'absolute', right: 20, top: '50%'}}>
                                <Icon name='chevron-right' />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <MailPartials navigation={navigation} type='inbox' />
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
