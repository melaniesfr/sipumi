import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, TextInput, Text, StyleSheet, Keyboard, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import axios from 'axios';
import md5 from 'md5';

export default function EditProfil() {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ pwLama, setPwLama ] = useState('');
  const [ pwBaru, setPwBaru ] = useState('');
  const [ konfPwBaru, setKonfPwBaru ] = useState('');

  const [ data, setData ] = useState({
    id_users: '',
    nama_users: '',
    email: '',
    password: '',
    pwLama: '',
    pwBaru: '',
    konfPwBaru: '',
    isValidNama: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidPwLama: true,
    isValidPwBaru: true,
    isValidKonfPwBaru: true,
    secureTextLama: true,
    secureTextBaru: true,
    secureTextKonfBaru: true
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
    loadUsers();
  }, [users]);

  const onChangeNama = (value) => {
    if (value.trim().length >= 5) {
      setData({
        ...data,
        nama_users: value,
        isValidNama: true
      });
    } else {
      setData({
        ...data,
        nama_users: value,
        isValidNama: false
      });
    }
  };

  const onChangeEmail = (value) => {
    if (value.trim().length >= 10) {
      setData({
        ...data,
        email: value,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        email: value,
        isValidEmail: false
      });
    }
  };

  const onChangePwLama = (value) => {
    if (pwLama.length >= 7) {
      setData({
        ...data,
        isValidPwLama: true
      });
    } else {
      setData({
        ...data,
        isValidPwLama: false
      });
    }
  };

  const encryptPwLama = () => {
    let encodePass = md5(pwLama);

    setData({
      ...data,
      pwLama: encodePass
    });
  };

  const onChangePwBaru = (value) => {
    if (pwBaru.length >= 7) {
      setData({
        ...data,
        isValidPwBaru: true
      });
    } else {
      setData({
        ...data,
        isValidPwBaru: false
      });
    }
  };

  const encryptPwBaru = () => {
    let encodePass = md5(pwBaru);

    setData({
      ...data,
      pwBaru: encodePass
    });
  };

  const onChangeKonfPwBaru = (value) => {
    if (konfPwBaru.length >= 7) {
      setData({
        ...data,
        isValidKonfPwBaru: true
      });
    } else {
      setData({
        ...data,
        isValidKonfPwBaru: false
      });
    }
  };

  const encryptKonfPwBaru = () => {
    let encodePass = md5(konfPwBaru);

    setData({
      ...data,
      konfPwBaru: encodePass
    });
  };

  const updateSecureTextLama = () => {
    setData({
      ...data,
      secureTextLama: !data.secureTextLama
    });
  };

  const updateSecureTextBaru = () => {
    setData({
      ...data,
      secureTextBaru: !data.secureTextBaru
    });
  };

  const updateSecureTextKonfBaru = () => {
    setData({
      ...data,
      secureTextKonfBaru: !data.secureTextKonfBaru
    });
  };

  const editProfil = () => {
    setLoading(true);

    if (data.nama_users.length === 0 || data.email.length === 0) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak boleh ada yang kosong.');
    } else if (data.nama_users.length < 5 || data.email.length < 10) {
      setLoading(false);
      Alert.alert('Error!', 'Data nama atau email tidak memenuhi ketentuan.');
    } else if (data.nama_users.length >= 5 && data.email.length >= 10) {
      fetch(assets.api.editProfil, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_users: data.id_users,
          nama_users: data.nama_users,
          email: data.email
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);

        if (resJson === 'Edit profil sukses.') {
          Alert.alert('Success!', resJson);
        } else if (resJson === 'Email sudah terdaftar, silakan coba lagi.') {
          Alert.alert('Peringatan!', resJson);
        } else {
          Alert.alert('Error!', resJson);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  const resetPass = () => {
    setLoading(true);

    if (pwLama.length === 0 || pwBaru.length === 0 || konfPwBaru.length === 0) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak boleh ada yang kosong.');
    } else if (pwLama.length < 8 || pwBaru.length < 8 || konfPwBaru.length < 8) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak memenuhi ketentuan.');
    } else if (pwLama.length >= 8 && pwBaru.length >= 8 && konfPwBaru.length >= 8) {
      if (data.pwLama === data.password) {
        if (data.pwBaru === data.konfPwBaru) {
          fetch(assets.api.resetPass, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_users: data.id_users,
              password: data.konfPwBaru
            })
          })
          .then((res) => res.json())
          .then((resJson) => {
            setLoading(false);

            if (resJson === 'Reset password sukses.') {
              Alert.alert('Success!', resJson);
              setModalVisible(!modalVisible);
            } else {
              Alert.alert('Error!', resJson);
            }
          })
          .catch((err) => console.log(err));
        } else {
          setLoading(false);
          Alert.alert('Error!', 'Isian kolom password baru tidak sama dengan kolom konfirmasi.');
        }
      } else if (data.pwLama !== data.password) {
        setLoading(false);
        Alert.alert('Error!', 'Isian kolom password lama tidak sama dengan password lama.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={ true }
          visible={ modalVisible }
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ alignSelf: 'center', fontSize: 17, fontFamily: fonts.primary[700], color: colors.dark1 }}>Reset Password</Text>

                <View>
                  <TextInput
                    placeholder={'Password lama'}
                    secureTextEntry={ data.secureTextLama }
                    autoCapitalize="none"
                    value={ pwLama }
                    onChangeText={(value) => {setPwLama(value), onChangePwLama(value)}}
                    onEndEditing={() => encryptPwLama()}
                    style={styles.inputReset}
                  />
                  <TouchableOpacity onPress={ updateSecureTextLama } style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                    { data.secureTextLama ?
                    <Feather
                      name="eye-off"
                      color={colors.grey}
                      size={20}
                    />
                    :
                    <Feather
                      name="eye"
                      color={colors.grey}
                      size={20}
                    /> }
                  </TouchableOpacity>
                </View>
                { data.isValidPwLama ? null :
                <Animatable.View animation={'fadeInLeft'} duration={500}>
                  <Text style={styles.errorMsg}>Panjang minimal password 8 karakter.</Text>
                </Animatable.View> }

                <View>
                  <TextInput
                    placeholder={'Password baru'}
                    secureTextEntry={ data.secureTextBaru }
                    autoCapitalize="none"
                    value={ pwBaru }
                    onChangeText={(value) => {setPwBaru(value), onChangePwBaru(value)}}
                    onEndEditing={() => encryptPwBaru()}
                    style={styles.inputReset}
                  />
                  <TouchableOpacity onPress={ updateSecureTextBaru } style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                    { data.secureTextBaru ?
                    <Feather
                      name="eye-off"
                      color={colors.grey}
                      size={20}
                    />
                    :
                    <Feather
                      name="eye"
                      color={colors.grey}
                      size={20}
                    /> }
                  </TouchableOpacity>
                </View>
                { data.isValidPwBaru ? null :
                <Animatable.View animation={'fadeInLeft'} duration={500}>
                  <Text style={styles.errorMsg}>Panjang minimal password 8 karakter.</Text>
                </Animatable.View> }

                <View>
                  <TextInput
                    placeholder={'Konfirmasi password baru'}
                    secureTextEntry={ data.secureTextKonfBaru }
                    autoCapitalize="none"
                    value={ konfPwBaru }
                    onChangeText={(value) => {setKonfPwBaru(value), onChangeKonfPwBaru(value)}}
                    onEndEditing={() => encryptKonfPwBaru()}
                    style={styles.inputReset}
                  />
                  <TouchableOpacity onPress={ updateSecureTextKonfBaru } style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                    { data.secureTextKonfBaru ?
                    <Feather
                      name="eye-off"
                      color={colors.grey}
                      size={20}
                    />
                    :
                    <Feather
                      name="eye"
                      color={colors.grey}
                      size={20}
                    /> }
                  </TouchableOpacity>
                </View>
                { data.isValidKonfPwBaru ? null :
                <Animatable.View animation={'fadeInLeft'} duration={500}>
                  <Text style={styles.errorMsg}>Panjang minimal password 8 karakter.</Text>
                </Animatable.View> }

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{ color: colors.dark1, marginLeft: 10 }}>Batal</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ backgroundColor: colors.green1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, elevation: 3, marginRight: 10 }} onPress={ resetPass }>
                    <Text style={{ color: colors.white }}>{ loading ? 'Menyimpan...' : 'Simpan' }</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* =============================================================================================== */}

        <View style={styles.card}>
          <FastImage source={{uri: assets.images.IMUser}} style={styles.image} />

          <TextInput
            placeholder={'Nama'}
            value={ data.nama_users }
            onChangeText={(value) => onChangeNama(value)}
            style={styles.input}
          />
          { data.isValidNama ? null :
          <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>Panjang minimal nama 5 karakter.</Text>
          </Animatable.View> }

          <TextInput
            placeholder={'Email'}
            keyboardType="email-address"
            autoCapitalize="none"
            value={ data.email }
            onChangeText={(value) => onChangeEmail(value)}
            style={styles.input}
          />
          { data.isValidEmail ? null :
          <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>Panjang minimal email 10 karakter.</Text>
          </Animatable.View> }
          
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.textReset}>Reset Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={ editProfil }>
            <Icon
              name={'save-sharp'}
              size={15}
              color={colors.white}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.textButton}>{ loading ? 'Menyimpan...' : 'Simpan' }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  card: {
    width: '93%',
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    marginTop: 20
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 5
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.grey2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  textReset: {
    fontFamily: fonts.primary[600],
    color: colors.dark1,
    fontSize: 13,
    marginLeft: 3,
    marginTop: 8,
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: colors.green1,
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
  },
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%'
  },
  inputReset: {
    borderBottomWidth: 1,
    borderBottomColor: colors.green1,
    marginTop: 5,
    padding: 5
  },
  errorMsg: {
    color: colors.red1,
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    marginLeft: 5
  }
});