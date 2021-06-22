import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

export default (props: { navigation: any, email: string }): React.ReactElement => {

    const navigateToHome = (): void => {
        props.navigation && props.navigation.navigate('Home');
    };

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.title}>
                    Mot de passe mis à jour !
                </Text>
                <Text style={styles.text}>
                    Félicitations, votre mot de passe a été modifé ! Un mail confirmant cette opération vient d’être envoyé à l’adresse :{"\n"}<Text style={styles.textBold}>{ props.email }</Text>{"\n\n"}Vous n’avez plus rien à faire
                </Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <FormButton
                    text={'Terminer'}
                    enabled={true}
                    onPress={navigateToHome}
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
    textBold: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 14,
        color: Colors.white,
    },
});
