/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Paragraph, Text} from 'react-native-paper';
import {Select} from '@mobile-reality/react-native-select-pro';
import {axiosInstance} from '../services/api';
import DateSelector from '../components/DateSelector';
import {Skeleton} from 'native-base';

export default function SearchForm({navigation}) {
  const [dates, setDates] = useState(null);
  const [end, setEnd] = useState(null);
  const [days, setDays] = useState(1);
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState('');
  const [noOfGuests, setNoOfGuests] = useState(1);
  const guestRange = range(0, 17);

  function searchListings() {
    let startDate = new Date(dates).toISOString().split('T')[0] || new Date();
    let endDate = new Date(end).toISOString().split('T')[0] || new Date();
    const searchParams = {
      check_in: startDate,
      check_out: endDate,
      min_occupancy: noOfGuests,
      country: location.replace(' ', '+'),
    };
    navigation.navigate('Listings', searchParams);
  }

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  useEffect(() => {
    axiosInstance
      .get('/listings/cities')
      .then(res => {
        if (res.status === 200) {
          setCities(res.data.data);
        }
      })
      .catch(error => console.log('errr', error));
  }, []);

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
  if (cities.length > 0) {
    return (
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Text style={{marginBottom: 10}}>Location</Text>
          <Select
            onSelect={item => setLocation(item?.value)}
            placeholderText="Destination"
            options={cities.map(item => {
              return {
                value: item.country,
                label: item.country,
              };
            })}
          />
          <View style={{flexDirection: 'column', marginTop: 25}}>
            <View style={{width: '45%', marginRight: 10}}>
              <DateSelector onUpdate={updateDates} />
            </View>
            <View style={{width: '50%', marginTop: 10}}>
              <Text>Guests</Text>
              <Select
                onSelect={item => setNoOfGuests(item?.value)}
                options={guestRange.map(item => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
              />
            </View>
          </View>
          <Button
            mode="contained"
            style={styles.searchButton}
            onPress={() => searchListings()}>
            Search
          </Button>
        </Card.Content>
      </Card>
    );
  }
  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <Paragraph style={{marginBottom: 20, marginLeft: 20}}>
          Loading cities
        </Paragraph>
        <Skeleton.Text px="4" />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    margin: 30,
    padding: 10,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#1A3680',
    margin: 20,
    marginLeft: 0,
    borderRadius: 6,
  },
});
