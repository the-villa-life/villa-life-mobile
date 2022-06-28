/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';
import {Center} from 'native-base';

export default function PastBookings({items = []}) {
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
  if (items.length === 0) {
    return (
      <Center>
        <Paragraph>No past bookings</Paragraph>
      </Center>
    );
  }
  return (
    <ScrollView>
      {items.map(item => (
        <Card style={{margin: 20, padding: 15}}>
          <Card.Cover source={{uri: item.listing.display_image}} />
          <Title>{item.listing.title}</Title>
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
        </Card>
      ))}
    </ScrollView>
  );
}
