import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Eye, Lock, Mail, Navigation, Phone, User} from 'react-native-feather';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import Spinner from 'react-native-loading-spinner-overlay';
import {registerUser} from '../../../../services/editions-charisma-app/auth.service';
import {OrderCreationRequest} from '../../../../model/editions-charisma-app/order/order-creation-request.model';
import {OrderCreationStepManagerRequest} from '../../../../model/editions-charisma-app/order/order-creation-step-manager-request.model';
import * as env from '../../../../app/editions-charisma-app/app-config.json';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {Regex} from '../../../../common-styles/regex';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: any;
}

export default (props: {
    navigation: any,
    dispatch: Function,
    setFormTouched: Function,
    submitTimestamp: number,
    orderRequest: OrderCreationRequest,
    orderCreationStepManagerRequest: OrderCreationStepManagerRequest,
}): React.ReactElement => {
    const { control, trigger, formState, getValues } = useForm();

    // spinner
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [isFormSubmitted, setFormSubmitted] = React.useState<boolean>(false);

    const onSingInButtonPress = (): void => {
        props.navigation && props.navigation.navigate('SignIn', { isOrdering: true });
    };

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
        registerUser(data).then(res => {
            setLoading(false);

            // Update the next step before navigating
            props.dispatch({ type : 'NEXT_STEP'});

            props.navigation && props.navigation.navigate(props.orderCreationStepManagerRequest.nextStep.routeName, { email: data.email });

        }, (err) => {
            setLoading(false);
            alert('Une erreur est survenue, veuillez réessayer plus tard.');
        });
    };

    return (
        <View style={styles.mainContainer}>
            <Spinner
                visible={isLoading}
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
                        Bienvenue, à vous de jouer !
                    </Text>
                    <CustomField
                        name='address'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Adresse'}
                        type={'google-autocomplete'}
                        googleMapKey={env.GOOGLE_MAP_API_KEY}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<Navigation height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <CustomField
                        name='lastName'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Nom'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<User height={23} width={23} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <CustomField
                        name='firstName'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Prénom'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
                        leftIcon={<User height={23} width={23} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <CustomField
                        name='email'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Email'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, pattern: { value: Regex.email, message: 'Adresse email incorrecte.' } }}
                        leftIcon={<Mail height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <CustomField
                        name='phone'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'Téléphone'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.'}, pattern: { value: Regex.frenchPhoneNumber, message: 'Numéro de téléphone incorrect' } }}
                        leftIcon={<Phone height={21} width={21} style={{ color: Colors.legacyGrey50 }}/>}
                        onChange={() => props.setFormTouched(true)}
                    />
                    <View style={styles.bottomView}>
                        <Text
                            style={styles.loginText}>
                            Vous avez déjà un compte ?
                        </Text>
                        <View onTouchEnd={() => onSingInButtonPress()}>
                            <Text>CONNEXION</Text>
                        </View>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
});
