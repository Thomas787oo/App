import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Eye, Lock, Mail, Navigation, Phone, User} from 'react-native-feather';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import Spinner from 'react-native-loading-spinner-overlay';
import {registerUserConfirm} from '../../../../services/editions-charisma-app/auth.service';
import {EyeOffIcon} from '../../account/change-password-step1/extra/icons';
import {getApiService} from '../../../../services/editions-charisma-app/api.service';
import {fetchProfile} from '../../../../services/editions-charisma-app/account.service';
import {OrderCreationRequest} from '../../../../model/editions-charisma-app/order/order-creation-request.model';
import {OrderCreationStepManagerRequest} from '../../../../model/editions-charisma-app/order/order-creation-step-manager-request.model';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {Regex} from '../../../../common-styles/regex';

interface FormValues {
    confirmationCode: string;
    email: string;
    plainPassword: {
        first: string;
        second: string;
    };
    acceptTerms: boolean;
}

export default (props: {
    navigation: any,
    dispatch: Function,
    setFormTouched: Function,
    submitTimestamp: number,
    route: any,
    orderRequest: OrderCreationRequest,
    orderCreationStepManagerRequest: OrderCreationStepManagerRequest,
}): React.ReactElement => {
    const { control, trigger, formState, getValues, reset } = useForm();

    // spinner
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [isLoadingAfterLogin, setLoadingAfterLogin] = React.useState<boolean>(false);
    const [passwordFirstVisible, setPasswordFirstVisible] = React.useState<boolean>(false);
    const [passwordSecondVisible, setPasswordSecondVisible] = React.useState<boolean>(false);
    const [isFormSubmitted, setFormSubmitted] = React.useState<boolean>(false);
    const {email} = props.route.params;

    const navigateToTerms = () => {
        props.navigation && props.navigation.navigate('Terms');
    }

    useEffect(() => {
        if (props.submitTimestamp != null) {
            setFormSubmitted(true);
            getFormService()
                .handleFormSubmit(
                    onSubmit,
                    trigger,
                    formState,
                    getValues,
                );
        }
    }, [props.submitTimestamp]);

    const onSubmit: SubmitHandler<FormValues> = (data): void => {
        setLoading(true);
        registerUserConfirm(data).then(res => {
            setLoading(false);
            loginAndNavigateToNextStep({
                email: email,
                password: data.plainPassword.first,
            });
        }, (err) => {
            setLoading(false);
            alert('Une erreur est survenue, veuillez réessayer plus tard.');
        });
    };

    const loginAndNavigateToNextStep = (data: { email: string, password: string }): void => {
        setLoadingAfterLogin(true);
        // 1 - Authenticate
        getApiService().authenticate({
            username: data.email,
            password: data.password,
            grant_type: 'password',
        }).then((result) => {
            const action = { type: 'SET_AUTHENTICATION_DATA', value : result };
            props.dispatch(action);
            // 2 - Fetch the user profile
            fetchProfile()
                .then((userData) => {
                    const actionB = { type: 'SET_USER_INFORMATION', value: userData };
                    props.dispatch(actionB);
                }).then(() => {
                setLoadingAfterLogin(false);
                // 3 - Redirect to the private area
                // Remove the sign up steps and do update the next step before navigating
                props.dispatch({ type : 'REMOVE_SIGN_UP_STEPS_AND_DO_NEXT_STEP'});

                props.navigation && props.navigation.navigate('AuthenticatedNavigator',
                    {
                        screen: 'Main',
                        params: {
                            screen: 'Reserver',
                            params: {
                                screen: props.orderCreationStepManagerRequest.nextStep.routeName,
                                params: {
                                    stepData: props.orderCreationStepManagerRequest.nextStep.data,
                                },
                            },
                        },
                    },
                );
                // 4 - Reset form state
                setTimeout(() => reset(), 1000);
            });
        }, (result) => {
            setLoadingAfterLogin(false);
            setTimeout(() => {
                alert('Mauvaise combinaison email / mot de passe');
            }, 500);
        });
    };

    return (
        <View style={styles.mainContainer}>
            <Spinner
                visible={isLoading}
                textContent={'Envoi en cours...'}
                textStyle={{color: Colors.white}}
            />
            <Spinner
                overlayColor={'rgba(91, 51, 246, 0.98)'}
                visible={isLoadingAfterLogin}
                textContent={'Connexion en cours...'}
                textStyle={{color: Colors.white}}
            />
            <View style={styles.bodyContainer}>
                <View style={styles.logo}>
                    <Text>LOGO</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={{
                        textAlign: 'left',
                        color: Colors.legacyGrey70,
                        fontSize: 14,
                        fontFamily: Fonts.montserratMedium,
                        marginBottom: 20 }}>
                        Un code de confirmation vient d’être envoyé à votre adresse mail
                    </Text>
                    <CustomField
                        name='confirmationCode'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Code'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<Navigation height={23} width={23} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <CustomField
                        name='plainPassword.first'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Mot de passe'}
                        type={passwordFirstVisible === true ? 'text' : 'password'}
                        rightIcon={passwordFirstVisible ? (Eye) : (EyeOffIcon)}
                        onRightIconPress={() => setPasswordFirstVisible(!passwordFirstVisible)}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.'}, pattern: { value: Regex.password, message: 'Format : 8 caractères, 1 majuscule, 1 minuscule, 1 special' } }}
                        leftIcon={<Lock height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true) }
                        tooltipValidation={{
                            minLength: { value: 8 },
                            atLeastOneUppercase: { value: true },
                            atLeastOneSpecialCharacter: { value: true },
                            atLeastOneNumber: { value: true },
                        }}
                    />
                    <CustomField
                        name='plainPassword.second'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Confirmation'}
                        type={passwordSecondVisible === true ? 'text' : 'password'}
                        rightIcon={passwordSecondVisible ? (Eye) : (EyeOffIcon)}
                        onRightIconPress={() => setPasswordSecondVisible(!passwordSecondVisible)}
                        rules={{
                            required: { value: true, message: 'Veuillez remplir ce champ.' },
                            validate: () => {
                                return getValues('plainPassword.first') === getValues('plainPassword.second') ? true : 'Confirmation du mot de passe incorrecte.';
                            },
                        }}
                        leftIcon={<Lock height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true) }
                        tooltipValidation={{
                            isEqualTo: { value: getValues('plainPassword.first') },
                        }}
                    />
                    <CustomField
                        name='email'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={email}
                        label={'Email'}
                        type={'hidden'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                    />
                    <View style={styles.bottomView}>
                        <CustomField
                            name='acceptTerms'
                            control={control}
                            trigger={trigger}
                            isFormSubmitted={isFormSubmitted}
                            disabled={false}
                            label={<Text>J'accèpte les <Text style={styles.termsLink} onPress={navigateToTerms}>conditions générales d'utilisation</Text></Text>}
                            type={'checkbox'}
                            rules={{ required: { value: true, message: 'Veuillez accepter les conditions générales d\'utilisation.' } }}
                            onChange={() => props.setFormTouched(true)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.white,
        zIndex: 1,
        flex: 1,
    },
    bodyContainer: {
        display: 'flex',
        flex: 1,
    },
    formContainer: {
        width: Dimensions.get('window').width - 90,
        marginLeft: 45,
        height: 300,
    },
    logo: {
        height : 100,
        paddingTop: 30,
        marginBottom: 20,
    },
    bottomView: {
        marginTop: 10,
    },
    loginText: {
        marginTop: 1,
        color: Colors.legacyGrey50,
        marginBottom: 20,
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '500',
        fontFamily: Fonts.montserratMedium,
        textAlign: 'center',
    },
    termsLink: {
        color: Colors.baseMain,
        textDecorationLine: 'underline',
    },
});
