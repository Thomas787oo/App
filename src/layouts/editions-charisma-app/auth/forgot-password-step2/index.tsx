import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Eye, Lock, Send} from 'react-native-feather';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import {EyeOffIcon, EyeOnIcon} from './extra/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import {retrievePasswordConfirm} from '../../../../services/editions-charisma-app/auth.service';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';
import InputScrollView from 'react-native-input-scroll-view';
import {Icon} from '@ui-kitten/components';

interface FormValues {
    emailCodeForPasswordUpdate: string;
    password: string;
    passwordConfirmation: string;
}

export default (props: {
    navigation: any,
    email: any,
    dispatch: Function,
}): React.ReactElement => {
    const { control, trigger, formState, getValues, reset } = useForm();
    // passwords visibility
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false);
    // tooltips
    const [newPasswordValue, setNewPasswordValue] = React.useState<string>(null);
    // spinner
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [formIsTouched, setFormTouched] = React.useState<boolean>(false);
    const [isFormSubmitted, setFormSubmitted] = React.useState<boolean>(false);

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

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };
    const onConfirmPasswordIconPress = (): void => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const onSubmit: SubmitHandler<FormValues> = (data): void => {
        setLoading(true);
        retrievePasswordConfirm({
            email: props.email,
            emailCodeForPasswordUpdate: data.emailCodeForPasswordUpdate,
            plainPassword: {
                first: data.password,
                second: data.passwordConfirmation,
            },
        }).then((res) => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ForgotPasswordSuccess');
            reset();
        }, (res) => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ForgotPasswordError');
        });
    };

    return (
        <View style={styles.mainContainer}>
            <Spinner
                visible={isLoading}
                textContent={'Envoi en cours...'}
                textStyle={{color: Colors.white}}
            />
            <View style={styles.bodyContainer}>
                <InputScrollView>

                    <Text style={{
                        textAlign: 'left',
                        color: Colors.white,
                        fontSize: 14,
                        fontFamily: Fonts.montserratRegular,
                        marginBottom: 0 }}>
                        Veuillez renseigner le code de modification envoyé à l’adresse <Text style={{
                            textAlign: 'left',
                            color: Colors.white,
                            fontSize: 14,
                            fontFamily: Fonts.montserratSemiBold,
                            marginTop: 0 }}>
                         {props.email}
                        </Text> ainsi que votre nouveau mot de passe{'\n'}
                    </Text>

                    <CustomField
                        name='emailCodeForPasswordUpdate'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Code'}
                        placeholder={'Saisissez le code reçu'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<Send height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => setFormTouched(true)}
                    />
                    <CustomField
                        name='password'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Nouveau mot de passe'}
                        placeholder={'Saisissez votre nouveau mot de passe'}
                        type={passwordVisible === true ? 'text' : 'password'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, pattern: { value: /^(?=.*[A-Z])(?=.*?[0-9])(?=.*[?!&#£$:%@])[0-9A-Za-z?!&#£$:%@]{8,}/, message: 'Format du mot de passe incorrect.' } }}
                        leftIcon={<Lock style={[styles.iconInput]}/>}
                        rightIcon={<Icon name={passwordVisible ? 'eye-on' : 'eye-off'} pack='ec' style={{ color: passwordVisible ? Colors.greySlate : Colors.greyMain }}/>}
                        onRightIconPress={onPasswordIconPress}
                        onChange={(value) => { setFormTouched(true); setNewPasswordValue(value); }}
                        tooltipValidation={{
                            minLength: { value: 8 },
                            atLeastOneUppercase: { value: true },
                            atLeastOneSpecialCharacter: { value: true },
                            atLeastOneNumber: { value: true },
                        }}
                    />
                    <CustomField
                        name='passwordConfirmation'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Confirmation'}
                        placeholder={'Saisissez la confirmation'}
                        type={confirmPasswordVisible === true ? 'text' : 'password'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, validate: (() => getValues().passwordConfirmation === getValues().password ? true : 'Confirmation du mot de passe incorrecte.') }}
                        leftIcon={<Lock style={[styles.iconInput]}/>}
                        rightIcon={<Icon name={confirmPasswordVisible ? 'eye-on' : 'eye-off'} pack='ec' style={{ color: confirmPasswordVisible ? Colors.greySlate : Colors.greyMain }}/>}
                        onRightIconPress={onConfirmPasswordIconPress}
                        onChange={() => setFormTouched(true)}
                        tooltipValidation={{ isEqualTo: { value: newPasswordValue, message: 'Confirmez le mot de passe' } }}
                    />

                    <View style={{ marginTop: 10 }}>
                        <FormButton
                            text={'Suivant'}
                            enabled={formIsTouched}
                            onPress={triggerSubmit}
                        ></FormButton>
                    </View>
                </InputScrollView>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    bodyContainer: {
        display: 'flex',
        flex: 1,
    },
    formContainer: {
        width: Dimensions.get('window').width - 90,
        height: 300,
    },
    iconInput: {
        color: '#8D94A8',
        left: -1,
    },
});
