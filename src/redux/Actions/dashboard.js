import { createRequestTypes } from './utils';

export const ADD_USER = createRequestTypes('ADD_USER');
export const addUser = (payload) => ({ type: ADD_USER.REQUEST, payload });

export const RESET_INVITATIONS = 'RESET_INVITATIONS';
export const resetInvitations = (payload) => ({
  type: RESET_INVITATIONS,
  payload,
});

// add / remove star shared unit
export const ADD_STAR_SHARED_UNIT = createRequestTypes('ADD_STAR_SHARED_UNIT');
export const addStarSharedUnit = (unitId) => ({
  type: ADD_STAR_SHARED_UNIT.REQUEST,
  unitId,
});

export const REMOVE_STAR_SHARED_UNIT = createRequestTypes(
  'REMOVE_STAR_SHARED_UNIT'
);
export const removeStarSharedUnit = (unitId) => ({
  type: REMOVE_STAR_SHARED_UNIT.REQUEST,
  unitId,
});

// add / remove pin shared unit
export const ADD_PIN_SHARED_UNIT = createRequestTypes('ADD_PIN_SHARED_UNIT');
export const addPinSharedUnit = (unitId) => ({
  type: ADD_PIN_SHARED_UNIT.REQUEST,
  unitId,
});

export const REMOVE_PIN_SHARED_UNIT = createRequestTypes(
  'REMOVE_PIN_SHARED_UNIT'
);
export const removePinSharedUnit = (unitId) => ({
  type: REMOVE_PIN_SHARED_UNIT.REQUEST,
  unitId,
});

export const DELETE_UNIT_SUCCESS = 'DELETE_UNIT_SUCCESS';
export const deleteUnitSuccess = (unitId) => ({
  type: DELETE_UNIT_SUCCESS,
});

export const UNITS_MEMBER_DETAIL = 'UNITS_MEMBER_DETAIL';
export const removeSelfSuccess = (unitId) => ({
  type: UNITS_MEMBER_DETAIL,
  unitId,
});

export const MANAGE_UNIT_SUCCESS = 'MANAGE_UNIT_SUCCESS';
export const manageUnitSuccess = (id, data) => ({
  type: MANAGE_UNIT_SUCCESS,
  id,
  data,
});
