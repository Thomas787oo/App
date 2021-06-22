import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

export default (props: {
    navigation: any,
    dispatch: Function,
}): React.ReactElement => {

    const onSubmit = (): void => {
        props.navigation && props.navigation.navigate('SignIn', { isOrdering: false });
    };

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>
                    Mot de passe mis à jour !{'\n'}{'\n'}
                    <Text style={styles.text}>
                    Félicitations, votre mot de passe a été modifé ! Vous pouvez dès maintenant vous connecter.
                    </Text>
                </Text>

                <View style={[{ marginTop: 10 }]}>
                    <FormButton
                        text={'Connexion'}
                        enabled={true}
                        onPress={onSubmit}
                    ></FormButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        display: 'flex',
        flex: 1,
    },
    formContainer: {
        width: Dimensions.get('window').width - 90,
        height: 300,
    },
    title: {
        textAlign: 'left',
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.montserratMedium,
        marginBottom: 10,
    },
    text: {
        textAlign: 'left',
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.montserratRegular,
        marginBottom: 20,
        lineHeight: 20,
    },
});
