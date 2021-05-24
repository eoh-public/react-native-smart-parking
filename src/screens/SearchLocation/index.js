/* eslint-disable no-empty */
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, API } from '../../configs';
import SearchBarLocation from './components/SearchLocation';
import RowLocation from './components/SearchLocation/RowLocation';
import Text from '../../commons/Text';
import { axiosGet } from '../../utils/Apis/axios';
import { getCurrentLatLng } from '../../utils/CountryUtils';
import useKeyboardShow from '../../hooks/Common/useKeyboardShow';
import AsyncKeys from '../../utils/AsyncKey';

import { getData, storeData } from '../../utils/Storage';
import { removeDuplicateSearch } from '../../utils/Converter/array';

const SearchLocation = ({ route }) => {
  const { onSelectLocation } = route.params;
  const { goBack } = useNavigation();
  const [searchData, setSearchData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const { keyboardBottomPadding } = useKeyboardShow();
  const [recentData, setRecentData] = useState([]);

  const getRecentData = useCallback(async () => {
    let recentSearch = await getData(AsyncKeys.RECENT_SEARCH);
    if (recentSearch === undefined || recentSearch === null) {
      recentSearch = [];
    } else {
      recentSearch = JSON.parse(recentSearch);
    }
    setRecentData(recentSearch);
  }, []);

  useEffect(() => {
    getRecentData();
  }, [getRecentData]);

  const onTextInput = useCallback(
    async (input) => {
      setInputSearch(input);
      if (!input) {
        return;
      }
      const api_key = Config.GOOGLE_MAP_API_KEY;
      try {
        const location = await getCurrentLatLng();
        const config = {
          params: {
            input: input,
            key: api_key,
            sessiontoken: 123456324,
            location: `${location.lat},${location.lng}`,
            radius: 10000,
            origin: `${location.lat},${location.lng}`,
          },
        };

        const { success, data } = await axiosGet(
          API.EXTERNAL.GOOGLE_MAP.AUTO_COMPLETE,
          config
        );
        if (success) {
          setSearchData(data.predictions);
        }
      } catch (error) {}
    },
    [setInputSearch]
  );

  const saveRecentSearch = useCallback(
    async (item) => {
      const { description } = item;
      let recentSearch = recentData;
      removeDuplicateSearch(recentSearch, description);
      recentSearch = [item, ...recentSearch];
      if (recentSearch.length > 10) {
        recentSearch = recentSearch.slice(0, 10);
      }
      await storeData(AsyncKeys.RECENT_SEARCH, JSON.stringify(recentSearch));
    },
    [recentData]
  );

  const onPressRowLocation = useCallback(
    (item) => {
      delete item.distance_meters;
      (async () => {
        await saveRecentSearch(item);
      })();
      onSelectLocation(item);
      goBack();
    },
    [saveRecentSearch, onSelectLocation, goBack]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <RowLocation
        item={item}
        fromApi={!!inputSearch}
        onPress={onPressRowLocation}
      />
    ),
    [inputSearch, onPressRowLocation]
  );
  const keyExtractor = (item) => item.description;

  return (
    <SafeAreaView style={styles.wrap}>
      <SearchBarLocation onTextInput={onTextInput} />
      {!inputSearch && (
        <Text
          semibold
          type="Body"
          color={Colors.Gray9}
          style={styles.paddingHorizontal}
        >
          {t('recent')}
        </Text>
      )}
      <FlatList
        style={styles.wrap}
        data={inputSearch === '' ? recentData : searchData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: keyboardBottomPadding,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});
export default SearchLocation;
