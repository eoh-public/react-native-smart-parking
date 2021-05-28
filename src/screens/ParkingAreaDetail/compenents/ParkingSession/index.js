import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import moment from 'moment';
import { t } from 'i18n-js';

import Text from '../../../../commons/Text';
import { Colors, Theme } from '../../../../configs';
import ArriveItem from '../ParkingDetail/ArriveItem';
import ControllHour from '../ParkingDetail/ControllHour';
import { CustomCheckbox } from '../../../../commons';
import { calcTime } from '../../../../utils/Converter/time';

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
    const [isSave, setSave] = useState(false);

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

    const onAlreadyArrived = useCallback(() => {
      const newStateSave = !isSave;
      if (newStateSave) {
        setBookTime({ ...bookTime, arriveAt: moment() });
      } else if (parkingSessionData[0]) {
        const { id, time } = parkingSessionData[0];
        onChooseArrive({ id, time }, 0);
      }
      setSave(newStateSave);
    }, [bookTime, isSave, onChooseArrive, parkingSessionData, setBookTime]);

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
          type="H3"
        >
          {t('parking_session')}
        </Text>
        <View style={styles.marginLeft}>
          <>
            <Text type="H4" bold style={styles.address} color={Colors.Gray9}>
              {t('i_will_arrive_at')}
            </Text>
            {spotNumber ? (
              <Text type="H4" style={styles.address} color={Colors.Gray9}>
                {t('i_already_arrive_at_spot')}
                <Text type="H4" color={Colors.Primary}>
                  {spotNumber}
                </Text>
              </Text>
            ) : (
              <>
                <View style={styles.boxArrive}>
                  {parkingSessionData.map((item, index) => {
                    let selected = indexArrive === index;
                    return (
                      <ArriveItem
                        isDisabled={isSave}
                        time={item.time}
                        key={index}
                        index={index}
                        id={item.id}
                        onPress={onChooseArrive}
                        selected={selected}
                      />
                    );
                  })}
                </View>
                <Text
                  type="Label"
                  style={styles.youCanOnly}
                  color={Colors.Gray6}
                >
                  {t('you_can_only_book_max_1_hour_in_advance')}
                </Text>
                <CustomCheckbox
                  style={styles.buttonAlreadyArrived}
                  onPress={onAlreadyArrived}
                  onValueChange={onAlreadyArrived}
                  value={isSave}
                  iOSCheckBoxStyles={styles.iOSCheckBoxStyles}
                >
                  <Text type="Body">{t('i_already_arrived')}</Text>
                </CustomCheckbox>
              </>
            )}
          </>
          <Text type="H4" bold style={styles.marginBottom} color={Colors.Gray9}>
            {t('i_will_park_in')}
          </Text>

          <ControllHour hour={hour} onChangeHour={onChangeHour} />

          <Text type="H4" bold style={styles.willLeaveAt} color={Colors.Gray9}>
            {t('i_will_leave_at')}
          </Text>
          <Text type="H4" style={styles.leaveTime} color={Colors.Gray9}>
            {leaveTime}
          </Text>
        </View>
        <View style={styles.line} />
      </>
    );
  }
);

export default ParkingSession;

const styles = StyleSheet.create({
  textParkingSession: {
    marginLeft: 16,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  textNote: {
    marginLeft: 16,
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
  youCanOnly: {
    marginLeft: 16,
  },
  marginBottom: {
    marginLeft: 16,
    marginBottom: 16,
  },
  leaveTime: {
    marginBottom: 8,
    marginLeft: 16,
  },
  willLeaveAt: {
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 16,
  },
  buttonAlreadyArrived: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  marginLeft: {
    marginLeft: 0,
  },
  iOSCheckBoxStyles: {
    marginTop: 0,
  },
});
