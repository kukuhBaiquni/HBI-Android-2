import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ToastAndroid, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { loadCities, resetDistricts, resetVillages } from '../../actions/Load_Cities';
import { loadDistricts } from '../../actions/Load_Districts';
import { loadVillages } from '../../actions/Load_Villages';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { saveAddress } from '../../actions/Save_Address';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { forceResetSA } from '../../actions/Save_Address';
import { BACKDARKRED } from '../../images';

class EditAddressDP extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Ubah Alamat',
            headerTintColor: '#7c0c10',
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: 'black'
            },
            headerBackImage: ( <Image resizeMode='contain' style={{height: 19, width: 19}} source={CHECKLIST_DARKRED} /> )
        }
    };

    constructor(props){
        super(props)
        this.state = {
            cityHandler: 'KOTA BANDUNG',
            districtHandler: '',
            villageHandler: '',
            nameHandler: '',
            phoneHandler: '',
            streetHandler: '',
            saveState: 'default',
            index: 0,
            loading: true,
            token: '',
            nomorHandler: '',
            rtHandler: '',
            rwHandler: ''
        }
    };

    beforeRender() {
        let phone = this.props.navigation.state.params.phone;
        if (phone === undefined) {
            phone = ''
        }else{
            phone = '0' + this.props.navigation.state.params.phone
        }
        this.setState({
            nameHandler: this.props.navigation.state.params.name,
            token: this.props.token,
            phoneHandler: phone.toString(),
            streetHandler: this.props.navigation.state.params.address.street,
            nomorHandler: this.props.navigation.state.params.address.no,
            rtHandler: this.props.navigation.state.params.address.rt,
            rwHandler: this.props.navigation.state.params.address.rw
        })
        this.props.dispatch(loadDistricts(3273))
    };

    districtSelected(x, f) {
        this.props.dispatch(resetVillages());
        this.props.dispatch(loadVillages(this.props.territorial.districts[f].kode_kecamatan));
        this.setState({districtHandler: x, villageHandler: ''});
    };

    villageSelected(x, f) {
        this.setState({villageHandler: x});
    };

    onValueChange(x) {
        let target = 0
        if (x === 'default') {
            target = 0
        }else{
            target = 1
        }
        this.setState({index: target, saveState: x});
    };

    onSave() {
        const data = {
            token: this.props.token,
            name: this.state.nameHandler,
            phone: this.state.phoneHandler,
            city: this.state.cityHandler,
            district: this.state.districtHandler,
            village: this.state.villageHandler,
            street: this.state.streetHandler,
            no: this.state.nomorHandler,
            rt: this.state.rtHandler,
            rw: this.state.rwHandler
        };
        const { cityHandler, districtHandler, villageHandler, nameHandler, phoneHandler, streetHandler, nomorHandler, rtHandler, rwHandler } = this.state;
        if (cityHandler !== '' && districtHandler !== '' && villageHandler !== '' && nameHandler !== '' && phoneHandler !== '' && streetHandler !== '' && nomorHandler !== '' && rtHandler !== '' && rwHandler !== '') {
            this.setState({loading: true})
            if (this.state.saveState === 'default') {
                this.props.dispatch(saveAddress(data));
            }else{
                this.props.navigation.navigate('DirectPayment', data);
            }
        }else{
            Alert.alert(
                'Kesalahan',
                'Form yang anda isi tidak valid atau belum lengkap, silahkan perbaiki form',
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.territorial.districts !== this.props.territorial.districts) {
            if (this.state.districtHandler === '') {
                const index = this.props.territorial.districts.map(x => x.nama_kecamatan).indexOf(this.props.navigation.state.params.address.district);
                let code = null;
                if (index !== -1) {
                    code = this.props.territorial.districts[index].kode_kecamatan;
                    this.props.dispatch(loadVillages(code));
                }
                this.setState({districtHandler: this.props.navigation.state.params.address.district});
            }
        }
        if (prevProps.territorial.villages !== this.props.territorial.villages) {
            if (this.state.villageHandler === '') {
                const index = this.props.territorial.villages.map(x => x.nama_kota).indexOf(this.props.navigation.state.params.address.village);
                this.setState({villageHandler: this.props.navigation.state.params.address.village});
            }
        }
        if (this.props.navigation.state.params.address.city !== '') {
            const { cityHandler, districtHandler, villageHandler } = this.state;
            if (cityHandler !== '' && districtHandler !== '' && villageHandler !== '') {
                if (this.state.loading) {
                    this.setState({loading: false});
                }
            }
        }else{
            if (this.state.loading) {
                this.setState({loading: false});
            }
        }
        if (prevProps.status.saveAddress.success !== this.props.status.saveAddress.success) {
            if (this.props.status.saveAddress.success) {
                this.props.dispatch(forceResetSA());
                ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        }
        if (prevProps.status.saveAddress.error !== this.props.status.saveAddress.error) {
            if (this.props.status.saveAddress.error) {
                Alert.alert(
                    'Kesalahan',
                    'Server sibuk, silahkan ulangi permintaan anda.',
                    [
                        {text: 'OK', onPress: () => this.setState({loading: false})}
                    ],
                    { cancelable: false }
                );
                this.props.dispatch(forceResetSA());
            }
        }
    };

    render() {
        const options =[
            {label: 'Simpan sebagai default', value: 'default'},
            {label: 'Hanya gunakan untuk transaksi ini', value: 'temp'}
        ];
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
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'white', width: '100%'}}>
                            <Form>
                                <Item stackedLabel style={{width: 330}}>
                                    <Label style={{color: '#a0a0a0'}}>Nama Penerima</Label>
                                    <Input
                                        onChangeText={(x) => this.setState({nameHandler: x})}
                                        value={this.state.nameHandler}
                                        editable={this.state.saveState === 'default' ? false : true}
                                        style={this.state.saveState === 'default' ? {color: '#a0a0a0'} : {color: 'black'}}
                                        />
                                </Item>
                                <Item stackedLabel style={{width: 330}}>
                                    <Label style={{color: '#a0a0a0'}}>Nomor Telepon Penerima</Label>
                                    <Input
                                        keyboardType='numeric'
                                        onChangeText={(x) => this.setState({phoneHandler: x})}
                                        value={this.state.phoneHandler}
                                        />
                                </Item>
                                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kota/Kabupaten</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        enabled={false}
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue='KOTA BANDUNG'
                                        onValueChange={(x, f) => this.citySelected(x, f)}
                                        >
                                        <Picker.Item label='KOTA BANDUNG' value='KOTA BANDUNG' />
                                    </Picker>
                                </Item>
                                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kecamatan</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue={this.state.districtHandler}
                                        onValueChange={(x, f) => this.districtSelected(x, f)}
                                        >
                                        {
                                            this.props.territorial.districts.map((x, i) =>
                                                <Picker.Item key={i} label={x.nama_kecamatan} value={x.nama_kecamatan} />
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Label style={{fontSize: 15, marginLeft: 15, marginTop: 10, color: '#a0a0a0'}}>Kelurahan</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue={this.state.villageHandler}
                                        onValueChange={(x, f) => this.villageSelected(x, f)}
                                        >
                                        {
                                            this.props.territorial.villages.map((x, i) =>
                                            <Picker.Item key={i} label={x.nama_kelurahan} value={x.nama_kelurahan} />
                                        )
                                    }
                                </Picker>
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={{color: '#a0a0a0'}}>Jalan</Label>
                                <Input
                                    value={this.state.streetHandler}
                                    onChangeText={(x) => this.setState({streetHandler: x})}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={{color: '#a0a0a0'}}>Nomor</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.nomorHandler}
                                    onChangeText={(x) => this.setState({nomorHandler: x})}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={{color: '#a0a0a0'}}>RT</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.rtHandler}
                                    onChangeText={(x) => this.setState({rtHandler: x})}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={{color: '#a0a0a0'}}>RW</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.rwHandler}
                                    onChangeText={(x) => this.setState({rwHandler: x})}
                                    />
                            </Item>
                        </Form>
                    </View>
                </View>
                <View style={{paddingTop: 20, paddingLeft: 20, backgroundColor: 'white'}}>
                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                        >
                        {
                            options.map((x, i) =>
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={x}
                                        index={i}
                                        onPress={(x) => this.onValueChange(x)}
                                        borderWidth={1}
                                        buttonInnerColor={'#7c0c10'}
                                        buttonOuterColor={this.state.index === i ? '#7c0c10' : '#919191'}
                                        isSelected={this.state.index === i}
                                        buttonSize={12}
                                        buttonOuterSize={20}
                                        />
                                    <RadioButtonLabel
                                        obj={x}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(x) => this.onValueChange(x)}
                                        labelStyle={this.state.index === i ? {fontSize: 14, color: '#7c0c10', marginTop: -2} : {fontSize: 12, color: '#919191', marginTop: -2}}
                                        />
                                </RadioButton>
                            )
                        }
                    </RadioForm>
                </View>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <TouchableOpacity onPress={() => this.onSave()} style={{borderRadius: 3, width: '95%', height: 50, backgroundColor: '#7c0c10', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(EditAddressDP);

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
});
