import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors, fonts, assets } from '../../../../utils';
import { Kategori } from '../../../primary';


export default function KategoriVisitor({ navigation }) {
  class MyListItem extends PureComponent {
    render() {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailPerKategoriVisitor', { item: this.props.item })} style={styles.card}>
          { (this.props.item.nama_kategori === 'Batik') && <FastImage source={{uri: assets.icons.ICBatik}} style={styles.icon} /> }
          { (this.props.item.nama_kategori === 'Fashion') && <FastImage source={{uri: assets.icons.ICFashion}} style={styles.icon} /> }
          { (this.props.item.nama_kategori === 'Kerajinan') && <FastImage source={{uri: assets.icons.ICHandmade}} style={styles.icon} /> }
          { (this.props.item.nama_kategori === 'Kuliner') && <FastImage source={{uri: assets.icons.ICFood}} style={styles.icon} /> }
          { (this.props.item.nama_kategori === 'Makanan Olahan') && <FastImage source={{uri: assets.icons.ICFoods}} style={styles.icon} /> }
          { (this.props.item.nama_kategori === 'Minuman Olahan') && <FastImage source={{uri: assets.icons.ICDrink}} style={styles.icon} /> }

          <Text style={styles.text}>{ this.props.item.nama_kategori }</Text>
        </TouchableOpacity>
      );
    };
  };

  const renderItem = ({ item }) => {
    return (
      <MyListItem
        item={ item }
      />
    );
  };

  return (
    <Kategori
      renderItem={ renderItem }
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 75,
    width: 75,
    alignSelf: 'center'
  },
  card: {
    backgroundColor: colors.white,
    elevation: 10,
    margin: 5,
    borderRadius: 10,
    width: (Dimensions.get('window').width / 2) - 20,
    height: 150,
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 7,
    color: colors.green1,
    fontFamily: fonts.primary[600]
  }
});