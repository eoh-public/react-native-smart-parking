import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { timeDifference } from '../../utils/Converter/time';

const ConnectedViewHeader = memo(({ lastUpdated }) => {
  const lastUpdatedStr = lastUpdated
    ? timeDifference(new Date(), lastUpdated)
    : null;
  return (
    <View style={styles.statusContainer}>
      <View style={styles.connectStatus}>
        <IconOutline name={'wifi'} color={Colors.Green6} size={16} />
        <Text style={styles.greenStatus}>{t('connected')}</Text>
      </View>
      {lastUpdatedStr && (
        <View>
          <Text color={Colors.Gray7} size={12} style={styles.txtLastUpdate}>
            {`${t('last_updated')} ${lastUpdatedStr}`}
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greenStatus: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.Green6,
  },
  txtLastUpdate: {
    marginLeft: 8,
    lineHeight: 20,
  },
});

export { ConnectedViewHeader };
