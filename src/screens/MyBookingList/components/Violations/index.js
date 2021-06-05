import React, { memo, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { t } from 'i18n-js';
import ViolationItem from './ViolationItem';
import { useViolation } from '../../hooks';
import FlatListCT from '../FlatListCT';
import { Colors, Constants } from '../../../../configs';

const Violations = memo(({ animatedScrollYValue, appState }) => {
  const {
    arrViolations,
    isLoadMore,
    isRefreshing,
    onLoadMore,
    onMomentumScrollBegin,
    onRefresh,
  } = useViolation();

  const renderItem = ({ item }) => (
    <ViolationItem key={item.id} {...item} reloadData={onRefresh} />
  );

  const renderListEmptyComponent = () => (
    <Text style={styles.textEmpty}>{t('no_parking_history')}</Text>
  );

  useEffect(() => {
    appState === 'active' && onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return (
    <FlatListCT
      data={arrViolations}
      refreshing={isRefreshing}
      isLoadMore={isLoadMore}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      onMomentumScrollBegin={onMomentumScrollBegin}
      renderItem={renderItem}
      animatedScrollYValue={animatedScrollYValue}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
});

export default Violations;

const styles = StyleSheet.create({
  textEmpty: {
    marginTop: Constants.height * 0.3,
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray7,
  },
});
