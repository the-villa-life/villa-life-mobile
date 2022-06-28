/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {Select} from '@mobile-reality/react-native-select-pro';
import {Button} from 'react-native-paper';
import DateSelector from '../components/DateSelector';
import {searchLocations} from '../store/seachLocations';

export default function Search({navigation}) {
  const [dates, setDates] = useState('');
  const [end, setEnd] = useState('');
  const [days, setDays] = useState(1);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);
  const [location, setLocation] = useState('');
  const childGuestRange = range(0, 10);
  const guestRange = range(0, 17);
  const imageUrl =
    'https://res.cloudinary.com/makemeup/image/upload/v1650911565/mainImage_o0njxy.png';

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  function searchListings() {
    // alert('Search')
    // const startDate = new Date(dates).toISOString().split("T")[0];
    // const endDate = new Date(end).toISOString().split("T")[0];
    // const searchParams = {
    //   check_in: startDate,
    //   check_out: endDate,
    //   min_occupancy: noOfGuests,
    //   country: location.replace(' ','+')
    // }
    // console.log('seee', searchParams)
    navigation.navigate('Listings');
  }

  function updateDates(dateObject) {
    if (dateObject.mode === 'end') {
      setEnd(dateObject.date);
      const diffInMs = new Date(dateObject.date) - new Date(dates);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      setDays(diffInDays);
    }
    if (dateObject.mode === 'start') {
      setDates(dateObject.date);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <SelectProvider>
        <ImageBackground
          source={{uri: imageUrl}}
          imageStyle={{
            borderRadius: 6,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.formBody}>
            <View>
              <Text>Location</Text>
              <Select
                onSelect={item => setLocation(item.value)}
                options={searchLocations.map(item => {
                  return {
                    value: item.label,
                    label: item.label,
                  };
                })}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <DateSelector onUpdate={updateDates} />
            </View>
            <Text>Number of Guests</Text>
            <Select
              onSelect={item => setNoOfGuests(item.value)}
              options={childGuestRange.map(item => {
                return {
                  value: item,
                  label: item,
                };
              })}
            />
            <Text>Number of Children</Text>
            <Select
              onSelect={item => setNoOfChildren(item.value)}
              options={guestRange.map(item => {
                return {
                  value: item,
                  label: item,
                };
              })}
            />
            <Button
              style={{backgroundColor: '#1A3680', marginTop: 30}}
              onPress={() => searchListings()}>
              <Text style={{color: '#ffff'}}>SEARCH</Text>
            </Button>
          </View>
        </ImageBackground>
      </SelectProvider>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffff',
  },
  formBody: {
    backgroundColor: '#ffff',
    opacity: 0.4,
    padding: 25,
  },
  image: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '1.3rem',
  },
});
