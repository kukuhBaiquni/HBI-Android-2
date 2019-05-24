import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity, RefreshControl } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { SERVER_URL } from '../basic/supportFunction';
import { connect } from 'react-redux';
import { loadCategory, startProcess } from '../../actions/Load_Category';
import TimelinePartials from './Timeline_Partials';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus } from 'react-navigation';
import { BERITA_C, BERITA } from '../../images';

class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            index: -1
        }
    };

    beforeRender() {
        this.props.dispatch(startProcess())
        this.props.dispatch(loadCategory())
    };

    _onRefresh = () => {
        this.setState({refreshing: true})
        this.props.dispatch(startProcess())
        this.props.dispatch(loadCategory())
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.categoryContent.isProcessing !== this.props.categoryContent.isProcessing) {
            if (!this.props.categoryContent.isProcessing) {
                this.setState({refreshing: false})
            }
        }
    };

    render() {
        const { categoryContent, navigation } = this.props;
        const dummy = ['1', '2', '3', '4', '5']
        if (this.props.isFocused) {
            return(
                <View style={{flex: 1}}>
                    <NavigationEvents
                        onWillFocus={() => this.beforeRender()}
                        />
                    <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                        <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Berita</Text>
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                />
                        }
                    >
                        {
                            categoryContent.data.map((x, i) =>
                                <View key={i} style={{backgroundColor: 'white', marginTop: 10, elevation: 3}}>
                                    <Text style={{paddingTop: 10, paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}>{x}</Text>
                                    <TouchableNativeFeedback onPress={() => this.setState({index: i})}>
                                        <View style={{position: 'absolute', right: 20, top: 8, borderRadius: 4}}>
                                            <Icon name='more-horiz' size={28} />
                                        </View>
                                    </TouchableNativeFeedback>
                                    {
                                        this.state.index === i &&
                                        <Animatable.View
                                            style={{width: 260, alignItems: 'center', position: 'absolute', right: -45, top: 30, zIndex: 2}}
                                            animation='fadeInRight'
                                            useNativeDriver
                                            duration={200}
                                            iterationCount={1}
                                            >
                                            <TouchableOpacity onPress={() => navigation.navigate('ListContent', {tag: x})} style={{borderWidth: 1, borderColor: 'white', borderRadius: 20, backgroundColor: '#7c0c10'}}>
                                                <Text style={{padding: 10, color: 'white'}}>Lihat Selengkapnya</Text>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    }
                                    <TimelinePartials navigation={navigation} data={dummy} type={x} />
                                </View>
                            )
                        }
                        <View style={{height: 10}} />
                    </ScrollView>
                </View>
            )
        }else{
            return(
                <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3}}>
                    <Text style={{color: '#7c0c10', fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>Berita</Text>
                </View>
            )
        }
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(withNavigationFocus(Timeline));
