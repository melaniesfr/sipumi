import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BerandaAdmin, DetailUMKMAdmin, UpdateUMKMAdmin, TambahProdukAdmin, DetailProdukAdmin } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function BerandaMenuAdmin({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="BerandaAdmin" component={ BerandaAdmin }
        options={{
          title: 'Beranda',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerShown: false
        }}
      />
      <Stack.Screen name="DetailUMKMAdmin" component={ DetailUMKMAdmin }
        options={{
          title: 'Detail',
          headerShown: false
        }}
      />
      <Stack.Screen name="UpdateUMKMAdmin" component={ UpdateUMKMAdmin }
        options={{
          title: 'Edit UMKM'
        }}
      />
      <Stack.Screen name="TambahProdukAdmin" component={ TambahProdukAdmin }
        options={{
          title: 'Tambah Produk'
        }}
      />
      <Stack.Screen name="DetailProdukAdmin" component={ DetailProdukAdmin }
        options={{
          title: 'Edit Produk'
        }}
      />
    </Stack.Navigator>
  );
};