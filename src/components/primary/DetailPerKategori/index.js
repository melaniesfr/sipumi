import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { assets } from '../../../utils';
import axios from 'axios';

export default function DetailPerKategori({ item, renderItem }) {
  const [ data, setData ] = useState();

  const getData = () => {
    axios.get(assets.api.view)
    .then((res) => {
      let datas = [];
      for (var i=0; i < res.data.length; i++) {
        if (item.nama_kategori === res.data[i].kategori) {
          datas.push(res.data[i]);
        }
      }
      setData(datas);
    })
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ data }
        renderItem={ renderItem }
        keyExtractor={ (item) => item.id_kategori }
        horizontal={ false }
        numColumns={ 2 }
        showsVerticalScrollIndicator={ false }
        onEndReachedThreshold={ 50 }
        getItemLayout={(data, index) => (
          {length: 40, offset: 40 * index, index}
        )}
        initialNumToRender={ 10 }
        style={{ marginVertical: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});