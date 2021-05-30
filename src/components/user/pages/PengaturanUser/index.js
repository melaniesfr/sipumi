import React from 'react';
import { Pengaturan } from '../../../primary';
import AuthContext from '../../../primary/Auth';

export default function PengaturanUser({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  
  return (
    <Pengaturan
      onPressTitle={() => signOut()}
      title={'Log Out'}
    />
  );
};