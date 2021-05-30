import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function Pengaturan({ onPressTitle, title }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Versi 0.0.1</Text>
        <TouchableOpacity onPress={ onPressTitle } style={styles.button}>
          <Text style={styles.buttonText}>{ title }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    width: '90%',
    marginTop: 20
  },
  contentText: {
    fontSize: 15,
    color: colors.blue2,
    marginBottom: 10,
    marginLeft: 8,
    fontFamily: fonts.primary.normal
  },
  button: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 10,
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    color: colors.green1,
    textAlign: 'center',
    fontFamily: fonts.primary[800]
  }
});