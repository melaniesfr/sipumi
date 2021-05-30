import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BerandaVisitor, DetailUMKMVisitor } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function BerandaMenuVisitor({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.green1,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="BerandaVisitor" component={ BerandaVisitor }
        options={{
          title: 'Beranda',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerShown: false
        }}
      />
      <Stack.Screen name="DetailUMKMVisitor" component={ DetailUMKMVisitor }
        options={{
          title: 'Detail',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};