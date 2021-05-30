import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PengaturanUser } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function PengaturanMenuUser() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="PengaturanUser" component={ PengaturanUser }
        options={{
          title: 'Pengaturan',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};