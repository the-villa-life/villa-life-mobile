/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
// import Home from '../pages/Home';
import Listing from '../features/Listing';
import Profile from '../pages/Profile';
//import Search from '../pages/Search';
import NewHome from '../pages/NewHome';

function BottomNav({navigation}) {
  // const HomeRoute = () => <Home navigation={navigation} />;
  const ListingRoute = () => <Listing navigation={navigation} />;
  const SearchRoute = () => <NewHome navigation={navigation} />;
  const ProfileRoute = () => <Profile navigation={navigation} />;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', icon: 'home'},
    {key: 'profile', title: 'Profile', icon: 'account'},
    // {key: 'home', title: 'home', icon: 'home'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    // home: HomeRoute,
    listings: ListingRoute,
    profile: ProfileRoute,
    home: SearchRoute,
  });

  return (
    <BottomNavigation
      barStyle={{backgroundColor: '#ffff', borderWidth: 0.7}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default BottomNav;
