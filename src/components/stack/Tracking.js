import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { BACKDARKRED } from '../../images';

class Tracking extends Component {
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

    render() {
        const { navigation } = this.props;
        return(
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={{position: 'absolute', left: 0, marginLeft: 10}} onPress={() => navigation.goBack()}>
                        <Image style={{height: 18, width: 18}} source={BACKDARKRED} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Tracking</Text>
                </View>
            </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Tracking);

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
});
