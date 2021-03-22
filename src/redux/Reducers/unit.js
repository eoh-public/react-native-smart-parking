import {
  UNIT_DETAILS,
  UNITS_NEAR_ME,
  UNITS_PUBLIC_SUCCESS,
  PIN_PUBLIC_UNIT_SUCCESS,
  UNPIN_PUBLIC_UNIT_SUCCESS,
  CREATE_SUB_UNIT,
  REMOVE_SUB_UNIT,
  MANAGE_SUB_UNIT,
} from '../Actions/unit';

const initialState = {
  unitDetail: {
    stations: [],
  },
  unitsNearMe: [],
  maxPageUnitsNearMe: 1,

  unitsPublic: [],
  maxPageUnitPublic: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNIT_DETAILS.SUCCESS:
      return { ...state, unitDetail: action.result.data };

    case UNIT_DETAILS.FAIL:
      return { ...initialState };

    case CREATE_SUB_UNIT:
      return {
        ...state,
        unitDetail: {
          ...state.unitDetail,
          stations: [...state.unitDetail.stations, action.data],
        },
      };

    case UNITS_NEAR_ME.SUCCESS:
      return {
        ...state,
        maxPageUnitsNearMe: Math.ceil(action.result.data.count / 10),
        unitsNearMe: [...state.unitsNearMe, ...action.result.data.results],
      };

    case UNITS_PUBLIC_SUCCESS:
      return {
        ...state,
        maxPageUnitPublic: Math.ceil(action.data.count / 10),
        unitsPublic: [...state.unitsPublic, ...action.data.results],
      };

    case PIN_PUBLIC_UNIT_SUCCESS:
      return {
        ...state,
        unitsPublic: state.unitsPublic.map((unitsPublic) =>
          unitsPublic.id === action.unitId
            ? { ...unitsPublic, is_pin: true }
            : unitsPublic
        ),
      };

    case UNPIN_PUBLIC_UNIT_SUCCESS:
      return {
        ...state,
        unitsPublic: state.unitsPublic.map((unitsPublic) =>
          unitsPublic.id === action.unitId
            ? { ...unitsPublic, is_pin: false }
            : unitsPublic
        ),
      };

    case REMOVE_SUB_UNIT:
      return {
        ...state,
        unitDetail: {
          ...state.unitDetail,
          stations: state.unitDetail.stations.filter(
            (station) => station.id !== action.id
          ),
        },
      };

    case MANAGE_SUB_UNIT:
      return {
        ...state,
        unitDetail: {
          ...state.unitDetail,
          stations: state.unitDetail.stations.map((station) =>
            station.id === action.id
              ? {
                  ...station,
                  name: action.data.name,
                  background: action.data.background,
                }
              : station
          ),
        },
      };

    default:
      return state;
  }
};
