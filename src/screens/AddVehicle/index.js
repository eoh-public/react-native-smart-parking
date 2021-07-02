import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { IconFill } from '@ant-design/icons-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors, Device, API } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Text from '../../commons/Text';
import { formatLicencePlate } from '../../utils/inputFormatUtils';
import { isValidateLicencePlate } from '../../utils/Validation';
import { axiosPost, axiosPut, createFormData } from '../../utils/Apis/axios';
import { axiosDelete } from '../../utils/Apis/axios';
import { useStateAlertRemove } from '../../hooks/SmartParking/VehicleManagement';
import { useTitleHeader } from '../../hooks/Common';

import {
  AlertAction,
  CustomCheckbox,
  Button,
  ImagePicker,
} from '../../commons';
import ItemInput from '../AddVehicle/components/ItemInput';
import ItemDropDown from '../AddVehicle/components/ItemDropDown';

const dataSeats = [
  {
    id: '0',
    text: '2 seats',
    seats: 2,
  },
  {
    id: '1',
    text: '4 seats',
    seats: 4,
  },
  {
    id: '2',
    text: '7 seats',
    seats: 7,
  },
  {
    id: '3',
    text: '16 seats',
    seats: 16,
  },
];

const AddVehicle = memo(({ route }) => {
  const { updateData, car } = route.params;
  const isEdit = !!car;
  if (isEdit) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTitleHeader(t('edit_vehicle'));
  }
  const { goBack } = useNavigation();
  const [imageUrl, setImageUrl] = useState('');
  const [loadingSaveCar, setLoadingSaveCar] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const vehicleData = useMemo(() => {
    return isEdit
      ? {
          plate_number: car.plate_number || '',
          background: car.background || '',
          name: car.name || '',
          seats: car.seats || '',
          is_default: car.is_default || false,
        }
      : {
          plate_number: '',
          background: '',
          name: '',
          seats: '',
          is_default: false,
        };
  }, [car, isEdit]);
  const [vehicle, setVehicle] = useState(vehicleData);
  const [validCar, setValidCar] = useState(false);
  const [defaultCar, setDefaultCar] = useState(false);

  const {
    stateAlertRemove,
    onShowRemoveAlert,
    hideAlertAction,
  } = useStateAlertRemove();

  const onTakePhoto = useCallback(async () => {
    setShowImagePicker(true);
  }, []);

  const onEndPlateNumber = useCallback((text) => {
    const customText = formatLicencePlate(text);
    setVehicle((prev) => ({ ...prev, plate_number: customText }));
  }, []);

  useEffect(() => {
    if (isValidateLicencePlate(vehicle.plate_number)) {
      setValidCar(true);
    } else {
      setValidCar(false);
    }
  }, [vehicle.plate_number]);

  useEffect(() => {
    if (imageUrl) {
      setVehicle((prev) => ({ ...prev, background: imageUrl }));
    }
  }, [imageUrl]);

  const onEndName = useCallback((text) => {
    setVehicle((prev) => ({ ...prev, name: text }));
  }, []);

  const onChangeSeat = useCallback((index) => {
    setVehicle((prev) => ({ ...prev, seats: dataSeats[index]?.seats }));
  }, []);

  const onSave = useCallback(async () => {
    setLoadingSaveCar(true);
    vehicle.is_default = defaultCar;
    const header = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    if (!isEdit) {
      const formData = createFormData(vehicle, ['background']);
      const { success } = await axiosPost(API.CAR.MY_CARS(), formData, header);

      if (success) {
        updateData();
        setLoadingSaveCar(false);
      }
    } else {
      const data = { ...vehicle };
      let fileFields = ['background'];
      if (!vehicle.background.uri) {
        fileFields = [];
        delete data.background;
      }
      const formData = createFormData(data, fileFields);
      const { success } = await axiosPut(
        API.CAR.UPDATE(car.id),
        formData,
        header
      );
      if (success) {
        updateData();
        setLoadingSaveCar(false);
      }
    }

    goBack();
  }, [vehicle, isEdit, goBack, updateData, car, defaultCar]);

  const onPressRemoveVehicle = useCallback(async () => {
    hideAlertAction();
    const { success } = await axiosDelete(
      API.CAR.REMOVE_CAR(stateAlertRemove.vehicle.id)
    );
    if (success) {
      updateData();
    }
    goBack();
  }, [goBack, hideAlertAction, stateAlertRemove.vehicle.id, updateData]);

  const background = vehicle.background.uri || vehicle.background;

  // eslint-disable-next-line no-unused-vars
  const [isMissingName, isMissingPlateAndBackground] = useMemo(() => {
    const missName = !vehicle.name;
    const missPlateAndBackground = !vehicle.plate_number || !background;
    return [missName, missPlateAndBackground];
  }, [background, vehicle.name, vehicle.plate_number]);

  const initSeatIndex = useMemo(() => {
    return dataSeats.findIndex((item) => item.seats === vehicle.seats);
  }, [vehicle.seats]);

  const errorText =
    !!vehicle.plate_number && !validCar
      ? t('car_validate_warning', { example: '51A-123.45' })
      : '';

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ItemInput
          required
          title={t('license_plate_number')}
          placeholder={'59Z - 123.45'}
          onChangeText={onEndPlateNumber}
          value={vehicle.plate_number}
          isValid={validCar}
          maxLength={11}
          errorText={errorText}
        />

        {background ? (
          <TouchableOpacity
            style={styles.btnTakePhoto}
            activeOpacity={0.4}
            onPress={onTakePhoto}
            testID={TESTID.ADD_VEHICLE_TAKE_PHOTO}
          >
            <Image source={{ uri: background }} style={styles.img} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnTakePhoto}
            activeOpacity={0.4}
            onPress={onTakePhoto}
            testID={TESTID.ADD_VEHICLE_TAKE_PHOTO}
          >
            <IconFill name={'camera'} color={Colors.Gray6} size={24} />
            <Text type="Body" color={Colors.Gray7} style={styles.txtNoteTake}>
              {t('take_license_plate')} <Text color={Colors.Red6}>*</Text>
            </Text>
          </TouchableOpacity>
        )}
        <ImagePicker
          showImagePicker={showImagePicker}
          setShowImagePicker={setShowImagePicker}
          setImageUrl={setImageUrl}
          testID={TESTID.ADD_VEHICLE_IMAGE_PICKER}
        />
        <ItemInput
          title={t('text_name')}
          placeholder={t('my_car')}
          onChangeText={onEndName}
          value={vehicle.name}
        />
        <View style={styles.line16} />
        <ItemDropDown
          title={t('text_seats')}
          placeholder={'4'}
          data={dataSeats}
          onChangeData={onChangeSeat}
          initIndex={initSeatIndex}
          testID={TESTID.ADD_VEHICLE_SEATS_DROPDOWN}
        />
        <CustomCheckbox
          style={styles.checkboxContainer}
          value={defaultCar}
          onPress={() => setDefaultCar(!defaultCar)}
          onValueChange={(newValue) => setDefaultCar(newValue)}
          testID={TESTID.ADD_VEHICLE_DEFAULT_CAR}
        >
          <Text style={Platform.OS === 'ios' && styles.labelCheckbox}>
            {t('set_as_default_vehicle')}
          </Text>
        </CustomCheckbox>
      </KeyboardAwareScrollView>
      {loadingSaveCar ? (
        <ActivityIndicator color={Colors.Gray4} />
      ) : (
        <View style={styles.wrapBottomButton}>
          <Button
            type={
              !vehicle.plate_number || !vehicle.background || !validCar
                ? 'disabled'
                : 'primary'
            }
            title={t('save')}
            onPress={onSave}
            style={styles.removeFlex}
            testID={TESTID.ADD_VEHICLE_BUTTON_SAVE}
          />
          {isEdit && (
            <Button
              type="underline"
              title={t('delete_vehicle')}
              onPress={onShowRemoveAlert(car)}
              style={styles.editButton}
              height={24}
              testID={TESTID.ADD_VEHICLE_BUTTON_DELETE}
            />
          )}
        </View>
      )}
      <AlertAction
        visible={stateAlertRemove.visible}
        hideModal={hideAlertAction}
        title={stateAlertRemove.title}
        message={stateAlertRemove.message}
        leftButtonTitle={stateAlertRemove.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertRemove.rightButton}
        rightButtonClick={onPressRemoveVehicle}
        testID={TESTID.ADD_VEHICLE_MODAL_DELETE}
        testIDPrefix={TESTID.PREFIX.ADD_VEHICLE}
      />
    </View>
  );
});

export default AddVehicle;

const widthBtnTakePhoto = Device.screenWidth - 32;
const scale = 343 / 189;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  warning: {
    marginTop: 5,
    marginLeft: 8,
    color: Colors.Red,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
  scroll: {
    flex: 1,
  },
  btnTakePhoto: {
    width: widthBtnTakePhoto,
    height: widthBtnTakePhoto / scale,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  txtNoteTake: {
    marginTop: 16,
  },
  line16: {
    height: 16,
  },
  img: {
    width: widthBtnTakePhoto,
    height: widthBtnTakePhoto / scale,
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  labelCheckbox: {
    fontSize: 14,
    lineHeight: 14,
    marginTop: 17,
  },
  wrapBottomButton: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  editButton: {
    flex: 0,
    marginTop: 16,
    marginBottom: 8,
  },
  removeFlex: {
    flex: 0,
  },
});
