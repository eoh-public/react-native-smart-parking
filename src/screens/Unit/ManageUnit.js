import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import t from 'i18n';

import { Colors, API, Device } from '../../configs';
import { deleteUnitSuccess, manageUnitSuccess } from '../../redux/Actions/dashboard';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import { createFormData, axiosPatch, axiosDelete } from '../../utils/Apis/axios';
import { navigate } from '../../navigations/utils';
import useBoolean from '../../hooks/Common/useBoolean';
import useKeyboardAnimated from '../../hooks/Explore/useKeyboardAnimated';

import {
  AlertAction,
  Section,
  ViewButtonBottom,
  ImagePicker,
} from '../../commons';
import Text from '../../commons/Text';
import _TextInput from '../../commons/Form/TextInput';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useIsOwnerOfUnit } from '../../hooks/Common';
import { TESTID } from '../../configs/Constants';

const ManageUnit = ({ route }) => {
  const { unit } = route.params;
  const { isOwner } = useIsOwnerOfUnit(unit.user_id);
  const [showEdit, setshowEdit, setHideEdit] = useBoolean();
  const [unitName, setUnitName] = useState(unit.name);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const updateUnit = useCallback(
    async (headers) => {
      const formData = createFormData(imageUrl, ['background']);

      const { success, data } = await axiosPatch(
        API.UNIT.MANAGE_UNIT(unit.id),
        formData,
        headers
      );

      if (success) {
        dispatch(manageUnitSuccess(unit.id, data));
        ToastBottomHelper.success(t('unit_updated_successfully'));
      }
    },
    [unit.id, dispatch, imageUrl]
  );

  const goRename = useCallback(async () => {
    await updateUnit({ name: unitName }, {});
    setHideEdit(true);
  }, [unitName, setHideEdit, updateUnit]);

  const handleChoosePhoto = useCallback(() => {
    setShowImagePicker(true);
  }, [setShowImagePicker]);

  useEffect(() => {
    if (imageUrl) {
      updateUnit({
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  }, [imageUrl, updateUnit]);

  const [showRemove, setshowRemove, setHideRemove] = useBoolean();
  const goRemove = useCallback(async () => {
    const { success } = await axiosDelete(API.UNIT.MANAGE_UNIT(unit.id));
    if (success) {
      dispatch(deleteUnitSuccess(unit.id));
      setHideEdit(true);
      ToastBottomHelper.success(t('unit_deleted_successfully'));
      navigate(Routes.Dashboard);
    }
  }, [unit.id, dispatch, setHideEdit]);

  const [transY] = useKeyboardAnimated(-16);
  const animatedStyle = Platform.select({
    ios: {
      marginBottom: transY,
    },
  });

  const options = {
    mediaType: 'photo',
    maxWidth: 1024,
    quality: 0.8,
    includeBase64: Device.isIOS,
    saveToPhotos: true,
  };

  return (
    <>
      <WrapHeaderScrollable title={t('manage_unit')}>
        <View style={styles.wraper}>
          {isOwner && (
            <Section type={'border'}>
              <TouchableOpacity
                onPress={setshowEdit}
                testID={TESTID.MANAGE_UNIT_CHANGE_NAME}
              >
                <Text style={[styles.textWraper, styles.unitName]}>
                  {unit.name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.textWraper]}
                testID={TESTID.MANAGE_UNIT_CHANGE_LOCATION}
              >
                <Text style={styles.unitName}>{t('geolocation')}</Text>
                <Text style={styles.unitGeolocation}>{unit.address}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backgroundContainer]}
                onPress={handleChoosePhoto}
                testID={TESTID.MANAGE_UNIT_CHANGE_PHOTO}
              >
                <Text style={[styles.unitName, styles.textBackground]}>
                  {t('background')}
                </Text>
                <Image
                  style={styles.image}
                  source={{ uri: unit.background }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <ImagePicker
                showImagePicker={showImagePicker}
                setShowImagePicker={setShowImagePicker}
                setImageUrl={setImageUrl}
                optionsCapture={options}
                testID={TESTID.MANAGE_UNIT_IMAGE_PICKER}
              />
            </Section>
          )}
        </View>
      </WrapHeaderScrollable>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={setshowRemove}
        testID={TESTID.MANAGE_UNIT_SHOW_REMOVE}
      >
        <Text type={'H4'} semibold color={Colors.Gray6}>
          {t('remove_unit')}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={showEdit}
        onBackButtonPress={setHideEdit}
        onBackdropPress={setHideEdit}
        style={styles.modalContainer}
        testID={TESTID.MANAGE_UNIT_MODAL_RENAME}
      >
        <Animated.View style={[styles.popoverStyle, animatedStyle]}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text semibold style={styles.modalHeaderText}>
                {t('rename_unit')}
              </Text>
            </View>
            <_TextInput
              defaultValue={unitName}
              onChange={(value) => setUnitName(value)}
              textInputStyle={styles.textInputStyle}
              wrapStyle={styles.textInputWrapStyle}
              selectionColor={Colors.Primary}
              testID={TESTID.MANAGE_UNIT_MODAL_RENAME_INPUT_NAME}
            />

            <ViewButtonBottom
              leftTitle={t('cancel')}
              onLeftClick={setHideEdit}
              rightTitle={t('rename')}
              onRightClick={goRename}
              testIDPrefix={TESTID.PREFIX.MANAGE_UNIT}
            />
          </View>
        </Animated.View>
      </Modal>
      <AlertAction
        visible={showRemove}
        hideModal={setHideRemove}
        title={t('remove_unit_name', { name: unitName })}
        message={t('remove_note')}
        leftButtonTitle={t('cancel')}
        leftButtonClick={setHideRemove}
        rightButtonTitle={t('remove')}
        rightButtonClick={goRemove}
        testIDPrefix={TESTID.PREFIX.MANAGE_UNIT_ALERT}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  wraper: {
    flex: 1,
  },
  title: {
    paddingLeft: 22,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 16,
  },
  textWraper: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
  },
  unitName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  unitGeolocation: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Primary,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 16 + getBottomSpace(),
  },
  backgroundContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textBackground: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  textInputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: 0,
  },
  textInputWrapStyle: {
    marginTop: 0,
  },
  buttonContacts: {
    marginTop: 8,
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ManageUnit;
