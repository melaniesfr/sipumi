import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { colors, fonts, assets } from '../../../../utils';

export default function TambahProdukAdmin({ route, navigation }) {
  const [ loading, setLoading ] = useState(false);

  const [ data, setData ] = useState({
    id_umkm: route.params.id_umkm,
    nama_produk: '',
    harga: '',
    gambar_produk: '',
    isValidNama: true,
    isValidHarga: true
  });

  const onChangeNama = (value) => {
    if (value.length >= 5) {
      setData({
        ...data,
        nama_produk: value,
        isValidNama: true
      });
    } else {
      setData({
        ...data,
        nama_produk: value,
        isValidNama: false
      });
    }
  };

  const onChangeHarga = (value) => {
    if (value.length > 0) {
      setData({
        ...data,
        harga: value,
        isValidHarga: true
      });
    } else {
      setData({
        ...data,
        harga: value,
        isValidHarga: false
      });
    }
  };

  const [ avatarSource, setAvatarSource ] = useState(null);
  const [ imgSource, setImgSource ] = useState('IMProdukKosong.png');
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
    let base_url = assets.baseURL + 'produk/';
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

    if (data.nama_produk.length === 0 || data.harga.length === 0) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak boleh ada yang kosong.');
    } else if (data.nama_produk.length < 5 || data.harga.length < 1) {
      setLoading(false);
      Alert.alert('Error!', 'Data isian tidak memenuhi ketentuan.');
    } else if (data.nama_produk.length >= 5 || data.harga.length > 0) {
      fetch(assets.api.insertProduk, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_umkm: data.id_umkm,
          nama_produk: data.nama_produk,
          harga: data.harga,
          gambar_produk: imgSource
        })
      })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);

        if (resJson === 'Tambah produk berhasil.') {
          Alert.alert('Success!', resJson);
    
          setData({
            ...data,
            nama_produk: '',
            harga: '',
            gambar_produk: ''
          });
    
          setAvatarSource(null);
          navigation.goBack();
        } else if (resJson === 'Produk sudah ada, silakan isi data lain.') {
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
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} onPress={selectImage}>
            { !avatarSource && <Image source={{uri: assets.images.IMNoImage}} style={{ width: 150, height: 150, resizeMode: 'contain' }} /> }

            { avatarSource && <Image source={{uri: avatarSource}} style={{ width: 150, height: 150, resizeMode: 'contain' }} /> }

            { isUploading && <ActivityIndicator /> }
          </TouchableOpacity>

          <TextInput placeholder={'Nama Produk'} style={styles.input} onChangeText={(value) => onChangeNama(value)} value={ data.nama_produk } />
          { data.isValidNama ? null :
          <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>Panjang minimal nama produk 5 karakter.</Text>
          </Animatable.View> }

          <TextInput placeholder={'Harga Produk'} style={styles.input} onChangeText={(value) => onChangeHarga(value)} value={ data.harga } keyboardType={'number-pad'} />
          { data.isValidHarga ? null :
          <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>Harga produk tidak boleh kosong.</Text>
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
  errorMsg: {
    color: colors.red1,
    fontSize: 13,
    fontFamily: fonts.primary.normal,
    marginLeft: 5
  }
});