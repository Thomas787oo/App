import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/forgot-password-step2';
import {connect} from 'react-redux';
import {AuthenticationLayout} from '../../../layouts/editions-charisma-app/shared/authentication-layout/authentication-layout.component';

const ForgotPasswordStep2ScreenView = (props: {
    navigation: any,
    route: any,
    dispatch: Function,
}): React.ReactElement => {

  const {email} = props.route.params;

  const onArrowLeftPress = (): void => {
    props.navigation && props.navigation.navigate('SignIn');
  };

  return (
    <AuthenticationLayout
        titleText={'RÉINITIALISATION DU MOT DE PASSE'}
        topLeftIcon={'arrow-backward'}
        topLeftIconOnPress={onArrowLeftPress}
    >
        <ContentView { ...props} email={email} />
    </AuthenticationLayout>
  );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationData: state.setAuthenticationTokens.authenticationData,
    };
};

export const ForgotPasswordStep2Screen = connect(mapStateToProps)(ForgotPasswordStep2ScreenView);
