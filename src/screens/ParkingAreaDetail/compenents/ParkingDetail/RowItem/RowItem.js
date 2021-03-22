import React, { memo } from 'react';
import { View } from 'react-native';

import Text from '../../../../../commons/Text';

import { styles } from './styles';

const RowItem = memo(({ source, title, subTitle, titleColor }) => {
  return (
    <View style={styles.container}>
      {source}
      <Text type="H4" style={styles.txtTitle} color={titleColor}>
        {title}
        {subTitle && <Text> {subTitle} </Text>}
      </Text>
    </View>
  );
});

export default RowItem;
