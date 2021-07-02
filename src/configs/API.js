import { SPConfig } from './index';

const API = {
  ACCOUNTS: {
    ADD_CARD: () => SPConfig.apiRoot + '/billing/payments/stripe/add_card/',
    REMOVE_CARD: (id) =>
      SPConfig.apiRoot + `/billing/payments/stripe/remove_cards/${id}/`,
    CHANGE_DEFAULT_CARD: () =>
      SPConfig.apiRoot + '/billing/payments/stripe/set_default/',
    LIST_PAYMENT_METHODS: () =>
      SPConfig.apiRoot + '/billing/list_payment_methods/',
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
    NEARBY: () => SPConfig.apiRoot + '/smart_parking/parking_areas/near_me/',
    NEAREST: () =>
      SPConfig.apiRoot +
      '/smart_parking/parking_areas/nearest_available_parking/',
    SAVED_LIST: () =>
      SPConfig.apiRoot + '/smart_parking/parking_areas/saved_list/',
    SAVE: (id) => SPConfig.apiRoot + `/smart_parking/parking_areas/${id}/save/`,
    UNSAVE: (id) =>
      SPConfig.apiRoot + `/smart_parking/parking_areas/${id}/unsave/`,
    DETAIL: (id) => SPConfig.apiRoot + `/smart_parking/parking_areas/${id}/`,
    GET_BOOKING_PRICE: (id) =>
      SPConfig.apiRoot + `/smart_parking/parking_areas/${id}/get_price/`,
    AVAILABLE_TIME_SLOTS: (id) =>
      SPConfig.apiRoot + `/smart_parking/parkings/${id}/available-time-slots/`,
    PAYMENT_SUCCESS: (id) =>
      SPConfig.apiRoot + `/smart_parking/payment_success/${id}/`,
    CHECK_CAR_PARKED: () =>
      SPConfig.apiRoot + '/smart_parking/spots/check_car_parked/',
    PARKING_INFO: () => SPConfig.apiRoot + '/smart_parking/spots/parking_info/',
  },
  CAR: {
    MY_CARS: () => SPConfig.apiRoot + '/smart_parking/cars/',
    CHECK_CARS_INFO: () =>
      SPConfig.apiRoot + '/smart_parking/cars/check_information/',
    REMOVE_CAR: (id) => SPConfig.apiRoot + `/smart_parking/cars/${id}/`,
    UPDATE: (id) => SPConfig.apiRoot + `/smart_parking/cars/${id}/`,
    UPDATE_DEFAULT: (id) =>
      SPConfig.apiRoot + `/smart_parking/cars/${id}/update_default/`,
  },
  BOOKING: {
    CREATE: () => SPConfig.apiRoot + '/smart_parking/bookings/',
    DETAIL: (id) => SPConfig.apiRoot + `/smart_parking/bookings/${id}/`,
    ACTIVE_SESSION: () =>
      SPConfig.apiRoot + '/smart_parking/bookings/active_session/',
    HISTORY: (page) =>
      SPConfig.apiRoot + `/smart_parking/bookings/history/?page=${page}`,
    VIOLATION: (page) =>
      SPConfig.apiRoot + `/smart_parking/bookings/violation/?page=${page}`,
    SCAN_TO_BOOK: () =>
      SPConfig.apiRoot + '/smart_parking/bookings/scan_to_book/',
    SCAN_TO_CONFIRM: () =>
      SPConfig.apiRoot + '/smart_parking/bookings/scan_to_confirm/',
    EXTEND_INFO: (id) =>
      SPConfig.apiRoot + `/smart_parking/bookings/${id}/extend_info/`,
    EXTEND: (id) => SPConfig.apiRoot + `/smart_parking/bookings/${id}/extend/`,
    CANCEL: (id) => SPConfig.apiRoot + `/smart_parking/bookings/${id}/cancel/`,
    STOP: (id) => SPConfig.apiRoot + `/smart_parking/bookings/${id}/stop/`,
    PAY_FINE: (id) =>
      SPConfig.apiRoot + `/smart_parking/bookings/${id}/pay_fine/`,
  },
  BILLING: {
    LIST_PAYMENT_METHODS_BY_COUNTRY: (code) =>
      SPConfig.apiRoot + `/billing/list-methods/${code}/`,
    PAYMENT: {
      STRIPE: {
        PROCESS: (id) =>
          SPConfig.apiRoot + `/billing/payments/stripe/process/${id}/`,
        ADD_CARD: () => SPConfig.apiRoot + '/billing/payments/stripe/add_card/',
        CREATE_PAYMENT_INTENT: (id) =>
          SPConfig.apiRoot +
          `/billing/payments/stripe/sca/create-payment/${id}/`,
        PAYMENT_INTENT_SUCCESS: (intent_id) =>
          SPConfig.apiRoot +
          `/billing/payments/stripe/sca/payment_success/${intent_id}/`,
      },
    },
    DEFAULT_PAYMENT_METHODS: () =>
      SPConfig.apiRoot + '/billing/default_payment_method/',
  },
  NOTIFICATION: {
    REGISTER_SIGNAL_ID: () =>
      SPConfig.apiRoot + '/accounts/register-signal-id/',
    LIST_ALL_NOTIFICATIONS: (page, type) =>
      SPConfig.apiRoot +
      `/notifications/notifications/?page=${page}&type=${type}`,
    SET_READ: (id) =>
      SPConfig.apiRoot + `/notifications/notifications/${id}/set_read/`,
    SET_LAST_SEEN: () =>
      SPConfig.apiRoot + '/notifications/notifications/set_last_seen/',
    NUMBER: () => SPConfig.apiRoot + '/notifications/notifications/number/',
  },
  PUSHER: {
    AUTH: () => SPConfig.apiRoot + '/smart_parking/pusher/auth/',
  },
};

export default API;
