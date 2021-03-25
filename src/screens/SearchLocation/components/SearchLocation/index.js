import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, Fonts } from '../../../../configs';
import { TESTID } from '../../../../configs/Constants';

const SearchBarLocation = memo(({ onTextInput }) => {
  const { goBack } = useNavigation();
  const [input, setInput] = useState('');
  const timeOutTextChange = useRef(null);

  const onPressRight = useCallback(() => {
    setInput('');
  }, []);

  useEffect(() => {
    if (timeOutTextChange.current) {
      clearTimeout(timeOutTextChange.current);
    }
    timeOutTextChange.current = setTimeout(
      () => {
        onTextInput && onTextInput(input);
      },
      input ? 300 : 0
    );
  }, [input, timeOutTextChange, onTextInput]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonLeft} onPress={goBack}>
        <IconOutline name="left" size={24} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={setInput}
        placeholder={t('smart_parking_add_destination')}
        placeholderTextColor={Colors.Gray6}
        underlineColorAndroid={null}
        testID={TESTID.SEARCH_BAR_INPUT}
      />
      <TouchableOpacity
        disabled={!input}
        style={styles.buttonRight}
        onPress={onPressRight}
      >
        <IconOutline
          name={input ? 'close' : 'search'}
          size={24}
          color={input ? Colors.Black : Colors.Gray6}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginHorizontal: 16,
    height: 48,
    backgroundColor: Colors.White,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonLeft: {
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
  },
  buttonRight: {
    paddingLeft: 10,
    paddingRight: 16,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 10,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.Gray9,
  },
});

export default SearchBarLocation;
