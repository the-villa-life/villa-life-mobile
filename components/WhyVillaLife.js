import React from 'react';
import {View, StyleSheet} from 'react-native';
import WhyVillaLifeItem from './WhyVillaItem';

export default function WhyVillaLife() {
  const items = [
    {
      title: '',
      detail:
        'We make luxury travel simple by designing your whole trip, end-to-end.',
    },
    {
      title: 'Above and beyond. Five-star everything.',
      detail:
        'Each of our fully-equiped villas are vetted to exceptional standards, leaving no unwanted surprises. ',
    },
    {
      title: 'A legendary welcome, every time.',
      detail:
        'Private airport pick-up, an in-person welcome, and a home stocked are some of our featured add-ons.',
    },
    {
      title: 'Do your thing.  Leave the rest to us.',
      detail:
        'From finding that rare vintage to car rentals, a local professional will help you plan a memorable trip.',
    },
  ];

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.title}>
          <WhyVillaLifeItem text={item.detail} title={item.title} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#222222',
  },
  textStyle: {
    color: '#ffff',
    textAlign: 'center',
  },
});
