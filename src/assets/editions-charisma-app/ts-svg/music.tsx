import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const Music = (props: { height?: number, width?: number, color?: string }): ReactElement => {

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

    // original content located at assets/editions-charisma-app/svg/music.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7414 3C12.1094 3 11.6038 3.50561 11.6038 4.13761V15.4295L11.4353 15.3663C10.9718 15.2188 10.4662 15.1345 9.93951 15.1345C7.72749 15.1345 6 16.5671 6 18.3788C6 20.1906 7.72749 21.6231 9.93951 21.6231C12.1515 21.6231 13.879 20.1906 13.879 18.3788V6.41284C13.879 6.41284 17.3972 6.93951 16.1753 10.5209C16.0489 10.879 16.5124 11.1318 16.7652 10.858C21.2314 5.90723 13.563 3 12.7414 3Z" fill="${config.color}"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
