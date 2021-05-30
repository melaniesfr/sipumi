import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../../../../utils';

export default function TabItemVisitor({ title, active, onPress, onLongPress }) {
  const Icon = () => {
    if (title === 'Beranda') {
      return active ? <Ionicons name="home" color={colors.green1} size={25} /> : <Ionicons name="home-outline" color={colors.grey} size={25} />;
    } if (title === 'Kategori') {
      return active ? <Ionicons name="grid" color={colors.green1} size={25} /> : <Ionicons name="grid-outline" color={colors.grey} size={25} />;
    } if (title === 'Pengaturan') {
      return active ? <Ionicons name="settings" color={colors.green1} size={25} /> : <Ionicons name="settings-outline" color={colors.grey} size={25} />;
    }

    return <Ionicons name="home" color={colors.green1} size={25} />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={ onPress } onLongPress={ onLongPress }>
      <Icon />
      <Text style={styles.text(active)}>{ title }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: (active) => ({
    fontSize: 10,
    color:
      active
        ? colors.green1
        : colors.grey,
    fontFamily: fonts.primary[600]
  })
});