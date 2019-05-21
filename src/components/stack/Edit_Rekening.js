import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { loadBank } from '../../actions/Load_Bank';
import { NavigationEvents } from 'react-navigation';
import { editRekening, forceResetER } from '../../actions/Edit_Rekening';
import { forceResetLB } from '../../actions/Load_Bank';

class EditRekening extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noRek: '',
            naRek: '',
            loading: false
        }
    }

    beforeRender() {
        this.setState({noRek: this.props.userData.no_rekening})
        this.props.dispatch(loadBank())
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bank !== this.props.bank) {
            const index = this.props.bank.map(x => x.name).indexOf(this.props.userData.nama_rekening);
            if (index !== -1) {
                this.setState({naRek: this.props.bank[index].name})
            }
        }
        if (prevProps.status.editRekening.success !== this.props.status.editRekening.success) {
            if (this.props.status.editRekening.success) {
                this.setState({loading: false})
                this.props.dispatch(forceResetER());
                ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        }else{
            if (this.props.status.editRekening.success) {
                if (this.state.loading) {
                    this.props.dispatch(forceResetER())
                    this.setState({loading: false})
                    ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                }
            }
        }
    }

    onSave() {
        const data = {
            token: this.props.navigation.state.params.token,
            noRek: this.state.noRek,
            naRek: this.state.naRek
        }
        this.setState({loading: true})
        this.props.dispatch(editRekening(data))
    }

    render() {
        const { navigation } = this.props;
        return(
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => this.beforeRender()}
                    />
                <Modal
                    isVisible={this.state.loading}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    <View style={{ backgroundColor: 'white', width: 130, height: 90, borderRadius: 3, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', top: 15, marginTop: 5}}>Mohon Tunggu</Text>
                        <DotIndicator
                            color='#7c0c10'
                            size={8}
                            />
                    </View>
                </Modal>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white', width: '95%', elevation: 3, marginTop: 10}}>
                        <Form>
                            <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Nama Bank</Label>
                            <Item picker style={{width: 315, marginLeft: 10, borderBottomColor: '#a8a8a8'}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    selectedValue={this.state.naRek}
                                    onValueChange={(x) => this.setState({naRek: x})}
                                    >
                                    {
                                        this.props.bank.map((x, i) =>
                                        <Picker key={i} label={x.name} value={x.name} />
                                    )
                                }
                            </Picker>
                        </Item>
                        <Item stackedLabel style={{width: 315, borderBottomColor: '#a8a8a8'}}>
                            <Label style={{color: '#a8a8a8'}}>Nomor Rekening</Label>
                            <Input
                                keyboardType='numeric'
                                onChangeText={(x) => this.setState({noRek: x})}
                                value={this.state.noRek}
                                />
                        </Item>
                    </Form>
                    <View style={{alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                        <TouchableOpacity onPress={() => this.onSave()} style={{borderRadius: 3, width: '95%', height: 50, backgroundColor: '#7c0c10', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    }
})


function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(EditRekening);
