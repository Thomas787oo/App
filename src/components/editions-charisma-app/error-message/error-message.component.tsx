import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Colors } from "../../../common-styles/colors";
import { Fonts } from "../../../common-styles/fonts";

export const ErrorMessage = (props: {
    error?: FieldError,
    styleContainer?: object | null
}): React.ReactElement => {

    return (
        <View style={[styles.errorContainer, props.styleContainer,
        !(props.error && props.error.message) ? styles.hidden : null]}>
            <View style={styles.iconContainer}>
                <Icon name={'info-circle'} pack='ec' style={{ color: Colors.white }} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[
                    styles.errorText,
                ]}>
                    {props.error && props.error.message
                        ? props.error.message
                        : null}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: Colors.red,
        marginBottom: 2,
        marginTop: 8,
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    hidden: {
        height: 0,
        opacity: 0
    },
    iconContainer: {
        width: 35, paddingLeft: 4.5
    },

    errorText: {
        color: Colors.white,
        fontSize: 11,
        textAlign: 'left',
        height: 12,
        fontFamily: Fonts.montserratMedium,
    },
});