import React from 'react';
import {View, Pressable, Image, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';

export default function GridListingItem({
  id,
  text,
  url,
  amenities,
  title,
  country,
  address,
  prices,
  navigation,
  occupancy,
  bedrooms,
  bathrooms,
}) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ListingDetail', {
          id,
          text,
          url,
          country,
          amenities,
          title,
          prices,
        });
      }}>
      <Card style={styles.item}>
        <Image style={styles.image} source={{uri: url}} alt="loading image" />
        <Text style={styles.countryText}>
          {address.city ? `${address.city}, ` : ''}
          {address.country}
        </Text>
        <Text>{title}</Text>
        <Text>{`${occupancy} guests · ${bedrooms} bedrooms · ${bathrooms} bathrooms`}</Text>
        <Text style={{fontWeight: 'bold'}}>${prices.base_price} per night</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    margin: 25,
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
  },
  image: {
    // width: '70%',
    height: 200,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  countryText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});
