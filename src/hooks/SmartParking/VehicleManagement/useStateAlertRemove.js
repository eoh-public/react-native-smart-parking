import { useCallback, useState } from 'react';
import { t } from 'i18n-js';

export const useStateAlertRemove = () => {
  const [stateAlertRemove, setStateAlertRemove] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: '',
    vehicle: {},
  });

  const hideAlertAction = useCallback(() => {
    setStateAlertRemove({ ...stateAlertRemove, visible: false });
  }, [stateAlertRemove]);

  const onShowRemoveAlert = useCallback(
    (vehicle) => () => {
      setStateAlertRemove((stateAlertAction) => {
        return {
          ...stateAlertAction,
          visible: true,
          title: t('remove_vehicle'),
          message: t('remove_vehicle_confirm', {
            vehicle: vehicle.plate_number,
          }),
          rightButton: t('remove'),
          vehicle: vehicle,
        };
      });
    },
    []
  );

  return {
    stateAlertRemove,
    hideAlertAction,
    onShowRemoveAlert,
  };
};
