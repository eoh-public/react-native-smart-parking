import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../commons/Text';
import { Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';

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

  const setTab2 = useCallback(() => {
    setCurrentTabState(2);
  }, []);

  return (
    <View style={styles.tabHeaderContainer}>
      <View style={styles.tabHeaderLeftContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, currentTab === 0 && styles.tabItemActive]}
          onPress={setTab0}
        >
          <Text
            color={Colors.Gray8}
            bold={currentTab === 0}
            style={currentTab === 0 && styles.textItemActive}
          >
            {t('active')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, currentTab === 1 && styles.tabItemActive]}
          onPress={setTab1}
          testID={TESTID.TAB_HEADER_2}
        >
          <Text
            color={Colors.Gray8}
            bold={currentTab === 1}
            style={currentTab === 1 && styles.textItemActive}
          >
            {t('history')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, currentTab === 2 && styles.tabItemActive]}
          onPress={setTab2}
        >
          <Text
            color={Colors.Gray8}
            bold={currentTab === 2}
            style={currentTab === 2 && styles.textItemActive}
          >
            {t('violation')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default TabHeader;

const styles = StyleSheet.create({
  tabItem: {
    marginRight: 32,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderColor: Colors.Primary,
  },
  textItemActive: {
    color: Colors.Gray9,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    paddingLeft: 39,
    borderBottomWidth: 1,
    borderColor: Colors.Gray11,
  },
  tabHeaderLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
