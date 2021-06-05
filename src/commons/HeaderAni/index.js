import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '../../commons/Text';
import { Colors } from '../../configs';

const default_height = 44;
export const title_height = 44;
export const heightHeader = default_height + title_height;

const HeaderAni = memo(
  ({ scrollY, onLeft, title, rightComponent, headerStyle }) => {
    const { goBack } = useNavigation();
    const onPressLeft = useCallback(() => {
      if (onLeft) {
        onLeft && onLeft();
      } else {
        goBack();
      }
    }, [goBack, onLeft]);
    const titleTransformY = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: [0, -title_height],
      extrapolate: 'clamp',
    });
    const titleTransformX = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: [0, 16],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    const translateY = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: [0, -title_height],
      extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, 2 * title_height],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const titleMarginRight = rightComponent ? 80 : 0;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [{ translateY }],
              opacity,
            },
            styles.content,
            headerStyle,
          ]}
        />
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnBack} onPress={onPressLeft}>
            <Icon name={'left'} size={27} color={Colors.Gray9} />
          </TouchableOpacity>
          <View styles={styles.wrapRightComponent}>{rightComponent}</View>
        </View>

        <Animated.View
          style={{
            transform: [
              { translateY: titleTransformY },
              { translateX: titleTransformX },
              { scale: titleScale },
            ],
            ...styles.boxText,
            marginRight: titleMarginRight,
          }}
        >
          <Text
            type={'H2'}
            semibold
            style={styles.textHeader}
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>
      </View>
    );
  }
);

export default HeaderAni;

const styles = StyleSheet.create({
  textHeader: {
    color: Colors.Gray9,
    marginLeft: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // zIndex: 2,
  },
  btnBack: {
    height: default_height,
    width: default_height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapRightComponent: {
    height: default_height,
    width: default_height,
  },
  container: {
    backgroundColor: Colors.TextTransparent,
    width: '100%',
    zIndex: 2,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: heightHeader,
    backgroundColor: Colors.Gray2,
    borderWidth: 0.5,
    borderColor: Colors.Border,
  },
  boxText: {
    height: title_height,
    justifyContent: 'center',
    backgroundColor: Colors.TextTransparent,
  },
});
