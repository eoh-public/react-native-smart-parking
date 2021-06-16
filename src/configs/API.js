import Config from 'react-native-config';

const API_ROOT = Config.API_ROOT;

const API = {
  ACCOUNTS: {
    ADD_CARD: API_ROOT + '/billing/payments/stripe/add_card/',
    REMOVE_CARD: (id) =>
      API_ROOT + `/billing/payments/stripe/remove_cards/${id}/`,
    CHANGE_DEFAULT_CARD: API_ROOT + '/billing/payments/stripe/set_default/',
    LIST_PAYMENT_METHODS: API_ROOT + '/billing/list_payment_methods/',
    CREATE_CARD_TOKEN: 'https://api.stripe.com/v1/tokens',
  },
  EXTERNAL: {
    GOOGLE_MAP: {
      AUTO_COMPLETE:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      GET_LAT_LNG_BY_PLACE_ID:
        'https://maps.googleapis.com/maps/api/place/details/json',
    },
  },
  PARKING: {
    NEARBY: API_ROOT + '/smart_parking/parking_areas/near_me/',
    NEAREST:
      API_ROOT + '/smart_parking/parking_areas/nearest_available_parking/',
    SAVED_LIST: API_ROOT + '/smart_parking/parking_areas/saved_list/',
    SAVE: (id) => API_ROOT + `/smart_parking/parking_areas/${id}/save/`,
    UNSAVE: (id) => API_ROOT + `/smart_parking/parking_areas/${id}/unsave/`,
    DETAIL: (id) => API_ROOT + `/smart_parking/parking_areas/${id}/`,
    GET_BOOKING_PRICE: (id) =>
      API_ROOT + `/smart_parking/parking_areas/${id}/get_price/`,
    AVAILABLE_TIME_SLOTS: (id) =>
      API_ROOT + `/smart_parking/parkings/${id}/available-time-slots/`,
    PAYMENT_SUCCESS: (id) => API_ROOT + `/smart_parking/payment_success/${id}/`,
    CHECK_CAR_PARKED: API_ROOT + '/smart_parking/spots/check_car_parked/',
    PARKING_INFO: API_ROOT + '/smart_parking/spots/parking_info/',
  },
  CAR: {
    MY_CARS: API_ROOT + '/smart_parking/cars/',
    CHECK_CARS_INFO: API_ROOT + '/smart_parking/cars/check_information/',
    REMOVE_CAR: (id) => API_ROOT + `/smart_parking/cars/${id}/`,
    UPDATE: (id) => API_ROOT + `/smart_parking/cars/${id}/`,
    UPDATE_DEFAULT: (id) =>
      API_ROOT + `/smart_parking/cars/${id}/update_default/`,
  },
  BOOKING: {
    CREATE: API_ROOT + '/smart_parking/bookings/',
    DETAIL: (id) => API_ROOT + `/smart_parking/bookings/${id}/`,
    ACTIVE_SESSION: API_ROOT + '/smart_parking/bookings/active_session/',
    HISTORY: (page) =>
      API_ROOT + `/smart_parking/bookings/history/?page=${page}`,
    VIOLATION: (page) =>
      API_ROOT + `/smart_parking/bookings/violation/?page=${page}`,
    SCAN_TO_BOOK: API_ROOT + '/smart_parking/bookings/scan_to_book/',
    SCAN_TO_CONFIRM: API_ROOT + '/smart_parking/bookings/scan_to_confirm/',
    EXTEND_INFO: (id) =>
      API_ROOT + `/smart_parking/bookings/${id}/extend_info/`,
    EXTEND: (id) => API_ROOT + `/smart_parking/bookings/${id}/extend/`,
    CANCEL: (id) => API_ROOT + `/smart_parking/bookings/${id}/cancel/`,
    STOP: (id) => API_ROOT + `/smart_parking/bookings/${id}/stop/`,
    PAY_FINE: (id) => API_ROOT + `/smart_parking/bookings/${id}/pay_fine/`,
  },
  BILLING: {
    LIST_PAYMENT_METHODS_BY_COUNTRY: (code) =>
      API_ROOT + `/billing/list-methods/${code}/`,
    PAYMENT: {
      STRIPE: {
        PROCESS: (id) => API_ROOT + `/billing/payments/stripe/process/${id}/`,
        ADD_CARD: API_ROOT + '/billing/payments/stripe/add_card/',
        CREATE_PAYMENT_INTENT: (id) =>
          API_ROOT + `/billing/payments/stripe/sca/create-payment/${id}/`,
        PAYMENT_INTENT_SUCCESS: (intent_id) =>
          API_ROOT +
          `/billing/payments/stripe/sca/payment_success/${intent_id}/`,
      },
    },
    DEFAULT_PAYMENT_METHODS: API_ROOT + '/billing/default_payment_method/',
  },
  NOTIFICATION: {
    REGISTER_SIGNAL_ID: API_ROOT + '/accounts/register-signal-id/',
    LIST_ALL_NOTIFICATIONS: (page, type) =>
      API_ROOT + `/notifications/notifications/?page=${page}&type=${type}`,
    SET_READ: (id) => API_ROOT + `/notifications/notifications/${id}/set_read/`,
    SET_LAST_SEEN: API_ROOT + '/notifications/notifications/set_last_seen/',
    NUMBER: API_ROOT + '/notifications/notifications/number/',
  },
  PUSHER: {
    AUTH: API_ROOT + '/smart_parking/pusher/auth/',
  },
};

export default API;
