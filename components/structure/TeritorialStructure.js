import React, { Component } from 'react';
import { Form, Item, Input, Label, Picker, Icon } from 'native-base';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TeritorialStructure extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.whiteBoxWrapper}>
                    <Text style={styles.titleText}>Informasi Alamat</Text>
                    <Form>
                        <Label style={styles.titleField}>Provinsi</Label>
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                selectedValue={this.props.provinceHandler}
                                enabled={false}
                                >
                                <Picker.Item label={this.props.provinceHandler} value={this.props.provinceHandler} />
                            </Picker>
                        </Item>
                        <Label style={styles.titleField}>Kota / Kabupaten</Label>
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                selectedValue={this.props.cityHandler}
                                onValueChange={this.props.onChangeCity}
                                >
                                {
                                    this.props.listCities.map((x, i) =>
                                        <Picker.Item key={i} label={capital(x.nama_kota)} value={x.nama_kota} />
                                    )
                                }
                            </Picker>
                        </Item>
                        <Label style={styles.titleField}>Kecamatan</Label>
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                selectedValue={this.props.districtHandler}
                                onValueChange={this.props.onChangeDistrict}
                                >
                                {
                                    this.props.listDistricts.map((x, i) =>
                                        <Picker.Item key={i} label={capital(x.nama_kecamatan)} value={x.nama_kecamatan} />
                                    )
                                }
                            </Picker>
                        </Item>
                        <Label style={styles.titleField}>Kelurahan</Label>
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                selectedValue={this.props.villageHandler}
                                onValueChange={this.props.onChangeVillage}
                                >
                                {
                                    this.props.listVillages.map((x, i) =>
                                        <Picker.Item key={i} label={capital(x.nama_kelurahan)} value={x.nama_kelurahan} />
                                    )
                                }
                            </Picker>
                        </Item>
                        <Item stackedLabel style={{width: '90%'}}>
                            <Label style={{color: '#a0a0a0'}}>Jalan</Label>
                            <Input
                                value={this.props.streetHandler}
                                onChangeText={this.props.onChangeStreet}
                                />
                        </Item>
                        <Item stackedLabel style={{width: '90%'}}>
                            <Label style={{color: '#a0a0a0'}}>Nomor</Label>
                            <Input
                                keyboardType='numeric'
                                value={this.props.nomorHandler}
                                onChangeText={this.props.onChangeNomor}
                                />
                        </Item>
                        <Item stackedLabel style={{width: '90%'}}>
                            <Label style={{color: '#a0a0a0'}}>RT</Label>
                            <Input
                                keyboardType='numeric'
                                value={this.props.rtHandler}
                                onChangeText={this.props.onChangeRt}
                                />
                        </Item>
                        <Item stackedLabel style={{width: '90%'}}>
                            <Label style={{color: '#a0a0a0'}}>RW</Label>
                            <Input
                                keyboardType='numeric'
                                value={this.props.rwHandler}
                                onChangeText={this.props.onChangeRw}
                                />
                        </Item>
                    </Form>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={this.props.onSave} style={styles.submitButton}>
                            <Text style={styles.buttonText}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

function capital(x) {
    var cs = x.split(' ')
    var as = cs.map(r => r.toLowerCase())
    var result = []
    for (var i = 0; i < as.length; i++) {
        result.push(as[i].charAt(0).toUpperCase() + as[i].slice(1))
    }
    return result.join(' ')
}

TeritorialStructure.propTypes = {
    listCities: PropTypes.array,
    districtHandler: PropTypes.string,
    onChangeDistrict: PropTypes.func,
    listDistricts: PropTypes.array,
    villageHandler: PropTypes.string,
    onChangeVillage: PropTypes.func,
    listVillages: PropTypes.array,

    streetHandler: PropTypes.string,
    onChangeStreet: PropTypes.func,
    nomorHandler: PropTypes.string,
    onChangeNomor: PropTypes.func,
    rtHandler: PropTypes.string,
    onChangeRt: PropTypes.func,
    rwHandler: PropTypes.string,
    onChangeRw: PropTypes.func,
    onSave: PropTypes.func
}

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
    titleField: {
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10,
        color: '#a0a0a0'
    },
    picker: {
        width: '90%',
        marginLeft: 10,
        borderBottomColor: '#a8a8a8'
    },
    submitButton: {
        borderRadius: 3,
        width: '95%',
        height: 50,
        backgroundColor: '#7c0c10',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonWrapper: {
        alignItems: 'center',
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
