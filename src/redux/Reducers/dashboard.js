import {
  ADD_USER,
  RESET_INVITATIONS,
  ADD_STAR_SHARED_UNIT,
  REMOVE_STAR_SHARED_UNIT,
  ADD_PIN_SHARED_UNIT,
  REMOVE_PIN_SHARED_UNIT,
  DELETE_UNIT_SUCCESS,
  UNITS_MEMBER_DETAIL,
  MANAGE_UNIT_SUCCESS,
} from '../Actions/dashboard';

const initialState = {
  addUser: {
    success: false,
    error: '',
    users: [],
  },
  errorMsg: '',

  isFetching: false,
  isFetched: false,
  units: [],

  // shared units
  isFetchingShared: false,
  isFetchedShared: false,
  sharedUnits: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_INVITATIONS:
      return {
        ...state,
        addUser: { ...initialState.addUser },
      };

    case ADD_USER.SUCCESS:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          success: true,
          users: [...state.addUser.users, action.result.data.user],
        },
      };

    case ADD_USER.FAIL:
      return {
        ...state,
        addUser: {
          ...state.addUser,
          success: false,
          error: action.result.message,
        },
      };

    case ADD_STAR_SHARED_UNIT.REQUEST:
      return {
        ...state,
        sharedUnits: state.sharedUnits.map((sharedUnit) =>
          sharedUnit.unit.id === action.unitId
            ? { ...sharedUnit, is_star: true }
            : sharedUnit
        ),
        isFetchingShared: true,
        isFetchedShared: false,
      };
    case ADD_STAR_SHARED_UNIT.SUCCESS:
      return {
        ...state,
        isFetchingShared: false,
        isFetchedShared: true,
      };
    case ADD_STAR_SHARED_UNIT.FAIL:
      return {
        ...state,
        errorMsg: action.result.message,
        isFetchingShared: false,
        isFetchedShared: false,
      };

    case REMOVE_STAR_SHARED_UNIT.REQUEST:
      return {
        ...state,
        sharedUnits: state.sharedUnits.map((sharedUnit) =>
          sharedUnit.unit.id === action.unitId
            ? { ...sharedUnit, is_star: false }
            : sharedUnit
        ),
        isFetchingShared: true,
        isFetchedShared: false,
      };
    case REMOVE_STAR_SHARED_UNIT.SUCCESS:
      return {
        ...state,
        isFetchingShared: false,
        isFetchedShared: true,
      };
    case REMOVE_STAR_SHARED_UNIT.FAIL:
      return {
        ...state,
        errorMsg: action.result.message,
        isFetchingShared: false,
        isFetchedShared: false,
      };

    case ADD_PIN_SHARED_UNIT.REQUEST:
      return {
        ...state,
        sharedUnits: state.sharedUnits.map((sharedUnit) =>
          sharedUnit.unit.id === action.unitId
            ? { ...sharedUnit, is_pin: true }
            : sharedUnit
        ),
        isFetchingShared: true,
        isFetchedShared: false,
      };
    case ADD_PIN_SHARED_UNIT.SUCCESS:
      return {
        ...state,
        isFetchingShared: false,
        isFetchedShared: true,
      };
    case ADD_PIN_SHARED_UNIT.FAIL:
      return {
        ...state,
        errorMsg: action.result.message,
        isFetchingShared: false,
        isFetchedShared: false,
      };

    case REMOVE_PIN_SHARED_UNIT.REQUEST:
      return {
        ...state,
        sharedUnits: state.sharedUnits.map((sharedUnit) =>
          sharedUnit.unit.id === action.unitId
            ? { ...sharedUnit, is_pin: false }
            : sharedUnit
        ),
        isFetchingShared: true,
        isFetchedShared: false,
      };
    case REMOVE_PIN_SHARED_UNIT.SUCCESS:
      return {
        ...state,
        isFetchingShared: false,
        isFetchedShared: true,
      };
    case REMOVE_PIN_SHARED_UNIT.FAIL:
      return {
        ...state,
        errorMsg: action.result.message,
        isFetchingShared: false,
        isFetchedShared: false,
      };

    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        units: state.units.slice().filter((unit) => unit.id !== action.unitId),
      };

    case UNITS_MEMBER_DETAIL:
      return {
        ...state,
        sharedUnits: state.sharedUnits.filter(
          (sharedUnit) => sharedUnit.unit.id !== action.unitId
        ),
      };

    case MANAGE_UNIT_SUCCESS:
      return {
        ...state,
        units: state.units.map((unit) =>
          unit.id === action.id
            ? {
                ...unit,
                name: action.data.name,
                background: action.data.background,
              }
            : unit
        ),
      };

    default:
      return state;
  }
};
