import React, {useEffect} from 'react';
import {Provider} from 'react-native-paper';
import {Router} from './navigation/Router';
import {AuthProvider} from './context/Auth';
import EStyleSheet from 'react-native-extended-stylesheet';
import {NativeBaseProvider} from 'native-base';
import {StripeProvider} from '@stripe/stripe-react-native';
// import CheckAuth from './navigation/CheckAuth';

export default function App() {
  EStyleSheet.build({
    // always call EStyleSheet.build() even if you don't use global variables!
    $textColor: '#0275d8',
    $primary: '#1A3680',
    $dark: '#222222',
  });
  return (
    <StripeProvider
      publishableKey="pk_test_51KvMWMJyXAiPWkNy9TFyTcOSliOsDyfxLNOz5GV70nNPfzpxRf9inu6iF5KMRczI9DRpKHsveWQLnjoJMsf31mBa00vLUCdCRe"
      // merchantIdentifier="merchant.identifier"
    >
      <AuthProvider>
        <Provider>
          <NativeBaseProvider>
            <Router />
          </NativeBaseProvider>
        </Provider>
      </AuthProvider>
    </StripeProvider>
  );
}
