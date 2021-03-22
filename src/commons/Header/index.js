import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Text';
import { Colors } from '../../configs';

import BackDefault from '../BackDefault';

const Header = ({
  hasBack,
  leftComponent,
  centerComponent,
  rightComponent,
  title,
  wrapStyle,
  goBack,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [width, setWidth] = useState(0);

  const onLayout = (event) => {
    // const _width = event.nativeEvent.layout.width;
    // if (_width > width) {
    //   setWidth(_width);
    // }
    // PHIMAI REM THIS FOR PR: https://gitlab.com/eohio/EohMobile/-/merge_requests/168
  };

  return (
    <View style={[styles.wrap, wrapStyle]}>
      <View
        onLayout={onLayout}
        style={[styles.componentContainer, { minWidth: width }]}
      >
        {(hasBack && <BackDefault goBack={goBack} />) || leftComponent}
      </View>
      <View style={styles.titleWrap}>
        {centerComponent || (
          <Text bold numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
        )}
      </View>
      <View
        onLayout={onLayout}
        style={[styles.componentContainer, { minWidth: width }]}
      >
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  titleWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
  },
  componentContainer: {
    justifyContent: 'center',
  },
});

export default Header;
