import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Eye, Lock} from 'react-native-feather';
import {EyeOffIcon, EyeOnIcon} from './extra/icons';
import {updatePassword} from '../../../../services/editions-charisma-app/account.service';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

interface FormValues {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
}

export default (props: {
    navigation: any,
}): React.ReactElement => {

    const { control, trigger, formState, getValues, reset } = useForm();

    // passwords visibility
    const [currentPasswordVisible, setCurrentPasswordVisible] = React.useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false);
    const [formIsTouched, setFormTouched] = React.useState<boolean>(false);

    // tooltips
    const [newPasswordValue, setNewPasswordValue] = React.useState<string>(null);

    // spinner
    const [isLoading, setLoading] = React.useState<boolean>(false);
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

    const onCurrentPasswordIconPress = (): void => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };
    const onConfirmPasswordIconPress = (): void => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues): void => {
        setLoading(true);
        updatePassword({ currentPassword: data.currentPassword, plainPassword: { first: data.password, second: data.passwordConfirmation } }).then(passwordUpdationResult => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ChangePasswordSuccess');
            reset();
        }, (error) => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ChangePasswordError');
        });
    }

    return (
        <View style={{flex: 1}}>
            <Spinner
                visible={isLoading}
                textContent={'Envoi en cours...'}
                textStyle={{color: Colors.white}}
            />
            <View style={styles.bodyContainer}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.text]}>
                        <Text style={[styles.textBold]}>Veuillez saisir votre mot de passe</Text>, suite à cette modification un mail vous sera envoyé
                    </Text>
                </View>
                <CustomField
                    name='currentPassword'
                    control={control}
                    trigger={trigger}
                    isFormSubmitted={isFormSubmitted}
                    defaultValue={''}
                    type={currentPasswordVisible === true ? 'text' : 'password'}
                    label={'Mot de passe actuel'}
                    placeholder={'Saisissez votre mot de passe actuel'}
                    rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                    leftIcon={<Lock style={[styles.iconInput]}/>}
                    rightIcon={currentPasswordVisible ? <EyeOnIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/> : <EyeOffIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/>}
                    onRightIconPress={onCurrentPasswordIconPress}
                    onChange={() => setFormTouched(true) }
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
                    rightIcon={passwordVisible ? <EyeOnIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/> : <EyeOffIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/>}
                    onRightIconPress={onPasswordIconPress}
                    onChange={(value) => { setFormTouched(true); setNewPasswordValue(value); }}
                    tooltipValidation={{
                        minLength: { value: 8 },
                        atLeastOneUppercase: { value: true },
                        atLeastOneSpecialCharacter: { value: true },
                        atLeastOneNumber: { value: true }
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
                    rightIcon={confirmPasswordVisible ? <EyeOnIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/> : <EyeOffIcon style={{ color: Colors.greyMain, height: 24, width: 24 }}/>}
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        marginTop: 20,
    },
    iconInput: {
        color: '#8D94A8',
        left: -1,
    },
    hidden: {
        display: 'none',
    },
    text: {
        fontSize: 13,
        lineHeight: 18.85,
        color: Colors.white,
        fontFamily: Fonts.montserratRegular,
    },
    textBold: {
        fontFamily: Fonts.montserratMedium,
    },
    visibleTooltips: {
      display: 'flex',
      elevation: 10,
      zIndex: 10,
    },
});
