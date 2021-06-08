import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';

import { Colors } from '../../../../configs';
import AddressInfo from '../ActiveSessions/AddressInfo/AddressInfo';
import ButtonTextBottomView from '../ButtonTextBottomView';
import Routes from '../../../../utils/Route';

const BookingHistoryItem = memo(
  ({ id, parking, grand_total, status, hasActiveSessions }) => {
    const { navigate } = useNavigation();

    const onPress = useCallback(() => {
      navigate(Routes.SmartParkingBookingDetails, {
        id,
      });
    }, [navigate, id]);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.4}
      >
        <AddressInfo
          id={id}
          name={parking.name}
          address={parking.address}
          grand_total={grand_total}
        />
        <ButtonTextBottomView
          rightTitle={!hasActiveSessions && t('rebook')}
          status={status}
          rightRoute={Routes.SmartParkingParkingAreaDetail}
          rightData={{
            id: parking.id,
          }}
        />
      </TouchableOpacity>
    );
  }
);

export default BookingHistoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    marginTop: 16,
  },
});
