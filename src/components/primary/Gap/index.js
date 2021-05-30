import React from 'react';
import { Text, View } from 'react-native';

export default function Gap({ height, width }) {
  return (
    <View style={{ height: height, width: width }}>
      <Text></Text>
    </View>
  );
};