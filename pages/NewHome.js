/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, SafeAreaView, ScrollView, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SelectProvider} from '@mobile-reality/react-native-select-pro';
import {Headline, Button} from 'react-native-paper';
import WhyVillaLife from '../components/WhyVillaLife';
import SearchForm from '../features/SearchForm';
import Explore from '../features/Explore';

export default function NewHome({navigation}) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <SelectProvider>
        <ScrollView>
          <ImageBackground
            source={require('../images/mobileBackground.png')}
            imageStyle={{
              borderRadius: 6,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.formBody}>
              <View style={{marginLeft: 20}}>
                <Headline style={styles.headlineStyle}>Everything.</Headline>
                <Headline style={styles.headlineStyle}>
                  Right, where you want it.
                </Headline>
                {!showSearch && (
                  <Button
                    mode="contained"
                    style={styles.searchButton}
                    onPress={() => setShowSearch(true)}>
                    Search
                  </Button>
                )}
              </View>
              {showSearch && <SearchForm navigation={navigation} />}
            </View>
          </ImageBackground>
          <WhyVillaLife />
          <Explore navigation={navigation} />
        </ScrollView>
      </SelectProvider>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  headlineStyle: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  formBody: {
    marginTop: 122,
  },
  searchButton: {
    width: 100,
    backgroundColor: '$primary',
    marginTop: 30,
  },
  image: {
    width: '100%',
    paddingBottom: 50,
    borderRadius: '1.3rem',
  },
});
