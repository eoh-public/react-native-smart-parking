import React, { memo, useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import Text from '../../commons/Text';
import SvgParkingSpot from '../../../assets/images/SmartParking/parkingSpot.svg';
import { t } from 'i18n-js';
import { useBoolean } from '../../hooks/Common';
import Routes from '../../utils/Route';
import { Colors, Theme, API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import ParkingSpotInput from './components/ParkingSpotInput';
import { IconOutline } from '@ant-design/icons-react-native';
import { CircleButton } from '../../commons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { ButtonPopup } from '../../commons';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { heightHeader } from '../../commons/HeaderAni';
import Modal from 'react-native-modal';
import { TESTID } from '../../configs/Constants';

const ParkingInputManually = memo(() => {
  const [parkingSpot, setParkingSpot] = useState('');
  const [parkingInfo, setParkingInfo] = useState('');
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
      const { success, data } = await axiosGet(API.PARKING.PARKING_INFO, {
        params: {
          spot_name: _parkingSpot,
        },
      });
      if (success) {
        setParkingInfo(data);
      }
    }, 300);
  }, []);

  const onPressConfirmSpot = useCallback(async () => {
    Keyboard.dismiss();
    const { success, data } = await axiosGet(API.PARKING.CHECK_CAR_PARKED, {
      params: {
        spot_name: parkingSpot,
      },
    });
    if (!success) {
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
    } else {
      navigate(Routes.ParkingAreaDetail, {
        id: parkingInfo.parking_id,
        spot_id: parkingInfo.id,
        spot_name: parkingSpot,
        unLock: true,
      });
    }
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

  const onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setElementHeight(layout.height);
  };

  const _styles = StyleSheet.create({
    modalInfoContainer: {
      top: elementHeight + 36,
    },
  });

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
        style={_styles.modalInfoContainer}
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

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: getBottomSpace() + 8,
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
  },
  svg: {
    alignSelf: 'center',
    marginTop: height >= 812 ? 32 : 12,
  },
  parkingInput: {
    marginVertical: 24,
  },
  parkingArea: {
    ...Theme.flexRow,
    marginRight: 12,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  confirmView: {
    flex: 1,
    ...Theme.center,
  },
  scanButton: {
    ...Theme.center,
    marginTop: 8,
  },
  inputText: {
    position: 'absolute',
    top: -200,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + heightHeader,
  },
  scrollView: {
    backgroundColor: Colors.White,
  },
  wrap: {
    marginLeft: 54,
    marginRight: 54,
    marginTop: height >= 812 ? 32 : 12,
    flexDirection: 'row',
  },
  popoverStyle: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    margin: 24,
  },
  textDescription: {
    padding: 16,
  },
  iconInfo: {
    marginBottom: Platform.OS === 'ios' ? 0 : -2,
    marginLeft: 12,
  },
});
