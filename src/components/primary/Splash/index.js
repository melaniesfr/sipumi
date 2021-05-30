import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../utils';
import Gap from '../Gap';

const { width } = Dimensions.get('window');

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <FastImage
          source={{uri: assets.images.IMKabBlitar}}
          style={styles.logoKab}
        />
      </View>

      <View>
        <View animation="fadeInUpBig" style={{ alignItems: 'center' }}>
          <Text style={[styles.logoTextDark, { color: 'black' }]}>SI-PUMI</Text>
          <Text style={[styles.logoTextDark, { fontSize: 14 }]}>(SISTEM INFORMASI POTENSI USAHA MIKRO)</Text>
          <Text style={[styles.logoTextDark, { fontSize: 14 }]}>KABUPATEN BLITAR</Text>
        </View>

        <Gap height={30} />

        <FastImage
          source={{uri: assets.images.IMLogo}}
          style={styles.logoBupati}
        />
      </View>

      <View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textDinkop}>DINAS KOPERASI DAN USAHA MIKRO</Text>
          <Text style={styles.textDinkop}>KABUPATEN BLITAR</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  logoTextDark: {
    color: colors.white,
    fontSize: 25,
    fontFamily: fonts.primary[800]
  },
  logoTextGreen: {
    color: colors.black,
    fontSize: 25,
    fontFamily: fonts.primary[800]
  },
  logoBupati: {
    width: width - 60,
    height: width - 98,
    alignSelf: 'center'
  },
  logoKab: {
    width: 83,
    height: 80
  },
  textDinkop: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.primary[800]
  }
});