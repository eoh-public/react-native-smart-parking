import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Colors } from '../../../../configs';
import { keyExtractor } from '../../../../utils/Converter/array';

const SectionListBookingCard = ({
  refreshing,
  isLoadMore,
  data,
  renderItem,
  renderSectionHeader,
  onRefresh,
  onLoadMore,
  onMomentumScrollBegin,
  ListEmptyComponent,
  animatedScrollYValue = new Animated.Value(0),
}) => {
  return (
    <Animated.SectionList
      keyExtractor={keyExtractor}
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
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

export default memo(SectionListBookingCard);

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
