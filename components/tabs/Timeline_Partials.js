import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { loadCustomContent } from '../../actions/Load_Custom_Content';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../config';

class TimelinePartials extends Component {

  componentDidMount() {
    const tag = this.props.type;
    this.props.dispatch(loadCustomContent(tag))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryContent.data !== this.props.categoryContent.data) {
      const tag = this.props.type;
      this.props.dispatch(loadCustomContent(tag))
    }
  }

  render() {
    const { type, data, customContent, navigation } = this.props;
    if (customContent[type] !== undefined) {
      return(
        <ScrollView horizontal={true} contentContainerStyle={{paddingTop: 10, paddingBottom: 10}} showsHorizontalScrollIndicator={false}>
          {
            customContent[type].map((x, i) =>
              <TouchableOpacity onPress={() => navigation.navigate('ContentDetails', {data: x})} key={i} style={{height: 150, width: 150, borderRadius: 20, borderWidth: 1, borderColor: '#d2d2d2', marginLeft: 10}}>
                <Image
                  source={{uri: `${SERVER_URL}images/custom content/${x.photo}`}}
                  style={{height: 148, width: 148, borderRadius: 20}}
                  />
              </TouchableOpacity>
            )
          }
          <View style={{width: 10}} />
        </ScrollView>
      )
    }else{
      return(
        <View></View>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(TimelinePartials);
