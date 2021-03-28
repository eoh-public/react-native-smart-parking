import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { RNCamera } from 'react-native-camera';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'i18n-js';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';
import Loading from '../../../../commons/Explore/ActivityIndicator';
import { CircleButton } from '../../../../commons';

const { height, width } = Dimensions.get('window');
const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;
const maskBackgroundColor = 'rgba(1,1,1,0.6)';

const LoadingCamera = memo(() => {
  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator />
    </View>
  );
});

const VerifingQRCode = memo(() => {
  return (
    <View style={styles.maskOutter}>
      <TouchableOpacity style={[styles.viewVerifing, styles.buttonShadow]}>
        <Loading
          icon={<IconOutline name={'sync'} color={Colors.Green6} size={16} />}
        />
        <Text type={'Body'} style={styles.text}>
          {t('verify_qr_code')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const QRScan = memo(({ testID, onScan, loading, setLoading }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const onBarCodeRead = useCallback(
    (e) => {
      !loading && onScan(e.data);
    },
    [loading, onScan]
  );
  const onPressClose = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  useEffect(() => {
    isFocused && setLoading(false);
  }, [isFocused, setLoading]);

  return (
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      onBarCodeRead={onBarCodeRead}
      testID={testID}
    >
      {({ camera, status, recordAudioPermissionStatus }) => {
        if (status !== 'READY') {
          return <LoadingCamera />;
        }
        return (
          <View style={styles.maskOutter}>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame,
              ]}
            />
            <View style={styles.maskCenter}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame,
              ]}
            />
            <CircleButton
              onPress={onPressClose}
              size={32}
              backgroundColor={Colors.White}
              borderWidth={1}
              borderColor={Colors.Gray4}
              style={styles.buttonClose}
            >
              <IconOutline name={'close'} size={24} co />
            </CircleButton>
            {loading && <VerifingQRCode />}
          </View>
        );
      }}
    </RNCamera>
  );
});

export default QRScan;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: Colors.TextTransparent,
    borderColor: Colors.Blue10,
    borderWidth: 5,
  },
  maskFrame: {
    backgroundColor: maskBackgroundColor,
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    flex: 30,
    flexDirection: 'row',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    position: 'absolute',
    top: getStatusBarHeight(true) + 16,
    left: 16,
  },
  viewVerifing: {
    marginLeft: 16,
    height: 54,
    width: Device.screenWidth - 32,
    borderRadius: 27,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    marginRight: 16,
  },
  text: {
    marginLeft: 8,
  },
});
