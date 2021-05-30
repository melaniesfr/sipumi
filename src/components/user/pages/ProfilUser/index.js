import React from 'react';
import { Profil } from '../../../primary';

export default function ProfilUser({ navigation }) {
  return (
    <Profil
      onPressEdit={() => navigation.navigate('EditProfilUser')}
    />
  );
};