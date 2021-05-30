import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TambahUMKMAdmin } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function TambahMenuAdmin({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="TambahUMKMAdmin" component={ TambahUMKMAdmin }
        options={{
          title: 'Tambah UMKM',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};