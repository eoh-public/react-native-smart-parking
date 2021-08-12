import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { t } from 'i18n-js';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, ButtonPopup, FullLoading } from '../../commons';
import ParkingSpotInput from '../ParkingInputManually/components/ParkingSpotInput';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';
import { API, Colors, SPConfig } from '../../configs';
import { TESTID } from '../../configs/Constants';
import { useBoolean, useControllList } from '../../hooks/Common';
import { useKeyboardShowTranslation } from '../../hooks/Common/useKeyboardShowTranslation';
import {
  SvgBookmarkGreen,
  SvgBookmarkGreenFill,
  SvgDirectionPrimary,
} from '../../../assets/images/SmartParking';
import moment from 'moment';
import Animated from 'react-native-reanimated';
import { axiosGet } from '../../utils/Apis/axios';
import { calcTime } from '../../utils/Converter/time';
import Routes from '../../utils/Route';
import { openMapDirection } from '../../utils/Utils';
import { isValidateLicencePlate } from '../../utils/Validation';
import AddressInfo from './compenents/AddressInfo';
import useKeyboardShow from '../../hooks/Common/useKeyboardShow';

import { useParkingDetail } from './hooks';
import { useParkingSession } from './hooks/ParkingSession';
import { usePayment } from './hooks/Payment';
import LicensePlate from './compenents/LicensePlate';
import ParkingSession from './compenents/ParkingSession';
import PaymentOption from './compenents/PaymentOption';
import styles from './styles';
import { formatLicencePlate } from '../../utils/inputFormatUtils';

