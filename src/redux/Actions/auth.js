import { createRequestTypes } from './utils';

export const INIT_AUTH = createRequestTypes('INIT_AUTH');
export const initAuth = (params) => ({ type: INIT_AUTH.REQUEST, params });
