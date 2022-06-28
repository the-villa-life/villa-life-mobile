/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import {axiosInstance} from '../services/api';

export const STATUS = {
  INQUIRY: -1,
  PENDING: 0,
  CONFIRMED: 1,
  DECLINED: 2,
  CANCELED: 3,
  RESERVED: 4,
  AWAITING_PAYMENT: 5,
};

export default function BookingDetail({route, navigation}) {
  const item = route.params;
  function getStatusText(code) {
    switch (code) {
      case -1:
        return 'Inquiry';
      case 0:
        return 'Pending';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Declined';
      case 3:
        return 'Canceled';
      case 4:
        return 'Reserved';
      case 5:
        return 'Awaiting payment';
    }
  }

  async function cancelBooking() {
    const token = await AsyncStorage.getItem('@token');
    axiosInstance
      .put(
        `/bookings/${item.id}/cancel`,
        {},
        {
          headers: {authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        if (res.status === 200) {
          Snackbar.show({
            text: 'Booking successfully cancelled',
            duration: Snackbar.LENGTH_SHORT,
          });
          navigation.navigate('HomeScreen');
        }
      })
      .catch(err => console.log('Error cancelling booking', err));
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: '#ffff', marginBottom: 15, padding: 20}}>
        {/* <Text>{JSON.stringify(item.invoice)}</Text> */}
        <Card style={{margin: 2, padding: 15}}>
          <Card.Cover source={{uri: item.listing.display_image}} />
          <Title>{item.listing.title}</Title>
          <Paragraph>{item.listing.address.full}</Paragraph>
        </Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <Title>Details</Title>
          <Button
            onPress={() => cancelBooking()}
            style={{backgroundColor: 'red'}}
            mode="contained">
            Cancel booking
          </Button>
        </View>
        <Paragraph>
          Dates:{' '}
          {`${moment(item.check_in).format('YYYY-MM-DD')} - ${moment(
            item.check_out,
          ).format('YYYY-MM-DD')}`}
        </Paragraph>
        <Paragraph>Guests: {item.total_guests}</Paragraph>
        <Button style={{marginTop: 20}} mode="contained">{`${getStatusText(
          item.status,
        )}`}</Button>
        <Title>Invoice</Title>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Title>Items</Title>
            <Title>{item.invoice.total_amount}</Title>
          </View>
          {item.invoice.invoice_items.map(invoiceItem => (
            <View
              key={invoiceItem.id}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{invoiceItem.description}</Text>
              <Text>{invoiceItem.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
