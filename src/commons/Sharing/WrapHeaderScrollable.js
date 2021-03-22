import React, { useRef, useCallback, useState, memo } from 'react';
import {
  RefreshControl,
  StyleSheet,
  Animated,
  View,
  SafeAreaView,
} from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';

import { Colors, Theme } from '../../configs';
import HeaderAni, { heightHeader } from '../../commons/HeaderAni';
import Text from '../../commons/Text';

const WrapHeaderScrollable = memo(
  ({
    children,
    title,
    subTitle,
    rightComponent,
    loading = false,
    onRefresh,
    styleScrollView,
    contentContainerStyle,
    onLoadMore,
    headerAniStyle,
  }) => {
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;
    const [loadingMore, setLoadingMore] = useState(false);
    const loadMore = useCallback(() => {
      if (onLoadMore) {
        setLoadingMore(true);
        onLoadMore(() => setLoadingMore(false));
      }
    }, [onLoadMore]);

    const transformY = animatedScrollYValue.interpolate({
      inputRange: [0, 44],
      outputRange: [0, -44],
      extrapolate: 'clamp',
    });

    return (
      <SafeAreaView style={[styles.container, headerAniStyle]}>
        <HeaderAni
          scrollY={animatedScrollYValue}
          title={title}
          rightComponent={rightComponent}
          headerStyle={headerAniStyle}
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }],
            {
              useNativeDriver: true,
            }
          )}
          style={[
            styles.scrollView,
            styleScrollView,
            {
              transform: [{ translateY: transformY }],
            },
          ]}
          contentContainerStyle={[
            styles.contentContainerStyle,
            contentContainerStyle && contentContainerStyle,
          ]}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={loadMore}
        >
          {!!subTitle && (
            <Text type={'Body'} color={Colors.Gray8} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
          {children}
          {loadingMore && (
            <View style={styles.bottomLoading}>
              <ActivityIndicator size="small" color={Colors.Black} />
            </View>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
);
export default WrapHeaderScrollable;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
    marginBottom: -heightHeader,
  },
  contentContainerStyle: {
    paddingBottom: heightHeader,
  },
  bottomLoading: {
    height: 32,
    ...Theme.center,
  },
  subTitle: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
