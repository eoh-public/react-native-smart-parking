import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import {t} from 'i18n-js';;

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import { TESTID } from '../../../../configs/Constants';

const ControllHour = memo((props) => {
  const [hour, setHour] = useState(props.hour);
  const { confirmed } = props;
  const color = confirmed ? Colors.Gray1 : Colors.Gray9;

  const onMinus = useCallback(() => {
    setHour((prevHour) => {
      if (prevHour === 1) {
        return prevHour;
      }
      props.onChangeHour && props.onChangeHour(prevHour - 1);
      return prevHour - 1;
    });
  }, [props]);

  const onPlus = useCallback(() => {
    setHour((prevHour) => {
      props.onChangeHour && props.onChangeHour(prevHour + 1);
      return prevHour + 1;
    });
  }, [props]);

  useEffect(() => {
    setHour(props.hour);
  }, [props.hour]);

  const hourUnit = hour > 1 ? t('hours') : t('hour');

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        testID={TESTID.MINUS}
        style={styles.btn}
        activeOpacity={0.4}
        onPress={onMinus}
        disabled={confirmed}
      >
        <Icon name={'minus'} color={color} size={24} />
      </TouchableOpacity>
      <View style={styles.boxHour}>
        <Text testID={TESTID.HOUR} type="H3" color={Colors.Primary}>
          {`${hour} ${hourUnit}`}
        </Text>
      </View>
      <TouchableOpacity
        testID={TESTID.PLUS}
        style={styles.btn}
        activeOpacity={0.4}
        onPress={onPlus}
        disabled={confirmed}
      >
        <Icon name={'plus'} color={color} size={24} />
      </TouchableOpacity>
    </View>
  );
});

export default ControllHour;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  btn: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 2,
    backgroundColor: Colors.Gray2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHour: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
