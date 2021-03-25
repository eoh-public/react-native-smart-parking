import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {t} from 'i18n-js';;

import Text from '../../commons/Text';
import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';

const TabHeader = memo(({ current, getCurrentTab }) => {
  const [currentTab, setCurrentTabState] = useState(current);

  useEffect(() => {
    getCurrentTab(currentTab);
  }, [currentTab, getCurrentTab]);

  const setTab0 = useCallback(() => {
    setCurrentTabState(0);
  }, []);

  const setTab1 = useCallback(() => {
    setCurrentTabState(1);
  }, []);

  const isActiveRecently = currentTab === 0;

  return (
    <View style={styles.tabHeaderContainer}>
      <View style={styles.tabHeaderLeftContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, isActiveRecently && styles.tabItemActive]}
          onPress={setTab0}
        >
          <Text
            color={Colors.Gray8}
            bold={isActiveRecently}
            style={isActiveRecently && styles.textItemActive}
          >
            {t('recently_saved')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, !isActiveRecently && styles.tabItemActive]}
          onPress={setTab1}
          testID={TESTID.TAB_HEADER_2}
        >
          <Text
            color={Colors.Gray8}
            bold={!isActiveRecently}
            style={!isActiveRecently && styles.textItemActive}
          >
            {t('near_me')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TabHeader;

const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 15,
    marginRight: 32,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderColor: Colors.Primary,
  },
  textItemActive: {
    color: Colors.Primary,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    marginTop: 16,
    marginLeft: 19,
  },
  tabHeaderLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
