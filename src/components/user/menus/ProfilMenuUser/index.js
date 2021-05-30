import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfilUser, EditProfilUser } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function ProfilMenuUser({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="ProfilUser" component={ ProfilUser }
        options={{
          title: 'Profil',
          headerLeft: null,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen name="EditProfilUser" component={ EditProfilUser }
        options={{
          title: 'Edit Profil'
        }}
      />
    </Stack.Navigator>
  );
};