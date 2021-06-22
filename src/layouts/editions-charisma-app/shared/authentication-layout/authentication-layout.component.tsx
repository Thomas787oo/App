import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaLayout} from '../safe-area-layout/safe-area-layout.component';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {LinearGradient} from 'expo-linear-gradient';
import {Icon, Text} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';

export const AuthenticationLayout = (props: {
  children: any;
  titleText: string,
  topLeftIcon: 'arrow-backward' | 'cross' | 'none' | null;
  topLeftIconOnPress?: () => any;
}): React.ReactElement => {
  return (
    <SafeAreaLayout insets='top' style={styles.safeArea}>
          <LinearGradient
              // Background Linear Gradient
              colors={[Colors.orange, Colors.yellow]}
              style={styles.linearGradient}
              start={{ x: 0.1, y: 1 }}
              end={{ x: 1, y: 1 }}
          >
              <View style={styles.topLeftIconContainer}>
                  {
                      ['none', null].indexOf(props.topLeftIcon) === -1 ?
                      <TouchableOpacity onPress={props.topLeftIconOnPress}>
                          <Icon
                              name={props.topLeftIcon}
                              pack='ec'
                              style={styles.topLeftIcon}
                          />
                      </TouchableOpacity>
                      :
                      null
                  }
              </View>

              <InputScrollView>
                  <View style={styles.logo}>
                      <Image
                          style={{ width: 75, height: 75 }}
                          source={require('../../../../assets/editions-charisma-app/images/logo.png')}>
                      </Image>
                  </View>
                  <View>
                    <Text style={styles.title}>
                        { props.titleText }
                    </Text>
                    <View style={styles.titleSeparator}/>
                  </View>
                    {props.children}
              </InputScrollView>
        </LinearGradient>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  mainContainer: {
      flex: 1,
      backgroundColor: 'red',
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  topLeftIconContainer: {
    height : 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  topLeftIcon: {
    height: 24,
    color: Colors.white,
    marginRight: -20,
  },
  logo: {
    height : 100,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Fonts.montserratBold,
  },
  titleSeparator: {
    width: 100,
    height: 1,
    marginTop: 15,
    marginBottom: 17,
    backgroundColor: Colors.white,
  },
});
