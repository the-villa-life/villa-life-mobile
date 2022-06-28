/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export default function DateSelector({
  onUpdate,
  onMonthChangeFunction,
  blockedDates = [],
}) {
  const [selectedStartDate, setselectedStartDate] = useState(null);
  const [selectedEndDate, setselectedEndDate] = useState(null);
  const [show, setShow] = useState(false);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
      onUpdate({mode: 'end', date: moment(date).format('YYYY-MM-DD')});
    } else {
      console.log('dd', date);
      onUpdate({mode: 'start', date: moment(date).format('YYYY-MM-DD')});
      setselectedStartDate(date);
      setselectedEndDate(null);
    }
  };

  function changeMonth(date) {
    if (!onMonthChangeFunction) {
      return;
    }
    onMonthChangeFunction(date);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: 290,
          borderWidth: 1,
          borderRadius: 5,
        }}>
        <Button style={{width: '100%'}} onPress={() => setShow(true)}>
          <Text style={{color: 'black'}}>
            {selectedStartDate
              ? moment(selectedStartDate).format('YYYY-MM-DD')
              : 'Check in'}{' '}
            |{' '}
            {selectedEndDate
              ? moment(selectedEndDate).format('YYYY-MM-DD')
              : 'Check out'}
          </Text>
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
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            disabledDates={blockedDates}
            onMonthChange={changeMonth}
            allowBackwardRangeSelect={false}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
          />
        </>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
