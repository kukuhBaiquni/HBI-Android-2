import { DotIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';

export const MODAL = (props) => {
    return(
        <Modal
            isVisible={props.isVisible}
            style={{alignItems: 'center'}}
            hideModalContentWhileAnimating={true}
            useNativeDriver
            animationIn='fadeIn'
            animationOut='fadeOut'
            >
            <View style={styles.modalContainer}>
                <Text style={styles.modalWaitText}>{props.message}</Text>
                <DotIndicator
                    color='#7c0c10'
                    size={8}
                    />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: { backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'},
    modalWaitText: {fontWeight: 'bold', top: 15, marginTop: 5}
});
