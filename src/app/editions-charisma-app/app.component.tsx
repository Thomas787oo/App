import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoading, LoadFontsTask, Task } from './../app-loading.component';
import { appMappings, appThemes } from './../app-theming';
import { AppIconsPack } from '../../icon-packs/app-icons-pack';
import { StatusBar } from '../../components/status-bar.component';
import { SplashImage } from '../../components/splash-image.component';
import { AppNavigator } from '../../navigation/editions-charisma-app/app.navigator';
import { AppStorage } from '../../services/app-storage.service';
import { Mapping, Theme, Theming } from '../../services/theme.service';
import mainStore from '../../store/configure-store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FeatherIconsPack } from '../../icon-packs/feather-icons-app';
import { EcIconsPack } from '../../icon-packs/ec-icons-pack';

const loadingTasks: Task[] = [
  () => LoadFontsTask({
    'OpenSansRegular': require('../../assets/fonts/OpenSansRegular.ttf'),
    'RobotoRegular': require('../../assets/fonts/RobotoRegular.ttf'),
    'MontserratRegular': require('../../assets/fonts/MontserratRegular.ttf'),
    'MontserratBold': require('../../assets/fonts/MontserratBold.ttf'),
    'MontserratSemiBold': require('../../assets/fonts/MontserratSemiBold.ttf'),
    'MontserratMedium': require('../../assets/fonts/MontserratMedium.ttf'),
  }),
  () => AppStorage.getMapping(defaultConfig.mapping).then(result => ['mapping', result]),
  () => AppStorage.getTheme(defaultConfig.theme).then(result => ['theme', result]),
];

const defaultConfig: { mapping: Mapping, theme: Theme } = {
  mapping: 'eva',
  theme: 'light',
};

const App = ({ mapping, theme }): React.ReactElement => {

  const [mappingContext, currentMapping] = Theming.useMapping(appMappings, mapping);
  const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack, FeatherIconsPack, EcIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...currentMapping} theme={currentTheme}>
          <Theming.MappingContext.Provider value={mappingContext}>
            <Theming.ThemeContext.Provider value={themeContext}>
              <Provider store={mainStore.store}>
                <PersistGate persistor={mainStore.persistedStore}>
                  <SafeAreaProvider>
                    <StatusBar />
                    <AppNavigator />
                  </SafeAreaProvider>
                </PersistGate>
              </Provider>
            </Theming.ThemeContext.Provider>
          </Theming.MappingContext.Provider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../../assets/editions-charisma-app/images/splash-screen.png')}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => <App {...props} />}
  </AppLoading>
);