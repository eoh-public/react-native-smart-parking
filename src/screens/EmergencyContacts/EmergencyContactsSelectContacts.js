import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { Section, ViewButtonBottom } from '../../commons';
import { RowUser } from '../../commons/RowUser';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { Colors, Theme } from '../../configs';
import { TESTID } from '../../configs/Constants';
// import { useDataMember } from 'containers/Sharing/hooks';
// import { useSelector } from 'react-redux';

const dataContact = [
  {
    id: 1,
    name: 'Peter Pan',
    phone: '0931245690',
  },
  {
    id: 2,
    name: 'John Wick',
    phone: '0912345678',
  },
  {
    id: 3,
    name: 'Batoze Pre',
    phone: '0921456876',
  },
];

export const EmergencyContactsSelectContacts = ({ route }) => {
  const { goBack } = useNavigation();
  // const { unitId } = route.params;

  // const { dataMembers, loading, onRefresh } = useDataMember(unitId);
  const [currentContacts, setCurrentContact] = useState(
    dataContact.map((contact) => contact.phone)
  );

  const onPressContact = useCallback(
    (contact) => () => {
      const indexOfContact = currentContacts.indexOf(contact.phone);

      if (indexOfContact > -1) {
        const newContacts = [...currentContacts];
        newContacts.splice(indexOfContact, 1);
        setCurrentContact(newContacts);
      } else {
        setCurrentContact([...currentContacts, contact.phone]);
      }
    },
    [currentContacts]
  );
  return (
    <SafeAreaView style={styles.container}>
      <WrapHeaderScrollable
        title={t('select_contacts')}
        // loading={loading}
        // onRefresh={onRefresh}
      >
        <Section type={'border'}>
          {dataContact.map((contact, index) => (
            <RowUser
              key={contact.id.toString()}
              testID={TESTID.EMERGENCY_SELECT_CONTACT}
              index={index}
              leftIcon={
                <IconOutline name={'user'} size={20} color={Colors.White} />
              }
              text={contact.name}
              subtext={contact.phone}
              onPress={onPressContact(contact)}
              rightComponent={
                <View style={styles.buttonRemove}>
                  {currentContacts.indexOf(contact.phone) > -1 && (
                    <IconOutline
                      name={'check-circle'}
                      size={20}
                      color={Colors.Primary}
                    />
                  )}
                </View>
              }
            />
          ))}
        </Section>
      </WrapHeaderScrollable>
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={goBack}
        rightTitle={t('save')}
        rightDisabled={true}
      />
    </SafeAreaView>
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
