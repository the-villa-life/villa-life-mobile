import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {axiosInstance} from '../services/api';

export default function MapViewPage({navigation}) {
  const [listings, setListings] = useState([]);
  const region = {
    latitude: 17.9138875,
    longitude: -62.8096719,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  useEffect(() => {
    axiosInstance
      .get('/listings/availability?limit=10&min_occupancy=1')
      .then(response => {
        let coords = response.data.rows.map(row => {
          return {
            lat: row.address.lat,
            lng: row.address.lng,
            address: row.address.full,
            title: row.title,
            id: row.id,
            image: row.display_image,
          };
        });
        setListings(coords);
      });
  }, []);

  const onRegionChange = region => {
    // console.log('new region', region);
    // this.setState({ region });
  };
  if (listings.length === 0) {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>Loading</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* {listings.map((marker, index) => (
        <Text>{JSON.stringify(marker)}</Text>
      ))} */}
      <MapView
        style={styles.map}
        region={{
          latitude: listings[0].lat,
          longitude: listings[0].lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}>
        {listings.map((marker, index) => (
          <Marker
            onCalloutPress={() =>
              navigation.navigate('ListingObject', {id: marker.id})
            }
            key={index}
            // image={marker.image}
            coordinate={{latitude: marker.lat, longitude: marker.lng}}
            title={marker.title}
            description={marker.address}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight * 2,
    backgroundColor: '#ffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.1,
  },
});
