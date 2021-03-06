import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { loadListContent } from '../../actions/Load_List_Content';
import moment from 'moment';
import { SERVER_URL } from '../basic/supportFunction';
import { CHECKLIST_DARKRED } from '../../images';

class ListContent extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Telusuri Berita',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 16, width: 16}} source={CHECKLIST_DARKRED} /> )
        };
    };

    beforeRender() {
        const tag = this.props.navigation.state.params.tag;
        this.props.dispatch(loadListContent(tag));
    };

    render() {
        const { navigation } = this.props;
        const data = this.props.customContent;
        const type = this.props.navigation.state.params.tag;
        return(
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <ScrollView>
                    <View style={{alignItems: 'center', paddingBottom: 10}}>
                        {
                            data[type].map((x, i) =>
                                <TouchableNativeFeedback key={i}>
                                    <View style={{backgroundColor: 'white', width: '95%', height: 150, borderRadius: 5, elevation: 5, marginTop: 10, padding: 10}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Image
                                                style={{width: 100, height: 100, borderRadius: 5, borderWidth: 1, borderColor: '#d3d3d3'}}
                                                source={{uri: `${SERVER_URL}images/custom content/${x.photo}`}}
                                                />
                                            <View style={{width: 220, paddingLeft: 10}}>
                                                <Text style={{fontSize: 17, fontWeight: 'bold'}}>{x.title}</Text>
                                                <Text style={{color: '#a3a3a3'}}>{x.content.slice(0, 100)}...</Text>
                                            </View>
                                        </View>
                                        <Text onPress={() => navigation.navigate('ContentDetails', {data: x})} style={{position: 'absolute', right: 10, bottom: 8, fontWeight: 'bold'}}>Lihat Detail ►</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        }
                    </View>
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
)(ListContent);

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    }
});