const ParkingAreaDetail = memo(({ route }) => {
  const { params } = route;
  const {
    id,
    spot_id,
    spot_name,
    carItem,
    unLock,
    numBookHour,
    searchedLocation,
  } = params; // carItem: choose from SavedVehicle
  const {
    loading,
    parkingDetailData,
    onSaveParking,
    onUnsaveParking,
  } = useParkingDetail(id, spot_name);
  const [car, setCar] = useState({ plate_number: '' });

  const {
    is_saved,
    background,
    allow_pre_book: preBook,
    name,
    address,
    charge_type,
  } = parkingDetailData;

  const {
    bookTime,
    setBookTime,
    parkingSessionData,
    getParkingSession,
  } = useParkingSession(id, preBook, numBookHour, spot_id);

  const { keyboardVisible } = useKeyboardShow();

  const inputRef = useRef(null);

  const onTextInputFocus = useCallback(() => {
    inputRef.current.focus(1);
  }, [inputRef]);

  const [isReadyToBook, setReadyToBook, setNotReadyToBook] = useBoolean(false);
  const [saveVehicle, setSaveVehicle] = useState(false);
  const [validCar, setValidCar] = useState(false);

  const { isPayNow, setIsPayNow } = usePayment();
  const [resultCheckCar, setResultCheckCar] = useState('');

  const [lockBook, setLockBook] = useState(false || unLock);
  const [parkingInfo, setParkingInfo] = useState('');

  const { transY } = useKeyboardShowTranslation();

  const [isNoCarParked, setShowModal, setHideModal] = useBoolean(false);

  const [spotNumber, setSpotNumber] = useState('');

  const onChangeText = useCallback(async (text) => {
    const _parkingSpot = text.substring(0, 3);
    setSpotNumber(_parkingSpot);
    if (text.length === 3) {
      const { success, data } = await axiosGet(API.PARKING.PARKING_INFO(), {
        params: {
          spot_name: _parkingSpot,
        },
      });
      if (success) {
        setParkingInfo(data);
      }
    } else {
      setParkingInfo({});
    }
  }, []);

  const [isTextFocus, setTextFocus] = useState(false);

  const onFocus = useCallback(() => {
    setTextFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setTextFocus(false);
  }, []);

  const { navigate } = useNavigation();

  const onPressBookmark = useMemo(() => {
    return is_saved ? onUnsaveParking : onSaveParking;
  }, [is_saved, onSaveParking, onUnsaveParking]);

  const getData = useCallback(() => {
    return axiosGet(API.CAR.MY_CARS());
  }, []);

  const [cars, loadingCars, refresh, onRefresh] = useControllList(getData);

  const default_car = useMemo(() => {
    return cars.filter((item) => item.is_default)[0];
  }, [cars]);

  useEffect(() => {
    preBook && getParkingSession();
  }, [getParkingSession, preBook]);

  useEffect(() => {
    if (carItem) {
      setCar(carItem);
      setValidCar(true);
    } else if (default_car) {
      setCar(default_car);
      setValidCar(true);
    }
  }, [carItem, default_car, setCar]);

  useEffect(() => {
    if (!car || !car.plate_number) {
      setNotReadyToBook();
      return;
    }

    if (!bookTime.numBookHour) {
      setNotReadyToBook();
      return;
    }

    setReadyToBook();
  }, [
    car,
    parkingDetailData,
    parkingSessionData,
    isPayNow,
    setNotReadyToBook,
    setReadyToBook,
    bookTime,
  ]);

  const arriveAt = bookTime.arriveAt;
  const bookingDetailData = useMemo(() => {
    const item = {
      spot_name: spot_name || spotNumber,
      street: name,
      address: address,
      background: background,
      plate_number: car.plate_number,
      arrive_at: calcTime(arriveAt, 'HH:mm', 'LT, DD/MM/YYYY'),
      leave_at: calcTime(
        bookTime.arriveAt.clone().add({ hours: bookTime.numBookHour }),
        'HH:mm',
        'LT, DD/MM/YYYY'
      ),
      total_hours: bookTime.numBookHour,
      currency: 'đ',
      payment_option: isPayNow ? t('pay_now') : t('pay_later'),
      time_warning: moment()
        .add(SPConfig.maxSeconds, 'seconds')
        .format('LT - DD/MM/YYYY'),
    };
    const body = {
      parking_id: id,
      is_pay_now: isPayNow,
      car: car.id || null,
      plate_number: car ? car.plate_number : null,
      is_save_car: saveVehicle,
      num_hour_book: bookTime.numBookHour,
      arrive_at: bookTime.arriveAt.toISOString(),
      booking_item: {
        price: 0, // TODO for BE
        discount: 0,
        service_fee: 0,
      },
    };

    if (spot_id) {
      body.spot_id = spot_id;
    }

    if (parkingInfo) {
      body.spot_id = parkingInfo.id;
    }

    return { item, body };
  }, [
    spot_name,
    spotNumber,
    name,
    address,
    background,
    car,
    arriveAt,
    bookTime.numBookHour,
    bookTime.arriveAt,
    isPayNow,
    id,
    saveVehicle,
    spot_id,
    parkingInfo,
  ]);

  const onBookNow = useCallback(async () => {
    navigate(Routes.SmartParkingBookingConfirm, bookingDetailData);
  }, [bookingDetailData, navigate]);

  const checkSpotNumber = useCallback(async () => {
    const { success, data } = await axiosGet(API.PARKING.CHECK_CAR_PARKED(), {
      params: {
        spot_name: spotNumber,
        parking_id: id,
      },
    });
    if (success) {
      setLockBook(true);
    } else {
      if (data.spot_name[0].includes('does not exist')) {
        setResultCheckCar(t('notify_spot_not_exist'));
      }
      if (data.spot_name[0] === 'No car parked') {
        setResultCheckCar(t('notify_no_car_parked'));
      }
      if (data.spot_name[0] === 'This spot has been booked before') {
        setResultCheckCar(t('notify_spot_has_been_booked'));
      }
      setShowModal();
    }
  }, [id, setShowModal, spotNumber]);

  const onChangeCar = (text) => {
    const customText = formatLicencePlate(text);
    if (default_car && text === default_car.plate_number) {
      setCar(default_car);
      setValidCar(true);
      setSaveVehicle(false);
    } else {
      setCar({ plate_number: customText });
      setSaveVehicle(true);
    }
  };

  useEffect(() => {
    if (!car.id) {
      if (isValidateLicencePlate(car.plate_number)) {
        setValidCar(true);
      } else {
        setValidCar(false);
      }
    }
  }, [car.id, car.plate_number]);

  const checkLockBook = useMemo(() => {
    return preBook || lockBook;
  }, [lockBook, preBook]);

  return (
    <>
      <ButtonPopup
        visible={isNoCarParked}
        secondaryTitle={'OK'}
        onPressSecondary={setHideModal}
        onClose={setHideModal}
      >
        <Text semibold type="H4" style={styles.title}>
          {resultCheckCar}
        </Text>
      </ButtonPopup>

      <WrapParallaxScrollView
        hideRight={true}
        contentBackground={
          <View style={styles.boxButton}>
            <TouchableOpacity
              testID={TESTID.PARKING_DETAIL_TOUCH_DIRECTION}
              style={styles.btnDirection}
              activeOpacity={0.4}
              onPress={openMapDirection(parkingDetailData)}
            >
              <SvgDirectionPrimary />
            </TouchableOpacity>
            <TouchableOpacity
              testID={TESTID.PARKING_DETAIL_TOUCH_BOOKMARK}
              style={styles.btnBookmark}
              activeOpacity={0.4}
              onPress={onPressBookmark}
            >
              {is_saved ? (
                <SvgBookmarkGreenFill style={styles.iconButton} />
              ) : (
                <SvgBookmarkGreen style={styles.iconButton} />
              )}
            </TouchableOpacity>
          </View>
        }
        uriImg={background}
      >
        {loading ? (
          <FullLoading wrapStyle={styles.loading} />
        ) : (
          <Animated.View
            style={[
              styles.container,
              {
                transform: [
                  {
                    translateY: Animated.sub(new Animated.Value(0), transY),
                  },
                ],
              },
            ]}
          >
            <View
              style={
                keyboardVisible
                  ? styles.containerKeyboardShow
                  : styles.container
              }
            >
              <AddressInfo
                {...parkingDetailData}
                spot_name={spot_name}
                preBook={preBook}
                searchedLocation={searchedLocation}
              />
              {checkLockBook && (
                <>
                  <ParkingSession
                    spotNumber={spotNumber || spot_name}
                    preBook={preBook}
                    bookTime={bookTime}
                    setBookTime={setBookTime}
                    parkingSessionData={parkingSessionData}
                    type={parkingDetailData && parkingDetailData.type}
                  />
                  <LicensePlate
                    saveVehicle={saveVehicle}
                    setSaveVehicle={setSaveVehicle}
                    onChangeCar={onChangeCar}
                    parkingId={id}
                    spot_id={spot_id}
                    spot_name={spot_name}
                    car={car}
                    cars={cars}
                    loadingCars={loadingCars}
                    refreshCars={refresh}
                    onRefreshCars={onRefresh}
                    numBookHour={bookTime.numBookHour}
                    validCar={validCar}
                  />
                  <PaymentOption
                    chargeType={charge_type}
                    setIsPayNow={setIsPayNow}
                    bookTime={bookTime}
                  />
                </>
              )}
              {!checkLockBook && (
                <>
                  <Text
                    semibold
                    style={styles.textParkingSpotNumberTitle}
                    color={Colors.Black}
                  >
                    {t('parking_spot_number')}
                  </Text>
                  <Text
                    type="Body"
                    style={styles.textParkingSpotNumber}
                    color={Colors.Gray8}
                  >
                    {t('sub_text_parking_spot_number')}
                  </Text>
                  <ParkingSpotInput
                    onTextInputFocus={onTextInputFocus}
                    input={spotNumber}
                    style={styles.parkingInput}
                    isFocus={isTextFocus}
                    sizeInput={styles.sizeInput}
                  />
                </>
              )}
            </View>
          </Animated.View>
        )}
        <TextInput
          testID={TESTID.PARKING_DETAIL_CHANGE_SPOT}
          value={spotNumber}
          onChangeText={onChangeText}
          ref={inputRef}
          style={styles.inputText}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </WrapParallaxScrollView>

      {loading ? null : checkLockBook ? (
        <View style={styles.viewBottomFixed}>
          {!preBook ? (
            <Button
              testID={TESTID.ON_BOOK_NOW}
              type={isReadyToBook ? 'primary' : 'disabled'}
              title={t('book_now')}
              onPress={onBookNow}
            />
          ) : parkingSessionData.length === 0 ? (
            <Button
              type="disabled"
              title={
                parkingDetailData.free_time
                  ? t('free_parking_hours')
                  : t('no_spot_available')
              }
            />
          ) : (
            <Button
              type={isReadyToBook && validCar ? 'primary' : 'disabled'}
              title={t('book_now')}
              onPress={onBookNow}
            />
          )}
        </View>
      ) : (
        <View style={styles.viewBottomFixed}>
          <Button
            testID={TESTID.ON_CHECK_SPOT_NUMBER}
            type={!spotNumber ? 'disabled' : 'primary'}
            title={t('check_parking_spot_number')}
            onPress={checkSpotNumber}
          />
        </View>
      )}
    </>
  );
});

export default ParkingAreaDetail;
