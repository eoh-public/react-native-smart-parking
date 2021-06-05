import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Colors } from '../../../../configs';
import { keyExtractor } from '../../../../utils/Converter/array';

const FLatListCT = ({
  refreshing,
  isLoadMore,
  data,
  renderItem,
  onRefresh,
  onLoadMore,
  onMomentumScrollBegin,
  ListEmptyComponent,
  animatedScrollYValue = new Animated.Value(0),
}) => {
  return (
    <Animated.FlatList
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      extraData={data}
      onMomentumScrollBegin={onMomentumScrollBegin}
      ListFooterComponent={
        isLoadMore && (
          <ActivityIndicator style={styles.loadMore} color={Colors.Primary} />
        )
      }
      ListEmptyComponent={!refreshing && ListEmptyComponent}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }],
        {
          useNativeDriver: true,
        }
      )}
    />
  );
};

export default memo(FLatListCT);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  loadMore: {
    paddingTop: 16,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
});
