import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { KategoriAdmin, DetailPerKategoriAdmin, DetailUMKMAdmin } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function KategoriMenuAdmin({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="KategoriAdmin" component={ KategoriAdmin }
        options={{
          title: 'Kategori',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="DetailPerKategoriAdmin" component={ DetailPerKategoriAdmin }
        options={{
          title: 'Daftar UMKM'
        }}
      />
      <Stack.Screen name="DetailKategoriAdmin" component={ DetailUMKMAdmin }
        options={{
          title: 'Detail UMKM',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};