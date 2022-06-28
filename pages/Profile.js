/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {axiosInstance} from '../services/api';
import {Skeleton, Center, VStack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Button} from 'react-native-paper';
import Bookings from '../features/Bookings';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function Profile({navigation}) {
  const [profileData, setProfileData] = useState(null);
  const [loading, toggleLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getProfileData() {
      const token = await AsyncStorage.getItem('@token');
      axiosInstance
        .get('check-token', {
          headers: {authorization: `Bearer ${token}`},
        })
        .then(res => {
          setProfileData(res.data);
          toggleLoading(false);
        })
        .catch(e => {
          console.log('Error fetching profile data', e);
          toggleLoading(false);
        });
    }
    getProfileData();
  }, []);

  function signOut() {
    AsyncStorage.removeItem('@token');
    navigation.navigate('Login');
  }
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Center h="100%" w="100%">
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: 'coolGray.500',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
          </VStack>
        </Center>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ChangePasswordModal showModal={showModal} setShowModal={setShowModal} />
      <View style={styles.personInfoContainer}>
        <Avatar.Text
          size={74}
          label={`${profileData.first_name[0]}${profileData.last_name[0]}`}
          style={{marginTop: 30}}
        />
        <View style={{marginTop: 15}}>
          <Text>Name: {profileData.full_name}</Text>
          <Text>Email: {profileData.email}</Text>
          <Button
            onPress={() => setShowModal(true)}
            style={{marginTop: 15}}
            mode="contained">
            Change password
          </Button>
          <Button
            onPress={() => signOut()}
            style={{marginTop: 15, backgroundColor: 'red'}}
            mode="contained">
            Sign out
          </Button>
        </View>
      </View>
      <Bookings navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffff',
  },
  personInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
});
