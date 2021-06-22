import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modalbox';
import {Colors} from '../../../common-styles/colors';
import {Fonts} from '../../../common-styles/fonts';

export enum ModalButtonModeEnum {
    unique = 'unique',
    multiple = 'multiple',
}

const defaultValue = {
    buttonMode: ModalButtonModeEnum.unique,
    multipleButtons: [],
    uniqueButton: {
        label: 'Annuler', onPress: () => {}, closeModal: true,
    },
    isOpened: false,
    onClosed: () => {},
    onCancel: () => {},
    links: [],
    closeModalFunction: () => {},
    coverScreen: true,
};

export const ModalLayout = (props: {
        buttonMode: ModalButtonModeEnum,
        isOpened: boolean,
        links?: { label: string, icon: any, closeModal?: boolean, onPress: () => any, labelStyle?: any}[],
        closeModalFunction: () => any,
        multipleButtons?: { label: string, labelStyle?: any, labelTextStyle?: any, onPress: () => any, closeModal?: boolean } [],
        uniqueButton?: { label: string, labelStyle?: any, labelTextStyle?: any, onPress: () => any, closeModal?: boolean },
        onClosed?: () => any,
        onCancel?: () => any,
        titleText?: string,
        titleIcon?: any,
        titleStyle?: any,
        text?: string,
        textStyle?: any,
        coverScreen?: boolean,
    } = defaultValue): React.ReactElement => {

    return (
        <Modal style={[styles.modal, styles.modal4]} position={'bottom'} backdropOpacity={0.5} backdropPressToClose={true} swipeToClose={true} isOpen={props.isOpened} onClosed={props.onClosed} coverScreen={props.coverScreen === undefined ? defaultValue.coverScreen : props.coverScreen}>
            <View style={styles.modalContainer}>
                <View style={styles.barIndicator}/>
                {
                    props.titleText ?
                    <View style={styles.modalLinkContainer}>
                        {
                            props.titleIcon ? props.titleIcon : null
                        }
                        <Text style={[styles.modalLinkText, props.titleStyle]}>{props.titleText}</Text>
                    </View>
                    :
                    null
                }

                {
                    props.text ?
                        <View style={styles.textContainer}>
                            <Text style={[styles.modalText, props.textStyle]}>{props.text}</Text>
                        </View>
                        :
                        null
                }

                {
                    props.links && props.links.length > 0 ?
                    <View>
                        {
                            props.links.map((link, i) => (
                                <View style={styles.modalLinkContainer} onTouchEnd={() => { if (link.onPress) { link.onPress(); } if (link.closeModal && props.onClosed) { props.onClosed(); }}}
                                      key={i}>
                                    {
                                        link.icon
                                    }
                                    <Text style={[styles.modalLinkText, link.labelStyle]}>{link.label}</Text>
                                </View>
                            ))
                        }
                    </View>
                    :
                    null
                }

                {
                    props.buttonMode === ModalButtonModeEnum.unique ?
                    <View style={styles.modalFooterContainer} onTouchEnd={() => { if (props.onClosed) {props.onClosed(); } if (props.onCancel) {props.onCancel(); } if (props.closeModalFunction) { props.closeModalFunction(); }}}>
                        <View style={styles.modalCancelButtonContainer}>
                            <Text style={styles.modalCancelButtonText}>
                                {
                                    props.uniqueButton.label
                                }
                            </Text>
                        </View>
                    </View>
                    :
                    null
                }

                {
                    props.buttonMode === ModalButtonModeEnum.multiple ?
                    <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10 }}>
                        {
                            props.multipleButtons.map((button) => (
                                <View style={{
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    height: 40,
                                    flexDirection: 'row',
                                    flex: 1,
                                    paddingHorizontal: 10 }}>
                                    <View style={[styles.modalButtonContainer, button.labelStyle]} onTouchEnd={button.onPress}>
                                        <Text style={[styles.modalCancelButtonText, button.labelTextStyle]}>
                                            {
                                                button.label
                                            }
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    :
                    null
                }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalLinkText: {
        color: Colors.yellow,
        fontFamily: Fonts.montserratMedium,
        fontSize: 15,
        lineHeight: 18,
        marginBottom: 20,
        paddingTop: 5,
    },
    textContainer: {
        width: (Dimensions.get('screen').width - 60),
    },
    modalText: {
        fontSize: 15,
        color: Colors.black,
        fontFamily: Fonts.montserratRegular,
    },
    icon: {
        color: '#A5ABBD',
        bottom: 1,
        marginRight: 24,
        paddingTop: 5,
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    barIndicator: {
        height: 4,
        width: 30,
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: Colors.legacyGrey30,
    },
    modalLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: (Dimensions.get('screen').width - 60),
    },
    modalFooterContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalCancelButtonContainer: {
        width: (Dimensions.get('screen').width - 30),
        backgroundColor: Colors.legacyGrey20,
        borderRadius: 20,
        alignItems: 'center',
        height: 40,
        flexDirection: 'row',
    },
    modalCancelButtonText: {
        color: Colors.legacyGrey70,
        fontFamily: Fonts.montserratBold,
        fontSize: 15,
        lineHeight: 18,
        flex: 1,
        textAlign: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        marginTop: 0,
        paddingBottom: 0,
    },
    modal4: {
        height: 194,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: 'white',
        paddingTop: 0,
        elevation: 1,
    },

    modalButtonContainer: {
        backgroundColor: Colors.legacyGrey20,
        borderRadius: 20,
        alignItems: 'center',
        height: 40,
        flexDirection: 'row',
        flex: 1,
    },
});
