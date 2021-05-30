import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { KategoriVisitor, DetailPerKategoriVisitor, DetailUMKMVisitor } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function KategoriMenuVisitor({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="KategoriVisitor" component={ KategoriVisitor }
        options={{
          title: 'Kategori',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="DetailPerKategoriVisitor" component={ DetailPerKategoriVisitor }
        options={{
          title: 'Daftar UMKM'
        }}
      />
      <Stack.Screen name="DetailKategoriVisitor" component={ DetailUMKMVisitor }
        options={{
          title: 'Detail UMKM',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};