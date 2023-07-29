import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList , TouchableOpacity, SafeAreaView} from 'react-native';

export default function HorizontalFlatlist({data, onPress}) {
  const [activeJobType, setActiveJobType] = useState(data[0]);
  return (
    <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                onPress(item);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: 10 }}
          horizontal
        />
  )
}

const styles = StyleSheet.create({
  tab: (activeJobType, item) => ({
    paddingVertical: 10 / 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: activeJobType === item ? 'red' : 'gray',
  }),
  tabText: (activeJobType, item) => ({
    color: activeJobType === item ? 'red' : 'gray',
  }),
});