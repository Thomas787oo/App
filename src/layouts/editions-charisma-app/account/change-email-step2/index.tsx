import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {Send} from 'react-native-feather';
import {SubmitHandler, useForm} from 'react-hook-form';
import {updateEmailConfirm} from '../../../../services/editions-charisma-app/account.service';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import {getFormService} from '../../../../services/editions-charisma-app/form.service';
import {CustomField} from '../../../../components/editions-charisma-app/custom-field/custom-field.component';
import {Fonts} from '../../../../common-styles/fonts';
import {Colors} from '../../../../common-styles/colors';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

interface FormValues {
    code: string;
}

export default (props: {
    navigation: any,
    dispatch: any,
    email: any,
}): React.ReactElement => {

  const { control, trigger, formState, getValues, reset } = useForm();

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

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues): void => {
      setLoading(true);
      const confirmData = {
          emailCodeForEmailUpdate: data.code,
      };
      updateEmailConfirm(confirmData).then((userData) => {
          const action = { type: 'SET_USER_INFORMATION', value: userData };
          props.dispatch(action);
          props.navigation && props.navigation.navigate('ChangeEmailSuccess');
          setLoading(false);
      }, (error) => {
        setTimeout(() => {
            setLoading(false);
            props.navigation && props.navigation.navigate('ChangeEmailError');
            // Reset form state
            reset();
        }, 1500);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.boardContainer}>
      <Spinner
          visible={isLoading}
          textContent={'Envoi en cours...'}
          textStyle={{color: Colors.white}}
      />
      <View style={{ flex: 1 }}>
          <Text style={[styles.text]}>
              Un code de modification
              vient d’être envoyé à l’adresse suivante :
              <Text style={[styles.textBold]}> {props.email}</Text>{'\n\n'}
              Renseignez-le ci-dessous pour continuer
          </Text>
          <CustomField
              name='code'
              control={control}
              trigger={trigger}
              isFormSubmitted={isFormSubmitted}
              defaultValue={''}
              label={'Code'}
              placeholder={'Saisissez le code de confirmation reçu'}
              rules={{ required: { value: true, message: 'Veuillez remplir ce champ.' } }}
              leftIcon={<Send style={[styles.icon]}/>}
              onChange={() => setFormTouched(true)}
          />

          <View style={{ marginTop: 10 }}>
              <FormButton
                  text={'Vérifier'}
                  enabled={formIsTouched}
                  onPress={triggerSubmit}
              ></FormButton>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
      marginTop: 20,
  },
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
      marginBottom: 20,
  },
  container: {
    height: 240.5,
    width: 378,
    left: -2,
    right: -2,
    top: 4,
  },
  changeEmailConfirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  changeEmailConfirmationHeader: {
    flex: 1,
    marginLeft: 24,
    marginTop: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.04,
    fontWeight: '400',
    left: 50,
    bottom: 24,
  },
  arrowLeft: {
    color: 'black',
  },
  paperPlane: {
    height: 100,
    width: 95,
    marginHorizontal: 'auto',
    bottom: 24,
    marginTop: 50,
  },
  emailText: {
    fontSize: 14,
    lineHeight: 17.07,
    fontWeight: 'bold',
    marginTop: 6,
  },
  icon: {
    color: Colors.legacyGrey50,
  },
});
