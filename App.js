import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store';
import { Provider } from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainComponent from './tabs/main'
import LoginScreen from './screens/register'
import fetchUserLogin from './network/fetchUserLogin'
import * as SplashScreen from 'expo-splash-screen';
import VerifyOtpScreen from './screens/verifyOtp'
import LoadingComponent from './components/loadingComponent'

import ProductAddScreen from './screens/product/add'

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initRouteName, setInitRouteName] = useState('Login');

  useEffect(() => {
    async function prepare() {
      try {
        await fetchUserLogin().then(data => {
          if(data) {
            setInitRouteName('Main')
          }
        })
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  onLayoutRootView()
  return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={initRouteName}
            >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Đăng nhập', headerTitleAlign: 'center'}}
              />
              <Stack.Screen
                name="VerifyOtp"
                component={VerifyOtpScreen}
                options={{title: 'Xác nhận mã otp', headerTitleAlign: 'center'}}
              />
              <Stack.Screen
                name="Main"
                component={MainComponent}
                options={{ headerShown: false  }}
              />
              <Stack.Screen
                name="productAdd"
                component={ ProductAddScreen }
                options={{ headerShown: true, title: "Thêm mới sản phẩm" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <LoadingComponent/>
        </PaperProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
