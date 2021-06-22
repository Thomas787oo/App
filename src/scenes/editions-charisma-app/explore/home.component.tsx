import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/explore/home/index';
import {SafeAreaLayout} from '../../../layouts/editions-charisma-app/shared/safe-area-layout/safe-area-layout.component';
import {StyleSheet} from 'react-native';
import {CustomTopNavigation} from '../../../components/editions-charisma-app/custom-top-navigation/custom-top-navigation.component';

export const HomeScreen =  (props: { navigation, dispatch }): React.ReactElement => {
    return (
        <SafeAreaLayout
            insets='top'
            style={styles.safeArea}>
            <CustomTopNavigation
                leftIcon={'none'}
                text={'EXPLORER'}
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
