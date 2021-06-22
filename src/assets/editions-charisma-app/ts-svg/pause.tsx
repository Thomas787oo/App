import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const Pause = (props: { height?: number, width?: number, color?: string }): ReactElement => {

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

    // original content located at assets/editions-charisma-app/svg/pause.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="${config.color}"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
