import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-password-error';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

export const ChangePasswordErrorScreen = (
    props: { navigation: any }): React.ReactElement => {

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
            <ContentView {...props} />
        </HeaderWithGradientBackgroundLayout>
    );
};
