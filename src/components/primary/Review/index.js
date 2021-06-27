import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import axios from 'axios';

export default function Review({ data }) {
  const [ review, setReview ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  
  const getData = () => {
    axios.get(assets.api.reviews)
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].id_umkm === data.id_umkm) {
          setReview(res.data[i]);
        }
      }
    })
    .catch((err) => console.log(err))
  };

  const getReviews = () => {
    axios.get(assets.api.reviews)
    .then((res) => {
      setReviews(res.data);
    })
    .catch((err) => console.log(err))
  };

  const [ user, setUser ] = useState({
    id_users: '',
    nama_users: '',
    email: '',
    password: ''
  });

  const [ users, setUsers ] = useState();
  const [ token, setToken ] = useState();
  const loadUsers = () => {
    AsyncStorage.getItem('email')
    .then((res) => {
      const email = String(res);
      setUsers(email);
    });

    AsyncStorage.getItem('userToken')
    .then((res) => {
      const tokens = String(res);
      setToken(tokens);
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
    getData();
    getReviews();
    loadUsers();
  }, [users]);

  const deleteReview = (value) => {
    fetch(assets.api.deleteReview, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_reviews: value
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      Alert.alert('Success!', 'Hapus review berhasil.');
      getData();
      getReviews();
    })
    .catch((err) => console.log(err));
  };

  const ReviewAda = () => {
    return (
      reviews.map((item, index) => {
        if (data.id_umkm === item.id_umkm) {
          return (
            <View key={ index }>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FastImage source={{uri: assets.icons.ICProfile}} style={styles.avatar} />

                  <View style={{ marginVertical: 5 }}>
                    <Text style={styles.textNama}>{ item.nama_users }</Text>
                    <Text style={styles.textReview}>{ item.review }</Text>
                  </View>
                </View>
                
                <View style={{ marginTop: 5, marginRight: 5, justifyContent: 'center' }}>
                  <Text style={[styles.textTanggal, { marginBottom: 5 }]}>{ item.tanggal }</Text>

                  { user.nama_users === item.nama_users && token === 'userToken' ? (
                  <TouchableOpacity
                    onPress={() => Alert.alert(
                      'Peringatan!',
                      'Anda yakin akan menghapus review ini?',
                      [
                        {text: 'Ya', onPress: () => deleteReview(item.id_reviews)},
                        {text: 'Tidak', onPress: () => console.log('Button tidak clicked')}
                      ]
                    )}
                    style={{ paddingVertical: 3, paddingHorizontal: 10, backgroundColor: colors.red, borderRadius: 5 }}
                  >
                    <Text style={{ fontFamily: fonts.primary.normal, color: colors.white }}>Hapus</Text>
                  </TouchableOpacity> )
                  : null }
                </View>
              </View>
  
              <View style={styles.line}></View>
            </View>
          );
        }
      })
    );
  };

  const ReviewKosong = () => {
    return (
      <Text style={{ textAlign: 'center', fontFamily: fonts.primary.normal, color: colors.dark1 }}>
        Belum ada review
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      { review.length !== 0 ? <ReviewAda /> : <ReviewKosong /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 40/2
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.grey1,
    marginVertical: 10,
    alignSelf: 'center'
  },
  textNama: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.dark1
  },
  textReview: {
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    color: colors.dark1
  },
  textTanggal: {
    fontSize: 10,
    fontFamily: fonts.primary[300],
    color: colors.grey
  }
});