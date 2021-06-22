import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Lock, Mail } from 'react-native-feather';
import { KeyboardAvoidingView } from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import { getApiService } from '../../../../services/editions-charisma-app/api.service';
import { getFormService } from '../../../../services/editions-charisma-app/form.service';
import { fetchProfile } from '../../../../services/editions-charisma-app/account.service';
import Spinner from 'react-native-loading-spinner-overlay';
import { CustomField } from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import { Colors } from '../../../../common-styles/colors';
import { Fonts } from '../../../../common-styles/fonts';
import { Regex } from '../../../../common-styles/regex';
import { Icon } from '@ui-kitten/components';
import { FormButton } from '../../../../components/editions-charisma-app/form-button/form-button.component';
import { FieldError } from 'react-hook-form';
import { ErrorMessage } from '../../../../components/editions-charisma-app/error-message/error-message.component';
import { WebBrowserService } from '../../../../services/web-browser.service';

interface FormValues {
    email: string;
    password: string;
}

export default (props: {
    navigation: any,
    dispatch: Function,
}): React.ReactElement => {
    const { control, trigger, formState, getValues, reset } = useForm();

    const [errorLogin, setError] = React.useState<FieldError>({ type: 'validation', message: null });
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
    // spinner
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [isLoadingAfterLogin, setLoadingAfterLogin] = React.useState<boolean>(false);
    const [formIsTouched, setFormTouched] = React.useState<boolean>(false);
    const [isFormSubmitted, setFormSubmitted] = React.useState<boolean>(false);

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

    const onForgotPasswordButtonPress = (): void => {
        props.navigation && props.navigation.navigate('ForgotPasswordStep1');
    };
    const onSignUpButtonPress = (): void => {
        WebBrowserService.openBrowserAsync('https://www.editions-charisma.fr/authentification?create_account=1').then();
    };
    const triggerSubmit = () => {
        if (formIsTouched) {
            setFormSubmitted(true);
            getFormService()
                .handleFormSubmit(
                    onSubmit,
                    trigger,
                    formState,
                    getValues,
                );
        }
    };

    const isLoadingScenario = (data: boolean) => {
        setLoading(data);
    }

    const onSubmit: SubmitHandler<FormValues> = (data): void => {
        setError({ type: 'validation', message: null });
        isLoadingScenario(true);
        // 1 - Authenticate
        getApiService().authenticate({
            username: data.email,
            password: data.password,
            grant_type: 'password',
        }).then((result) => {
            const action = { type: 'SET_AUTHENTICATION_DATA', value: result };
            props.dispatch(action);
            // 2 - Fetch the user profile
            fetchProfile()
                .then((userData) => {
                    const actionB = { type: 'SET_USER_INFORMATION', value: userData };
                    props.dispatch(actionB);
                }).then(() => {
                    isLoadingScenario(false);
                    props.navigation && props.navigation.navigate('AuthenticatedNavigator');
                    setTimeout(() => reset(), 1000);
                });
        }, (result) => {
            isLoadingScenario(false);
            setTimeout(() => {
                setError({ type: 'validation', message: 'Identifiants incorrects ! Veuillez réessayer.' });
            }, 500);
        });
    };

    return (
        <KeyboardAvoidingView>
            <Spinner
                visible={isLoading}
                textContent={'Connexion en cours...'}
                textStyle={{ color: Colors.white }}
            />
            <Spinner
                overlayColor={'rgba(91, 51, 246, 0.98)'}
                visible={isLoadingAfterLogin}
                textContent={'Connexion en cours...'}
                textStyle={{ color: Colors.white }}
            />
            <ErrorMessage styleContainer={styles.errorMessage} error={errorLogin} />
            <View style={styles.bodyContainer}>
                <View style={styles.formContainer}>
                    <CustomField
                        name='email'
                        control={control}
                        trigger={trigger}
                        textContainerStyle={styles.emailField}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Email'}
                        placeholder={'Saisissez votre adresse e-mail'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, pattern: { value: Regex.email, message: 'Un e-mail est requis pour ce champ.' } }}
                        leftIcon={<Mail height={21} width={21} style={{ color: Colors.legacyGrey50 }} />}
                        onChange={() => setFormTouched(true)}
                    />
                    <CustomField
                        name='password'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Mot de passe'}
                        placeholder={'Saisissez votre mot de passe'}
                        type={passwordVisible === true ? 'text' : 'password'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<Lock height={21} width={21} style={{ color: Colors.legacyGrey50 }} />}
                        rightIcon={<Icon name={passwordVisible ? 'eye-on' : 'eye-off'} pack='ec' style={{ color: passwordVisible ? Colors.greySlate : Colors.greyMain }} />}
                        onRightIconPress={() => onPasswordIconPress()}
                        onChange={() => setFormTouched(true)}
                    />
                    <Text style={styles.forgotPasswordLink} onPress={() => onForgotPasswordButtonPress()}>Mot de passe oublié ?</Text>
                    <FormButton
                        text={'Se connecter'}
                        enabled={formIsTouched}
                        onPress={triggerSubmit}
                    ></FormButton>
                    <Text style={styles.signUpLink} onPress={() => onSignUpButtonPress()}>Pas encore membre ? Créer un compte</Text>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        display: 'flex',
        flex: 1
    },
    formContainer: {
        width: Dimensions.get('window').width - 90
    },
    emailField: {
        marginBottom: 27,
    },
    signUpLink: {
        fontWeight: 'normal',
        color: Colors.white,
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 15,
        fontFamily: Fonts.montserratSemiBold,
        marginTop: 30,
        textAlign: 'center'
    },
    forgotPasswordLink: {
        fontWeight: 'normal',
        color: Colors.white,
        fontStyle: 'normal',
        textAlign: 'right',
        fontSize: 12,
        lineHeight: 15,
        fontFamily: Fonts.montserratSemiBold,
        marginTop: 18,
        marginBottom: 27,
    },
    errorMessage: {
        marginBottom: 17,
    }
});
