import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking, Platform, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import Gap from '../Gap';
import Review from '../Review';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function DetailUMKM({ data, onPressNavigation, onPressRate }) {
  const [ dialog, setDialog ] = useState(null);

  const GambarProduk = () => {
    if (data.gambar_umkm !== '') {
      return (
        <FastImage
          source={{uri: assets.baseURL + `images/${data.gambar_umkm}`}}
          style={{ flex: 1, width: '100%' }}
        />
      );
    } else {
      return (
        <FastImage
          source={{uri: assets.images.IMBlank}}
          style={{ flex: 1, width: '100%' }}
        />
      );
    }
  };

  const dialCall = (telp) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${telp}`;
    } else {
      phoneNumber = `telprompt:${telp}`;
    }

    Linking.openURL(phoneNumber);
  };

  const openGmaps = (address) => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  const applyLetterSpacing = (address) => {
    var adr = encodeURIComponent(address.trim());
    openGmaps(adr);
  };

const changeRupiah = (value) => {
  var harga = value;
		
  var	reverse = harga.toString().split('').reverse().join(''),
	    ribuan 	= reverse.match(/\d{1,3}/g);
	    ribuan	= ribuan.join('.').split('').reverse().join('');
	
  return ribuan;
};

  const [ produk, setProduk ] = useState([]);
  const getProduk = () => {
    axios.get(assets.api.produk)
    .then((res) => {
      for (var i=0; i<res.data.length; i++) {
        if (data.id_umkm === res.data[i].id_umkm) {
          setProduk(res.data[i]);
        }
      }
    })
    .catch((err) => console.log(err))
  };

  const [ produks, setProduks ] = useState([]);
  const getProduks = () => {
    axios.get(assets.api.produk)
    .then((res) => {
      setProduks(res.data);
    })
    .catch((err) => console.log(err))
  };

  let mounted = true;
  useEffect(() => {
    if (mounted) {
      getProduk();
      getProduks();
    }

    return () => mounted = false;
  }, []);

  const ProdukA = () => {
    return (
      produks.map((item, index) => {
        if (data.id_umkm === item.id_umkm) {
          return (
            <View key={ index } style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                <Icon
                  name={'caret-forward'}
                  size={20}
                  color={colors.dark2}
                />
                <Text style={styles.informationData}>{ item.nama_produk }</Text>
              </View>
              <Text style={[styles.informationTitle, { fontSize: 14 }]}>: Rp { changeRupiah(item.harga) }</Text>
            </View>
          );
        }
      })
    );
  };

  const ProdukTA = () => {
    return (
      <Text style={styles.informationData}>Belum ada produk</Text>
    );
  };
  
  const GambarProdukA = () => {
    return (
      <ScrollView horizontal>
        <Gap width={20} />
          { produks.map((item, index) => {
            if (data.id_umkm === item.id_umkm) {
              return (
                <View key={ index }>
                  <TouchableOpacity onPress={() => setDialog(index)}>
                    <FastImage
                      source={{uri: assets.baseURL + `/produk/${item.gambar_produk}`}}
                      style={{ width: 150, height: 100, marginRight: 10, borderRadius: 5 }}
                    />
                  </TouchableOpacity>

                  <Modal
                    visible={dialog !== null}
                    onRequestClose={() => setDialog(null)}
                  >
                    <View style={{ backgroundColor: colors.black, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <ImageViewer
                        imageUrls={dialog !== null ? [{url: assets.baseURL + `/produk/` + produks[dialog].gambar_produk}] : null}
                        renderIndicator={() => null}
                        onSwipeDown={() => setDialog(null)}
                        enableSwipeDown={true}
                        style={{ width: width }}
                      />
                    </View>
                    
                    <Icon
                      name={'close-circle'}
                      size={40}
                      color={colors.white}
                      style={{ opacity: 0.8, position: 'absolute', top: 10, right: 10 }}
                      onPress={() => setDialog(null)}
                    />
                  </Modal>
                </View>
              );
            }
          })}
        <Gap width={10} />
      </ScrollView>
    );
  };

  const GambarProdukTA = () => {
    return (
      <Text style={{ textAlign: 'center', fontFamily: fonts.primary.normal, color: colors.dark1 }}>
        Belum ada gambar produk
      </Text>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Animatable.View style={styles.top} animation={'bounceInDown'}>
          <GambarProduk />

          <TouchableOpacity style={styles.backButton} onPress={ onPressNavigation }>
            <Icon
              name={'chevron-back-circle'}
              size={45}
              color={colors.white}
              style={{ opacity: 0.8 }}
            />
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          style={styles.bottom}
          animation={'fadeInUpBig'}
        >
          <View style={styles.title}>
            <Text style={{ fontSize: 20, fontFamily: fonts.primary[800], color: colors.dark1 }}>{ data.nama_umkm }</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: colors.green1, fontSize: 17, marginBottom: 5, fontFamily: fonts.primary[600] }}>Pemilik</Text>
              <Text style={{ fontSize: 15, fontFamily: fonts.primary.normal, color: colors.dark1 }}>{ data.pemilik }</Text>
            </View>

            <TouchableOpacity style={styles.rate} onPress={ onPressRate }>
              <FastImage source={{uri: assets.icons.ICStar}} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.information}>
            <Text style={styles.informationText}>Informasi</Text>

            <View>
              <Text style={styles.informationTitle}>Deskripsi</Text>
              <Text style={styles.informationData}>{ data.deskripsi }</Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text style={styles.informationTitle}>Kategori</Text>
              <Text style={styles.informationData}>{ data.kategori }</Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text style={styles.informationTitle}>Produk</Text>
              
              { produk.length !== 0 ? <ProdukA /> : <ProdukTA /> }
            </View>

            <View style={{ marginTop: 8 }}>
              <Text style={styles.informationTitle}>Alamat</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.informationData}>{ data.alamat }</Text>
                <TouchableOpacity
                  onPress={() => applyLetterSpacing(data.alamat)}
                  style={{ backgroundColor: colors.grey4, paddingHorizontal: 6, paddingVertical: 5, borderRadius: 50 }}
                >
                  <Icon
                    name={'location-sharp'}
                    size={20}
                    color={colors.grey5}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text style={styles.informationTitle}>No. Telp / WA</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.informationData}>{ data.telp }</Text>
                <TouchableOpacity onPress={() => dialCall(data.telp)}>
                  <Text style={{ fontSize: 12, fontFamily: fonts.primary.normal, color: colors.dark2 }}>Hubungi Sekarang?</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ marginTop: 8 }}>
              <Text style={styles.informationTitle}>Sosial Media</Text>

              <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flexDirection: 'row', width: '28%' }}>
                  <Icon
                    name={'logo-facebook'}
                    size={18}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.informationData}>Facebook</Text>
                </View>
                <Text style={[styles.informationTitle, { fontSize: 14 }]}>: { data.facebook }</Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flexDirection: 'row', width: '28%' }}>
                  <Icon
                    name={'logo-instagram'}
                    size={18}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.informationData}>Instagram</Text>
                </View>
                <Text style={[styles.informationTitle, { fontSize: 14 }]}>: { data.instagram }</Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: colors.grey6 }}>
            <Gap height={20} />
            
            <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: colors.green1, marginBottom: 20 }}>
              <Gap width={20} />
              <Text style={styles.review}>Gambar Produk</Text>
            </View>

            { produk.length !== 0 ? <GambarProdukA /> : <GambarProdukTA /> }

            <Gap height={20} />
          </View>

          <View>
            <Gap height={20} />
            <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: colors.green1, marginBottom: 20 }}>
              <Gap width={20} />
              <Text style={styles.review}>Reviews</Text>
            </View>

            <Review data={ data } />
            
            <Gap height={20} />
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    height: 250
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10
  },
  bottom: {
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    elevation: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  title: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  rate: {
    backgroundColor: colors.green1,
    width: 60, height: 60,
    borderRadius: 60/2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  information: {
    padding: 20,
    backgroundColor: colors.green1
  },
  informationText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 15,
    fontFamily: fonts.primary[600]
  },
  informationTitle: {
    color: colors.dark2,
    fontSize: 15,
    fontFamily: fonts.primary.normal
  },
  informationData: {
    color: colors.white,
    fontFamily: fonts.primary.normal,
    maxWidth: '90%'
  },
  review: {
    fontSize: 17,
    color: colors.dark1,
    fontFamily: fonts.primary[600],
    marginBottom: 15
  }
});