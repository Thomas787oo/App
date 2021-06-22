import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {KeyboardAvoidingView} from '../../../../components/editions-charisma-app/keyboard-avoiding-view/keyboard-avoiding-view';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {FormButton} from '../../../../components/editions-charisma-app/form-button/form-button.component';

export default (props: { navigation: any, dispatch: Function, email: string }): React.ReactElement => {

  const navigateToHome = () => {
      props.navigation && props.navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView style={styles.boardContainer}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>
                Adresse mail mise à jour !
            </Text>
            <Text
                style={styles.text}>
                Félicitations, votre nouvelle adresse mail <Text style={styles.textBold}>{props.email}</Text> a été confirmée avec succès !
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
      marginTop: 20,
  },
  title: {
    fontFamily: Fonts.montserratSemiBold,
    fontSize: 16,
    color: Colors.white,
  },
  text: {
    fontFamily: Fonts.montserratRegular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.white,
    marginTop: 20,
    marginBottom: 10,
  },
  textBold: {
    fontFamily: Fonts.montserratMedium,
    color: Colors.white,
  },
});
