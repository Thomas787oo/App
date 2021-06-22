import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-email-step2';
import {connect} from 'react-redux';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

const ScreenView = (props: { navigation, route: any, dispatch: Function }): React.ReactElement => {

  const {email} = props.route.params;

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
        <ContentView { ...props} email={email} />
     </HeaderWithGradientBackgroundLayout>
  );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.setUserInformation,
    };
};

export const ChangeEmailStep2Screen = connect(mapStateToProps)(ScreenView);
