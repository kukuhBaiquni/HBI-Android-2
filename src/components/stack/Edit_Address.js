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
import { COLORS } from '../basic/colors';
import { TYPOGRAPHY } from '../basic/typography';
import { MODAL } from '../basic/template/loading';
import { CAPITALIZE } from '../basic/supportFunction';

class EditAddress extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Ubah Alamat',
            headerTintColor: COLORS.PURE_WHITE,
            headerStyle: {
                backgroundColor: COLORS.PRIMARY,
                borderBottomColor: COLORS.PURE_BLACK
            },
            headerTitleStyle: {
                ...TYPOGRAPHY.header
            },
        };
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
    }

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
    }

    districtSelected(x, f) {
        this.props.dispatch(resetVillages());
        this.props.dispatch(loadVillages(this.props.territorial.districts[f].kode_kecamatan))
        this.setState({districtHandler: x, villageHandler: ''})
    }

    villageSelected(x, f) {
        this.setState({villageHandler: x})
    }

    onValueChange(x) {
        let target = 0
        if (x === 'default') {
            target = 0
        }else{
            target = 1
        }
        this.setState({index: target, saveState: x})
    }

    onSave() {
        const data = {
            token: this.props.token,
            name: this.state.nameHandler,
            phone: this.state.phoneHandler,
            street: this.state.streetHandler,
            city: this.state.cityHandler,
            district: this.state.districtHandler,
            village: this.state.villageHandler,
            no: this.state.nomorHandler,
            rt: this.state.rtHandler,
            rw: this.state.rwHandler
        }
        const { cityHandler, districtHandler, villageHandler, nameHandler, phoneHandler, streetHandler, nomorHandler, rtHandler, rwHandler } = this.state;
        if (cityHandler !== '' && districtHandler !== '' && villageHandler !== '' && nameHandler !== '' && phoneHandler !== '' && streetHandler !== '' && nomorHandler !== '' && rtHandler !== '' && rwHandler !== '') {
            this.setState({loading: true})
            if (this.state.saveState === 'default') {
                this.props.dispatch(saveAddress(data))
            }else{
                this.props.navigation.navigate('Payment', data)
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
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.territorial.districts !== this.props.territorial.districts) {
            if (this.state.districtHandler === '') {
                const index = this.props.territorial.districts.map(x => x.nama_kecamatan).indexOf(this.props.navigation.state.params.address.district);
                let code = null;
                if (index !== -1) {
                    code = this.props.territorial.districts[index].kode_kecamatan
                    this.props.dispatch(loadVillages(code))
                }
                this.setState({districtHandler: this.props.navigation.state.params.address.district})
            }
        }
        if (prevProps.territorial.villages !== this.props.territorial.villages) {
            if (this.state.villageHandler === '') {
                const index = this.props.territorial.villages.map(x => x.nama_kota).indexOf(this.props.navigation.state.params.address.village);
                this.setState({villageHandler: this.props.navigation.state.params.address.village})
            }
        }
        if (this.props.navigation.state.params.address.city !== '') {
            const { cityHandler, districtHandler, villageHandler } = this.state
            if (cityHandler !== '' && districtHandler !== '' && villageHandler !== '') {
                if (this.state.loading) {
                    this.setState({loading: false})
                }
            }
        }else{
            if (this.state.loading) {
                this.setState({loading: false})
            }
        }
        if (prevProps.status.saveAddress.success !== this.props.status.saveAddress.success) {
            if (this.props.status.saveAddress.success) {
                this.props.dispatch(forceResetSA())
                ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
        }
        if (prevProps.status.saveAddress.error !== this.props.status.saveAddress.error) {
            if (this.props.status.saveAddress.error) {
                this.props.dispatch(forceResetSA())
                Alert.alert(
                    'Kesalahan',
                    'Server sibuk, silahkan ulangi permintaan anda.',
                    [
                        {text: 'OK', onPress: () => this.setState({loading: false})}
                    ],
                    { cancelable: false }
                );
            }
        }
    }

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
                <MODAL isVisible={this.state.loading} message='Mohon Tunggu' />
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.basicCard}>
                            <Form>
                                <Item stackedLabel style={{width: 330}}>
                                    <Label style={styles.titleInput}>Nama Penerima</Label>
                                    <Input
                                        onChangeText={(x) => this.setState({nameHandler: x})}
                                        value={this.state.nameHandler}
                                        editable={this.state.saveState === 'default' ? false : true}
                                        style={this.state.saveState === 'default' ? [styles.inputValue, {color: '#a0a0a0'}] : [styles.inputValue, {color: 'black'}]}
                                        />
                                </Item>
                                <Item stackedLabel style={{width: 330}}>
                                    <Label style={styles.titleInput}>Nomor Telepon Penerima</Label>
                                    <Input
                                        keyboardType='numeric'
                                        onChangeText={(x) => this.setState({phoneHandler: x})}
                                        value={this.state.phoneHandler}
                                        style={styles.inputValue}
                                        />
                                </Item>
                                <Label style={[styles.titleInput, {marginLeft: 15, marginTop: 10}]}>Kota/Kabupaten</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        enabled={false}
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue='KOTA BANDUNG'
                                        onValueChange={(x, f) => this.citySelected(x, f)}
                                        >
                                        <Picker.Item label='Kota Bandung' value='KOTA BANDUNG' />
                                    </Picker>
                                </Item>
                                <Label style={[styles.titleInput, {marginLeft: 15, marginTop: 10}]}>Kecamatan</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue={this.state.districtHandler}
                                        onValueChange={(x, f) => this.districtSelected(x, f)}
                                        >
                                        {
                                            this.props.territorial.districts.map((x, i) =>
                                                <Picker.Item key={i} label={CAPITALIZE(x.nama_kecamatan)} value={x.nama_kecamatan} />
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Label style={[styles.titleInput, {marginLeft: 15, marginTop: 10}]}>Kelurahan</Label>
                                <Item picker style={{width: 335, marginLeft: 10}}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                                        selectedValue={this.state.villageHandler}
                                        onValueChange={(x, f) => this.villageSelected(x, f)}
                                        >
                                        {
                                            this.props.territorial.villages.map((x, i) =>
                                            <Picker.Item key={i} label={CAPITALIZE(x.nama_kelurahan)} value={x.nama_kelurahan} />
                                        )
                                    }
                                </Picker>
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={styles.titleInput}>Jalan</Label>
                                <Input
                                    value={this.state.streetHandler}
                                    onChangeText={(x) => this.setState({streetHandler: x})}
                                    style={styles.inputValue}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={styles.titleInput}>Nomor</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.nomorHandler}
                                    onChangeText={(x) => this.setState({nomorHandler: x})}
                                    style={styles.inputValue}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={styles.titleInput}>RT</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.rtHandler}
                                    onChangeText={(x) => this.setState({rtHandler: x})}
                                    style={styles.inputValue}
                                    />
                            </Item>
                            <Item stackedLabel style={{width: 330}}>
                                <Label style={styles.titleInput}>RW</Label>
                                <Input
                                    keyboardType='numeric'
                                    value={this.state.rwHandler}
                                    onChangeText={(x) => this.setState({rwHandler: x})}
                                    style={styles.inputValue}
                                    />
                            </Item>
                        </Form>
                    </View>
                </View>
                <View style={{paddingTop: 20, paddingLeft: 20}}>
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
                                        buttonInnerColor={COLORS.PRIMARY}
                                        buttonOuterColor={this.state.index === i ? COLORS.PRIMARY : COLORS.GRAY_ICON}
                                        isSelected={this.state.index === i}
                                        buttonSize={12}
                                        buttonOuterSize={20}
                                        />
                                    <RadioButtonLabel
                                        obj={x}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(x) => this.onValueChange(x)}
                                        labelStyle={this.state.index === i ? {fontSize: 14, color: COLORS.PRIMARY, marginTop: -2} : {fontSize: 12, color: COLORS.GRAY_BUTTON, marginTop: -2}}
                                        />
                                </RadioButton>
                            )
                        }
                    </RadioForm>
                </View>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <TouchableOpacity onPress={() => this.onSave()} style={styles.saveButton}>
                        <Text style={{...TYPOGRAPHY.subHeader, color: COLORS.PURE_WHITE}}>Simpan</Text>
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
)(EditAddress);

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 18,
        color: '#7c0c10'
    },
    basicCard: {
        backgroundColor: 'white',
        width: '100%',
        elevation: 3
    },
    titleInput: {
        ...TYPOGRAPHY.subHeader
    },
    inputValue: {
        ...TYPOGRAPHY.p
    },
    saveButton: {
        borderRadius: 3,
        width: '95%',
        height: 50,
        backgroundColor: COLORS.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
