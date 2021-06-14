import React, { memo, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { t } from 'i18n-js';

import ButtonPopup from '../ButtonPopup';

const ImagePicker = memo(
  ({
    showImagePicker,
    setShowImagePicker,
    setImageUrl,
    optionsCapture,
    optionsSelect,
  }) => {
    const requestCameraPermission = useCallback(async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            }
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          return false;
        }
      } else {
        return true;
      }
    }, []);

    const requestExternalWritePermission = useCallback(async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            }
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          return false;
        }
      } else {
        return true;
      }
    }, []);

    // options info: check https://github.com/react-native-image-picker/react-native-image-picker
    const captureImage = useCallback(
      async (type) => {
        let options = optionsCapture
          ? optionsCapture
          : {
              mediaType: type,
              quality: 1,
              saveToPhotos: true,
            };

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.errorCode === 'camera_unavailable') {
              return;
            } else if (response.errorCode === 'permission') {
              return;
            } else if (response.errorCode === 'others') {
              return;
            }

            setImageUrl(response);
            setShowImagePicker(false);
          });
        }
      },
      [
        setImageUrl,
        setShowImagePicker,
        requestCameraPermission,
        requestExternalWritePermission,
        optionsCapture,
      ]
    );

    const chooseFile = useCallback(
      (type) => {
        let options = optionsSelect
          ? optionsSelect
          : {
              mediaType: type,
              quality: 1,
            };
        launchImageLibrary &&
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.errorCode === 'camera_unavailable') {
              return;
            } else if (response.errorCode === 'permission') {
              return;
            } else if (response.errorCode === 'others') {
              return;
            }
            setImageUrl(response);
            setShowImagePicker(false);
          });
      },
      [setImageUrl, setShowImagePicker, optionsSelect]
    );

    const onCaptureImage = useCallback(() => {
      captureImage('photo');
    }, [captureImage]);

    const onChooseFile = useCallback(() => {
      chooseFile('photo');
    }, [chooseFile]);

    const onClose = useCallback(() => {
      setShowImagePicker(false);
    }, [setShowImagePicker]);

    const buttonEvent = {
      main_title: t('take_photo'),
      secondary_title: t('choose_from_library'),
      on_press_main: onCaptureImage,
      on_press_secondary: onChooseFile,
    };

    return (
      <ButtonPopup
        rowButton={false}
        visible={showImagePicker}
        onClose={onClose}
        mainTitle={buttonEvent.main_title}
        onPressMain={buttonEvent.on_press_main}
        secondaryTitle={buttonEvent.secondary_title}
        onPressSecondary={buttonEvent.on_press_secondary}
        typeSecondary={'primary'}
      />
    );
  }
);

export default ImagePicker;
