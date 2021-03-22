import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Animated, ScrollView } from 'react-native';

import Header from '../Header';
import ListMyAllUnit from '../ListMyAllUnit';
import { Colors } from '../../../../configs';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const MyAllUnit = ({ route, navigation }) => {
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const unitItems = route.params.myUnits;

  return (
    <SafeAreaView style={[styles.wrap, styles.backgroundWhite]}>
      <Header dark goBack={() => navigation.goBack()} />
      <AnimatedScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }],
          {
            useNativeDriver: true,
          }
        )}
        contentContainerStyle={styles.wrap}
      >
        <ListMyAllUnit unitItems={unitItems} />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  backgroundWhite: {
    backgroundColor: Colors.White,
  },
});

export default MyAllUnit;
