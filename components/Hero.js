/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, Text, Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Hero(props) {
  const {url, text, itemkey, navigation} = props;

  function goToListing() {
    navigation.navigate('Listings');
  }
  return (
    <Pressable onPress={() => goToListing()}>
      <View key={itemkey} style={styles.container}>
        <ImageBackground
          source={{uri: url}}
          imageStyle={{borderRadius: 6}}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.text}>{text}</Text>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

const styles = EStyleSheet.create({
  container: {
    margin: '0.31rem',
  },
  image: {
    justifyContent: 'center',
    width: '8rem',
    height: '8rem',
    borderRadius: '1.3rem',
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 2,
    color: 'white',
    fontSize: '1.3rem',
    lineHeight: '1.4rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
