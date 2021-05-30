import React from 'react';
import { Profil } from '../../../primary';

export default function ProfilAdmin({ navigation }) {
  return (
    <Profil
      onPressEdit={() => navigation.navigate('EditProfilAdmin')}
    />
  );
};