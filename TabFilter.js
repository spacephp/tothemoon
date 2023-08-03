import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
    selectionMode,
    tabs,
    color,
    onSelectSwitch,
  }) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  
    const updateSwitchData = value => {
      setSelectionMode(value);
      onSelectSwitch(value);
    };
    return (
      <View
        style={{
          height: 44,
          width: '100%',
          backgroundColor: '#e4e4e4',
          borderRadius: 10,
          borderColor: '#AD40AF',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {tabs.map((tab) => (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(tab.name)}
                style={{
                flex: 1,
                backgroundColor: getSelectionMode == tab.name ? color : '#e4e4e4',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <Text
                style={{
                    color: getSelectionMode == tab.name ? 'white' : color,
                    fontSize: 14,
                    fontFamily: 'Roboto-Medium',
                }}>
                {tab.name}
                </Text>
            </TouchableOpacity>
        ))}
      </View>
    );
}
const TabFilter = ({children, color}) => {

    const [activeTab, setActiveTab] = useState(children[0].props.name);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const tabs = children.map((child) => ({
        name: child.props.name,
        children: child.props.children
    }));
    
    const renderContent = () => {
        return tabs.map((tab) => {
          if (tab.name === activeTab) {
            return tab.children;
          }
        });
    };

    return (
        <View>
        <View style={{marginVertical: 0}}>
            <CustomSwitch
            selectionMode={tabs[0].name}
            tabs={tabs}
            color={color}
            onSelectSwitch={handleTabChange}
            />
        </View>
        {renderContent()}
        </View>
    )
}
const Tab = ({name, children}) => {
  return (
    <View id={name}>
        {children}
    </View>
  );
}

TabFilter.Tab = Tab;

export default TabFilter;