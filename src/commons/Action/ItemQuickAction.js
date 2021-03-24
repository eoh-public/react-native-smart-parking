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

  const revertActionUpdate = useCallback(
    (value, on_action, on_status, off_action, off_status) => {
      setIsSendingCommand(false);
      if (value) {
        setAction(off_action);
        setStatus && setStatus(on_status);
      } else {
        setAction(on_action);
        setStatus && setStatus(off_status);
      }
    },
    [setStatus]
  );

  const statusCallback = useCallback(
    (value) => {
      revertActionUpdate(
        value,
        sensor.quick_action.on_action,
        sensor.quick_action.on_status,
        sensor.quick_action.off_action,
        sensor.quick_action.off_status
      );
    },
    [sensor, revertActionUpdate]
  );

  useEffect(() => {
    sensor.quick_action && watchMultiConfigs([sensor.quick_action.config_id]);
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
    sensor.quick_action && watchMultiConfigs([sensor.quick_action.config_id]);
    setIsSendingCommand(true);

    if (!sensor.quick_action) {
      // old version
      setTimeout(() => {
        revertActionUpdate(
          action.id === sensor.action.id,
          sensor.action,
          sensor.status,
          sensor.action2,
          sensor.status2
        );
      }, 5000);
    } else if (!sensor.quick_action.will_auto_update_status) {
      setTimeout(() => {
        statusCallback(action.id === sensor.quick_action.on_action.id);
      }, sensor.quick_action.interval);
    }
  }, [action, sensor, revertActionUpdate, statusCallback]);

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
          color={isSendingCommand ? 'gray' : '#00979d'}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
});

export default ItemQuickAction;
