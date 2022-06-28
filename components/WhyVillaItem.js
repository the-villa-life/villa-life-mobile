/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';

export default function WhyVillaLifeItem({title, text}) {
  return (
    <View style={styles.container}>
      <Subheading style={[styles.textStyle, {fontWeight: 'bold'}]}>
        {title}
      </Subheading>
      <Subheading style={styles.textStyle}>{text}</Subheading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  textStyle: {
    color: '#ffff',
    textAlign: 'center',
  },
});
