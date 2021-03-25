import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import {t} from 'i18n-js';;

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import TicketViewSpace from '../TicketViewSpace';
import TimeCountDown from '../TimeCountDown';
import RowInfo from './RowInfo';
import InfoField from '../InfoField';
import { openMapDirection, formatMoney } from '../../../../utils/Utils';

const ParkingTicket = memo(
  ({
    time_remaining,
    start_countdown,
    arrive_at,
    leave_at,
    pay_before,
    plate_number,
    spot_name,
    parking_area,
    parking_address,
    parking_lat,
    parking_lng,
    status,
    is_paid,
    grand_total,
    getBookingDetail,
  }) => {
    const timeFormat = 'LT - DD/MM/YYYY';
    const arrive_at_str = arrive_at && arrive_at.format(timeFormat);
    const leave_at_str = leave_at && leave_at.format(timeFormat);
    const pay_before_str = pay_before && pay_before.format(timeFormat);

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.ticketTopContainer}>
            <Text type="Body" semibold>
              {t('parking_session')}
            </Text>
            {status === '' && (
              <TimeCountDown
                time_remaining={time_remaining}
                start_countdown={start_countdown}
                getBookingDetail={getBookingDetail}
              />
            )}
            <RowInfo
              leftValue={arrive_at_str}
              rightValue={leave_at_str}
              leftTitle={t('arrive_at')}
              rightTitle={t('leave_at')}
            />
          </View>
          <TicketViewSpace />
          <View style={styles.ticketBottomContainer}>
            <Text type={'Body'} semibold>
              {t('parking_information')}
            </Text>
            <RowInfo
              leftValue={plate_number}
              rightValue={spot_name}
              rightTitle={t('parking_spot')}
              leftTitle={t('license_plate')}
              body={false}
            />
            <InfoField
              title={t('parking_area')}
              value={parking_area}
              style={styles.infoField}
            />
            <InfoField
              title={t('parking_address')}
              value={parking_address}
              style={styles.infoField}
              onDirection={openMapDirection({
                lat: parking_lat,
                lng: parking_lng,
              })}
            />
            <View style={styles.totalPay}>
              <View style={styles.totalRow}>
                <Text type="Body" color={Colors.Gray8}>
                  {t('text_total')}
                </Text>
                <Text type="H4" color={Colors.Orange} semibold>
                  {formatMoney(grand_total)}
                </Text>
              </View>
              {!is_paid && status === '' && (
                <Text
                  color={Colors.Red6}
                  type="Body"
                  style={styles.textPayBefore}
                >
                  {t('pay_before_%{time}', { time: pay_before_str })}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default ParkingTicket;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  ticketTopContainer: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.Gray4,
  },
  ticketBottomContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.Gray4,
  },
  infoField: {
    marginTop: 4,
  },
  totalPay: {
    marginTop: 17,
    paddingTop: 17,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderColor: Colors.Gray4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPayBefore: {
    textAlign: 'center',
  },
});
