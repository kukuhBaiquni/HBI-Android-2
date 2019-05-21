import React, { Component } from 'react';
import ShopPageMember from './Shop_Page_Member';
import ListMarket from '../stack/List_Market';
import { connect } from 'react-redux';

class Switcher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMember: true
        }
    };

    componentDidMount() {
        const { userData } = this.props;
        if (userData.status === 'Member') {
            this.setState({
                isMember: true
            });
        }else{
            this.setState({
                isMember: false
            });
        }
    };

    _renderListMarket = () => {
        const { navigation } = this.props;
        return(
            <ListMarket navigation={navigation} />
        )
    };

    _renderShopMember = () => {
        const { navigation } = this.props;
        return(
            <ShopPageMember navigation={navigation} />
        )
    };

    render() {
        const { isMember } = this.state;
        return(
            isMember
            ?
            this._renderShopMember()
            :
            this._renderListMarket()
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Switcher);
