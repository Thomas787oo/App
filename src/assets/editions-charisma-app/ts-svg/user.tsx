import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const User = (props: { height?: number, width?: number, color?: string }): ReactElement => {

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

    // original content located at assets/editions-charisma-app/svg/user.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3667 11.8564C14.8548 11.8564 16.8718 9.83943 16.8718 7.35132C16.8718 4.86321 14.8548 2.84619 12.3667 2.84619C9.87854 2.84619 7.86153 4.86321 7.86153 7.35132C7.86153 9.83943 9.87854 11.8564 12.3667 11.8564Z" fill="${config.color}"/>
<path d="M12.3667 13.1436C10.1485 13.1461 8.02186 14.0284 6.45336 15.5969C4.88486 17.1654 4.00256 19.292 4 21.5102C4 21.6809 4.06781 21.8446 4.1885 21.9653C4.3092 22.086 4.4729 22.1538 4.64359 22.1538H20.0897C20.2604 22.1538 20.4241 22.086 20.5448 21.9653C20.6655 21.8446 20.7333 21.6809 20.7333 21.5102C20.7308 19.292 19.8485 17.1654 18.28 15.5969C16.7115 14.0284 14.5849 13.1461 12.3667 13.1436Z" fill="${config.color}"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
