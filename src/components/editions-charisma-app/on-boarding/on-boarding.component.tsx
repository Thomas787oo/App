import React from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../../common-styles/colors';

export class OnBoarding extends React.Component<
  {
    footerContent: React.ReactElement;
    views: Array<React.ReactElement>;
    closeOnBoardingOptions?: {
      show: boolean;
      text?: string;
      closeFunction?: () => any;
    };
  },
  { pagePosition: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pagePosition: 1,
    };
  }

  render() {
    const circleBackgroundColor = this.props.views.map(() => Colors.legacyGrey25);
    circleBackgroundColor[this.state.pagePosition - 1] = Colors.baseMain;

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ScrollView
            style={styles.onboardingScrollView}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.onScrollHandler}
          >
            {this.props.views.map((view, i) => (
              <View style={styles.onboardingView} key={i}>
                {view}
              </View>
            ))}
          </ScrollView>
          {this.props.closeOnBoardingOptions ? (
            <TouchableOpacity
              onPress={this.props.closeOnBoardingOptions.closeFunction}
              style={styles.closeButton}
            >
              <Text>
                {this.props.closeOnBoardingOptions.text !== undefined
                  ? this.props.closeOnBoardingOptions.text
                  : 'Passer'}
              </Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.bottomOptions}>
            <View
              style={[
                styles.positionIndicatorsRow,
                { width: this.props.views.length * 20 },
              ]}
            >
              {this.props.views.map((_view, index) => (
                <View
                  style={[
                    styles.positionIndicatorCircle,
                    { backgroundColor: circleBackgroundColor[index] },
                  ]}
                />
              ))}
            </View>

            {this.props.footerContent}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  onScrollHandler = (event: { nativeEvent: NativeScrollEvent }) => {
    let pagePosition = 1;
    const scrollViewAbscissa = event.nativeEvent.contentOffset.x;
    const pageWidth = Dimensions.get('window').width;
    // On va voir si le reste de la division de l'abscisse par rapport à la largeur de l'écran est égale à 0. Si oui, le résultat de la division, nous donnera la page
    const remain = scrollViewAbscissa % pageWidth;
    if (remain === 0) {
      pagePosition = scrollViewAbscissa / pageWidth + 1;
      // Si le numéro de page ainsi calculé est différent de celui en cours, on le met à jour
      if (this.state.pagePosition !== pagePosition) {
        this.setState({ pagePosition: pagePosition });
      }
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingScrollView: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  onboardingView: {
    flex: 1,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  bottomOptions: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 130,
    display: 'flex',
  },
  positionIndicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginVertical: 10,
  },
  positionIndicatorCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
