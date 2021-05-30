import React from 'react';
import { Pengaturan } from '../../../primary';

export default function PengaturanVisitor({ navigation }) {
  return (
    <Pengaturan
      onPressTitle={() => navigation.navigate('Login')}
      title={'Keluar'}
    />
  );
};