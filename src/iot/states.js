import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState, setGlobalState, getGlobalState } = createGlobalState({
  configValues: {},
});

export const useConfigGlobalState = useGlobalState;
export const setConfigGlobalState = setGlobalState;
export const getConfigGlobalState = getGlobalState;
