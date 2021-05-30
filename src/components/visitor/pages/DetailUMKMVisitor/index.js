import React, { useState } from 'react';
import { Alert } from 'react-native';
import { DetailUMKM } from '../../../primary';

export default function DetailUMKMVisitor({ route, navigation }) {
  const { item } = route.params;

  const [ data, setData ] = useState({
    id_umkm: item.id_umkm,
    nama_umkm: item.nama_umkm,
    pemilik: item.pemilik,
    deskripsi: item.deskripsi,
    kategori: item.kategori,
    alamat: item.alamat,
    facebook: item.facebook,
    instagram: item.instagram,
    telp: item.telp,
    gambar_umkm: item.gambar_umkm
  });

  return (
    <DetailUMKM
      item={ item }
      data={ data }
      onPressNavigation={() => navigation.goBack()}
      onPressRate={() => Alert.alert('Maaf!', 'Anda harus login terlebih dahulu.')}
    />
  );
};