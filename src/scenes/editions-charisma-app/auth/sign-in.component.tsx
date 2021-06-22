import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/sign-in';
import { connect } from 'react-redux';
import { AuthenticationLayout } from '../../../layouts/editions-charisma-app/shared/authentication-layout/authentication-layout.component';

const ScreenView = (props: {
    navigation: any,
    route: {
        params: {
            isOrdering: boolean,
        },
    },
    dispatch: Function,
}): React.ReactElement => {

    return (
        <AuthenticationLayout
            titleText={'BIENVENUE AUX EDITIONS CHARISMA'}
            topLeftIcon={null}
        >
            <ContentView {...props} />
        </AuthenticationLayout>
    );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationData: state.setAuthenticationTokens.authenticationData
    };
};

export const SignInScreen = connect(mapStateToProps)(ScreenView);
