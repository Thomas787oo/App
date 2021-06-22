import React, {ReactElement} from 'react';
import {ViewStyle} from 'react-native';
import {ArrowBackward} from '../assets/editions-charisma-app/ts-svg/arrow-backward';
import {Cross} from '../assets/editions-charisma-app/ts-svg/cross';
import {DropDown} from '../assets/editions-charisma-app/ts-svg/drop-down';
import {EyeOff} from '../assets/editions-charisma-app/ts-svg/eye-off';
import {EyeOn} from '../assets/editions-charisma-app/ts-svg/eye-on';
import {Heart} from '../assets/editions-charisma-app/ts-svg/heart';
import {HeartOutline} from '../assets/editions-charisma-app/ts-svg/heart-outline';
import {Home} from '../assets/editions-charisma-app/ts-svg/home';
import {InfoCircle} from '../assets/editions-charisma-app/ts-svg/info-circle';
import {More} from '../assets/editions-charisma-app/ts-svg/more';
import {Music} from '../assets/editions-charisma-app/ts-svg/music';
import {Pause} from '../assets/editions-charisma-app/ts-svg/pause';
import {Play} from '../assets/editions-charisma-app/ts-svg/play';
import {PlayCircle} from '../assets/editions-charisma-app/ts-svg/play-circle';
import {PlayForward} from '../assets/editions-charisma-app/ts-svg/play-forward';
import {PlusCircle} from '../assets/editions-charisma-app/ts-svg/plus-circle';
import {Search} from '../assets/editions-charisma-app/ts-svg/search';
import {Settings} from '../assets/editions-charisma-app/ts-svg/settings';
import {User} from '../assets/editions-charisma-app/ts-svg/user';

/**
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages#3rd-party-icon-packages
 */
const defaultHeight = 24;
const defaultWidth = 24;
const defaultColor = '#000000';
const IconProvider = (Component) => ({
  toReactElement: ({ animation, ...style }) => {
      return Component(
          style.style !== undefined && style.style.height !== undefined ? style.style.height : defaultHeight,
          style.style !== undefined && style.style.width !== undefined ? style.style.width : defaultWidth,
          style.style !== undefined && style.style.color !== undefined ? style.style.color : defaultColor,
      );
  },
});

export const EcIconsPack = {
  name: 'ec',
  icons: {
    'arrow-backward': IconProvider((height: number, width: number, color: string) => <ArrowBackward height={height} width={width} color={color}/>),
    'cross': IconProvider((height: number, width: number, color: string) => <Cross height={height} width={width} color={color}/>),
    'drop-down': IconProvider((height: number, width: number, color: string) => <DropDown height={height} width={width} color={color}/>),
    'eye-off': IconProvider((height: number, width: number, color: string) => <EyeOff height={height} width={width} color={color}/>),
    'eye-on': IconProvider((height: number, width: number, color: string) => <EyeOn height={height} width={width} color={color}/>),
    'heart': IconProvider((height: number, width: number, color: string) => <Heart height={height} width={width} color={color}/>),
    'heart-outline': IconProvider((height: number, width: number, color: string) => <HeartOutline height={height} width={width} color={color}/>),
    'home': IconProvider((height: number, width: number, color: string) => <Home height={height} width={width} color={color}/>),
    'info-circle': IconProvider((height: number, width: number, color: string) => <InfoCircle height={height} width={width} color={color}/>),
    'more': IconProvider((height: number, width: number, color: string) => <More height={height} width={width} color={color}/>),
    'music': IconProvider((height: number, width: number, color: string) => <Music height={height} width={width} color={color}/>),
    'pause': IconProvider((height: number, width: number, color: string) => <Pause height={height} width={width} color={color}/>),
    'play': IconProvider((height: number, width: number, color: string) => <Play height={height} width={width} color={color}/>),
    'play-circle': IconProvider((height: number, width: number, color: string) => <PlayCircle height={height} width={width} color={color}/>),
    'play-forward': IconProvider((height: number, width: number, color: string) => <PlayForward height={height} width={width} color={color}/>),
    'plus-circle': IconProvider((height: number, width: number, color: string) => <PlusCircle height={height} width={width} color={color}/>),
    'search': IconProvider((height: number, width: number, color: string) => <Search height={height} width={width} color={color}/>),
    'settings': IconProvider((height: number, width: number, color: string) => <Settings height={height} width={width} color={color}/>),
    'user': IconProvider((height: number, width: number, color: string) => <User height={height} width={width} color={color}/>),
  },
};
