import React, { memo, useCallback, useMemo, useState } from 'react';
import Text from '../../../../commons/Text';
import { Colors, Theme } from '../../../../configs';
import { StyleSheet, View, TextInput } from 'react-native';
import { t } from 'i18n-js';

import { ArriveItem, ControllHour } from '../ParkingDetail';
import { calcTime } from '../../../../utils/Converter/time';
import { SvgWarning } from '../../../../../assets/images/SmartParking';

const ParkingSession = memo(
  ({ bookTime, setBookTime, parkingSessionData, preBook, spotNumber }) => {
    let arrSpotNumber = [];
    if (spotNumber) {
      for (let i = 0; i < spotNumber.length; i++) {
        arrSpotNumber.push(spotNumber[i]);
      }
    }
    const [indexArrive, setIndexArrive] = useState(0);
    const [hour, setHour] = useState(bookTime.numBookHour);
    const onChooseArrive = useCallback(
      (item, index) => {
        setBookTime({ ...bookTime, arriveAt: item.time });
        setIndexArrive(index);
      },
      [bookTime, setBookTime]
    );
    const onChangeHour = useCallback(
      (prevHour) => {
        setBookTime({ ...bookTime, numBookHour: prevHour });
        setHour(prevHour);
      },
      [bookTime, setBookTime]
    );

    const leaveTime = useMemo(() => {
      return calcTime(
        bookTime.arriveAt.clone().add({ hours: hour }),
        'HH:mm',
        'LT - DD/MM/YYYY'
      );
    }, [bookTime.arriveAt, hour]);

    return (
      <>
        {!preBook && (
          <View style={styles.textParkingSession}>
            <Text
              semibold
              style={styles.textParkingSpotNumber}
              color={Colors.Black}
              type="H4"
            >
              {t('parking_spot_number')}
            </Text>
            <View style={styles.spotNumber}>
              {!!arrSpotNumber.length &&
                arrSpotNumber.map((item) => (
                  <TextInput
                    key={`item-${item}`}
                    style={{
                      ...styles.otpInput,
                    }}
                    value={item}
                    editable={false}
                  />
                ))}
            </View>
          </View>
        )}
        {!preBook && <View style={styles.line} />}
        <Text
          semibold
          style={styles.textParkingSession}
          color={Colors.Black}
          type="H4"
        >
          {t('parking_session')}
        </Text>
        {preBook && (
          <>
            <Text type="Body" style={styles.address} color={Colors.Gray8}>
              {t('arrive_at')}
            </Text>
            <View style={styles.boxArrive}>
              {parkingSessionData.map((item, index) => {
                let selected = indexArrive === index;
                return (
                  <ArriveItem
                    time={item.time}
                    price={item.price}
                    key={index}
                    index={index}
                    id={item.id}
                    onPress={onChooseArrive}
                    selected={selected}
                  />
                );
              })}
            </View>
          </>
        )}
        <Text type="Body" style={styles.address} color={Colors.Gray8}>
          {t('stay_in')}
        </Text>

        <ControllHour hour={hour} onChangeHour={onChangeHour} />

        <Text type="Label" style={styles.textNote} color={Colors.Gray8}>
          {`${t('leave_at')} ${leaveTime}`}
        </Text>
        {preBook && (
          <View style={styles.boxWarning}>
            <SvgWarning />
            <Text type="Label" style={styles.textWaring} color={Colors.Gray7}>
              {t('you_can_book_maximum_1h')}
            </Text>
          </View>
        )}
        <View style={styles.line} />
      </>
    );
  }
);

export default ParkingSession;

const styles = StyleSheet.create({
  textParkingSession: {
    marginLeft: 16,
    marginBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 16,
  },
  boxArrive: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  textNote: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  boxWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  textWaring: {
    marginLeft: 8,
  },
  address: {
    marginBottom: 16,
    marginLeft: 16,
  },
  otpInput: {
    width: 40,
    height: 40,
    textAlign: 'center',
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 5,
    ...Theme.transparentBackgroundOrangeBorder,
    color: Colors.Gray9,
  },
  spotNumber: {
    flex: 1,
    flexDirection: 'row',
  },
});
