/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Divider, Button, TextInput} from 'react-native-paper';
import Ammenities from './Ammenities';
import DateSelector from '../components/DateSelector';
import ReadMore from '@fawazahmed/react-native-read-more';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {axiosInstance} from '../services/api';

export default function ListingObject({route, navigation}) {
  const [dates, setDates] = useState(null);
  const [end, setEnd] = useState(null);
  const [days, setDays] = useState(1);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [listingData, setListingData] = useState(null);
  const {id} = route.params;

  useEffect(() => {
    axiosInstance.get(`/listings/${id}`).then(response => {
      setListingData(response.data);
    });
  }, []);

  function bookNow() {
    navigation.navigate('Payment');
  }

  function currencyFormat(num) {
    return parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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

  if (listingData === null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SelectProvider>
        <ScrollView>
          <ImageBackground
            source={{uri: listingData.display_image}}
            resizeMode="cover"
            style={styles.image}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginTop: 10,
                marginRight: 20,
              }}>
              <Text
                onPress={() => navigation.goBack()}
                style={{fontSize: 24, fontWeight: '900'}}>
                X
              </Text>
            </View>
          </ImageBackground>
          <View style={{margin: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 34}}>Total </Text>
              <Text style={{fontSize: 20, marginTop: 15}}>{`${
                listingData.prices.currency
              }${currencyFormat(
                parseFloat(listingData.prices.base_price) * parseFloat(days),
              )}`}</Text>
            </View>
            <ReadMore
              numberOfLines={10}
              style={{marginTop: 17, fontSize: 14, marginBottom: 20}}
              seeMoreStyle={{color: 'black', fontWeight: 'bold'}}
              seeLessStyle={{color: 'black', fontWeight: 'bold'}}>
              {listingData.description}
            </ReadMore>
            <View style={{flexDirection: 'row'}}>
              <Divider style={{height: 2, marginBottom: 30}} />
            </View>
            <View style={{marginLeft: 10}}>
              <Ammenities data={listingData.amenities} />
              <View style={{flexDirection: 'row'}}>
                <DateSelector onUpdate={updateDates} />
                <View style={{marginTop: 43, marginLeft: 30}}>
                  <TextInput
                    label="No of Guests"
                    mode="outlined"
                    keyboardType="numeric"
                    placeholder="1 Guest"
                    value={noOfGuests}
                    style={{width: 150, height: 40}}
                    onChangeText={text => setNoOfGuests(text)}
                  />
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <Text>{`${currencyFormat(
                  listingData.prices.base_price,
                )} x ${days} night(s)`}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SelectProvider>
      <Button style={{backgroundColor: '#1A3680'}} onPress={() => bookNow()}>
        <Text style={{color: '#ffff'}}>BOOK NOW</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffff',
  },
  image: {
    width: '100%',
    height: 215,
  },
});
