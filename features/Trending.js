import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Hero from '../components/Hero';

export default function Trending(props) {
  const {navigation} = props;
  const data = [
    {
      url: 'https://res.cloudinary.com/makemeup/image/upload/v1650911565/mainImage_o0njxy.png',
      text: 'Norway',
    },
    {
      url: 'https://res.cloudinary.com/makemeup/image/upload/v1584868001/smiling-woman-looking-upright-standing-against-yellow-wall-1536619_s0j3i9.jpg',
      text: 'Casablanca',
    },
    {
      url: 'https://res.cloudinary.com/makemeup/image/upload/v1611525578/pexels-binyamin-mellish-106399_w7livq.jpg',
      text: 'Jamaica',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending destinations</Text>
      <ScrollView horizontal={true} style={styles.list}>
        {data.map(item => (
          <View key={item.text}>
            <Hero
              navigation={navigation}
              url={item.url}
              text={item.text}
              itemkey={item.text}
            />
          </View>
        ))}
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
