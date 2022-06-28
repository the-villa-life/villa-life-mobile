/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import HalfHero from '../components/HalfHero';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

export default function RecentViews(props) {
  const {navigation} = props;
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    async function fetchrecent() {
      const recentlyViewed = await AsyncStorage.getItem('@recents2');
      if (recentlyViewed) {
        let parsedViewed = JSON.parse(recentlyViewed);
        setViewedItems(parsedViewed);
      }
    }
    fetchrecent();
  }, []);
  if (viewedItems.length === 0) {
    return (
      <View style={[styles.container, {flex: 1, marginTop: height / 6}]}>
        <Text style={styles.text}>Recently viewed</Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18,
            margin: 40,
          }}>
          No recently viewed items yet
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, {marginTop: 50}]}>
      <Text style={styles.text}>Recently viewed</Text>
      <ScrollView horizontal={true} style={styles.list}>
        {viewedItems.map(item => {
          if (item.id) {
            return (
              <HalfHero
                id={item.id}
                url={item.url}
                text={item.title}
                itemkey={item.text}
                country={item.country}
                navigation={navigation}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    margin: '0.31rem',
    backgroundColor: '#ffff',
  },
  list: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#000000',
    margin: 10,
  },
});
