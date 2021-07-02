import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

import { useBookingScan } from './hooks';
import { ToastBottomHelper } from '../../utils/Utils';
import QRScan from './components/QRScan';
import { TESTID } from '../../configs/Constants';
import { axiosGet } from '../../utils/Apis/axios';
import { API } from '../../configs';
import Routes from '../../utils/Route';

const SMScanQR = memo(() => {
  const { goBack, navigate } = useNavigation();
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
      const { isValid, parking_id, spot_id, spot_name } = checkQRCodeValid(
        data
      );

      if (!isValid) {
        ToastBottomHelper.error(t('qr_code_invalid'));
        goBack();
        return;
      }

      const response = await axiosGet(API.PARKING.PARKING_INFO(), {
        params: {
          spot_name: spot_name,
        },
      });
      if (response.success && response.data && response.data.booking_id) {
        navigate(Routes.SmartParkingBookingDetails, {
          id: response.data.booking_id,
        });
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
        scanToBook(parking_id, spot_id, spot_name);
      }
    },
    [
      checkQRCodeValid,
      getActiveBooking,
      goBack,
      scanToBook,
      scanToConfirm,
      setLoading,
      navigate,
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
