import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { assets } from '../../../utils';
import axios from 'axios';


export default function Kategori({ renderItem }) {
  const [ data, setData ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  const getData = () => {
    setIsLoading(true);

    axios.get(assets.api.kategori)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    })
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
        refreshing={ isLoading }
        onRefresh={ getData }
        horizontal={ false }
        numColumns={ 2 }
        onEndReachedThreshold={ 50 }
        getItemLayout={(data, index) => (
          {length: 40, offset: 40 * index, index}
        )}
        initialNumToRender={ 10 }
        style={{ marginVertical: 10 }}
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