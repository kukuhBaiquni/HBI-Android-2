import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { loadBadge } from '../actions/Load_Badge';

class BadgeNotification extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== prevProps.token) {
      if (this.props.token !== '') {
        const token = this.props.token;
        this.props.dispatch(loadBadge(token))
      }
    }
  }

  render() {
    return(
      <TouchableOpacity style={this.props.badge === 0 ? [styles.badge, {backgroundColor: 'transparent'}] : [styles.badge, {backgroundColor: 'orange'}]}>
        <Text style={styles.text}>{this.props.badge === 0 ? '' : this.props.badge}</Text>
      </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(BadgeNotification);

const styles = StyleSheet.create({
  badge: {
    height: 16,
    width: 16,
    borderRadius: 9,
    position: 'absolute',
    zIndex: 2,
    marginLeft: 13,
    marginTop: -3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    marginTop: -1,
    fontWeight: 'bold'
  }
})
