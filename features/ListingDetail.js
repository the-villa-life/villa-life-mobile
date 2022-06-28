/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {Divider, Button, Headline} from 'react-native-paper';
import Ammenities from './Ammenities';
import DateSelector from '../components/DateSelector';
import ReadMore from '@fawazahmed/react-native-read-more';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {axiosInstance} from '../services/api';
import IconButtonComp from '../components/IconButtonComp';

export default function ListingDetail({route, navigation}) {
  const [dates, setDates] = useState(null);
  const [end, setEnd] = useState(null);
  const [days, setDays] = useState(1);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [disabledDates, setDisableddates] = useState(['30-05-2022']);
  const [total, setTotal] = useState(0);
  const {text, url, country, amenities, prices, id, address} = route.params;

  async function getRange(date) {
    let monthStart = moment(date).format('YYYY-MM-DD');
    let monthEnd = moment(date).add(1, 'months').format('YYYY-MM-DD');
    const url = `/listings/${id}/availability?from=${monthStart}&to=${monthEnd}`;
    axiosInstance.get(url).then(res => {
      const blockedDates = res.data
        .filter(item => item.status === 'booked')
        .map(row => row.date);
      setDisableddates(blockedDates);
    });
  }

  function bookNow() {
    navigation.navigate('Payment', {
      listingId: id,
      country,
      prices,
      start: dates,
      end: end,
      adults: noOfGuests,
    });
  }

  function currencyFormat(num) {
    return parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function increaseNumberOfGuests() {
    setNoOfGuests(noOfGuests + 1);
  }

  function decreaseNumberOfGuests() {
    if (noOfGuests !== 0) {
      setNoOfGuests(noOfGuests - 1);
    }
  }

  function updateDates(dateObject) {
    if (dateObject.mode === 'end') {
      setEnd(dateObject.date);
      const diffInMs = new Date(dateObject.date) - new Date(dates);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      setDays(diffInDays);
      const totalPrice = parseFloat(prices.base_price) * parseFloat(days);
      setTotal(totalPrice);
    }
    if (dateObject.mode === 'start') {
      setDates(dateObject.date);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <SelectProvider>
        <ScrollView>
          <ImageBackground
            source={{uri: url}}
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
              {/* <Text
                onPress={() => navigation.goBack()}
                style={{fontSize: 24, fontWeight: '900'}}>
                X
              </Text> */}
            </View>
          </ImageBackground>
          <View style={{margin: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 34}}>Total </Text>
              <View>
                <Headline style={{fontSize: 27, marginTop: 15}}>{`${
                  prices.currency
                } ${currencyFormat(
                  parseFloat(prices.base_price) * parseFloat(days),
                )}`}</Headline>
                <Text>{`${currencyFormat(prices.base_price)} x ${days.toFixed(
                  0,
                )} night(s)`}</Text>
              </View>
            </View>
            <ReadMore
              numberOfLines={10}
              style={{marginTop: 17, fontSize: 14, marginBottom: 20}}
              seeMoreStyle={{color: 'black', fontWeight: 'bold'}}
              seeLessStyle={{color: 'black', fontWeight: 'bold'}}>
              {text}
            </ReadMore>
            <View style={{flexDirection: 'row'}}>
              <Divider style={{height: 2, marginBottom: 30}} />
            </View>
            <View style={{marginLeft: 10}}>
              <Ammenities data={amenities} />
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <DateSelector
                  onUpdate={updateDates}
                  onMonthChangeFunction={getRange}
                  blockedDates={disabledDates}
                />
                <IconButtonComp
                  iconName="calendar"
                  extras={{width: 20, borderWidth: 0}}
                  onIconPress={decreaseNumberOfGuests}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 25,
              }}>
              <View>
                <Headline>Adults</Headline>
                <Text>13+</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <IconButtonComp
                  iconName="minus"
                  extras={{height: 10}}
                  onIconPress={decreaseNumberOfGuests}
                />
                <Headline style={{margin: 15, marginTop: 6}}>
                  {noOfGuests}
                </Headline>
                <IconButtonComp
                  iconName="plus"
                  extras={{height: 10}}
                  onIconPress={increaseNumberOfGuests}
                />
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
    backgroundColor: '#ffff',
  },
  image: {
    width: '100%',
    height: 255,
  },
});
