import React, { memo, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TESTID } from '../../configs/Constants';
import { IconFill } from '@ant-design/icons-react-native';
import { watchMultiConfigs } from '../../iot/Monitor';
import { sendRemoteCommand } from '../../iot/RemoteControl';
import { useConfigGlobalState } from '../../iot/states';

const ItemQuickAction = memo(({ sensor, wrapperStyle, setStatus }) => {
  const [isSendingCommand, setIsSendingCommand] = useState(false);
  const [action, setAction] = useState(sensor.action);
  // eslint-disable-next-line no-unused-vars
  const [configValues, _] = useConfigGlobalState('configValues');

  const statusCallback = useCallback(
    (value) => {
      setIsSendingCommand(false);
      if (value) {
        setAction(sensor.quick_action.off_action);
        setStatus && setStatus(sensor.quick_action.on_status);
      } else {
        setAction(sensor.quick_action.on_action);
        setStatus && setStatus(sensor.quick_action.off_status);
      }
    },
    [sensor, setStatus]
  );

  useEffect(() => {
    if (!sensor.quick_action) {
      return;
    }
    watchMultiConfigs([sensor.quick_action.config_id]);
  }, [sensor.quick_action]);

  useEffect(() => {
    if (!sensor.quick_action) {
      return;
    }
    if (!(sensor.quick_action.config_id in configValues)) {
      return;
    }
    const configValue = configValues[sensor.quick_action.config_id];
    statusCallback(configValue);
  }, [sensor, configValues, statusCallback]);

  const onActionPress = useCallback(() => {
    sendRemoteCommand(sensor, action);
    setIsSendingCommand(true);
    if (!sensor.quick_action) {
      // old version
      setTimeout(() => {
        setIsSendingCommand(false);
        if (action.id === sensor.action.id) {
          setAction(sensor.action2);
          setStatus && setStatus(sensor.status);
        } else {
          setAction(sensor.action);
          setStatus && setStatus(sensor.status2);
        }
      }, 5000);
    } else if (!sensor.quick_action.will_auto_update_status) {
      setTimeout(() => {
        statusCallback(action.id === sensor.quick_action.on_action.id);
      }, sensor.quick_action.interval);
    }
  }, [action, sensor, setStatus, statusCallback]);

  if (!action) {
    return <View />;
  }

  return (
    <TouchableOpacity
      testID={TESTID.ITEM_QUICK_ACTION_PRESS}
      onPress={onActionPress}
    >
      <View style={wrapperStyle}>
        <IconFill
          name={action.icon}
          color={isSendingCommand ? 'gray' : '#00979D'}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
});

export default ItemQuickAction;
