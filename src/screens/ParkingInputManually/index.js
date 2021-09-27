import React, { memo, useMemo, useState, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Text from '../../commons/Text';
import SvgParkingSpot from '../../../assets/images/SmartParking/parkingSpot.svg';
import { t } from 'i18n-js';
import { useBoolean } from '../../hooks/Common';
import Routes from '../../utils/Route';
import { Colors, API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import ParkingSpotInput from './components/ParkingSpotInput';
import { IconOutline } from '@ant-design/icons-react-native';
import { CircleButton } from '../../commons';
import { useNavigation } from '@react-navigation/native';
import { ButtonPopup } from '../../commons';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import Modal from 'react-native-modal';
import { SPOT_STATUS_CHECK_CAR, TESTID } from '../../configs/Constants';
import { styles } from './styles';

const ParkingInputManually = memo(() => {
  const [parkingSpot, setParkingSpot] = useState('');
  const [parkingInfo, setParkingInfo] = useState({});
  const [isTextFocus, setTextFocus] = useState(false);
  const inputRef = useRef(null);
  const enterTimeout = useRef(null);
  const { navigate } = useNavigation();
  const [isNotify, setShowModal, setHideModal] = useBoolean(false);
  const [resultCheckCar, setResultCheckCar] = useState('');
  const [showInfo, setShowInfo, setHideInfo] = useBoolean(false);

  const onTextInputFocus = useCallback(() => {
    inputRef.current.focus(1);
  }, [inputRef]);

  const onChangeText = useCallback(
    (text) => {
      const _parkingSpot = text.substring(0, 3);
      setParkingSpot(_parkingSpot);
      if (text.length === 3) {
        onSpotNumberEntered(_parkingSpot);
      } else {
        setParkingInfo({ ...parkingInfo, address: '' });
      }
    },
    [onSpotNumberEntered, parkingInfo]
  );
  const onSpotNumberEntered = useCallback((_parkingSpot) => {
    inputRef.current.blur();
    clearTimeout(enterTimeout.current);
    enterTimeout.current = setTimeout(async () => {
      const { success, data } = await axiosGet(API.PARKING.PARKING_INFO(), {
        params: {
          spot_name: _parkingSpot,
        },
      });
      success && setParkingInfo(data);
    }, 100);
  }, []);

  const onPressConfirmSpot = useCallback(async () => {
    Keyboard.dismiss();
    if (parkingInfo.booking_id) {
      navigate(Routes.SmartParkingBookingDetails, {
        id: parkingInfo.booking_id,
      });
      return;
    }
    const { success, data } = await axiosGet(API.PARKING.CHECK_CAR_PARKED(), {
      params: {
        spot_name: parkingSpot,
      },
    });
    if (success && data && data.can_park) {
      navigate(Routes.ParkingAreaDetail, {
        id: parkingInfo.parking_id,
        spot_status_check_car_parked:
          data.status === SPOT_STATUS_CHECK_CAR.THERE_IS_CAR_PARKED,
        booking_id: parkingInfo.booking_id,
        spot_id: parkingInfo.id,
        spot_name: parkingSpot,
        unLock: true,
      });
      return;
    }
    if (data && data.status) {
      switch (data.status) {
        case SPOT_STATUS_CHECK_CAR.MOVE_CAR_TO_SPOT:
          setResultCheckCar(t('notify_no_car_parked'));
          break;
        case SPOT_STATUS_CHECK_CAR.THIS_SPOT_HAVE_BOOKED:
          setResultCheckCar(t('notify_spot_has_been_booked'));
          break;
        default:
          break;
      }
      setShowModal();
      return;
    }
    setResultCheckCar(t('notify_spot_not_exist'));
    setShowModal();
  }, [navigate, parkingInfo, parkingSpot, setShowModal]);

  const onFocus = useCallback(() => {
    setTextFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setTextFocus(false);
  }, []);

  const onPressScan = useCallback(() => {
    navigate(Routes.SmartParkingScanQR);
  }, [navigate]);

  const [elementHeight, setElementHeight] = useState(0);

  const onLayout = useCallback(
    (event) => {
      const layout = event.nativeEvent.layout;
      setElementHeight(layout.height);
    },
    [setElementHeight]
  );

  const inlineModelInfoStyle = useMemo(() => {
    return {
      top: elementHeight + 36,
    };
  }, [elementHeight]);

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('parking_spot')}
        contentContainerStyle={styles.contentContainerStyle}
        headerAniStyle={styles.scrollView}
        styleScrollView={styles.scrollView}
        testID={TESTID.PARKING_INPUT_MANUALLY_PARKING_SPOT}
      >
        <View style={styles.content}>
          <SvgParkingSpot style={styles.svg} />
          <Text
            type="H3"
            semibold
            color={Colors.Gray9}
            center
            style={styles.wrap}
            onLayout={onLayout}
            testID={TESTID.PARKING_INPUT_MANUALLY_ENTER_PARKING_SPOT}
          >
            {t('enter_parking_spot_number')}
            <TouchableOpacity
              onPress={setShowInfo}
              testID={TESTID.PARKING_SPOT_INFO_BUTTON}
            >
              <IconOutline
                name={'question-circle'}
                size={20}
                color={Colors.Gray8}
                style={styles.iconInfo}
                testID={TESTID.PARKING_INPUT_MANUALLY_QUESTION_ICON}
              />
            </TouchableOpacity>
          </Text>
          <ParkingSpotInput
            onTextInputFocus={onTextInputFocus}
            input={parkingSpot}
            style={styles.parkingInput}
            isFocus={isTextFocus}
          />
          <View style={styles.parkingArea}>
            <IconOutline
              name={'environment'}
              color={Colors.Gray8}
              size={20}
              style={styles.icon}
            />
            <Text
              testID={TESTID.PARKING_INPUT_MANUALLY_PARKING_AREA_TEXT}
              type="H4"
              color={Colors.Gray8}
            >
              {t('parking_area')}
            </Text>
          </View>
          <Text
            testID={TESTID.PARKING_INPUT_MANUALLY_PARKING_ADDRESS}
            type={'Body'}
            color={Colors.Primary}
            numberOfLines={1}
          >
            {parkingInfo.address}
          </Text>
        </View>
        <View style={styles.confirmView}>
          <CircleButton
            size={56}
            backgroundColor={!parkingSpot ? Colors.Gray6 : Colors.Primary}
            style={parkingSpot && styles.buttonShadow}
            onPress={onPressConfirmSpot}
            disabled={!parkingSpot}
            testID={TESTID.PARKING_SPOT_CONFIRM_SPOT}
          >
            <IconOutline
              testID={TESTID.PARKING_INPUT_MANUALLY_GO_NEXT_ICON}
              name={'arrow-right'}
              size={24}
              color={Colors.White}
            />
          </CircleButton>
        </View>
        <Text
          testID={TESTID.PARKING_INPUT_MANUALLY_SCAN_QR_CODE_NOTE}
          center
          type="Body"
          color={Colors.Gray9}
        >
          {t('or_scan_qr_code_to_confirm')}
        </Text>
        <TouchableOpacity
          testID={TESTID.PARKING_INPUT_MANUALLY_SCAN_QR_CODE_BUTTON}
          style={styles.scanButton}
          onPress={onPressScan}
        >
          <Text
            testID={TESTID.PARKING_INPUT_MANUALLY_SCAN_QR_CODE_TEXT}
            type="H4"
            color={Colors.Orange}
            bold
          >
            {t('scan_qr_code')}
          </Text>
        </TouchableOpacity>

        <TextInput
          value={parkingSpot}
          onChangeText={onChangeText}
          ref={inputRef}
          style={styles.inputText}
          onFocus={onFocus}
          onBlur={onBlur}
          testID={TESTID.PARKING_SPOT_INPUT}
        />
      </WrapHeaderScrollable>

      <ButtonPopup
        visible={isNotify}
        secondaryTitle={'OK'}
        onPressSecondary={setHideModal}
        onClose={setHideModal}
        testID={TESTID.PARKING_SPOT_BUTTON_POPUP}
      >
        <Text
          type="H4"
          style={styles.title}
          testID={TESTID.PARKING_SPOT_TEXT_RESULT}
        >
          {resultCheckCar}
        </Text>
      </ButtonPopup>

      <Modal
        isVisible={showInfo}
        onBackButtonPress={setHideInfo}
        onBackdropPress={setHideInfo}
        backdropColor={Colors.Transparent}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        style={inlineModelInfoStyle}
        testID={TESTID.PARKING_SPOT_MODAL_INFO}
      >
        <View style={[styles.popoverStyle, styles.buttonShadow]}>
          <Text
            testID={TESTID.PARKING_INPUT_MANUALLY_QUESTION_TEXT}
            type="Label"
            style={styles.textDescription}
            color={Colors.Gray8}
            center
          >
            {t('enter_parking_spot_number_description')}
          </Text>
        </View>
      </Modal>
    </View>
  );
});

export default ParkingInputManually;
