import React from 'react';
import {ImageStyle} from 'react-native';
import {Icon, IconElement} from '@ui-kitten/components';

export const ArrowForwardIconOutline = (style: ImageStyle): IconElement => (
  <Icon {...style} name='arrow-forward-outline'/>
);

export const FacebookIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='facebook'/>
);

export const GoogleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='google'/>
);

export const HeartIconFill = (style: ImageStyle): IconElement => (
  <Icon {...style} name='heart'/>
);

export const TwitterIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='twitter'/>
);

export const EyeOnIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='eye' pack={'feather'}/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='eye-off' pack={'feather'}/>
);

export const CrossClose = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close-outline'/>
);
