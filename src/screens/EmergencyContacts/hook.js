import { t } from 'i18n-js';
import { useCallback, useState } from 'react';
import { API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';

export const useAlertRemoveEmergencyContact = () => {
  const [stateAlertRemoveContact, setStateAlertRemoveContact] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: '',
    member: {},
  });
  const onPressRemoveContact = useCallback(
    (member) => () => {
      setStateAlertRemoveContact((action) => {
        let name = member.name || 'N/A';
        return {
          ...action,
          visible: true,
          title: t('sharing_remove_user', { name: name }),
          rightButton: t('remove'),
          member: member,
        };
      });
    },
    []
  );

  const hideAlertRemoveContact = useCallback(() => {
    setStateAlertRemoveContact({ ...stateAlertRemoveContact, visible: false });
  }, [stateAlertRemoveContact]);

  return {
    stateAlertRemoveContact,
    hideAlertRemoveContact,
    onPressRemoveContact,
  };
};

export const useEmeragencyContacts = () => {
  const [listContacts, setListContacts] = useState([]);

  const getListContacts = useCallback(async (group_id) => {
    const { data, success } = await axiosGet(API.EMERGENCY_BUTTON.CONTACTS, {
      params: {
        group: group_id,
      },
    });
    if (success) {
      data && setListContacts(data);
    }
  }, []);

  return {
    listContacts,
    getListContacts,
  };
};
