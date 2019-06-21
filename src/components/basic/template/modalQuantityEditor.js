import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import { IDR_FORMAT, STATIC_RES_URL } from '../supportFunction';
import { COLORS } from '../colors';
import { TYPOGRAPHY } from '../typography';

export const MODAL_QUANTITY_EDITOR = (props) => {
    _closeModal = () => {
        props.closeModal();
    };

    _showModalContent = () => {
        props.showModalContent();
    };

    _hideModalContent = () => {
        props.hideModalContent();
    };

    _onDecrement = () => {
        if (props.itemCount > 1) {
            props.onChangeValueDecrement();
        }
    };

    _onIncrement = () => {
        props.onChangeValueIncrement();
    };

    _addToCart = () => {
        props.addToCart(props.data);
    };

    _saveQuantity = () => {
        props.onSave();
    };

    _prices = () => {
        if (props.userStatus === 'Non Member') {
            return props.data.enduserprice;
        }else{
            return props.data.resellerprice;
        }
    };
    return(
        <Modal
            isVisible={props.isVisible}
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
                    <Text style={styles.modalHeaderTitle}>Ubah Kuantitas</Text>
                    <TouchableOpacity style={styles.closeButtonHeader}>
                        <Icon name='clear' color={COLORS.GRAY_ICON} size={22} onPress={this._closeModal}/>
                    </TouchableOpacity>
                </View>
                {
                    props.isContentVisible &&
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.imageModalContainer}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.imageStyle}
                                    source={{uri: `${STATIC_RES_URL}products/${props.data.photo}`}}
                                    />
                            </View>
                            <View style={{height: 120, width: 140, marginTop: 10, paddingLeft: 10}}>
                                <Text style={styles.productnameText}>{props.data.productname}</Text>
                                {
                                    props.loadingPrice
                                    ?
                                    <View style={styles.loadingContainer}>
                                        <BarIndicator count={5} size={15} color={COLORS.GRAY_BORDER} />
                                    </View>
                                    :
                                    <Text style={styles.priceTextModal}>{
                                            IDR_FORMAT(
                                                props.itemCount === 1
                                                ? (this._prices())
                                                : (props.routeName === 'ProductDetails' ? props.resultCounting : (this._prices()*props.itemCount))
                                            )
                                        }</Text>
                                }
                                {/*Increment Button*/}
                                <View style={styles.interactionButtonContainer}>
                                    <TouchableOpacity onPress={this._onDecrement}>
                                        <View style={styles.pmButton}>
                                            <Text style={styles.pmButtonText}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.counterText}>
                                        <Text>{props.itemCount}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this._onIncrement}>
                                        <View style={styles.pmButton}>
                                            <Text style={styles.pmButtonText}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonAddToCartModal}>
                            <TouchableOpacity onPress={props.routeName === 'ProductDetails' ? this._addToCart : this._saveQuantity}>
                                <View style={styles.buttonAddTocartExe}>
                                    <Text style={styles.buttonText}>{props.buttonText}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: COLORS.PURE_WHITE,
        width: 300,
        height: 235,
        borderRadius: 4
    },
    modalHeader: {
        borderBottomColor: COLORS.GRAY_BORDER,
        borderBottomWidth: 1,
        width: '100%',
        justifyContent: 'space-between'
    },
    modalHeaderTitle: {
        textAlign: 'left',
        padding: 10,
        ...TYPOGRAPHY.subHeader
    },
    closeButtonHeader: {
        position: 'absolute',
        right: 10,
        top: 10
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
        borderColor: COLORS.GRAY_FADE,
        borderWidth: 1,
        borderRadius: 5
    },
    productnameText: {
        ...TYPOGRAPHY.normalPriceText,
        width: 140,
        textAlign: 'left',
    },
    loadingContainer: {
        height: 24,
        width: 80,
        paddingTop: 7,
        alignItems: 'center'
    },
    priceTextModal: {
        ...TYPOGRAPHY.priceTextModal,
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
        backgroundColor: COLORS.PRIMARY,
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
        borderColor: COLORS.GRAY_ICON,
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
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    buttonText: {
        ...TYPOGRAPHY.h1,
        color: COLORS.PURE_WHITE
    }
});
