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
    itemRemove: {},
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertRemove({ ...stateAlertRemove, visible: false });
  }, [stateAlertRemove]);

  const onShowRemoveAlert = useCallback(
    (name) => () => {
      setStateAlertRemove((stateAlertAction) => {
        return {
          ...stateAlertAction,
          visible: true,
          title: t('remove_payment_method'),
          message: t('remove_payment_method_confirm', {
            payment_brand:
              `${name.brand} ${t('ending_in')} ${name.last4}` || name,
          }),
          rightButton: t('remove'),
          itemRemove: name,
        };
      });
    },
    []
  );

  const onShowChangeDefaultAlert = useCallback(
    (name) => () => {
      setStateAlertRemove((stateAlertAction) => {
        return {
          ...stateAlertAction,
          visible: true,
          title: t('change_default_payment_method'),
          message: t('change_default_payment_method_confirm', {
            payment_brand:
              `${name.brand} ${t('ending_in')} ${name.last4}` || name,
          }),
          rightButton: t('set_as_default'),
          itemRemove: name,
        };
      });
    },
    []
  );

  return {
    stateAlertRemove,
    hideAlertAction,
    onShowRemoveAlert,
    onShowChangeDefaultAlert,
  };
};
