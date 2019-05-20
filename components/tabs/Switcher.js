import React, { Component } from 'react';
import ShopPageMember from './Shop_Page_Member';
import ListMarket from '../stack/List_Market';
import { connect } from 'react-redux';
import { View } from 'react-native';

class Switcher extends Component {
    render() {
        const { navigation } = this.props;
        if (this.props.userData.status === 'Member') {
            return(
                <ShopPageMember navigation={navigation} />
            )
        }else{
            return(
                <View>
                    {
                        <ListMarket navigation={navigation} />
                    }
                </View>
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Switcher);
