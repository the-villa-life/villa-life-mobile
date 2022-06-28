import React from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import Trending from '../features/Trending';
import RecentViews from '../features/RecentViews';

export default function Home(props) {
  const {navigation} = props;

  function goToMap() {
    navigation.navigate('MapView');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Trending navigation={navigation} />
        <RecentViews navigation={navigation} />
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => goToMap()}>
          Map View
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffff',
  },
  body: {
    flex: 1,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 30,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 25,
    padding: 9,
    backgroundColor: '#1A3680',
  },
});
