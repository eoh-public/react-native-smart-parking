import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { AlertAction, MenuActionList, Section } from '../../commons';
import { RowUser } from '../../commons/RowUser';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { API, Colors, Theme } from '../../configs';
import { useBoolean } from '../../hooks/Common';

import { useAlertRemoveEmergencyContact, useEmeragencyContacts } from './hook';
import Routes from '../../utils/Route';
import { axiosDelete } from '../../utils/Apis/axios';
import { ToastBottomHelper } from '../../utils/Utils';

const MAX_EMERGENCY_CONTACTS = 5;

export const EmergencyContactsList = ({ route }) => {
  const { unitId, group } = route.params;
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const [
    showingAddnewModal,
    setShowAddnewModal,
    setHideAddnewModal,
  ] = useBoolean(false);
  const {
    stateAlertRemoveContact,
    onPressRemoveContact,
    hideAlertRemoveContact,
  } = useAlertRemoveEmergencyContact();

  const { listContacts, getListContacts } = useEmeragencyContacts();

  useEffect(() => {
    if (isFocused) {
      getListContacts(group.id);
    }
  }, [getListContacts, group, isFocused]);

  const handleRemove = useCallback(async () => {
    const { success } = await axiosDelete(
      API.EMERGENCY_BUTTON.REMOVE_CONTACTS(stateAlertRemoveContact.member.id)
    );
    if (success) {
      getListContacts(group.id);
      hideAlertRemoveContact();
    } else {
      ToastBottomHelper.error(t('error_please_try_later'));
    }
  }, [stateAlertRemoveContact, getListContacts, group, hideAlertRemoveContact]);

  const onAddNew = useCallback(() => {
    setShowAddnewModal();
  }, [setShowAddnewModal]);
  const onItemAddClick = useCallback(
    (item) => {
      item.route && navigate(item.route, item.data || {});
    },
    [navigate]
  );
  const dataAddNewModal = [
    {
      id: 1,
      text: t('create_contact'),
      route: Routes.EmergencyContactsAddNew,
      data: { group },
    },
    {
      id: 2,
      text: t('select_unit_members'),
      route: Routes.EmergencyContactsSelectContacts,
      data: { unitId },
    },
  ];

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('emergency_contacts')}
        subTitle={t('emergency_contacts_hint')}
        loading={false}
        //onRefresh={onRefresh}
      >
        <Section type={'border'}>
          <RowUser
            type={
              listContacts.length < MAX_EMERGENCY_CONTACTS
                ? 'primary'
                : 'disable'
            }
            leftIcon={
              <IconOutline name={'plus'} size={20} color={Colors.White} />
            }
            text={t('add_new')}
            subtext={t('emergency_max_contacts', {
              number: MAX_EMERGENCY_CONTACTS.toString(),
            })}
            onPress={onAddNew}
          />
          {!!listContacts.length &&
            listContacts.map((contact, index) => (
              <RowUser
                key={contact.id}
                index={index}
                leftIcon={
                  <IconOutline name={'user'} size={20} color={Colors.White} />
                }
                text={contact.name}
                subtext={contact.phone_number}
                rightComponent={
                  <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={onPressRemoveContact(contact)}
                  >
                    <IconOutline
                      name={'minus'}
                      size={20}
                      color={Colors.Gray8}
                    />
                  </TouchableOpacity>
                }
              />
            ))}
        </Section>
      </WrapHeaderScrollable>
      <AlertAction
        visible={stateAlertRemoveContact.visible}
        hideModal={hideAlertRemoveContact}
        title={stateAlertRemoveContact.title}
        message={stateAlertRemoveContact.message}
        leftButtonTitle={stateAlertRemoveContact.leftButton}
        leftButtonClick={hideAlertRemoveContact}
        rightButtonTitle={stateAlertRemoveContact.rightButton}
        rightButtonClick={handleRemove}
      />
      <MenuActionList
        title={t('add_new')}
        visible={showingAddnewModal}
        hideModal={setHideAddnewModal}
        listItem={dataAddNewModal}
        onItemClick={onItemAddClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  buttonRemove: {
    height: 40,
    width: 40,
    ...Theme.center,
  },
});
