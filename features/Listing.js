import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Platform,
} from 'react-native';
import {Skeleton, Center, VStack} from 'native-base';
import ListingItem from '../components/ListingItem';
import GridListingItem from '../components/GridListingItem';
import Snackbar from 'react-native-snackbar';
import {axiosInstance} from '../services/api';

export default function Listing({route, navigation}) {
  const [listings, setListings] = useState([]);
  const [loading, toggleLoading] = useState(true);

  useEffect(() => {
    const {check_in, check_out, min_occupancy, country} = route.params;
    let url = `/listings/availability?limit=10&${
      country ? `country=${country}` : null
    }`;
    axiosInstance
      .get(url)
      .then(response => {
        setListings(response.data.rows);
        toggleLoading(false);
        Snackbar.show({
          text: `Found ${response.data.rows.length} villa(s) ${
            country ? `at ${country.replace('+', ' ')}` : ''
          }`,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(err => {
        toggleLoading(false);
        console.log('error fetching listings', err);
      });
  }, []);

  if (loading) {
    return (
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
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => <View style={{marginLeft: 0}} />)
        }
        data={listings}
        renderItem={({item, index, separators}) => (
          <GridListingItem
            id={item.id}
            address={item.address}
            key={item.guesty_id}
            text={item.description}
            title={item.title}
            url={item.display_image}
            amenities={item.amenities}
            country={item.address.country}
            navigation={navigation}
            prices={item.prices}
            occupancy={item.total_occupancy}
            bathrooms={item.total_bathrooms}
            bedrooms={item.total_bedrooms}
          />
          // <ListingItem
          //   id={item.id}
          //   address={item.address}
          //   key={item.guesty_id}
          //   text={item.description}
          //   title={item.title}
          //   url={item.display_image}
          //   amenities={item.amenities}
          //   country={item.address.country}
          //   navigation={navigation}
          //   prices={item.prices}
          // />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffff',
  },
});
