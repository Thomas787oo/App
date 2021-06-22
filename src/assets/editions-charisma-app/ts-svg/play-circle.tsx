import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const PlayCircle = (props: { height?: number, width?: number, color?: string }): ReactElement => {

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

    // original content located at assets/editions-charisma-app/svg/play-circle.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="7" fill="${config.color}"/>
<path d="M12 0C5.38105 0 0 5.38105 0 12C0 18.6189 5.38105 24 12 24C18.6189 24 24 18.6189 24 12C24 5.38105 18.6189 0 12 0ZM15.8653 12.6063L10.2063 16.3705C9.72632 16.6989 9.06947 16.3453 9.06947 15.7642V8.23579C9.06947 7.65474 9.72632 7.30105 10.2063 7.62947L15.8653 11.3937C16.2947 11.6716 16.2947 12.3284 15.8653 12.6063Z" fill="white"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
