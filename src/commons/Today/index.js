import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import t from 'i18n';
import i18n from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../../commons/Text';

const TodayComponent = ({ style }) => {
  const getCurrentDate = () => {
    const currentLanguage = i18n.currentLocale();
    moment.locale(currentLanguage);
    let format = 'MMM DD';
    if (currentLanguage === 'vi') {
      format = 'Do MMMM';
    }
    return t('Today') + ', ' + moment().format(format);
  };

  return (
    <View style={style}>
      <Text semibold style={styles.todayText}>
        {getCurrentDate()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todayText: {
    color: Colors.Gray9,
    fontSize: 20,
  },
});

export default TodayComponent;
