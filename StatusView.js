import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const StatusView = ({ hasData, noDataView, loadData, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    realLoad();
  }, []);
  const realLoad = async () => {
    await loadData();
    setIsLoading(false);
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!hasData) {
    return noDataView();
  }

  return children;
};

export default StatusView;