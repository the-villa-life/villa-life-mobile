/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Chip} from 'react-native-paper';

export default function Ammenities({data = []}) {
  const Item = ({title}) => (
    <Chip style={{margin: 10}} key={title}>
      {title}
    </Chip>
  );

  const renderItem = ({item}) => <Item title={item} />;
  return (
    <View>
      <Text style={{fontSize: 16}}>Ammenities</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        // horizontal={true}
        keyExtractor={item => item}
        numColumns={3}
      />
    </View>
  );
}
