/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Dimensions, Pressable, ScrollView} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {axiosInstance} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCardModal from '../components/AddCardModal';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import {
  Headline,
  ActivityIndicator,
  Colors,
  List,
  Button,
} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

export default function Payment({route, navigation}) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const stripe = useStripe();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [cardDetails, setCardDetails] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [reload, toggleReload] = useState(false);
  const {listingId, start, end, adults} = route.params;

  useEffect(() => {
    async function doFirst() {
      toggleLoading(true);
      const token = await AsyncStorage.getItem('@token');
      axiosInstance
        .get('/stripe/payment-methods', {
          headers: {authorization: `Bearer ${token}`},
        })
        .then(res => {
          console.log('payment-methods', res.data);
          setPaymentMethods(res.data.data);
          toggleLoading(false);
        })
        .catch(e => toggleLoading(false));
    }
    doFirst();
  }, [reload, toggleReload, navigation]);

  async function bookNow() {
    if (!start || !end) {
      Snackbar.show({
        text: 'Invalid time and date. Please select checkout dates',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    const token = await AsyncStorage.getItem('@token');
    let data = {
      listing_id: listingId,
      check_in: moment(start).format('YYYY-MM-DD'),
      check_out: moment(end).format('YYYY-MM-DD'),
      total_adults: parseInt(adults),
      total_children: 0,
      payment_method_id: selectedCard.id,
    };
    console.log('payment dd', data);
    axiosInstance
      .post(
        '/bookings',
        {
          listing_id: listingId,
          check_in: moment(start).format('YYYY-MM-DD'),
          check_out: moment(end).format('YYYY-MM-DD'),
          total_adults: parseInt(adults),
          total_children: 0,
          payment_method_id: selectedCard.id,
        },
        {
          headers: {authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log('booking', res.data);
        if (res.data.message === 'success') {
          Snackbar.show({
            text: 'Booking placed successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
        Snackbar.show({
          text: 'Booking placed successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        // Snackbar.show({
        //   text: 'Booking placed successfully',
        //   duration: Snackbar.LENGTH_SHORT,
        // });
        // navigation.navigate('HomeScreen');
      })
      .catch(e => console.log('booking error', e));
    Snackbar.show({
      text: 'Booking placed successfully',
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  async function payNow() {
    try {
      const token = await AsyncStorage.getItem('@token');

      const userDetails = await AsyncStorage.getItem('@userdetails');
      const parsedUser = JSON.parse(userDetails);
      const email = parsedUser?.user?.email;
      if (email && cardDetails?.complete) {
        axiosInstance
          .get('/stripe/setup-intent', {
            headers: {authorization: `Bearer ${token}`},
          })
          .then(async res => {
            setClientSecret(res.data.client_secret);
            const billingDetails = {
              email: email,
            };
            console.log('bb', billingDetails);
            const cs = res.data.client_secret;
            console.log('secret', cs);
            // confirmSetupIntent
            await stripe
              .confirmSetupIntent(`${cs}`, {
                type: 'Card',
                billingDetails: billingDetails,
              })
              .then(res => {
                console.log('confirm result', res);
                Snackbar.show({
                  text: 'Added successfully added',
                  duration: Snackbar.LENGTH_SHORT,
                });
                forceUpdate();
              })
              .catch(err => console.log('comform error', err));
          });
      } else {
        console.log('email card details incomplete');
      }
    } catch (e) {
      console.log('pay now error', e);
    }
  }
  if (loading) {
    return (
      <View style={{alignSelf: 'center', marginTop: height / 3}}>
        <ActivityIndicator animating={true} color={Colors.blue400} />
      </View>
    );
  }

  //pk_test_51KNox6CrtHotpJv6yVJfOsXh7gKalsVevLbXOJg829riQdCWChrprVdp5sICfLnqBL2iWMlBEoRYCEx6yi5ksQCK00MwHJja11
  // pk_test_51KvMWMJyXAiPWkNy9TFyTcOSliOsDyfxLNOz5GV70nNPfzpxRf9inu6iF5KMRczI9DRpKHsveWQLnjoJMsf31mBa00vLUCdCRe
  if (paymentMethods.length > 0) {
    return (
      <ScrollView>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <View style={{marginBottom: 5, marginTop: 20}}>
            {paymentMethods.map((item, index) => (
              <Pressable
                onPress={() => {
                  if (selectedIndex !== index) {
                    setSelectedCard(item);
                    setSelectedIndex(index);
                  } else {
                    setSelectedCard(item);
                  }
                }}>
                <View
                  style={{
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 5,
                    margin: 5,
                    backgroundColor: `${
                      index === selectedIndex ? 'gray' : 'white'
                    }`,
                  }}
                  key={index}>
                  <List.Item
                    title={`...............${item.last_4}`}
                    description={`${item.brand}    Expires: ${item.exp_month}/${item.exp_year}`}
                    left={props => <List.Icon {...props} icon="cash" />}
                  />
                </View>
              </Pressable>
            ))}
          </View>
          {selectedCard ? (
            <Button
              mode="contained"
              style={{margin: 30, backgroundColor: '#1A3680', marginTop: 5}}
              onPress={() => bookNow()}>
              Book now
            </Button>
          ) : null}
          <AddCardModal onUpdate={setCardDetails} onAdd={payNow} />
        </View>
      </ScrollView>
    );
  }
  return (
    <StripeProvider
      publishableKey="pk_test_51KvMWMJyXAiPWkNy9TFyTcOSliOsDyfxLNOz5GV70nNPfzpxRf9inu6iF5KMRczI9DRpKHsveWQLnjoJMsf31mBa00vLUCdCRe"
      // merchantIdentifier="merchant.identifier"
    >
      <View style={{alignSelf: 'center', marginTop: height / 3}}>
        <Headline>There are no saved card(s) yet</Headline>
        <AddCardModal onUpdate={setCardDetails} onAdd={payNow} />
      </View>
    </StripeProvider>
  );
}
