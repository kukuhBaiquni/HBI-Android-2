import React, { Component, PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

class ListMarket extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    }

    _beforeRender = () => {
        const { navigation, userData } = this.props;
        if (Object.keys(userData.data).length !== 0) {
            if (userData.data.personalIdentity.status === 'Member') {
                navigation.navigate('ShopPageMember');
            }else{
                navigation.navigate('MapListMarket');
            }
        }else{
            navigation.navigate('MapListMarket');
        }
    };

    render() {
        return(
            <View>
                <NavigationEvents
                    onWillFocus={this._beforeRender}
                    />
            </View>
        )
    }
};


function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(ListMarket);
