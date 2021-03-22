import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { isEmpty } from 'lodash';

import Text from '../../../commons/Text';
import { Colors, Device } from '../../../configs';
import { useToggle } from '../../../hooks/Common';

const ItemDropDown = memo(
  ({ title, placeholder, onChangeData, data, initIndex }) => {
    const [index, setIndex] = useState(initIndex ?? -1);
    const value = useMemo(() => data[index]?.text || '', [data, index]);
    const [visiable, toggle] = useToggle();
    const onSelect = useCallback(
      (id) => {
        setIndex(id);
        toggle();
        onChangeData(id);
      },
      [onChangeData, toggle]
    );
    return (
      <View style={styles.container}>
        <Text type={'Body'} color={Colors.Gray8}>
          {title}
        </Text>

        <View style={styles.boxInput}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.btn}
            onPress={toggle}
          >
            <Text
              type={'H4'}
              color={isEmpty(value) ? Colors.Gray6 : Colors.Gray9}
              style={styles.txtValue}
            >
              {value || placeholder}
            </Text>
            <Icon name={'caret-down'} color={Colors.Gray8} />
          </TouchableOpacity>
        </View>
        {visiable && (
          <View style={styles.boxData}>
            {data.map((item) => {
              const select = index === item.id;
              return (
                <Item
                  text={item.text}
                  id={item.id}
                  key={item.id}
                  onSelect={onSelect}
                  select={select}
                />
              );
            })}
          </View>
        )}
      </View>
    );
  }
);

const Item = memo(({ id, onSelect, text, select }) => {
  const _onSelect = useCallback(() => {
    onSelect && onSelect(id);
  }, [id, onSelect]);
  return (
    <TouchableOpacity key={id} style={styles.btnSelect} onPress={_onSelect}>
      <Text type={'H4'} color={select ? Colors.Primary : Colors.Gray9}>
        {text}
      </Text>
    </TouchableOpacity>
  );
});
export default ItemDropDown;

const styles = StyleSheet.create({
  container: {
    width: Device.screenWidth - 32,
  },
  boxInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.Gray5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  txtValue: {
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    flex: 1,
  },
  boxData: {
    borderWidth: 1,
    borderColor: Colors.Gray5,
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  btnSelect: {
    paddingVertical: 8,
  },
});
