/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {CardField} from '@stripe/stripe-react-native';

export default function AddCardModal({onUpdate, onAdd}) {
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView style={{paddingTop: StatusBar.currentHeight}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: 290,
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Button style={{width: '100%'}} onPress={() => setShow(true)}>
            Add card
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={show}
          onRequestClose={() => {
            setShow(false);
          }}>
          <>
            <Button
              style={{backgroundColor: '#EBEBF0'}}
              onPress={() => setShow(false)}>
              <Text style={{color: 'black'}}>Close</Text>
            </Button>
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={cardDetailss => {
                onUpdate(cardDetailss);
              }}
              onFocus={focusedField => {
                // console.log('focusField', focusedField);
              }}
            />
            <Button
              mode="contained"
              style={{margin: 30, backgroundColor: '#1A3680'}}
              onPress={() => onAdd()}>
              Save Card
            </Button>
          </>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
