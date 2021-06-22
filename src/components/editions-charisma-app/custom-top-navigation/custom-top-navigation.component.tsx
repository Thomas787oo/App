import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import { Dimensions, StyleSheet, View } from 'react-native';
import {Colors} from '../../../common-styles/colors';
import {Fonts} from '../../../common-styles/fonts';

export const CustomTopNavigation = (
  props: {
    text: string;
    leftIcon: 'arrow' | 'cross' | 'none' | null;
    onPressLeft?: () => any;
  } = { text: '', leftIcon: 'arrow', onPressLeft: () => {} },
): React.ReactElement => {
  const GeneratedIcon = (leftIconProps: {
    icon: 'arrow' | 'cross' | 'none' | null;
  }) => {
    let renderedIcon: React.ReactElement;
    switch (leftIconProps.icon) {
      case 'cross':
        renderedIcon = (
          <Icon
            {...props}
            name='x'
            pack='feather'
            style={{ height: 24, tintColor: Colors.greySecondary }}
          />
        );
        break;
      case 'none':
      case null:
        renderedIcon = <></>;
        break;
      case 'arrow':
      default:
        renderedIcon = (
          <Icon
            {...props}
            name='arrow-left'
            style={{ height: 24, tintColor: Colors.greySecondary }}
            pack='feather'
          />
        );
        break;
    }
    return renderedIcon;
  };

  const LeftIconWithStyle = () => <GeneratedIcon icon={props.leftIcon} />;

  const renderAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={LeftIconWithStyle}
      style={{ paddingLeft: 25, marginLeft: 0 }}
      onPress={props.onPressLeft}
    />
  );

  return (
    <>
      <TopNavigation
        title={() => <Text style={styles.headerText}>{props.text}</Text>}
        accessoryLeft={renderAction}
        style={styles.header}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.montserratRegular,
    textAlign: 'center',
    width: Dimensions.get('window').width - 85,
  },
  portionBar: {
    backgroundColor: Colors.baseMain,
    height: 2.5,
    width: 0,
    marginTop: -2.5,
    borderRadius: 3,
    marginLeft: 2,
  },
});
