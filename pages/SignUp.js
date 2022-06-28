import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput, Button} from 'react-native-paper';
import {axiosInstance} from '../services/api';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [loading, toggleloading] = useState(false);

  function goToLogin() {
    navigation.navigate('Login');
  }

  function doSignUp() {
    if (email && password && firstName && lastName) {
      toggleloading(true);
      const ddd = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        password_confirmation: password,
        subscribe: false,
      };
      axiosInstance
        .post('/signup', ddd)
        .then(response => {
          toggleloading(false);
          navigation.navigate('HomeScreen');
        })
        .catch(err => {
          console.log('siggnup error', err);
          toggleloading(false);
        });
    } else {
      alert('Please fill form correctly');
    }
  }

  return (
    <View style={styles.body}>
      <View style={styles.formBody}>
        <Text style={styles.loginText}>Create account</Text>
        <TextInput
          label="Email"
          mode="outlined"
          placeholder="Enter email here"
          value={email}
          style={styles.textInput}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="First name"
          mode="outlined"
          placeholder="Enter first name"
          value={firstName}
          style={styles.textInput}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          label="Last name"
          mode="outlined"
          placeholder="Enter last name"
          value={lastName}
          style={styles.textInput}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          placeholder="Password here"
          value={password}
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator style={{marginTop: 20}}/>
        ) : (
          <Button
            mode="contained"
            style={styles.buttonStyle}
            onPress={() => doSignUp()}>
            Continue
          </Button>
        )}
        <Text style={{marginTop: 10}}>
          Already have an account ?{' '}
          <Text onPress={goToLogin} style={styles.createAccountText}>
            Login now
          </Text>
        </Text>
      </View>
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
