import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Header = (props) => {
  const handleAvatarPress = () => {
    // Add the code to handle avatar press if needed
  };

  return (
    <View style={{...styles.container,backgroundColor:props.background}}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appNameText}>xMoney</Text>
      </View>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
        <Image
          source={props.avatar} // Replace with your avatar image
          style={styles.avatarImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  appNameContainer: {
    flex: 1,
    marginRight: 20,
  },
  appNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

export default Header;
