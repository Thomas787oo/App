import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-password-step1/index';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

export const ChangePasswordStep1Screen = (props: {
    navigation: any,
}): React.ReactElement => {

    const onArrowLeftPress = (): void => {
        props.navigation && props.navigation.navigate('Home');
    };

    return (
        <HeaderWithGradientBackgroundLayout
            headerOptions={{
                text: 'MOT DE PASSE',
                leftIcon: 'arrow',
                onPressLeft: onArrowLeftPress,
            }}
        >
            <ContentView { ...props} />
        </HeaderWithGradientBackgroundLayout>
    );
};
