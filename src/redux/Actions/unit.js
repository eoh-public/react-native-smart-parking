import { createRequestTypes } from './utils';

export const UNIT_DETAILS = createRequestTypes('UNIT_DETAILS');
export const fetchUnitDetails = (unitId, config) => ({
  type: UNIT_DETAILS.REQUEST,
  unitId,
  config,
});

export const CREATE_SUB_UNIT = 'CREATE_SUB_UNIT';
export const createSubUnit = (data) => ({
  type: CREATE_SUB_UNIT,
  data,
});

export const UNITS_NEAR_ME = createRequestTypes('UNITS_NEAR_ME');
export const fetchUnitsNearMe = (lat, lon, page) => ({
  type: UNITS_NEAR_ME.REQUEST,
  lat,
  lon,
  page,
});

export const UNITS_PUBLIC_SUCCESS = 'UNITS_PUBLIC_SUCCESS';
export const fetchUnitsPublicSuccess = (data) => ({
  type: UNITS_PUBLIC_SUCCESS,
  data,
});

export const PIN_PUBLIC_UNIT_SUCCESS = 'PIN_PUBLIC_UNIT_SUCCESS';
export const pinPublicUnitSuccess = (unitId) => ({
  type: PIN_PUBLIC_UNIT_SUCCESS,
  unitId,
});

export const UNPIN_PUBLIC_UNIT_SUCCESS = 'UNPIN_PUBLIC_UNIT_SUCCESS';
export const unpinPublicUnitSuccess = (unitId) => ({
  type: UNPIN_PUBLIC_UNIT_SUCCESS,
  unitId,
});

export const REMOVE_SUB_UNIT = 'REMOVE_SUB_UNIT';
export const removeSubUnit = (id) => ({
  type: REMOVE_SUB_UNIT,
  id,
});

export const MANAGE_SUB_UNIT = 'MANAGE_SUB_UNIT';
export const manageSubUnit = (id, data) => ({
  type: MANAGE_SUB_UNIT,
  id,
  data,
});
