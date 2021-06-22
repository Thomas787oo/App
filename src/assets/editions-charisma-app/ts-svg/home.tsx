import React, {ReactElement} from 'react';
import {SvgXml} from 'react-native-svg';

export const Home = (props: { height?: number, width?: number, color?: string }): ReactElement => {

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

    // original content located at assets/editions-charisma-app/svg/home.svg
    const svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12.2065V20.1362C22 20.3653 21.9077 20.585 21.7433 20.747C21.5789 20.909 21.356 21 21.1236 21H15.865C15.6326 21 15.4097 20.909 15.2453 20.747C15.0809 20.585 14.9886 20.3653 14.9886 20.1362V18.1149C14.9886 17.3337 14.6737 16.5845 14.1133 16.0321C13.5528 15.4797 12.7926 15.1693 12 15.1693C11.2074 15.1693 10.4472 15.4797 9.88674 16.0321C9.32626 16.5845 9.01139 17.3337 9.01139 18.1149V20.1362C9.01139 20.3653 8.91906 20.585 8.75469 20.747C8.59033 20.909 8.36741 21 8.13497 21H2.87642C2.64398 21 2.42106 20.909 2.2567 20.747C2.09234 20.585 2 20.3653 2 20.1362V12.2065C1.99982 11.9785 2.04541 11.7528 2.13416 11.5423C2.22291 11.3317 2.35305 11.1406 2.51709 10.9799L11.3427 2.25551C11.4242 2.17455 11.5211 2.11029 11.6279 2.06643C11.7347 2.02258 11.8492 2 11.9649 2C12.0806 2 12.1952 2.02258 12.302 2.06643C12.4088 2.11029 12.5057 2.17455 12.5872 2.25551L21.4829 10.9799C21.6469 11.1406 21.7771 11.3317 21.8658 11.5423C21.9546 11.7528 22.0002 11.9785 22 12.2065Z" fill="${config.color}"/>
</svg>
`;

    const SvgRender = () => <SvgXml xml={svgContent} width={config.width} height={config.height} /> ;

    return <SvgRender/>;
}
