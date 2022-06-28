/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {axiosInstance} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');
  const [loading, toggleloading] = useState(false);

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  const onDismissSnackBar = () => setError('');

  async function doLogin() {
    if (email.length === 0 || password.length === 0) {
      alert('Please fill data');
      return;
    }
    toggleloading(true);
    axiosInstance
      .post('/login', {
        email: email,
        password: password,
      })
      .then(async response => {
        if (response.data.token) {
          try {
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem('@userdetails', jsonValue);
            await AsyncStorage.setItem('@token', response.data.token);
            toggleloading(false);
            setEmail(null);
            setPassword(null);
            navigation.navigate('HomeScreen');
          } catch (e) {
            // saving error
            toggleloading(false);
            console.log('Error saving token', e);
          }
        }
      })
      .catch(error => {
        console.log('errr', error);
        toggleloading(false);
        if (error.message === 'Request failed with status code 401') {
          setError('Incorrect email and/or password');
        }
      });
  }

  return (
    <View style={styles.body}>
      <View style={styles.formBody}>
        <Text style={styles.loginText}>Welcome again</Text>
        <TextInput
          label="Email"
          mode="outlined"
          placeholder="Enter email here"
          value={email}
          style={styles.textInput}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          placeholder="Password here"
          secureTextEntry
          value={password}
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator style={{marginTop: 20}} />
        ) : (
          <Button
            mode="contained"
            style={styles.buttonStyle}
            onPress={() => doLogin()}>
            Login
          </Button>
        )}
        <Text style={{marginTop: 10}}>
          Dont have an account ?{' '}
          <Text onPress={goToSignUp} style={styles.createAccountText}>
            Create one now
          </Text>
        </Text>
      </View>
      {error.length > 0 && (
        <Snackbar
          visible={true}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Got it',
            onPress: () => {
              // Do something
              setError('');
            },
          }}>
          {error}
        </Snackbar>
      )}
    </View>
  );
}

// define extended styles
const styles = EStyleSheet.create({
  body: {
    backgroundColor: '#ffff',
    flex: 1,
    justifyContent: 'center',
  },
  formBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: '0.9rem',
    textAlign: 'center',
    marginBottom: '0.8rem',
  },
  textInput: {
    width: '16rem',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: '$primary',
    width: '16rem',
    height: 48,
    padding: 5,
    marginTop: 10,
  },
  createAccountText: {
    textDecorationLine: 'underline',
    color: '$primary',
  },
});
