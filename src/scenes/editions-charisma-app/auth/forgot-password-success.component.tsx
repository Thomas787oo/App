import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/forgot-password-success';
import {connect} from 'react-redux';
import {AuthenticationLayout} from '../../../layouts/editions-charisma-app/shared/authentication-layout/authentication-layout.component';

const ForgotPasswordSuccessScreenView = (props: { navigation: any, dispatch: Function }): React.ReactElement => {

  return (
      <AuthenticationLayout
        titleText={'RÉINITIALISATION DU MOT DE PASSE'}
        topLeftIcon={'none'}
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

export const ForgotPasswordSuccessScreen = connect(mapStateToProps)(ForgotPasswordSuccessScreenView);
