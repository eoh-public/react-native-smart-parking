import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

export const Section = ({ children, type, style }) => (
  <View
    style={[
      type === 'border' ? styles.sectionBorder : styles.section,
      style && style,
    ]}
  >
    {children}
  </View>
);
