import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/forgot-password-step1';
import {connect} from 'react-redux';
import {AuthenticationLayout} from '../../../layouts/editions-charisma-app/shared/authentication-layout/authentication-layout.component';

const ForgotPasswordStep1ScreenView = (props: { navigation: any, dispatch: Function }): React.ReactElement => {

  const onArrowLeftPress = (): void => {
    props.navigation && props.navigation.goBack();
  };

  return (
      <AuthenticationLayout
          titleText={'RÉINITIALISATION DU MOT DE PASSE'}
          topLeftIcon={'arrow-backward'}
          topLeftIconOnPress={onArrowLeftPress}
      >
          <ContentView { ...props} />
      </AuthenticationLayout>
  );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationData: state.setAuthenticationTokens.authenticationData,
    };
};

export const ForgotPasswordStep1Screen = connect(mapStateToProps)(ForgotPasswordStep1ScreenView);
