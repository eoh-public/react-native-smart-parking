import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import { Colors, Device } from '../../../../configs';
import Text from '../../../../commons/Text';
import ParkingInfo from '../ParkingInfo';
import Routes from '../../../../utils/Route';
import { Button } from '../../../../commons';
import { openMapDirection } from '../../../../utils/Utils';
import { SCANNING_STATUS, TESTID } from '../../../../configs/Constants';

const ScanningResponsePopup = ({
  visible,
  hideModal,
  onChoosingIndexParking,
  listNearbyParkings,
  scanDataResponse,
}) => {
  const { navigate } = useNavigation();

  const {
    status,
    right_spot,
    available_spots,
    parking_nearest,
  } = scanDataResponse;

  const goScanQR = useCallback(() => {
    hideModal();
    navigate(Routes.SmartParkingScanQR);
  }, [hideModal, navigate]);

  const getIndex = useCallback(
    (id) => {
      return listNearbyParkings.findIndex((obj) => obj.id === id);
    },
    [listNearbyParkings]
  );

  const goToParkingDetail = useCallback(() => {
    hideModal();
    const index = getIndex(parking_nearest.id);
    index !== -1 && onChoosingIndexParking(index);
    navigate(Routes.SmartParkingParkingAreaDetail, {
      id: parking_nearest.id,
    });
  }, [hideModal, navigate, parking_nearest, getIndex, onChoosingIndexParking]);

  const result = useMemo(() => {
    if (status === SCANNING_STATUS.BOOKING_ACTIVATED) {
      return {
        iconName: 'check-circle',
        iconColor: Colors.Primary,
        title: t('booking_activated'),
        des: t('you_are_at_your_parking_spot'),
        subTitle: null,
        data: null,
        info: null,
        leftButtonTitle: t('ok_got_it'),
        leftButtonClick: hideModal,
        rightButtonTitle: null,
        rightButtonClick: null,
        leftType: 'primary',
        rightType: 'primary',
      };
    } else if (status === SCANNING_STATUS.WRONG_SPOT) {
      return {
        iconName: 'close-circle',
        iconColor: Colors.Red6,
        title: t('this_is_not_your_spot'),
        des: t('you_are_parking_at_wrong_spot'),
        subTitle: t('your_parking_spot'),
        data: right_spot,
        info: t('please_move_right_spot'),
        leftButtonTitle: t('cancel'),
        leftButtonClick: hideModal,
        rightButtonTitle: t('scan_qr_code'),
        rightButtonClick: goScanQR,
        leftType: 'cancel',
        rightType: 'primary',
      };
    } else if (status === SCANNING_STATUS.AVAILABLE_SPOTS) {
      const available_spots_name = (available_spots || [])
        .map((item) => item.name)
        .join(', ');
      return {
        iconName: 'frown',
        iconColor: Colors.Gray8,
        title: t('sorry'),
        des: t('this_spot_is_not_available'),
        subTitle: t('available_spots'),
        data: available_spots_name,
        info: t('please_move_to_one_of_those_spot'),
        leftButtonTitle: t('cancel'),
        leftButtonClick: hideModal,
        rightButtonTitle: t('scan_qr_code'),
        rightButtonClick: goScanQR,
        leftType: 'cancel',
        rightType: 'primary',
      };
    } else if (status === SCANNING_STATUS.PARKING_NEAREST) {
      return {
        iconName: 'frown',
        iconColor: Colors.Gray8,
        title: t('oh_no'),
        des: t('this_parking_is_full'),
        subTitle: t('nearest_parking_areas'),
        data: parking_nearest.name,
        info: null,
        leftButtonTitle: t('directions'),
        leftButtonClick: openMapDirection({
          lat: parking_nearest.lat,
          lng: parking_nearest.lng,
        }),
        rightButtonTitle: t('view_details'),
        rightButtonClick: goToParkingDetail,
        rightType: 'primary',
        leftType: 'cancel',
      };
    } else if (status === SCANNING_STATUS.NOT_WORKING_FOR_SENSOR_ONLY) {
      return {
        iconName: 'frown',
        iconColor: Colors.Gray8,
        title: t('this_spot_does_not_support_to_scan'),
        des: t('please_book_by_the_normal_way'),
        subTitle: '---',
        data: '---',
        info: null,
        leftButtonTitle: t('cancel'),
        leftButtonClick: hideModal,
        rightButtonTitle: null,
        rightButtonClick: null,
        leftType: 'cancel',
        rightType: 'primary',
      };
    } else if (status === SCANNING_STATUS.SPOT_DOES_NOT_EXIST) {
      return {
        iconName: 'frown',
        iconColor: Colors.Gray8,
        title: t('this_spot_does_not_exsit'),
        des: t('please_scan_again_or_contact_the_parking_manager'),
        subTitle: '---',
        data: '---',
        info: null,
        leftButtonTitle: t('cancel'),
        leftButtonClick: hideModal,
        rightButtonTitle: t('scan_qr_code'),
        rightButtonClick: goScanQR,
        leftType: 'cancel',
        rightType: 'primary',
      };
    }

    return {
      iconName: 'frown',
      iconColor: Colors.Gray8,
      title: '---',
      des: '---',
      subTitle: '---',
      data: '---',
      info: '---',
      leftButtonTitle: null,
      leftButtonClick: null,
      rightButtonTitle: null,
      rightButtonClick: null,
      leftType: null,
      rightType: null,
    };
  }, [
    available_spots,
    goScanQR,
    goToParkingDetail,
    hideModal,
    parking_nearest,
    right_spot,
    status,
  ]);

  const useTwoButton = result.leftButtonTitle && result.rightButtonTitle;

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      style={styles.container}
    >
      <View style={styles.popoverStyle}>
        <View style={styles.modalWrapper}>
          <Icon
            name={'close'}
            color={Colors.Gray8}
            style={styles.close}
            onPress={hideModal}
          />
          <View style={[styles.modalHeader, result.subTitle && styles.border]}>
            <Icon
              name={result.iconName}
              color={result.iconColor}
              style={styles.icon}
              size={42}
            />
            <Text
              testID={TESTID.SCANNING_RESPONSE_TITLE}
              semibold
              style={styles.title}
            >
              {result.title}
            </Text>
            <Text
              testID={TESTID.SCANNING_RESPONSE_DESCRIPTION}
              style={styles.des}
            >
              {result.des}
            </Text>
          </View>
          <View style={styles.modalBody}>
            {result.subTitle && (
              <Text
                testID={TESTID.SCANNING_RESPONSE_SUB_TITLE}
                style={styles.subTitle}
              >
                {result.subTitle}
              </Text>
            )}
            {result.data && (
              <Text
                testID={TESTID.SCANNING_RESPONSE_DATA}
                bold
                style={styles.data}
              >
                {result.data}
              </Text>
            )}
            {result.info && (
              <Text testID={TESTID.SCANNING_RESPONSE_INFO} style={styles.info}>
                {result.info}
              </Text>
            )}
            {!!parking_nearest && (
              <Text style={styles.address}>{parking_nearest.address}</Text>
            )}
            {!!parking_nearest && <ParkingInfo parking={parking_nearest} />}
          </View>
          <View style={styles.containerButton}>
            {result.leftButtonTitle && (
              <Button
                type={result.leftType}
                title={result.leftButtonTitle}
                onPress={result.leftButtonClick}
                textType="Body"
                style={useTwoButton && styles.buttonMarginRight}
              />
            )}
            {result.rightButtonTitle && (
              <Button
                type={result.rightType}
                title={result.rightButtonTitle}
                onPress={result.rightButtonClick}
                textType="Body"
                style={useTwoButton && styles.buttonMarginLeft}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginBottom: Device.isIphoneX ? 20 : 0,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
  },
  border: {
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  icon: {
    marginTop: 46,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
    marginTop: 11,
    textAlign: 'center',
  },
  des: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray9,
    marginTop: 8,
    textAlign: 'center',
  },
  modalBody: {
    paddingHorizontal: 16,
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray8,
    marginTop: 16,
    textAlign: 'center',
  },
  data: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Orange,
    marginTop: 8,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray9,
    marginTop: 8,
    textAlign: 'center',
  },
  address: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.Gray8,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonMarginRight: {
    marginRight: 4,
  },
  buttonMarginLeft: {
    marginLeft: 4,
  },
});

export default ScanningResponsePopup;
