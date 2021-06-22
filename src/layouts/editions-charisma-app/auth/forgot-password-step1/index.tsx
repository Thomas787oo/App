import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Mail} from 'react-native-feather';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import {retrievePassword} from '../../../../services/editions-charisma-app/auth.service';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Colors} from '../../../../common-styles/colors';
import {Regex} from '../../../../common-styles/regex';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';
import InputScrollView from 'react-native-input-scroll-view';

interface FormValues {
    email: string;
}

export default (props: {
    navigation: any,
    dispatch: Function,
}): React.ReactElement => {
    const { control, trigger, formState, getValues, reset } = useForm();
    const [hasToRetryLater, setHasToRetryLater] = React.useState<boolean>(false);
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

    const onSubmit: SubmitHandler<FormValues> = (data): void => {
        retrievePassword(data)
            .then(res => {
                props.navigation && props.navigation.navigate('ForgotPasswordStep2', { email: data.email });
                // Reset form state
                reset();
            }, (res) => {
                if (res.status === 403) {
                    alert('Un mail contenant un code de réinitialisation a déjà été envoyé dans les dernières 5 minutes. Veuillez réessayer ultérieurement.');
                    setHasToRetryLater(true);
                } else {
                    // Reset form state
                    reset();
                }
            });
    };

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.formContainer}>
                <InputScrollView>

                    <CustomField
                        name='email'
                        control={control}
                        trigger={trigger}
                        isFormSubmitted={isFormSubmitted}
                        defaultValue={''}
                        label={'E-mail'}
                        placeholder={'Saisissez votre adresse email'}
                        rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' }, pattern: { value: Regex.email, message: 'Adresse email incorrecte.' }, validate: () => hasToRetryLater === false ? true : 'Veuillez réessayer dans 5 minutes' }}
                        leftIcon={<Mail height={21} width={21} style={{ color: Colors.greyMain }}/>}
                        onChange={() => { setFormTouched(true); setHasToRetryLater(false); }}
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
    bodyContainer: {
        display: 'flex',
        flex: 1,
    },
    formContainer: {
        width: Dimensions.get('window').width - 90,
        height: 300,
    },
});
