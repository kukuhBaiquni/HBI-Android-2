import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, TouchableNativeFeedback, StyleSheet, ScrollView, ToastAndroid, DatePickerAndroid, Keyboard, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Form, Item, Input, Label, Picker, Radio } from 'native-base';
import { loadBank } from '../../actions/Load_Bank';
import { NavigationEvents } from 'react-navigation';
import { loadCities, resetDistricts, resetVillages } from '../../actions/Load_Cities';
import { loadDistricts } from '../../actions/Load_Districts';
import { loadVillages } from '../../actions/Load_Villages';
import Modal from "react-native-modal";
import { DotIndicator } from 'react-native-indicators';
import { editProfile, forceResetEP, editBannerSuccess, editPhotoSuccess } from '../../actions/Edit_Profile';
import { SERVER_URL } from '../../config';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import futch from '../../actions/Fetch';
import FormStructure from '../structure/FormStructure';
import TeritorialStructure from '../structure/TeritorialStructure';

const options = {
    title: 'Pilihan',
    takePhotoButtonTitle: 'Buka kamera',
    chooseFromLibraryButtonTitle: 'Pilih dari galeri',
    cancelButtonTitle: 'Batal',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameHandler: '',
            phoneHandler: '',
            gender: 'male',
            cityHandler: 'KOTA BANDUNG',
            districtHandler: '',
            villageHandler: '',
            streetHandler: '',
            loading: true,
            nomorHandler: '',
            rtHandler: '',
            rwHandler: '',
            ttlHandler: '',
            ttl: 0,
            rOne: false,
            rTwo: false,
            showModal: false,
            mode: '',
            whichPhoto: true,
            coverHandler: '',
            fpHandler: '',
            territorialHandler: {
                cities: 'KOTA BANDUNG',
                districts: [],
                villages: []
            },
            uploading: false,
            progress: 0
        }
    }

    beforeRender() {
        let gender = this.props.userData.gender;
        let phone = this.props.userData.phone
        if (gender === undefined || gender === '') {
            this.setState({gender: 'male', rOne: true})
        }
        if (gender === 'male') {
            this.setState({gender: 'male', rOne: true})
        }
        if (gender === 'female') {
            this.setState({gender: 'female', rTwo: true})
        }
        if (phone !== undefined) {
            phone = '0' + this.props.userData.phone;
        }else{
            phone = ''
        }
        let ttlHandler = '';
        if (this.props.userData.ttl !== undefined) {
            ttlHandler = moment(this.props.userData.ttl).format('DD MMM YYYY')
        }
        this.setState({
            nameHandler: this.props.userData.name,
            phoneHandler: phone,
            gender: gender,
            streetHandler: this.props.userData.address.street,
            nomorHandler: this.props.userData.address.no,
            rtHandler: this.props.userData.address.rt,
            rwHandler: this.props.userData.address.rw,
            ttlHandler,
            ttl: this.props.userData.ttl
        });
        // this.props.dispatch(loadCities())
        this.props.dispatch(loadDistricts(3273))
    }

    citySelected(x, i) {
        this.props.dispatch(resetDistricts());
        this.props.dispatch(resetVillages());
        this.props.dispatch(loadDistricts(this.props.territorial.cities[i].kode_kota))
        this.setState({cityHandler: x, districtHandler: '', villageHandler: ''})
    }

    districtSelected(x, i) {
        this.props.dispatch(resetVillages());
        this.props.dispatch(loadVillages(this.props.territorial.districts[i].kode_kecamatan))
        this.setState({districtHandler: x, villageHandler: ''})
    }

    villageSelected(x) {
        this.setState({villageHandler: x})
    }

    componentDidUpdate(prevProps, prevState) {
        const { territorial, status, userData, dispatch } = this.props;
        const { territorialHandler } = this.state;
        // if (prevProps.territorial.cities !== territorial.cities) {
        //     if (this.state.cityHandler === '') {
        //         const index = territorial.cities.map(x => x.nama_kota).indexOf(userData.address.city);
        //         let code = null
        //         if (index !== -1) {
        //             code = territorial.cities[index].kode_kota;
        //         }
        //         let clone = [...this.state.territorialHandler];
        //         clone.cities = this.props.territorial.cities;
        //         this.setState({
        //             cityHandler: userData.address.city,
        //             territorialHandler: clone
        //         })
        //     }
        // }
        if (prevProps.territorial.districts !== territorial.districts) {
            if (this.state.districtHandler === '') {
                const index = territorial.districts.map(x => x.nama_kecamatan).indexOf(userData.address.district);
                let code = null;
                if (index !== -1) {
                    code = territorial.districts[index].kode_kecamatan
                    dispatch(loadVillages(code))
                }
                let clone = Object.assign({}, this.state.territorialHandler)
                clone.districts = this.props.territorial.districts;
                this.setState({
                    districtHandler: userData.address.district,
                    territorialHandler: clone
                })
            }
        }
        if (prevProps.territorial.villages !== territorial.villages) {
            if (this.state.villageHandler === '') {
                const index = territorial.villages.map(x => x.nama_kota).indexOf(userData.address.village);
                let clone = Object.assign({}, this.state.territorialHandler);
                clone.villages = this.props.territorial.villages;
                this.setState({
                    villageHandler: userData.address.village,
                    territorialHandler: clone
                })
            }
        }
        if (userData.address.city !== '') {
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
        if (prevProps.status.editProfile.success !== status.editProfile.success) {
            if (status.editProfile.success) {
                dispatch(forceResetEP())
                ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
        }
    }

    datePicker = async () => {
        Keyboard.dismiss()
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                mode: 'calendar'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const newDate = new Date(year, month, day).getTime();
                const formatedDate = moment(newDate).format('DD MMM YYYY')
                this.setState({ttlHandler: formatedDate, ttl: newDate})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    radioPicker(x) {
        if (x === '1') {
            this.setState({rOne: true, rTwo: false, gender: 'male'})
        }else{
            this.setState({rTwo: true, rOne: false, gender: 'female'})
        }
    }

    _onSave = () => {
        const data = {
            name: this.state.nameHandler,
            phone: this.state.phoneHandler,
            gender: this.state.gender,
            city: this.state.cityHandler,
            district: this.state.districtHandler,
            village: this.state.villageHandler,
            street: this.state.streetHandler,
            token: this.props.navigation.state.params.token,
            no: this.state.nomorHandler,
            rt: this.state.rtHandler,
            rw: this.state.rwHandler,
            ttl: this.state.ttl
        }
        this.setState({loading: true})
        this.props.dispatch(editProfile(data))
    }

    onSaveFile() {
        let form = new FormData()
        let a = Date.now() + Math.random() * 12 + 'hbi';
        if (this.state.coverHandler !== '') {
            let filename = 'cv' + a.replace('.','') + '.jpg';
            form.append('photo', {
                uri: this.state.coverHandler,
                type: 'image/jpeg',
                name: filename
            });
        }
        if (this.state.fpHandler !== '') {
            let filename = 'fp' + a.replace('.','') + '.jpg';
            form.append('photo', {
                uri: this.state.fpHandler,
                type: 'image/jpeg',
                name: filename
            })
        }
        futch(`${SERVER_URL}profile/android/upload-photo/${this.props.navigation.state.params.token}`, {
            method: 'post',
            body: form
        }, (e) => {
            const progress = e.loaded / e.total;
            this.setState({progress})
        })
        .then((res) => {
            const data = JSON.parse(res._response);
            if (data.data.banner) {
                this.props.dispatch(editBannerSuccess(data.data.banner))
            }else if(data.data.photo) {
                this.props.dispatch(editPhotoSuccess(data.data.photo))
            }
            this.setState({uploading: false, coverHandler: '', fpHandler: '', progress: 0})
            ToastAndroid.show('Perubahan berhasil disimpan', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
        .catch((err) => {
            this.setState({uploading: false, coverHandler: '', fpHandler: '', progress: 0})
            ToastAndroid.show('Perubahan gagal disimpan', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        })
    }

    changeMode(x) {
        this.setState({mode: x, whichPhoto: false})
    }

    cancelSave() {
        this.setState({coverHandler: '', fpHandler: '', showIconAddPhoto: true})
    }

    launchMode(x) {
        if (x === 'cm') {
            ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                    this.setState({showModal: false, whichPhoto: true})
                }
                if (response.uri) {
                    if (this.state.mode === 'fc') {
                        this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: '', uploading: true})
                        this.onSaveFile()
                    }else{
                        this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: '', uploading: true})
                        this.onSaveFile()
                    }
                }
            });
        }else{
            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    this.setState({showModal: false, whichPhoto: true})
                }
                if (response.uri) {
                    if (this.state.mode === 'fc') {
                        this.setState({coverHandler: response.uri, showModal: false, whichPhoto: true, mode: '', uploading: true})
                        this.onSaveFile()
                    }else{
                        this.setState({fpHandler: response.uri, showModal: false, whichPhoto: true, mode: '', uploading: true})
                        this.onSaveFile()
                    }
                }
            });
        }
    }

    _renderImageCover = () => {
        const { userData } = this.props;
        return(
            <TouchableOpacity onPress={() => this.setState({showModal: true})} style={styles.coverArea}>
                {
                    this.state.coverHandler === ''
                    ?
                    userData.banner === '' || userData.banner === undefined
                    ?
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={{height: 170}}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 2}}
                        >
                    </LinearGradient>
                    :
                    <View>
                        <Image
                            source={{uri: `${SERVER_URL}images/dummy/${userData.banner}`}}
                            style={styles.imageCover}
                            >
                        </Image>
                        <LinearGradient
                            colors={['transparent', 'black']}
                            style={{height: 170}}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 2}}
                            >
                        </LinearGradient>
                    </View>
                    :
                    <View>
                        <Image
                            source={{uri: this.state.coverHandler}}
                            style={styles.imageCover}
                            >
                        </Image>
                        <LinearGradient
                            colors={['transparent', 'black']}
                            style={{height: 170}}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 2}}
                            >
                        </LinearGradient>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    render(){
        const { navigation, territorial, userData } = this.props;
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
                    <View style={styles.modalContainer}>
                        <Text style={styles.loadingText}>Mohon Tunggu</Text>
                        <DotIndicator
                            color='#7c0c10'
                            size={8}
                            />
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.uploading}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    <View style={styles.modalContainer}>
                        <Text style={styles.loadingText}>Mengupload</Text>
                        <View style={styles.loadingBar}>
                            <View style={[styles.progressBar, {width: this.state.progress*120}]} />
                            <Text style={{textAlign: 'center'}}>{Math.round(this.state.progress*100)}%</Text>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.showModal}
                    style={{alignItems: 'center'}}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver
                    >
                    {
                        this.state.whichPhoto
                        ?
                        <View  style={styles.modalWhichPhotoTrue}>
                            <Text style={styles.questionBox}>Foto mana yang ingin diganti ?</Text>
                            <TouchableOpacity onPress={(x) => this.changeMode('fp')} style={styles.buttonAction}>
                                <Text style={styles.buttonTextOptions}>Foto Profil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(x) => this.changeMode('fc')} style={styles.buttonAction2}>
                                <Text style={styles.buttonTextOptions2}>Foto Sampul</Text>
                            </TouchableOpacity>
                            <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: ''})} style={styles.cancelText}>Batal</Text>
                        </View>
                        :
                        <View style={styles.modalWhichPhotoFalse}>
                            <Text style={styles.changePhotoTextTitle}>Ganti <Text style={{fontWeight: 'bold'}}>{this.state.mode === 'fp' ? 'Foto Profil' : 'Foto Sampul'}</Text></Text>
                            <TouchableOpacity onPress={(x) => this.launchMode('cm')} style={styles.openCameraButton}>
                                <Text style={styles.buttonTextOptions}>Buka kamera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(x) => this.launchMode('lb')} style={styles.openGalleryButton}>
                                <Text style={styles.buttonTextOptions2}>Pilih dari galeri</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <Text onPress={() => this.setState({whichPhoto: true, mode: ''})} style={styles.backButtonModal}>Kembali</Text>
                                <Text onPress={() => this.setState({showModal: false, whichPhoto: true, mode: ''})} style={styles.cancelButtonModal}>Batal</Text>
                            </View>
                        </View>
                    }
                </Modal>
                <ScrollView>
                    {this._renderImageCover()}
                    <View style={styles.userDataContainer}>
                        {
                            this.state.fpHandler === ''
                            ?
                            <Image
                                source={{uri: `${SERVER_URL}images/dummy/${userData.photo}`}}
                                style={styles.profilePicture}>
                            </Image>
                            :
                            <Image
                                source={{uri: this.state.fpHandler}}
                                style={styles.profilePicture}>
                            </Image>
                        }
                        <View style={{marginLeft: 12, marginTop: 26}}>
                            <Text style={{color: 'white', fontSize: 17}}>{userData.name}</Text>
                            <Text style={{color: '#e2e2e2', fontSize: 12}}>Bergabung sejak {userData.join}</Text>
                        </View>
                    </View>
                    <View style={styles.containerEP}>
                        <FormStructure
                            onChangeName={(text) => this.setState({nameHandler: text})}
                            inputNameHandler={this.state.nameHandler}
                            onDateFocus={this.datePicker}
                            birthHandler={this.state.ttlHandler}
                            isSelectedRadioTypeOne={this.state.rOne}
                            onPressRadioOne={(x) => this.radioPicker('1')}
                            isSelectedRadioTypeTwo={this.state.rTwo}
                            onPressRadioTwo={(x) => this.radioPicker('2')}
                            inputPhoneHandler={this.state.phoneHandler}
                            onChangePhone={(text) => this.setState({phoneHandler: text})}
                            />
                        <TeritorialStructure
                            cityHandler={this.state.cityHandler}
                            districtHandler={this.state.districtHandler}
                            onChangeDistrict={(x, i) => this.districtSelected(x, i)}
                            listDistricts={this.state.territorialHandler.districts}
                            villageHandler={this.state.villageHandler}
                            onChangeVillage={(x) => this.setState({villageHandler: x})}
                            listVillages={this.state.territorialHandler.villages}

                            streetHandler={this.state.streetHandler}
                            onChangeStreet={(text) => this.setState({streetHandler: text})}
                            nomorHandler={this.state.nomorHandler}
                            onChangeNomor={(text) => this.setState({nomorHandler: text})}
                            rtHandler={this.state.rtHandler}
                            onChangeRt={(text) => this.setState({rtHandler: text})}
                            rwHandler={this.state.rwHandler}
                            onChangeRw={(text) => this.setState({rwHandler: text})}
                            onSave={this._onSave}
                            />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerEP: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    header: {
        height: 60,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: 130,
        height: 90,
        borderRadius: 3,
        alignItems: 'center'
    },
    loadingText: {
        fontWeight: 'bold',
        top: 15,
        marginTop: 5
    },
    modalWhichPhotoTrue: {
        backgroundColor: 'white',
        padding: 10,
        width: 280,
        height: 220,
        borderRadius: 3,
        alignItems: 'center'
    },
    questionBox: {
        paddingBottom: 15,
        fontSize: 16
    },
    buttonAction: {
        marginBottom: 10,
        backgroundColor: '#7c0c10',
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonAction2: {
        backgroundColor: 'white',
        borderColor: '#7c0c10',
        borderWidth: 1,
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonTextOptions: {
        color: 'white',
        fontSize: 16
    },
    buttonTextOptions2: {
        color: '#7c0c10',
        fontSize: 16
    },
    cancelText: {
        fontSize: 16,
        paddingTop: 20
    },
    modalWhichPhotoFalse: {
        backgroundColor: 'white',
        padding: 10,
        width: 280,
        height: 230,
        borderRadius: 3,
        alignItems: 'center'
    },
    changePhotoTextTitle: {
        paddingBottom: 30,
        fontSize: 16
    },
    openCameraButton: {
        marginBottom: 10,
        backgroundColor: '#7c0c10',
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    openGalleryButton: {
        backgroundColor: 'white',
        borderColor: '#7c0c10',
        borderWidth: 1,
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    backButtonModal: {
        fontSize: 16,
        position: 'absolute',
        left: -100,
        top: 20
    },
    cancelButtonModal: {
        fontSize: 16,
        position: 'absolute',
        right: -90,
        top: 20
    },
    coverArea: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    imageCover: {
        height: 170,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    userDataContainer: {
        flexDirection: 'row',
        marginTop: 100,
        marginLeft: 20
    },
    profilePicture: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 25
    },
    loadingBar: {
        width: 120,
        height: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#a8a8a8',
        marginTop: 25,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#7c0c10',
        borderRadius: 5,
        width: 0
    }
})


function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(EditProfile);
