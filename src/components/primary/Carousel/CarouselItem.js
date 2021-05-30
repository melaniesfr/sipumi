import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors, fonts } from '../../../utils';

const { width, height } = Dimensions.get('window');

export default class CarouselItem extends PureComponent {
  render() {
    return (
      <View style={styles.cardView}>
        <FastImage source={{uri: this.props.item.url}} style={styles.image} />
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{ this.props.item.title }</Text>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 4,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    left: 5
  },
  image: {
    width: width - 20,
    height: height / 4,
    borderRadius: 10
  },
  itemTitle: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.primary[800],
    shadowColor: colors.black,
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  }
});