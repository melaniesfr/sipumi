import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { KategoriUser, DetailPerKategoriUser, DetailUMKMUser } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function KategoriMenuUser({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="KategoriUser" component={ KategoriUser }
        options={{
          title: 'Kategori',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="DetailPerKategoriUser" component={ DetailPerKategoriUser }
        options={{
          title: 'Daftar UMKM'
        }}
      />
      <Stack.Screen name="DetailKategoriUser" component={ DetailUMKMUser }
        options={{
          title: 'Detail UMKM',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};