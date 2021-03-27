import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBookingScan } from './hooks';
import { useNavigation } from '@react-navigation/native';
import { ToastBottomHelper } from '../../utils/Utils';
import { t } from 'i18n-js';
import QRScan from './components/QRScan';
import { TESTID } from '../../configs/Constants';

const SMScanQR = memo(() => {
  const { goBack } = useNavigation();
  const {
    loading,
    setLoading,
    scanToConfirm,
    scanToBook,
    getActiveBooking,
    checkQRCodeValid,
  } = useBookingScan();

  const onScan = useCallback(
    async (data) => {
      setLoading(true);
      const { isValid, parking_id, spot_id } = checkQRCodeValid(data);

      if (!isValid) {
        ToastBottomHelper.error(t('qr_code_invalid'));
        goBack();
        return;
      }

      const hasBooked = await getActiveBooking();
      if (hasBooked === -1) {
        goBack();
        return;
      }

      if (hasBooked) {
        scanToConfirm(spot_id);
      } else {
        scanToBook(parking_id, spot_id);
      }
    },
    [
      checkQRCodeValid,
      getActiveBooking,
      goBack,
      scanToBook,
      scanToConfirm,
      setLoading,
    ]
  );

  return (
    <View style={styles.container}>
      <QRScan
        testID={TESTID.SCAN_QR_CODE_SPOT}
        onScan={onScan}
        loading={loading}
        setLoading={setLoading}
      />
    </View>
  );
});

export default SMScanQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
