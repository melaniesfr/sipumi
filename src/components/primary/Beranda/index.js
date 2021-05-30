import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { colors, fonts, assets } from '../../../utils';
import Carousel from '../Carousel';
import { CarouselData } from '../Carousel/Data';
import axios from 'axios';

export default function Beranda({ renderItem }) {
  const [ data, setData ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ filteredDataSource, setFilteredDataSource ] = useState();

  const getData = () => {
    setIsLoading(true);

    axios.get(assets.api.view)
    .then((res) => {
      setData(res.data);
      setFilteredDataSource(res.data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    })
  };

  useEffect(() => {
    getData();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = `${item.nama_umkm.toUpperCase()} ${item.pemilik.toUpperCase()} ${item.deskripsi.toUpperCase()} ${item.kategori.toUpperCase()} ${item.alamat.toUpperCase()}`
          ? `${item.nama_umkm.toUpperCase()} ${item.pemilik.toUpperCase()} ${item.deskripsi.toUpperCase()} ${item.kategori.toUpperCase()} ${item.alamat.toUpperCase()}`
          : '';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Beranda</Text>
          </View>

          <SearchBar
            platform={'ios'}
            cancelButtonTitle={'Batal'}
            cancelButtonProps={{ color: colors.white }}
            leftIcon={'Beranda'}
            searchIcon={{ size: 20 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Cari"
            value={ search }
            inputStyle={{ marginLeft: 0, fontSize: 15 }}
            inputContainerStyle={{ height: 30, backgroundColor: 'white' }}
            containerStyle={{ backgroundColor: colors.green1, flex: 0.7 }}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </View>

        <Carousel data={ CarouselData } />

        <FlatList
          data={ filteredDataSource }
          renderItem={ renderItem }
          keyExtractor={ (item) => item.id_umkm }
          refreshing={ isLoading }
          onRefresh={ getData }
          horizontal={ false }
          numColumns={ 2 }
          showsVerticalScrollIndicator={ false }
          onEndReachedThreshold={ 50 }
          getItemLayout={(data, index) => (
            {length: 40, offset: 40 * index, index}
          )}
          initialNumToRender={ 10 }
          style={{ marginVertical: 8, alignSelf: 'center' }}
        />
        
        <StatusBar backgroundColor={ colors.green1 } />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green1
  },
  textHeader: {
    fontFamily: fonts.primary[700],
    color: colors.white,
    fontSize: 20,
    marginLeft: 8
  }
});