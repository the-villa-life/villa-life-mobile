/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';

export const STATUS = {
  INQUIRY: -1,
  PENDING: 0,
  CONFIRMED: 1,
  DECLINED: 2,
  CANCELED: 3,
  RESERVED: 4,
  AWAITING_PAYMENT: 5,
};

export default function UpcomingBookings({navigation, items = []}) {
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
  function openDetails(item) {
    navigation.navigate('BookingDetail', item);
  }
  return (
    <ScrollView>
      {items
        .filter(x => ![2, 3].includes(x.status))
        .map((item, index) => (
          <Card
            key={`${index}`}
            onPress={() => openDetails(item)}
            style={{margin: 20, padding: 15}}>
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
