import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-email-step1';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

export const ChangeEmailStep1Screen = (props: {
    navigation: any,
    route,
    dispatch: Function,
}): React.ReactElement => {

    const onArrowLeftPress = (): void => {
        props.navigation && props.navigation.navigate('Home');
    };

    return (
        <HeaderWithGradientBackgroundLayout
            headerOptions={{
                text: 'MON ADRESSE MAIL',
                leftIcon: 'arrow',
                onPressLeft: onArrowLeftPress,
            }}
        >
            <ContentView { ...props} />
        </HeaderWithGradientBackgroundLayout>
    );
};

