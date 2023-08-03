import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen = ({ title }) => {
  return (
    <View id={title} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export function createScreen(title) {
    return () => { return <Screen title={title}/>}
} 
export default Screen;