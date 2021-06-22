import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/account/change-email-success';
import {UserClient} from '../../../model/editions-charisma-app/user-client.model';
import {connect} from 'react-redux';
import {HeaderWithGradientBackgroundLayout} from '../../../layouts/editions-charisma-app/shared/header-with-gradient-background-layout/header-with-gradient-background-layout.component';

const ScreenView = (
    props: { navigation: any,
             user: UserClient,
             dispatch: Function,
    }): React.ReactElement => {

  const email = props.user && props.user.email ? props.user.email : null;

  const onArrowLeftPress = (): void => {
     props.navigation && props.navigation.navigate('Home');
  };

  return (
     <HeaderWithGradientBackgroundLayout
         headerOptions={{
             text: 'MON ADRESSE MAIL',
             leftIcon: 'cross',
             onPressLeft: onArrowLeftPress,
         }}
     >
         <ContentView
             navigation={props.navigation}
             email={email}
             dispatch={props.dispatch}
         />
     </HeaderWithGradientBackgroundLayout>
  );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.setUserInformation,
    };
};

export const ChangeEmailSuccessScreen = connect(mapStateToProps)(ScreenView);
