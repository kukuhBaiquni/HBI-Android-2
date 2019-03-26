import React, { Component } from 'react';
import { Form, Item, Input, Label, Radio } from 'native-base';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DatePickerAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

export default class FormStructure extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.whiteBoxWrapper}>
                    <Text style={styles.titleText}>Informasi Pribadi</Text>
                    <Form>
                        <Item stackedLabel style={styles.inputWrapper}>
                            <Label>Nama</Label>
                            <Input
                                onChangeText={this.props.onChangeName}
                                value={this.props.inputNameHandler}
                                autoFocus
                                />
                        </Item>
                        <Item stackedLabel style={styles.inputWrapper}>
                            <Label>Tanggal Lahir</Label>
                            <Input
                                onFocus={this.props.onDateFocus}
                                value={this.props.birthHandler}
                                />
                        </Item>
                        <Label style={styles.genderTitle}>Jenis Kelamin</Label>
                        <View style={styles.rowRadio}>
                            <Radio
                                color={"#a0a0a0"}
                                selectedColor={"#7c0c10"}
                                selected={this.props.isSelectedRadioTypeOne}
                                onPress={this.props.onPressRadioOne}
                                />
                            <Text style={styles.radioTitle}>Pria</Text>
                        </View>
                        <View style={[styles.rowRadio, {marginBottom: 10}]}>
                            <Radio
                                color={"#a0a0a0"}
                                selectedColor={"#7c0c10"}
                                selected={this.props.isSelectedRadioTypeTwo}
                                onPress={this.props.onPressRadioTwo}
                                />
                            <Text style={styles.radioTitle}>Wanita</Text>
                        </View>
                        <Item stackedLabel style={styles.inputWrapper}>
                            <Label>Telepon</Label>
                            <Input
                                keyboardType='numeric'
                                onChangeText={this.props.onChangePhone}
                                value={this.props.inputPhoneHandler}
                                />
                        </Item>
                    </Form>
                </View>
            </View>
        )
    }
}

FormStructure.propTypes = {
    onChangeName: PropTypes.func,
    inputNameHandler: PropTypes.string,
    onDateFocus: PropTypes.func,
    birthHandler: PropTypes.string,
    isSelectedRadioTypeOne: PropTypes.bool,
    onPressRadioOne: PropTypes.func,
    isSelectedRadioTypeTwo: PropTypes.bool,
    onPressRadioTwo: PropTypes.func,
    onChangePhone: PropTypes.func,
    inputPhoneHandler: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        width: null,
        height: null,
        flex: 1,
        alignItems: 'center'
    },
    whiteBoxWrapper: {
        backgroundColor: 'white',
        width: '95%',
        elevation: 3,
        marginTop: 10,
        borderRadius: 3,
        paddingBottom: 30
    },
    titleText: {
        paddingTop: 10,
        paddingLeft: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputWrapper: {
        width: '90%',
        borderBottomColor: '#a8a8a8'
    },
    genderTitle: {
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10,
    },
    rowRadio: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingTop: 10
    },
    radioTitle: {
        fontSize: 16,
        marginLeft: 10
    }
})
