import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import md5 from 'md5';

export default function Register({ navigation }) {
  const [ pass, setPass ] = useState('');

  const [ data, setData ] = useState({
    nama_users: '',
    email: '',
    password: '',
    check_textNamaChange: false,
    check_textEmailChange: false,
    secureTextEntry: true,
    isValidNama: true,
    isValidEmail: true,
    isValidPassword: true
  });

  const onChangeNama = (value) => {
    if (value.trim().length >= 5) {
      setData({
        ...data,
        nama_users: value,
        check_textNamaChange: true,
        isValidNama: true
      });
    } else {
      setData({
        ...data,
        nama_users: value,
        check_textNamaChange: false,
        isValidNama: false
      });
    }
  };

  const onChangeEmail = (value) => {
    if (value.trim().length >= 10) {
      setData({
        ...data,
        email: value,
        check_textEmailChange: true,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textEmailChange: false,
        isValidEmail: false
      });
    }
  };

  const onChangePassword = (value) => {
    if (pass.length >= 7) {
      setData({
        ...data,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        isValidPassword: false
      });
    }
  };

  const encryptPw = () => {
    let encodePass = md5(pass);

    setData({
      ...data,
      password: encodePass
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  };

  const registHandle = () => {
    if (data.nama_users.length === 0 || data.email.length === 0 || pass.length === 0) {
      Alert.alert('Error!', 'Kolom nama/email/password tidak boleh kosong.');
    } else if (data.nama_users.length < 5 || data.email.length < 10 || pass.length < 8) {
      Alert.alert('Error!', 'Data isian tidak sesuai ketentuan.');
    } else if (data.nama_users.length >= 5 && data.email.length >= 10 && pass.length >= 8) {
      fetch(assets.api.registration, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nama_users: data.nama_users,
          email: data.email,
          password: data.password
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson === 'Registrasi berhasil.') {
          Alert.alert('Success!', resJson);
          navigation.navigate('Login');
        } else if (resJson === 'User sudah ada, silakan coba lagi.') {
          Alert.alert('Peringatan!', resJson);
        } else {
          Alert.alert('Error!', resJson);
        }
  
        setData({
          ...data,
          nama_users: '',
          email: '',
          password: '',
          check_textNamaChange: false,
          check_textEmailChange: false,
          isValidNama: true,
          isValidEmail: true,
          isValidPassword: true
        });
  
        setPass('');
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.boxRegister}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <FastImage source={{uri: assets.images.IMKabBlitar}} style={{ height: 31, width: 32, marginRight: 10 }} />
              <Text style={styles.title}>REGISTER</Text>
            </View>

            <View style={styles.input}>
              <Icon
                name={'person-outline'}
                size={20}
                style={{ marginTop: 13, marginRight: 5 }}
              />
              <TextInput
                placeholder="Nama"
                value={ data.nama_users }
                onChangeText={(value) => onChangeNama(value)}
              />
              { data.check_textNamaChange ?
              <Animatable.View animation="bounceIn" style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                <Feather
                  name="check-circle"
                  color={colors.green}
                  size={20}
                />
              </Animatable.View>
              : null }
            </View>

            { data.isValidNama ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal nama 5 karakter.</Text>
            </Animatable.View> }

            <View style={styles.input}>
              <Icon
                name={'mail-outline'}
                size={20}
                style={{ marginTop: 13, marginRight: 5 }}
              />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={ data.email }
                onChangeText={(value) => onChangeEmail(value)}
              />
              { data.check_textEmailChange ?
              <Animatable.View animation="bounceIn" style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                <Feather
                  name="check-circle"
                  color={colors.green}
                  size={20}
                />
              </Animatable.View>
              : null }
            </View>

            { data.isValidEmail ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal email 10 karakter.</Text>
            </Animatable.View> }

            <View style={styles.input}>
              <Icon
                name={'key-outline'}
                size={20}
                style={{ marginTop: 11, marginRight: 5 }}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={ data.secureTextEntry }
                autoCapitalize="none"
                value={ pass }
                onChangeText={(value) => {setPass(value), onChangePassword(value)}}
                onEndEditing={() => encryptPw()}
              />
              <TouchableOpacity onPress={ updateSecureTextEntry } style={{ position: 'absolute', marginTop: 13, right: 5 }}>
                { data.secureTextEntry ?
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

            { data.isValidPassword ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal password 8 karakter.</Text>
            </Animatable.View> }

            <TouchableOpacity style={styles.registerButton} onPress={() => registHandle()}>
              <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
              <Icon
                name={'chevron-back-outline'}
                size={20}
                style={{ position: 'absolute', left: 120 }}
              />
              <Text style={styles.backText}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.grey1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxRegister: {
    width: '90%',
    backgroundColor: colors.white,
    borderTopStartRadius: 25,
    borderBottomEndRadius: 25,
    padding: 20,
    elevation: 10
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    fontFamily: fonts.primary[800],
    color: colors.dark1
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row'
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
    padding: 12,
    backgroundColor: colors.green1,
    borderRadius: 50,
    elevation: 5
  },
  registerText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.primary[600],
    alignSelf: 'center'
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    position: 'relative'
  },
  backText: {
    textDecorationLine: 'underline',
    marginLeft: 18,
    fontFamily: fonts.primary.normal,
    color: colors.dark1
  },
  errorMsg: {
    color: colors.red1,
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    marginLeft: 5
  }
});