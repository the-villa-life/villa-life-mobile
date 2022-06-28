import React from 'react';
import {IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

export default function IconButtonComp({onIconPress, iconName, extras = {}}) {
  return (
    <IconButton
      onPress={() => onIconPress()}
      icon={<Icon size={24} name={iconName} />}
      borderRadius="md"
      borderWidth={1}
      _icon={{
        color: 'orange.500',
        size: 'lg',
      }}
      _hover={{
        bg: 'orange.600:alpha.20',
      }}
      _pressed={{
        bg: 'orange.600:alpha.20',
        _icon: {
          name: 'emoji-flirt',
        },
        _ios: {
          _icon: {
            size: '2xl',
          },
        },
      }}
      _ios={{
        _icon: {
          size: '4xl',
        },
      }}
      {...extras}
    />
  );
}
