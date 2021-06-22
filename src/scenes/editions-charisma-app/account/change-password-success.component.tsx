import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-password-success';
import {connect} from 'react-redux';
import {UserClient} from '../../../model/editions-charisma-app/user-client.model';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

const ScreenView = (
    props: {
        navigation: any,
        user: UserClient,
    }): React.ReactElement => {

    const onArrowLeftPress = (): void => {
        props.navigation && props.navigation.navigate('Home');
    };

    return (
        <HeaderWithGradientBackgroundLayout
            headerOptions={{
                text: 'MOT DE PASSE',
                leftIcon: 'cross',
                onPressLeft: onArrowLeftPress,
            }}
        >
            <ContentView {...props} email={props.user.email} />
        </HeaderWithGradientBackgroundLayout>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.setUserInformation,
    };
};

export const ChangePasswordSuccessScreen = connect(mapStateToProps)(ScreenView);
