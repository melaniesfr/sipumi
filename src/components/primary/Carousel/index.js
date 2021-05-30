import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Animated } from 'react-native';
import CarouselItem from './CarouselItem';

const { width } = Dimensions.get('window');

export default function Carousel({ data }) {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [ dataList, setDataList ] = useState(data);

  useEffect(() => {
    setDataList(data);
    infiniteScroll(dataList);
  }, []);

  let flatList = useRef(null);

  function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0, scrolled = 0;

    setInterval(function() {
      scrolled++;

      if (scrolled < numberOfData) {
        scrollValue = scrollValue + width;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }

      if (flatList.current) {
        flatList.current.scrollToOffset({
          animated: true,
          offset: scrollValue
        });
      }
    }, 3000);
  };

  if (data && data.length) {
    return (
      <View>
        <FlatList
          ref={flatList}
          data={ data }
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment={'center'}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={ item } />
          }}
          onScroll={Animated.event(
            [{ nativeEvent: {
                 contentOffset: {
                   x: scrollX
                 }
               }
            }],
            { useNativeDriver: false }
          )}
          onEndReachedThreshold={ 50 }
          getItemLayout={(data, index) => (
            {length: 40, offset: 40 * index, index}
          )}
          initialNumToRender={ 10 }
        />

        <View style={styles.dotView}>
          { data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i-1, i, i+1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            })
            return (
              <Animated.View
                key={ i }
                style={{ opacity, height: 5, width: 5, backgroundColor: '#595959', margin: 3, borderRadius: 5 }}
              />
            )
          })}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});