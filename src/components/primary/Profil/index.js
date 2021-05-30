import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import axios from 'axios';

export default function Profil({ onPressEdit }) {
  const [ data, setData ] = useState({
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
          setData({
            ...data,
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
    let mounted = true;

    if (mounted) {
      loadUsers();
    }

    return () => mounted = false;
  }, [loadUsers]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FastImage source={{uri: assets.images.IMUser}} style={styles.image} />

        <View style={styles.data}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.textInfo, { marginRight: 15 }]}>Nama</Text>
            <Text style={[styles.textInfo, { marginRight: 5 }]}>:</Text>
            <Text style={styles.textData}>{ data.nama_users }</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.textInfo, { marginRight: 17 }]}>Email</Text>
            <Text style={[styles.textInfo, { marginRight: 5 }]}>:</Text>
            <Text style={styles.textData}>{ data.email }</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={ onPressEdit}>
          <Icon
            name={'create'}
            size={20}
            color={colors.white}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.textButton}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '93%',
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 10,
    padding: 20
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 5
  },
  data: {
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  textInfo: {
    color: colors.dark1,
    fontFamily: fonts.primary[700]
  },
  textData: {
    color: colors.dark1,
    fontFamily: fonts.primary[600]
  },
  button: {
    backgroundColor: colors.blue1,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.primary.normal
  }
});