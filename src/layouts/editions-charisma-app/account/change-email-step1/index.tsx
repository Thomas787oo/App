import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Mail} from 'react-native-feather';
import {updateEmail} from '../../../../services/editions-charisma-app/account.service';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import Spinner from 'react-native-loading-spinner-overlay';
import {Icon} from '@ui-kitten/components';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {Regex} from '../../../../common-styles/regex';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

interface FormValues {
    email: string;
}

export default (props: {
    navigation: any,
}): React.ReactElement => {

    const { control, trigger, formState, getValues, reset } = useForm();
    const [formIsTouched, setFormTouched] = React.useState<boolean>(false);

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

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues): void => {
        setLoading(true);
        updateEmail({ emailForEmailUpdate: data.email }).then(result => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ChangeEmailStep2', { email: data.email });
            reset();
        }, () => {
            setLoading(false);
            setTimeout(() => {
                alert('Une erreur est survenue, veuillez réessayer plus tard.');
            }, 500);
        });
    };

    return (
        <View>
            <Spinner
                visible={isLoading}
                textContent={'Envoi en cours...'}
                textStyle={{color: Colors.white}}
            />
            <View style={styles.bodyContainer}>
                <View style={styles.formContainer}>
                    <View>
                        <View style={{ marginTop: 30, marginBottom: 10 }}>
                            <Text style={[styles.textBold]}>Veuillez saisir votre nouvelle adresse mail</Text>
                            <Text style={[styles.text]}>Un mail de modification de mail vous sera envoyé</Text>
                        </View>
                        <CustomField
                            name='email'
                            control={control}
                            trigger={trigger}
                            isFormSubmitted={isFormSubmitted}
                            defaultValue={''}
                            label={'E-mail'}
                            placeholder={'Saisissez votre nouvelle adresse email'}
                            rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, pattern: { value: Regex.email, message: 'Adresse email incorrecte.' } }}
                            leftIcon={<Mail height={21} width={21} style={{ color: '#8D94A8' }}/>}
                            onChange={() => setFormTouched(true)}
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textBold: {
        fontSize: 13,
        color: Colors.white,
        fontFamily: Fonts.montserratMedium,
    },
    text: {
        fontSize: 13,
        lineHeight: 18.85,
        color: Colors.white,
        fontFamily: Fonts.montserratRegular,
    },
    bodyContainer: {
        display: 'flex',
        flex: 1,
    },
    formContainer: {
        width: Dimensions.get('window').width - 90,
        height: 300,
    },
});
