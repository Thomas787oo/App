import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const FeatherIconsPack = {
    name: 'feather',
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    });
}

const IconProvider = (name: string) => ({
    toReactElement: (props: { name: string, style: any }) => FeatherIcon({ name, ...props }),
});

const FeatherIcon = ({ name, style }) => {
    let finalHeight = 24;
    let finalTintColor = '#000';
    let finalIconStyle = {};
    if(style != undefined) {
        const { height,  tintColor, ...iconStyle } = StyleSheet.flatten(style);
        finalHeight = height;
        finalTintColor = tintColor;
        finalIconStyle = iconStyle;
    }
    return (
        <Icon name={name} size={finalHeight} color={finalTintColor} style={finalIconStyle} />
    );
}
