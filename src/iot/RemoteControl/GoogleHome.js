import { Auth, createConnection, getStates } from 'home-assistant-js-websocket';
import { t } from 'i18n-js';
import { getConfigGlobalState, setConfigGlobalState } from '../states';
import { ToastBottomHelper } from '../../utils/Utils';

let connections = {};

let configMaps = {};

function booleanType(value) {
  return value === 'on';
}

const valueTypes = {
  boolean: booleanType,
};

async function stateChangeCallback(event) {
  if (!(event.data.entity_id in configMaps)) {
    return;
  }

  const [configId, type] = configMaps[event.data.entity_id];
  const typeConverter = valueTypes[type];

  let configValues = getConfigGlobalState('configValues');
  configValues[configId] = typeConverter(event.data.new_state.state);
  setConfigGlobalState('configValues', { ...configValues });
}

async function fetchConnectionEntities(connection) {
  const states = await getStates(connection);

  let configValues = getConfigGlobalState('configValues');
  for (let i = 0; i < states.length; i++) {
    const entity = states[i];
    const entityId = entity.entity_id;

    if (!configMaps.hasOwnProperty(entityId)) {
      continue;
    }

    const [configId, type] = configMaps[entityId];
    const typeConverter = valueTypes[type];

    configValues[configId] = typeConverter(entity.state);
  }

  setConfigGlobalState('configValues', { ...configValues });
}

export const googleHomeConnect = async (options) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (option.chip_id in connections) {
      // skip connected
      return;
    }

    option.config_maps.forEach((configMap) => {
      configMaps[configMap.entity_id] = [
        configMap.config_id,
        configMap.value_type,
      ];
    });

    let auth = new Auth(option.auth);
    const connection = await createConnection({ auth });
    await connection.subscribeEvents(stateChangeCallback, 'state_changed');

    connection.addEventListener('disconnected', () => {
      ToastBottomHelper.error(t('command_googlehome_lost'));
    });

    connection.addEventListener('ready', async (conn, eventData) => {
      await fetchConnectionEntities(conn);
      ToastBottomHelper.success(t('command_googlehome_ready'));
    });

    connections[option.chip_id] = connection;
    await fetchConnectionEntities(connection);
    ToastBottomHelper.success(t('command_googlehome_ready'));
  }
};

export const googleHomeDisconnect = async (options) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (!(option.chip_id in connections)) {
      return;
    }

    await connections[option.chip_id].close();
    delete connections[option.chip_id];
  }
};

function getSensorConnection(sensor) {
  return connections[sensor.chip_id];
}

export async function sendCommandOverGoogleHome(sensor, action) {
  if (!action.googlehome_actions || !action.googlehome_actions.length) {
    return;
  }

  const connection = getSensorConnection(sensor);
  if (!connection) {
    ToastBottomHelper.error(t('command_send_fail_googlehome'));
    return;
  }

  for (let i = 0; i < action.googlehome_actions.length; i++) {
    const ghAction = action.googlehome_actions[i];
    await connection.sendMessagePromise(ghAction.message);
  }
  ToastBottomHelper.success(t('command_send_success_googlehome'));
}
