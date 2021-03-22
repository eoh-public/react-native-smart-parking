import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { Section, ViewButtonBottom } from '../../commons';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { API, Colors } from '../../configs';
import { useKeyboardShow } from '../../hooks/Common';
import { TESTID } from '../../configs/Constants';
import { axiosPost } from '../../utils/Apis/axios';
import { ToastBottomHelper } from '../../utils/Utils';

export const EmergencyContactsAddNew = ({ route }) => {
  const { group } = route.params;
  const { goBack } = useNavigation();
  const { keyboardBottomPadding } = useKeyboardShow();
  const [textName, setTextName] = useState('');
  const [textPhone, setTextPhone] = useState('');
  const onTextNameChange = useCallback(
    (text) => {
      setTextName(text);
    },
    [setTextName]
  );
  const onTextPhoneChange = useCallback(
    (text) => {
      setTextPhone(text);
    },
    [setTextPhone]
  );
  const onCancel = useCallback(() => {
    goBack();
  }, [goBack]);
  const onSave = useCallback(async () => {
    const { success } = await axiosPost(API.EMERGENCY_BUTTON.CREATE_CONTACT, {
      group: group.id,
      phone_number: textPhone,
      name: textName,
    });
    if (success) {
      goBack();
    } else {
      ToastBottomHelper.error(t('create_contact_failed'));
    }
  }, [goBack, group.id, textName, textPhone]);

  return (
    <SafeAreaView
      style={[styles.wrap, { marginBottom: keyboardBottomPadding }]}
    >
      <WrapHeaderScrollable title={t('create_contact')}>
        <Section type={'border'}>
          <TextInput
            testID={TESTID.ON_CHANGE_NAME_EMERGENCY_CONTACT}
            value={textName}
            style={styles.textInput}
            placeholder={t('text_name')}
            underlineColorAndroid={null}
            onChangeText={onTextNameChange}
          />
          <TextInput
            testID={TESTID.ON_CHANGE_PHONE_EMERGENCY_CONTACT}
            value={textPhone}
            style={styles.textInput}
            placeholder={t('phone_number')}
            underlineColorAndroid={null}
            keyboardType={'phone-pad'}
            onChangeText={onTextPhoneChange}
          />
        </Section>
      </WrapHeaderScrollable>
      <ViewButtonBottom
        leftTitle={t('cancel')}
        leftDisabled={false}
        onLeftClick={onCancel}
        rightTitle={t('save')}
        rightDisabled={!textPhone || !textName}
        onRightClick={onSave}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  textInput: {
    width: '100%',
    height: 58,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    lineHeight: 24,
  },
});
