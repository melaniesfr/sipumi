import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PengaturanAdmin } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function PengaturanMenuAdmin() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="PengaturanAdmin" component={ PengaturanAdmin }
        options={{
          title: 'Pengaturan',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};