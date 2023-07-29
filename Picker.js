import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const Picker = ({ data, selectedValue, onValueChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectValue = (value) => {
    onValueChange(value);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropboxButton} onPress={handleToggleDropdown}>
        <Text style={styles.dropboxButtonText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal
        visible={showDropdown}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelectValue(item.value)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  dropboxButton: {
    backgroundColor: 'white',
    elevation: 2,
    padding: 10,
  },
  dropboxButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownItem: {
    backgroundColor: 'white',
    padding: 16,
  },
});

export default Picker;