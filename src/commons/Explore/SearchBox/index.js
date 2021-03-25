import React, { memo, useCallback } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors } from '../../../configs';
import Theme from '../../../configs/Theme';
import Search from '../../../../assets/images/Explore/Search.svg';
import ArrowBack from '../../../../assets/images/Explore/ArrowBack.svg';

const SearchBox = memo(({ isBack, style, onFocus }) => {
  const { goBack } = useNavigation();
  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);
  const onFocusInput = useCallback(() => {
    onFocus && onFocus();
  }, [onFocus]);
  return (
    <View style={[styles.searchBox, style]}>
      {isBack ? (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowBack />
        </TouchableOpacity>
      ) : (
        <View>
          <Search />
        </View>
      )}
      <TextInput
        placeholder={t('text_search_location_placeholder')}
        placeholderTextColor={Colors.Gray7}
        style={Theme.textSearchInput}
        onFocus={onFocusInput}
      />
    </View>
  );
});

export default SearchBox;
const styles = StyleSheet.create({
  searchBox: {
    ...Theme.flexRow,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 5,
    marginTop: 8,
    height: 48,
  },
  backBtn: {
    padding: 12,
    marginHorizontal: -12,
  },
});
