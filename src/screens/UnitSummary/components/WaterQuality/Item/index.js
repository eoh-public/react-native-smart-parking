import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '../../../../../commons/Text';
import { Colors, Constants } from '../../../../../configs';
import Route from '../../../../../utils/Route';

const width_item = (Constants.width - 48) / 2;

const Item = memo((props) => {
  const { svgMain, title, des, value, color, waterType } = props;

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate(Route.WaterQualityGuide, { waterType });
  };

  return (
    <View style={styles.container}>
      <View size={14} color={Colors.Gray8} style={styles.textTitleX}>
        <Text>{title}</Text>
        {waterType && (
          <TouchableOpacity onPress={goToDetail}>
            <IconOutline
              style={styles.row}
              name="info-circle"
              size={14}
              color={Colors.Black}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text size={24} color={color || Colors.Gray9} style={styles.textValue}>
        {value}
      </Text>
      <Text size={12} color={Colors.Gray8}>
        {des}
      </Text>
      <View style={styles.boxSvg}>
        <Text>{svgMain}</Text>
      </View>
    </View>
  );
});
export default Item;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 5,
    backgroundColor: Colors.White,
    width: width_item,
    marginBottom: 16,
    borderRadius: 5,
  },
  textTitleX: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    marginBottom: 16,
  },
  textValue: {
    marginBottom: 8,
  },
  boxSvg: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
