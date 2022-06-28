/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View, Pressable, Image} from 'react-native';
import {Paragraph, Title, Chip} from 'react-native-paper';

export default function Explore({navigation}) {
  const destinations = [
    {
      location: 'barbados',
      searchLink: '/search?country=Barbados',
      uri: require('../images/barbados.png'),
      comingSoon: false,
    },
    {
      location: 'saint-martin',
      searchLink: '/search?country=Saint%20Martin',
      uri: require('../images/saint-martin.png'),
      comingSoon: false,
    },
    {
      location: 'saint-barthélemy',
      searchLink: '/search?country=Saint%20Barthelemy',
      uri: require('../images/saint-barthélemy.png'),
      comingSoon: false,
    },
    {
      location: 'palm-springs',
      searchLink: '/search',
      uri: require('../images/palm-springs.png'),
      comingSoon: true,
    },
    {
      location: 'los-angeles',
      searchLink: '/search',
      uri: require('../images/los-angeles.png'),
      comingSoon: true,
    },
    {
      location: 'hawaii',
      searchLink: '/search',
      uri: require('../images/hawaii.png'),
      comingSoon: true,
    },
    {
      location: 'punta-mita',
      searchLink: '/search',
      uri: require('../images/punta-mita.png'),
      comingSoon: true,
    },
  ];

  function openListingsForLocation(location, comingSoon) {
    if (!comingSoon) {
      const searchParams = {
        // check_in: startDate,
        // check_out: endDate,
        // min_occupancy: noOfGuests,
        country: location.replace(' ', '+'),
      };
      navigation.navigate('Listings', searchParams);
    }
  }
  const Item = ({image, location, comingSoon}) => (
    <Pressable onPress={() => openListingsForLocation(location, comingSoon)}>
      <View style={{margin: 15, opacity: comingSoon ? 0.5 : 1}}>
        <Image
          source={image}
          style={{width: 300, height: 400, borderRadius: 10}}
        />
        <View style={{flexDirection: 'row'}}>
          <Paragraph
            style={{
              fontWeight: 'bold',
              margin: 10,
              marginTop: 15,
              textDecorationLine: 'underline',
            }}>
            Explore {location.replace('-', ' ')}
          </Paragraph>
          {comingSoon && (
            <Chip style={{marginTop: 10, borderRadius: 5}}>Coming soon</Chip>
          )}
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({item}) => (
    <Item
      image={item.uri}
      location={item.location}
      comingSoon={item.comingSoon}
    />
  );
  return (
    <View>
      <Title style={{margin: 15, marginBottom: 0, marginTop: 20}}>
        Explore our most popular destination
      </Title>
      <FlatList
        data={destinations}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={item => item.location}
      />
    </View>
  );
}
