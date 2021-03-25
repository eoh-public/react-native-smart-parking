import { useCallback, useState } from 'react';
import { t } from 'i18n-js';

const useStateAlertCancel = () => {
  const [stateAlertCancel, setStateAlertCancel] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('no'),
    rightButton: '',
  });
  const hideAlertCancel = useCallback(() => {
    setStateAlertCancel({ ...stateAlertCancel, visible: false });
  }, [stateAlertCancel]);

  const onShowAlertCancel = useCallback(() => {
    setStateAlertCancel((stateAlertAction) => {
      return {
        ...stateAlertAction,
        visible: true,
        title: t('cancel_booking'),
        message: t('cancel_booking_message'),
        rightButton: t('yes_cancel'),
      };
    });
  }, []);

  return {
    stateAlertCancel,
    hideAlertCancel,
    onShowAlertCancel,
  };
};

const useStateAlertStop = () => {
  const [stateAlertStop, setStateAlertStop] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('no'),
    rightButton: '',
  });
  const hideAlertStop = useCallback(() => {
    setStateAlertStop({ ...stateAlertStop, visible: false });
  }, [stateAlertStop]);

  const onShowAlertStop = useCallback(() => {
    setStateAlertStop((stateAlertAction) => {
      return {
        ...stateAlertAction,
        visible: true,
        title: t('stop_parking'),
        message: t('stop_parking_message'),
        rightButton: t('stop_2'),
      };
    });
  }, []);

  return {
    stateAlertStop,
    hideAlertStop,
    onShowAlertStop,
  };
};

export { useStateAlertCancel, useStateAlertStop };
