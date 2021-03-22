import React, { memo } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../configs';
import Text from '../../Text';

const { width } = Dimensions.get('window');
const QualityIndicatorItem = memo(
  ({
    color,
    standard,
    value,
    evaluate,
    measure,
    style,
    descriptionScreen,
    type,
  }) => {
    const styleColor = {
      backgroundColor: color,
    };
    const navigation = useNavigation();

    return (
      <View style={[styles.container, style, color && styles.containerPadding]}>
        <View style={[styles.line, styleColor]} />
        <View style={styles.rowFlex}>
          <Text size={14} color={Colors.Gray8} style={styles.txtMeasure}>
            {standard}
          </Text>
          {type === 'machine_status' && (
            <TouchableOpacity
              onPress={() => navigation.navigate(descriptionScreen)}
              style={styles.iconInfo}
            >
              <IconOutline
                name={'info-circle'}
                size={16}
                color={Colors.Gray8}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text size={24} color={Colors.Gray9} style={styles.txtValue}>
          {`${value} ${measure}`}
        </Text>
        {!!evaluate && (
          <Text size={12} color={evaluate.color} style={styles.txtEvaluate}>
            {evaluate.text}
          </Text>
        )}
      </View>
    );
  }
);

export default QualityIndicatorItem;

const styles = StyleSheet.create({
  containerPadding: {
    paddingVertical: 16,
  },
  container: {
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginRight: 8,
    width: (width / 375) * 109,
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 24,
    height: 3,
    borderRadius: 10,
  },
  txtMeasure: {
    lineHeight: 22,
    marginTop: 8,
  },
  txtValue: {
    lineHeight: 32,
    marginTop: 16,
  },
  txtEvaluate: {
    lineHeight: 20,
    marginTop: 8,
  },
  iconInfo: {
    top: 10,
  },
});
