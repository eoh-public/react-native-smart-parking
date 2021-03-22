import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import t from 'i18n';
import { Colors } from '../../configs';

const MediaPlayer = memo(({ uri, previewUri, style }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.loadingWrap}>
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
      <VLCPlayer
        autoAspectRatio={true}
        videoAspectRatio="21:9"
        source={{ uri: uri }}
        style={[styles.player, style]}
      />
    </View>
  );
});

export default MediaPlayer;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.TextGray,
    overflow: 'hidden',
  },
  loadingWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.White,
  },
  player: {
    flex: 1,
    borderRadius: 10,
  },
});
