import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default (props: { navigation, dispatch }): React.ReactElement => {

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>
                Futur contenu à venir  ici...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
