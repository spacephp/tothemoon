import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';


const BarChart = ({data}) => {
  // Calculate the maximum value to determine the bar height scale
  const maxIncome = Math.max(...data.map(item => item.income));
  const maxExpense = Math.max(...data.map(item => item.expense));
  const maxValue = Math.max(maxIncome, maxExpense);

  // State to track the active bar (null if no bar is being touched)
  const [activeBar, setActiveBar] = useState(null);

  const handleBarPressIn = (index) => {
    setActiveBar(index);
  };

  const handleBarPressOut = () => {
    setActiveBar(null);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableWithoutFeedback
          key={item.day}
          onPressIn={() => handleBarPressIn(index)}
          onPressOut={handleBarPressOut}
        >
          <View style={styles.barContainer}>
            <View style={styles.bar}>
              <View style={[styles.incomeBar, { height: (item.income / maxValue) * 100 }]} />
              <View style={[styles.expenseBar, { height: (item.expense / maxValue) * 100 }]} />
            </View>
            <Text style={styles.label}>{item.day}</Text>
            {activeBar === index && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText} numberOfLines={1}>{`Doanh thu: ${item.income}`}</Text>
                <Text style={styles.tooltipText} numberOfLines={1}>{`Lợi nhuận: ${item.expense}`}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    height: 200,
    
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    width: 40,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  incomeBar: {
    flex: 1,
    backgroundColor: '#2ecc71',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  expenseBar: {
    flex: 1,
    backgroundColor: '#e74c3c',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 4,
    top: 0,
    minWidth: 120,
    left: '50%',
    transform: [{ translateX: -60 }],
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default BarChart;