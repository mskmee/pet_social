import React from 'react';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppIcon = ({type, ...props}) => {
  return <CommunityIcon name={type} {...props} />;
};

export {AppIcon};
