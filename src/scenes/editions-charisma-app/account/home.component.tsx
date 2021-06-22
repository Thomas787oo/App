import React from 'react';
import {StyleSheet} from 'react-native';
import ContentView from '../../../layouts/editions-charisma-app/account/home';
import {connect} from 'react-redux';
import {UserClient} from '../../../model/editions-charisma-app/user-client.model';
import {SafeAreaLayout} from '../../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';
import {CustomTopNavigation} from '../../../components/editions-charisma-app/custom-top-navigation/custom-top-navigation.component';

const ScreenView =  (props: { navigation, dispatch, user: UserClient }): React.ReactElement => {
    return (
        
        <SafeAreaLayout
            insets='top'
            style={styles.safeArea}>
            <CustomTopNavigation
                leftIcon={'none'}
                text={'COMPTE'}
                onPressLeft={() => {}}
            />
            <ContentView {...props}/>
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        flex: 1,
    },
    container : {
        flex: 1,
        backgroundColor: 'white',
    },
});

const mapStateToProps = (state: any) => {
    return {
        user: state.setUserInformation,
        authenticationData: state.setAuthenticationTokens.authenticationData,
    };
};

export const HomeScreen = connect(mapStateToProps)(ScreenView);
