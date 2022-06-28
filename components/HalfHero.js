/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, Text, Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function HalfHero(props) {
  const {url, text, country, itemkey, navigation, id} = props;

  function goToListing() {
    navigation.navigate('ListingObject', {id: id});
  }
  return (
    <Pressable onPress={() => goToListing()}>
      <View key={itemkey} style={styles.container}>
        <ImageBackground
          source={{uri: url}}
          imageStyle={{
            borderRadius: 6,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.text}>{text}</Text>
        </ImageBackground>
        <View style={styles.lower}>
          <Text style={{fontWeight: '400', marginTop: 8, fontSize: 14}}>
            {country}
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8, fontSize: 12}}>
            Americas
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = EStyleSheet.create({
  container: {
    margin: '0.5rem',
    height: '11.57rem',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    justifyContent: 'center',
    width: '9.75rem',
    height: '5.5rem',
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
  lower: {
    borderStyle: 'solid',
    borderWidth: 0.3,
    height: '6rem',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 10,
  },
});
