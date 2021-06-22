import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserClient} from '../../../../model/editions-charisma-app/user-client.model';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import {Icon} from '@ui-kitten/components';
import * as env from '../../../../app/editions-charisma-app/app-config.json';
import {LogoutModal} from '../../../../components/editions-charisma-app/modal/logout-modal.component';
import Spinner from 'react-native-loading-spinner-overlay';
import * as StoreReview from 'expo-store-review';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';

export default (props: {
    navigation: any,
    user: UserClient,
    dispatch: Function,
}): React.ReactElement => {

    // avatar
    const [isLogoutModalOpened, setLogoutModalOpened] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const openLinkEditEmail = () => {
        props.navigation && props.navigation.navigate('ChangeEmailStep1');
    };

    const openLinkEditPassword = () => {
        props.navigation && props.navigation.navigate('ChangePasswordStep1');
    };

    const openLinkContactUs = () => {
        props.navigation && props.navigation.navigate('Contact');
    };

    const openLinkTerms = () => {
        props.navigation && props.navigation.navigate('Terms');
    };

    const canReview = async () => {
        return await StoreReview.isAvailableAsync();
    };

    const openLinkReview = async () => {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview();
        }
    };

    const toggleLogoutModal = () => {
        setLogoutModalOpened(!isLogoutModalOpened);
    };

    const logout = () => {
        // Clear authentication data
        const actionA = { type: 'REMOVE_AUTHENTICATION_DATA' };
        props.dispatch(actionA);
        // Clear user data
        const actionB = { type: 'REMOVE_USER_INFORMATION' };
        props.dispatch(actionB);
        // Clear explore steps data
        const actionC = { type: 'RESET_STEPS' };
        props.dispatch(actionC);
        // Clear explore data
        const actionD = { type: 'CANCEL_ORDER' };
        props.dispatch(actionD);
        return;
    };

    return (

        

        <KeyboardAvoidingView style={styles.boardContainer}>
            <Spinner
                visible={isLoading}
                textContent={'Envoi en cours...'}
                textStyle={{color: Colors.white}}
            />
            <View style={{flex: 1}}>
                <View style={[styles.section, styles.section1]}>
                    <View style={styles.linkRow}>
                        <View style={styles.linkColumn} onTouchEnd={openLinkEditEmail}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name = 'mail'
                                    style = {[styles.linkIcon, { height: 24, width: 24 }]}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    Adresse email
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.linkRow}>
                        <View style={styles.linkColumn} onTouchEnd={openLinkEditPassword}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name = 'lock'
                                    style = {[styles.linkIcon, { height: 24, width: 24 }]}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    Mot de passe
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.linkRow}>
                        <View style={styles.linkColumn} onTouchEnd={openLinkTerms}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name = 'file-text'
                                    style = {[styles.linkIcon, { height: 24, width: 24 }]}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    CGU / CGV
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.linkRow}>

                        <View style={styles.linkColumn} onTouchEnd={openLinkContactUs}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name='mail'
                                    style={{ width: 24, height: 24, tintColor: '#000' }}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    Contactez-nous
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.linkRow}>
                        <View style={[styles.linkColumn, !canReview() ? { display: 'none' } : null]} onTouchEnd={openLinkReview}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name = 'star'
                                    style = {[styles.linkIcon, { height: 24, width: 24 }]}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    Notez Editions Charisma
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.linkRow}>
                        <View style={[styles.linkColumn]} onTouchEnd={toggleLogoutModal}>
                            <View style={styles.linkIconContainer}>
                                <Icon
                                    name = 'log-out'
                                    style = {[styles.linkIcon, { height: 24, width: 24 }]}
                                    pack='feather'
                                />
                            </View>
                            <View style={styles.linkLabelContainer}>
                                <Text style={styles.linkLabel}>
                                    Déconnexion
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <LogoutModal
                        closeModalFunction={() => setLogoutModalOpened(false)}
                        isOpened={isLogoutModalOpened}
                        onClosed={() => setLogoutModalOpened(false)}
                        confirmFunction={logout}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
        
    );
  };

const styles = StyleSheet.create({
    boardContainer: {
        backgroundColor: Colors.white,
    },
    helloContainer: {
        flex: 1,
        height: '100%',
        paddingVertical: 20,
    },
    helloGreeting: {
        fontSize: 30,
        fontFamily: Fonts.montserratSemiBold,
        color: Colors.legacyGrey70,
    },
    helloName: {
        fontSize: 30,
        fontFamily: Fonts.montserratRegular,
        color: Colors.legacyGrey70,
    },
    linkRow: {
        height: 45,
        display: 'flex',
        flexDirection: 'row',
    },
    linkColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    linkIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
    },
    linkLabelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        marginLeft: 7,
    },
    linkIcon: {
        color: Colors.legacyGrey70,
    },
    linkLabel: {
        color: Colors.greyMain,
        fontSize: 15,
        fontFamily: Fonts.montserratRegular,
    },
    section: {
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
    },
    section1: {
        height: 320,
    },
});
