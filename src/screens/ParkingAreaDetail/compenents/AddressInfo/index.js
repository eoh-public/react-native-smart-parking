import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { t } from 'i18n-js';

import Text from '../../../../commons/Text';
import { Colors, API } from '../../../../configs';
import { calcDistance } from '../../../../utils/Converter/distance';
import { formatMoney } from '../../../../utils/Utils';
import { axiosGet } from '../../../../utils/Apis/axios';
import { getCurrentLatLng } from '../../../../utils/CountryUtils';
import Routes from '../../../../utils/Route';
import { ParkingStatusBar, RowItem } from '../ParkingDetail';
import { ExpandView } from '../../../../commons';
import {
  SvgParking,
  SvgNavigate,
} from '../../../../../assets/images/SmartParking';
import { IconOutline } from '@ant-design/icons-react-native';
import { TESTID } from '../../../../configs/Constants';

const AddressInfo = memo(
  ({
    name,
    address,
    available_spots_count,
    parking_charges,
    free_time,
    status,
    distance: rawDistance,
    total_spot,
    preBook,
    spot_name,
    searchedLocation,
  }) => {
    const distance = calcDistance(rawDistance);
    const { navigate } = useNavigation();

    let start = '';
    let end = '';
    let freeFrom = '';
    let freeTo = '';
    let list_time = [];
    let time_now = '';
    let list_price = [];
    let price_now = '';
    let titleColor = Colors.Gray9;

    // TODO: detect now is in any timezone
    if (free_time) {
      freeFrom = moment(`2020-01-01T${free_time.free_from}`).format('LT');
      freeTo = moment(`2020-01-01T${free_time.free_to}`).format('LT');
    }

    if (parking_charges !== undefined) {
      if (parking_charges.length !== 0) {
        parking_charges.map((item, index) => {
          // add prefix to make it have a format that moment can handle
          start = moment(`2020-01-01T${item.time_start}`).format('LT');
          end = moment(`2020-01-01T${item.time_end}`).format('LT');
          list_time.push(start + ' - ' + end);
          list_price.push(formatMoney(item.price_per_hour) + '/h');
        });
      } else {
        list_time = 'Free';
      }
    }

    if (list_price.length !== 0) {
      time_now = list_time.shift();
      price_now = list_price.shift();
    }

    let timeHandler;
    if ((status === 'FULL' && !spot_name) || (status === 'ĐẦY' && !spot_name)) {
      titleColor = Colors.Red;
      timeHandler = setTimeout(async () => {
        const location = searchedLocation
          ? { lat: searchedLocation.latitude, lng: searchedLocation.longitude }
          : await getCurrentLatLng();
        const { data, success } = await axiosGet(API.PARKING.NEAREST, {
          params: { lat: location.lat, lng: location.lng },
        });
        if (success) {
          const res = { parking_nearest: data, status: 'parking_nearest' };
          navigate(Routes.MapDashboard, {
            scanDataResponse: res,
          });
        }
      }, 4000);
    }

    useEffect(() => {
      return () => clearTimeout(timeHandler);
    });

    if (status === 'FREE' || status === 'MIỄN PHÍ') {
      available_spots_count = '--';
    }

    return (
      <>
        <Text type="H4" semibold style={styles.title} color={Colors.Gray9}>
          {name}
        </Text>
        <Text type="Body" style={styles.address} color={Colors.Gray8}>
          {address}
        </Text>

        <ParkingStatusBar
          testID={TESTID.PARKING_DETAIL_STATUS_BAR}
          status={status}
          freeFrom={freeFrom}
          freeTo={freeTo}
          preBook={preBook}
          spot_name
        />

        <RowItem
          testID={TESTID.PARKING_DETAIL_SPOTS_AVAILABLE}
          source={<SvgParking width={16} height={16} />}
          title={`${available_spots_count}`}
          titleColor={titleColor}
          subTitle={`/ ${total_spot} ${t('spots_available')}`}
        />
        {price_now !== '' ? (
          <View>
            <ExpandView
              leftIcon={
                <IconOutline
                  name={'dollar-circle'}
                  size={16}
                  color={Colors.Gray8}
                />
              }
              title={price_now}
              expandedView={
                <>
                  {list_price.map((price) => (
                    <Text
                      key={price}
                      type={'H4'}
                      color={Colors.Gray9}
                      style={styles.textExpand}
                    >
                      {price}
                    </Text>
                  ))}
                </>
              }
            />
            <ExpandView
              leftIcon={
                <IconOutline
                  name={'clock-circle'}
                  size={16}
                  color={Colors.Gray8}
                />
              }
              title={time_now}
              expandedView={
                <>
                  {list_time.map((time) => (
                    <Text
                      key={time}
                      type={'H4'}
                      color={Colors.Gray9}
                      style={styles.textExpand}
                    >
                      {time}
                    </Text>
                  ))}
                  <Text
                    type={'Body'}
                    bold
                    color={Colors.Green}
                    style={styles.textExpand}
                  >
                    {t('text_no_charge_outside_parking_hour')}
                  </Text>
                </>
              }
            />
          </View>
        ) : (
          <View>
            <RowItem
              source={
                <IconOutline
                  name={'clock-circle'}
                  size={16}
                  color={Colors.Gray8}
                />
              }
              title="0 đ/h"
            />
            <RowItem
              source={
                <IconOutline
                  name={'clock-circle'}
                  size={16}
                  color={Colors.Gray8}
                />
              }
              title={list_time}
            />
          </View>
        )}

        <RowItem
          testID={TESTID.PARKING_DETAIL_DISTANCE}
          source={<SvgNavigate width={16} height={16} />}
          title={distance}
        />
        <View style={styles.line} />
      </>
    );
  }
);

export default AddressInfo;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  address: {
    marginBottom: 16,
    marginLeft: 16,
  },
  line: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 16,
  },
  textExpand: {
    marginLeft: 36,
    marginTop: 8,
  },
});
