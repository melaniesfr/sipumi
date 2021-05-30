import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfilAdmin, EditProfilAdmin } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function ProfilMenuAdmin({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="ProfilAdmin" component={ ProfilAdmin }
        options={{
          title: 'Profil',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="EditProfilAdmin" component={ EditProfilAdmin }
        options={{
          title: 'Edit Profil'
        }}
      />
    </Stack.Navigator>
  );
};