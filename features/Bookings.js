import React, {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import PastBookings from './PastBookings';
import UpcomingBookings from './UpcomingBookings';
import {axiosInstance} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bookings({navigation}) {
  const [index, setIndex] = useState(0);
  const [bookings, setBookings] = useState([]);
  const layout = useWindowDimensions();

  useEffect(() => {
    async function getBookings() {
      const token = await AsyncStorage.getItem('@token');
      axiosInstance
        .get('/bookings', {
          headers: {authorization: `Bearer ${token}`},
        })
        .then(res => {
          setBookings(res.data.rows);
        })
        .catch(e => console.log('error fetching bookings', e));
    }
    getBookings();
  }, [navigation]);
  const FirstRoute = () => (
    <UpcomingBookings navigation={navigation} items={bookings} />
  );

  const SecondRoute = () => (
    <PastBookings
      navigation={navigation}
      items={bookings.filter(item => [3, 2].includes(item.status))}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming bookings'},
    {key: 'second', title: 'Past bookings'},
  ]);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={_renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderWidth: 0.5,
    marginBottom: 10,
  },
});
