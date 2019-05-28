import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import { IDR_FORMAT, SERVER_URL } from './supportFunction';

export default class ModalQuantityEditor extends Component {

    _closeModal = () => {
        this.props.closeModal();
    };

    _showModalContent = () => {
        this.props.showModalContent();
    };

    _hideModalContent = () => {
        this.props.hideModalContent();
    };

    _onChangeValue(x) {
        if (x) {
            this.props.onChangeValue('inc');
        }else{
            this.props.onChangeValue('dec')
        }
    };

    _addToCart = () => {
        this.props.addToCart(this.props.data);
    };

    render() {
        return(
            <Modal
                isVisible={this.props.isVisible}
                style={{alignItems: 'center'}}
                onBackdropPress={this._closeModal}
                onBackButtonPress={this._closeModal}
                onModalShow={this._showModalContent}
                onModalHide={this._hideModalContent}
                hideModalContentWhileAnimating={true}
                useNativeDriver
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>Pilihan Anda</Text>
                        <TouchableOpacity style={styles.closeButtonHeader}>
                            <Icon name='clear' color='#919191' size={22} onPress={this._closeModal}/>
                        </TouchableOpacity>
                    </View>
                    {
                        this.props.isContentVisible &&
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.imageModalContainer}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.imageStyle}
                                        source={{uri: `${SERVER_URL}images/products/${this.props.data.photo}`}}
                                        />
                                </View>
                                <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                                    <Text style={styles.productnameText}>{this.props.data.productname}</Text>
                                    {
                                        this.props.loadingPrice
                                        ?
                                        <View style={styles.loadingContainer}>
                                            <BarIndicator count={5} size={15} color='#919191' />
                                        </View>
                                        :
                                        <Text style={styles.priceTextModal}>{IDR_FORMAT(this.props.itemCount === 1 ? (this.props.userStatus === 'Non Member' ? this.props.data.enduserprice : this.props.data.resellerprice) : this.props.resultCounting)}</Text>
                                    }
                                    {/*Increment Button*/}
                                    <View style={styles.interactionButtonContainer}>
                                        <TouchableOpacity onPress={() => this._onChangeValue('dec')}>
                                            <View style={styles.pmButton}>
                                                <Text style={styles.pmButtonText}>-</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.counterText}>
                                            <Text>{this.props.itemCount}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this._onChangeValue('inc')}>
                                            <View style={styles.pmButton}>
                                                <Text style={styles.pmButtonText}>+</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonAddToCartModal}>
                                <TouchableOpacity onPress={this._addToCart}>
                                    <View style={styles.buttonAddTocartExe}>
                                        <Text style={{color: 'white'}}>Tambah ke Keranjang</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        )
    }
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        width: 300,
        height: 250,
        borderRadius: 4
    },
    modalHeader: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        width: '100%'
    },
    modalHeaderTitle: {
        textAlign: 'left',
        padding: 15,
        color: '#919191',
        fontSize: 16
    },
    closeButtonHeader: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    imageModalContainer: {
        elevation: 1,
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 20
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderColor: '#e2e2e2',
        borderWidth: 1
    },
    productnameText: {
        fontSize: 16,
        width: 140,
        textAlign: 'left',
        color: '#919191'
    },
    loadingContainer: {
        height: 24,
        width: 80,
        paddingTop: 7,
        alignItems: 'center'
    },
    priceTextModal: {
        fontWeight: 'bold',
        marginTop: 5
    },
    interactionButtonContainer: {
        flexDirection: 'row',
        width: 110,
        height: 40,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    pmButton: {
        height: 30,
        width: 30,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    pmButtonText: {
        color: 'white',
        fontSize: 22
    },
    counterText: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 3
    },
    buttonAddToCartModal: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom:20
    },
    buttonAddTocartExe: {
        height: 45,
        width: 260,
        backgroundColor: '#7c0c10',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
});
