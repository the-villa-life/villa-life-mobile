/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
// import {AntDesign} from '@expo/vector-icons';
// import ReadMore from '@fawazahmed/react-native-read-more';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'native-base';

export default function ListingItem({
  id,
  text,
  url,
  amenities,
  title,
  country,
  prices,
  navigation,
}) {
  async function saveToRecents() {
    const recentlyViewed = await AsyncStorage.getItem('@recents2');
    let parsedRecentlyViewed;
    if (recentlyViewed) {
      parsedRecentlyViewed = JSON.parse(recentlyViewed) || [];
      parsedRecentlyViewed.push({
        id,
        text,
        url,
        amenities,
        title,
        country,
        prices,
      });
      const key = 'title';
      const arrayUniqueByKey = [
        ...new Map(
          parsedRecentlyViewed.map(item => [item[key], item]),
        ).values(),
      ];
      AsyncStorage.setItem('@recents2', JSON.stringify(arrayUniqueByKey));
    } else {
      let recentlyViewed = [];
      recentlyViewed.push({
        id,
        text,
        url,
        amenities,
        title,
        country,
        prices,
      });
      const key = 'title';
      const arrayUniqueByKey = [
        ...new Map(recentlyViewed.map(item => [item[key], item])).values(),
      ];
      AsyncStorage.setItem('@recents2', JSON.stringify(arrayUniqueByKey));
    }
  }
  return (
    <Pressable
      onPress={() => {
        saveToRecents();
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
      <View style={styles.item}>
        <View style={{width: 250, marginRight: 10}}>
          <Text style={{fontSize: 10}}>{title}</Text>
          <Text> {text.substring(0, 100) + '...'}</Text>
          {/* <ReadMore
            // onExpand={() =>
            //   navigation.navigate("ListingDetail", {
            //     id,
            //     text,
            //     url,
            //     country,
            //     amenities,
            //     title,
            //     prices,
            //   })
            // }
            numberOfLines={3}
            style={styles.textStyle}
            seeMoreStyle={{ color: "black", fontWeight: "bold" }}
            seeLessStyle={{ color: "black", fontWeight: "bold" }}
          >
            {text.substring(0, 200)+ '...'}
          </ReadMore> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View />
          </View>
        </View>
        <Image style={styles.image} source={{uri: url}} alt="loading image" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
