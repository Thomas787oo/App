import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/forgot-password-error';
import {connect} from 'react-redux';
import {AuthenticationLayout} from '../../../layouts/editions-charisma-app/shared/authentication-layout/authentication-layout.component';

const ForgotPasswordErrorScreenView = (props: { navigation: any, dispatch: Function }): React.ReactElement => {

  const onArrowLeftPress = (): void => {
    props.navigation && props.navigation.navigate('SignIn');
  };

  return (
        <AuthenticationLayout
            titleText={'RÉINITIALISATION DU MOT DE PASSE'}
            topLeftIcon={'cross'}
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

export const ForgotPasswordErrorScreen = connect(mapStateToProps)(ForgotPasswordErrorScreenView);
