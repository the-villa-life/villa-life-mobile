import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Listing from '../features/Listing';
import BottomNav from '../components/BottomNav';
import ListingDetail from '../features/ListingDetail';
import Payment from '../pages/Payment';
import ListingObject from '../features/ListinObject';
import MapViewPage from '../pages/MapViewPage';
import BookingDetail from '../pages/BookingDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import jwt_decode from 'jwt-decode';
const {height} = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const [userToken, setUserToken] = useState(null);
  const [loading, toggleLoading] = useState(true);

  useEffect(() => {
    toggleLoading(true);
    async function doFirst() {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        const currentDate = new Date();
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < currentDate.getTime()) {
          toggleLoading(false);
        } else {
          setUserToken(token);
          toggleLoading(false);
        }
      } else {
        toggleLoading(false);
      }
    }
    doFirst();
  }, []);
  if (loading) {
    return (
      <View style={{marginTop: height / 2.5}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      <>
        {userToken == null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeScreen"
              component={BottomNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ListingObject"
              component={ListingObject}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MapView"
              component={MapViewPage}
              options={{title: 'Map View'}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              // options={{ headerShown: false }}
            />
            <Stack.Screen name="Listings" component={Listing} />
            <Stack.Screen
              name="ListingDetail"
              component={ListingDetail}
              options={{headerShown: true, title: 'Listing detail'}}
            />
            <Stack.Screen
              name="BookingDetail"
              component={BookingDetail}
              options={{headerShown: true, title: 'Booking detail'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={BottomNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ListingObject"
              component={ListingObject}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MapView"
              component={MapViewPage}
              options={{title: 'Map View'}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              // options={{ headerShown: false }}
            />
            <Stack.Screen name="Listings" component={Listing} />
            <Stack.Screen
              name="ListingDetail"
              component={ListingDetail}
              options={{headerShown: true, title: 'Listing detail'}}
            />
            <Stack.Screen
              name="BookingDetail"
              component={BookingDetail}
              options={{headerShown: true, title: 'Booking detail'}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        )}
      </>
    </Stack.Navigator>
  );
};
