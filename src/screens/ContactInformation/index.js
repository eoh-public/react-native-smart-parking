import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../commons/Text';
import { t } from 'i18n-js';
import EoHLogo from '../../../assets/images/SmartParking/eoh-logo.svg';
import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';

const ContactInformation = memo(() => {
  const dataInfo = useMemo(
    () => [
      {
        id: 0,
        title: t('text_email'),
        info: 'info@eoh.io',
      },
      {
        id: 1,
        title: t('hotline'),
        info: '028 7100 4747',
      },
      {
        id: 2,
        title: t('website'),
        info: 'www.eoh.io',
      },
      {
        id: 3,
        title: t('address'),
        info:
          '298/3 Dien Bien Phu, Ward 17, Binh Thanh District, Ho Chi Minh City',
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <EoHLogo testID={TESTID.EOH_LOGO} />
        <Text bold color={Colors.Gray9} style={styles.nameCompany}>
          EoH JSC
        </Text>
      </View>
      {dataInfo.map((item) => (
        <View key={item.id} style={styles.itemInfo}>
          <Text semibold color={Colors.Gray9}>
            {item.title}
          </Text>
          <Text
            label="H4"
            underline={item.id === 2}
            color={item.id === 2 ? Colors.Orange : Colors.Gray7}
            style={styles.info}
          >
            {item.info}
          </Text>
        </View>
      ))}
    </View>
  );
});

export default ContactInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  itemInfo: {
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  logo: {
    paddingBottom: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameCompany: {
    paddingTop: 5,
  },
  info: {
    paddingTop: 10,
  },
});
