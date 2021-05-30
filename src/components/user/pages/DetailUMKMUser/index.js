import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { DetailUMKM } from '../../../primary';
import { colors, fonts, assets } from '../../../../utils';
import axios from 'axios';

export default function DetailUMKMUser({ route, navigation }) {
  const { item } = route.params;
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);

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

  const [ user, setUser ] = useState({
    id_users: '',
    nama_users: '',
    email: '',
    password: ''
  });

  const [ users, setUsers ] = useState();
  const loadUsers = () => {
    AsyncStorage.getItem('email')
    .then((res) => {
      const email = String(res);
      setUsers(email);
    });

    axios.get(assets.api.users)
    .then((res) => {
      for (var i=0; i<res.data.length; i++) {
        if (users === res.data[i].email) {
          setUser({
            ...user,
            id_users: res.data[i].id_users,
            nama_users: res.data[i].nama_users,
            email: res.data[i].email,
            password: res.data[i].password
          });
        }
      }
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUsers();
  }, [users]);

  const [ review, setReview ] = useState({
    id_reviews: '',
    id_umkm: '',
    id_users: '',
    review: '',
    isValidReview: true
  });

  const onChangeReview = (value) => {
    if (value.trim().length >= 5) {
      setReview({
        ...review,
        review: value,
        isValidReview: true
      });
    } else {
      setReview({
        ...review,
        review: value,
        isValidReview: false
      });
    }
  };

  const saveReview = () => {
    setLoading(true);

    if (review.review.length === 0) {
      setLoading(false);
      Alert.alert('Error!', 'Isi review tidak boleh kosong.');
    } else if (review.review.length < 5) {
      setLoading(false);
      Alert.alert('Error!', 'Data review tidak memenuhi ketentuan.');
    } else if (review.review.length >= 5) {
      fetch(assets.api.addReview, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_umkm: data.id_umkm,
          id_users: user.id_users,
          review: review.review
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);

        if (resJson === 'Anda sudah pernah memberikan review, silakan hapus terlebih dahulu dan tambah review baru.') {
          Alert.alert('Error!', resJson);
        } else if (resJson === 'Tambah review berhasil.') {
          Alert.alert('Success!', resJson);
          setModalVisible(!modalVisible);
        } else {
          Alert.alert('Error!', resJson);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <View>
      <Modal
        animationType={'slide'}
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ alignSelf: 'center', fontSize: 17, fontFamily: fonts.primary[700], color: colors.dark1 }}>{ data.nama_umkm }</Text>
            <TextInput
              placeholder={'Review Anda...'}
              value={ review.review }
              multiline
              onChangeText={(value) => onChangeReview(value)}
              style={{ borderBottomWidth: 1, borderBottomColor: colors.green1, marginTop: 10, padding: 5 }}
            />

            { review.isValidReview ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal review 5 karakter.</Text>
            </Animatable.View> }

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: colors.dark1, marginLeft: 10 }}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ saveReview }
                style={{ backgroundColor: colors.green1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, elevation: 3, marginRight: 10 }}
              >
                <Text style={{ color: colors.white }}>{ loading ? 'Menyimpan...' : 'Simpan' }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <DetailUMKM
        item={ item }
        data={ data }
        onPressNavigation={() => navigation.goBack()}
        onPressRate={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%'
  },
  errorMsg: {
    color: colors.red1,
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    marginLeft: 5
  }
});