import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function Pengaturan({ onPressTitle, title }) {
  const openGdrive = () => {
    Linking.openURL('https://drive.google.com/file/d/1EGZJDitD2lHEVs2Ymn2WhlunrwBJh30F/view?usp=sharing');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => openGdrive()} style={styles.buttonHelp}>
          <Text style={styles.buttonHelpText}>Help</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.contentText}>Versi 0.0.1</Text>

          <TouchableOpacity onPress={ onPressTitle } style={styles.button}>
            <Text style={styles.buttonText}>{ title }</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    width: '90%',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  buttonHelp: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 10,
    elevation: 5
  },
  buttonHelpText: {
    fontSize: 16,
    color: colors.green1,
    textAlign: 'center',
    fontFamily: fonts.primary[700]
  },
  contentText: {
    fontSize: 15,
    color: colors.blue2,
    marginBottom: 10,
    marginLeft: 8,
    fontFamily: fonts.primary.normal
  },
  button: {
    backgroundColor: colors.green1,
    padding: 13,
    borderRadius: 50,
    elevation: 2,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.primary[800]
  },
});