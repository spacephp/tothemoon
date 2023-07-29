import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const BottomTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.name);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = children.map((child) => ({
    id: child.props.name,
    label: child.props.label || child.props.name,
    icon: child.props.icon || require("./assets/heart.png")
  }));

  const renderContent = () => {
    return React.Children.map(children, (child) => {
      if (child.props.name === activeTab) {
        return child;
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <TabBar tabs={tabs} activeTab={activeTab} onChangeTab={handleTabChange} />
    </View>
  );
};

const TabBar = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tabItem,
            activeTab === tab.id ? styles.activeTab : null,
          ]}
          onPress={() => onChangeTab(tab.id)}
          activeOpacity={1}
        >
          <TabIcon source={tab.icon} focused={activeTab === tab.id} />
          <Text style={[styles.tabText, (activeTab === tab.id) && styles.tabTextFocused]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TabIcon = React.memo(({ source, focused }) => (
  <Image
    source={source}
    style={[styles.tabIcon, focused && styles.tabIconFocused]}
    resizeMode="contain"
  />
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  tabText: {
    fontSize: 12,
    color: 'black',
  },
  tabIconFocused: {
    tintColor: '#007BFF', // Change to your desired focused icon color
  },
  tabTextFocused: {
    color: '#007BFF',
  },
  tabItem: {
    alignItems:'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  activeTab: {
    //borderBottomWidth: 2,
   // borderColor: '#007BFF',
  },
  
});

export default BottomTabs;
