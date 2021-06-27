import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TextInput, ActivityIndicator, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import { colors, fonts, assets } from '../../../../utils';

export default function TambahUMKMAdmin() {
  const [ loading, setLoading ] = useState(false);

  const dataKategori = [
    '- Pilih Kategori -', 'Batik', 'Fashion', 'Kerajinan', 'Kuliner', 'Makanan Olahan', 'Minuman Olahan'
  ];

  const [ data, setData ] = useState({
    nama_umkm: '',
    pemilik: '',
    deskripsi: '',
    kategori: '',
    alamat: '',
    facebook: '',
    instagram: '',
    telp: '',
    gambar_umkm: '',
    isValidProduk: true,
    isValidPemilik: true,
    isValidDeskripsi: true,
    isValidKategori: true,
    isValidAlamat: true,
    isValidFacebook: true,
    isValidInstagram: true,
    isValidTelp: true
  });

  const onChangeProduk = (value) => {
    if (value.length >= 5) {
      setData({
        ...data,
        nama_umkm: value,
        isValidProduk: true
      });
    } else {
      setData({
        ...data,
        nama_umkm: value,
        isValidProduk: false
      });
    }
  };

  const onChangePemilik = (value) => {
    if (value.length >= 5) {
      setData({
        ...data,
        pemilik: value,
        isValidPemilik: true
      });
    } else {
      setData({
        ...data,
        pemilik: value,
        isValidPemilik: false
      });
    }
  };

  const onChangeDeskripsi = (value) => {
    if (value.length >= 10) {
      setData({
        ...data,
        deskripsi: value,
        isValidDeskripsi: true
      });
    } else {
      setData({
        ...data,
        deskripsi: value,
        isValidDeskripsi: false
      });
    }
  };

  const onChangeKategori = (value) => {
    if (value !== 0) {
      setData({
        ...data,
        kategori: value,
        isValidKategori: true
      });
    } else {
      setData({
        ...data,
        kategori: value,
        isValidKategori: false
      });
    }
  };

  const onChangeAlamat = (value) => {
    if (value.length >= 10) {
      setData({
        ...data,
        alamat: value,
        isValidAlamat: true
      });
    } else {
      setData({
        ...data,
        alamat: value,
        isValidAlamat: false
      });
    }
  };

  const onChangeFacebook = (value) => {
    if (value.length > 0) {
      setData({
        ...data,
        facebook: value,
        isValidFacebook: true
      });
    } else {
      setData({
        ...data,
        facebook: value,
        isValidFacebook: false
      });
    }
  };

  const onChangeInstagram = (value) => {
    if (value.length > 0) {
      setData({
        ...data,
        instagram: value,
        isValidInstagram: true
      });
    } else {
      setData({
        ...data,
        instagram: value,
        isValidInstagram: false
      });
    }
  };

  const onChangeTelp = (value) => {
    if (value.length >= 11) {
      setData({
        ...data,
        telp: value,
        isValidTelp: true
      });
    } else {
      setData({
        ...data,
        telp: value,
        isValidTelp: false
      });
    }
  };
  
  const [ avatarSource, setAvatarSource ] = useState(null);
  const [ imgSource, setImgSource ] = useState(null);
  const [ isUploading, setIsUploading ] = useState(false);

  const selectImage = async() => {
    ImagePicker.showImagePicker({noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7}, (response) => {
      if (response.didCancel) {
        Alert.alert('Error!', 'User batal memilih gambar');
      } else if (response.error) {
        Alert.alert('Error!', 'ImagePicker error');
      } else if (response.customButton) {
        Alert.alert('Error!', 'User menekan tombol lain');
      } else {
        uploadImage(response.uri);
      }
    });
  };

  const uploadImage = async(image_uri) => {
    setIsUploading(true);
    let base_url = assets.baseURL + 'images/';
    let uploadData = new FormData();
    uploadData.append('submit', 'ok');
    uploadData.append('file', {type: 'image/jpg', uri: image_uri, name: 'uploadimagetmp.jpg'});

    fetch(base_url, {
      method: 'post',
      body: uploadData
    })
    .then(response => response.json())
    .then(response => {
      if (response.status) {
        setIsUploading(false),
        setAvatarSource(base_url + response.image);
        setImgSource(response.image);
      } else {
        setIsUploading(false);
        Alert.alert('Error!', response.message);
      }
    })
    .catch(() => {
      setIsUploading(false);
      Alert.alert('Error!', 'Error on network');
    })
  };

  const saveData = () => {
    setLoading(true);

    if (data.nama_umkm.length === 0 || data.pemilik.length === 0 || data.deskripsi.length === 0 || data.alamat.length === 0 || data.facebook.length === 0 || data.instagram.length === 0 || data.telp.length === 0) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak boleh ada yang kosong.');
    } else if (data.nama_umkm.length < 5 || data.pemilik.length < 5 || data.deskripsi.length < 10 || data.kategori === 0 || data.alamat.length < 10 || data.telp.length < 11) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak memenuhi ketentuan.');
    } else if (data.nama_umkm.length >= 5 || data.pemilik.length >= 5 || data.deskripsi.length >= 10 || data.kategori !== 0 || data.alamat.length >= 10 || data.facebook.length > 0 || data.instagram.length > 0 || data.telp.length >= 11 || data.gambar_umkm.length > 0) {
      fetch(assets.api.insertUMKM, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nama_umkm: data.nama_umkm,
          pemilik: data.pemilik,
          deskripsi: data.deskripsi,
          kategori: data.kategori,
          alamat: data.alamat,
          facebook: data.facebook,
          instagram: data.instagram,
          telp: data.telp,
          gambar_umkm: imgSource
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);

        if (resJson === 'Tambah UMKM berhasil.') {
          Alert.alert('Success!', resJson);
    
          setData({
            ...data,
            nama_umkm: '',
            pemilik: '',
            deskripsi: '',
            kategori: 0,
            alamat: '',
            facebook: '',
            instagram: '',
            telp: '',
            gambar_umkm: ''
          });
    
          setAvatarSource(null);
        } else if (resJson === 'UMKM sudah ada, silakan isi data lain.') {
          Alert.alert('Peringatan!', resJson);
        } else {
          Alert.alert('Error!', resJson);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} onPress={selectImage}>
              { !avatarSource && <Image source={{uri: assets.images.IMNoImage}} style={{ width: 150, height: 150, resizeMode: 'contain' }} /> }

              { avatarSource && <Image source={{uri: avatarSource}} style={{ width: 150, height: 150, resizeMode: 'contain' }} /> }

              { isUploading && <ActivityIndicator /> }
            </TouchableOpacity>

            <TextInput placeholder={'Nama UMKM'} style={styles.input} onChangeText={(value) => onChangeProduk(value)} value={ data.nama_umkm } />
            { data.isValidProduk ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal nama UMKM 5 karakter.</Text>
            </Animatable.View> }

            <TextInput placeholder={'Nama Pemilik'} style={styles.input} onChangeText={(value) => onChangePemilik(value)} value={ data.pemilik } />
            { data.isValidPemilik ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal nama pemilik 5 karakter.</Text>
            </Animatable.View> }

            <TextInput placeholder={'Deskripsi'} style={styles.input} onChangeText={(value) => onChangeDeskripsi(value)} value={ data.deskripsi } />
            { data.isValidDeskripsi ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal deskripsi 10 karakter.</Text>
            </Animatable.View> }

            <View>
              <Text style={{ marginTop: 5, fontSize: 15, color: colors.grey3, fontFamily: fonts.primary.normal }}>Kategori</Text>
              <Picker
                selectedValue={ data.kategori }
                style={{ height: 40, color: colors.grey2 }}
                onValueChange={(value) => onChangeKategori(value)}
              >
                { dataKategori.map((item, index) => (
                  <Picker.Item key={index} label={item} value={ index } />
                ))}
              </Picker>
            </View>
            { data.isValidKategori ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Kategori tidak boleh kosong.</Text>
            </Animatable.View> }

            <TextInput placeholder={'Alamat'} style={styles.input} onChangeText={(value) => onChangeAlamat(value)} value={ data.alamat } />
            { data.isValidAlamat ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal alamat 10 karakter.</Text>
            </Animatable.View> }

            <TextInput placeholder={'Facebook'} style={styles.input} onChangeText={(value) => onChangeFacebook(value)} value={ data.facebook } />
            { data.isValidFacebook ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Facebook harus diisi, jika tidak ada isi dengan -</Text>
            </Animatable.View> }

            <TextInput placeholder={'Instagram'} style={styles.input} onChangeText={(value) => onChangeInstagram(value)} value={ data.instagram } autoCapitalize={'none'} />
            { data.isValidInstagram ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Instagram harus diisi, jika tidak ada isi dengan -</Text>
            </Animatable.View> }

            <TextInput placeholder={'No. HP/WA'} keyboardType={'number-pad'} style={styles.input} onChangeText={(value) => onChangeTelp(value)} value={ data.telp } />
            { data.isValidTelp ? null :
            <Animatable.View animation={'fadeInLeft'} duration={500}>
              <Text style={styles.errorMsg}>Panjang minimal no. telp 11 karakter.</Text>
            </Animatable.View> }

            <TouchableOpacity onPress={ saveData } style={styles.button}>
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
      </ScrollView>
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
    marginVertical: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.grey2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
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
  },
  errorMsg: {
    color: colors.red1,
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    marginLeft: 5
  }
});