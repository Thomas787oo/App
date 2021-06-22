import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import {Fonts} from '../../../../common-styles/fonts';
import {Colors} from '../../../../common-styles/colors';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

export default (props: { navigation: any }): React.ReactElement => {

    const retry = (): void => {
        props.navigation && props.navigation.goBack();
    };

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.title}>
                    Code de vérification incorrect !
                </Text>
                <Text
                    style={styles.text}>
                    Oup’s le code de modification renseigné est incorrect, veuillez réessayer en vérifiant le code reçu dans votre boite mail.
                </Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <FormButton
                    text={'Réessayer'}
                    enabled={true}
                    onPress={retry}
                ></FormButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.montserratSemiBold,
        fontSize: 16,
        color: Colors.white,
    },
    text: {
        fontFamily: Fonts.montserratRegular,
        fontSize: 14,
        lineHeight: 20,
        color: Colors.white,
        marginTop: 20,
        marginBottom: 10,
    },
});
