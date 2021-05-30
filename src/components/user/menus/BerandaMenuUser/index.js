import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BerandaUser, DetailUMKMUser } from '../../pages';
import { colors, fonts } from '../../../../utils';

const Stack = createStackNavigator();

export default function BerandaMenuUser({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.green1,
        headerTitleStyle: { fontFamily: fonts.primary[700] }
      }}
    >
      <Stack.Screen name="BerandaUser" component={ BerandaUser }
        options={{
          title: 'Beranda',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerShown: false
        }}
      />
      <Stack.Screen name="DetailUMKMUser" component={ DetailUMKMUser }
        options={{
          title: 'Detail',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};