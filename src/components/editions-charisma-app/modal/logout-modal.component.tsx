import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ModalButtonModeEnum, ModalLayout} from './modal-layout.component';
import {Colors} from '../../../common-styles/colors';

export const LogoutModal = (props: {
        isOpened: boolean,
        closeModalFunction: () => any,
        confirmFunction: () => any,
        onClosed: () => any,
    }): React.ReactElement => {

    return (
        <ModalLayout
            titleText={'Deconnexion de la plateforme'}
            titleIcon={<Icon name = 'check-circle' size ={24} style = {styles.icon}/>}
            titleStyle={{ marginTop: 2 }}
            text={'Voulez-vous vous déconnecter ? Vous ne recevrez plus de notification.'}
            isOpened={props.isOpened}
            buttonMode={ModalButtonModeEnum.multiple}
            multipleButtons={[
                {
                    label: 'Annuler',
                    onPress: props.closeModalFunction,
                    closeModal: true,
                },
                {
                    label: 'Confirmer',
                    onPress: () => {
                        if (props.confirmFunction) { props.confirmFunction(); }
                        if (props.closeModalFunction) { props.closeModalFunction(); }
                    },
                    closeModal: true,
                    labelStyle: {
                        backgroundColor: Colors.yellow,
                    },
                    labelTextStyle: {
                        color: Colors.white,
                    },
                },
            ]}
            closeModalFunction={props.closeModalFunction}
            onClosed={props.onClosed}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        color: Colors.yellow,
        bottom: 1,
        marginRight: 24,
        paddingTop: 5,
    },
});
