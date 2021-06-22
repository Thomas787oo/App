import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
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
            <View>
                <Text style={styles.title}>
                    Mot de passe incorrect !
                </Text>
                <Text style={styles.text}>
                    Oup’s la modification de votre mot de passe a échouée pour une des raisons suivantes :{"\n"}- mot de passe actuel incorrect{"\n"}- mot de passe et sa confirmation incorrects.{"\n"}{"\n"}
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
        fontSize: 13,
        color: Colors.white,
    },
    text: {
        fontFamily: Fonts.montserratRegular,
        fontSize: 13,
        lineHeight: 20,
        color: Colors.white,
        marginTop: 20,
        marginBottom: 10,
    },
});
