import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const HeartOutline = (props: { height?: number, width?: number, color?: string }): ReactElement => {

    const config = { height: 24, width: 24, color: '#000000' };
    if (props.height) {
        config.height = props.height;
    }
    if (props.width) {
        config.width = props.width;
    }
    if (props.color) {
        config.color = props.color;
    }

    // original content located at assets/editions-charisma-app/svg/heart-outline.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="${config.color}"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
