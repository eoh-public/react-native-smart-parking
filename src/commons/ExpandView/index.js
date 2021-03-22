import { IconOutline } from '@ant-design/icons-react-native';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from '../Text';
import { Colors, Device } from '../../configs';

const ExpandView = memo(({ leftIcon, title, expandedView }) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewClickable} onPress={handlePress}>
        {leftIcon}
        <Text type={'H4'} color={Colors.Gray9} style={styles.title}>
          {title}
        </Text>
        <IconOutline name={expanded ? 'up' : 'down'} size={15} />
      </TouchableOpacity>
      {expanded && expandedView}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '100%',
  },
  viewClickable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: !Device.isIOS ? 4 : 0,
    flex: 1,
    marginLeft: 18,
  },
  item: {
    paddingLeft: 35,
  },
  itemIcon: {
    paddingLeft: 55,
  },
  textInfo: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 42,
    color: Colors.Green,
  },
  textAddCard: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.Orange,
  },
});

export default ExpandView;
