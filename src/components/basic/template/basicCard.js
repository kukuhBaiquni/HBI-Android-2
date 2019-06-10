import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../colors';

export const BASIC_CARD = (props) => {
    return(
        <View
            style={
                backgroundColor: COLORS.PURE_WHITE,
                height: props.height,
                width: props.width,
                elevation: 1,
                borderRadius: 3
            }
            >
            { props.content }
        </View>
    )
};

BASIC_CARD.propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    content: PropTypes.element,
};

BASIC_CARD.defaultProps = {
    height: null,
    width: null,
    content: () => <View />,
};
