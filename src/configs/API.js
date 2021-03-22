import Config from 'react-native-config';

const API_ROOT = Config.API_ROOT;

const API = {
  AUTH: {
    LOGIN_PHONE: API_ROOT + '/accounts/login/',
    LOGIN_FACEBOOK: API_ROOT + '/accounts/login/facebook/',
    REGISTER_PHONE: API_ROOT + '/accounts/register/phone/',
    RESEND_OTP: API_ROOT + '/accounts/register/resend_otp/',
    VERIFY_OTP: API_ROOT + '/accounts/register/verify_otp/',
    LOGIN_SOCIAL_FB: API_ROOT + '/accounts/login/facebook/',
    LOGIN_SOCIAL_GG: API_ROOT + '/accounts/login/google/',
    LOGIN_SOCIAL_AP: API_ROOT + '/accounts/login/apple/',
    FORGOT_PASSWORD: API_ROOT + '/accounts/forgot_password/',
    FORGOT_PASSWORD_VERIFY_OTP:
      API_ROOT + '/accounts/forgot_password/verify_otp/',
    RESET_PASSWORD: API_ROOT + '/accounts/forgot_password/set_password/',
  },
  ACCOUNTS: {
    FEATURES: API_ROOT + '/accounts/features/',
    ADD_CARD: API_ROOT + '/billing/payments/stripe/add_card/',
    REMOVE_CARD: (id) =>
      API_ROOT + `/billing/payments/stripe/remove_cards/${id}/`,
    CHANGE_DEFAULT_CARD: API_ROOT + '/billing/payments/stripe/set_default/',
    LIST_PAYMENT_METHODS: API_ROOT + '/billing/list_payment_methods/',
    CREATE_CARD_TOKEN: 'https://api.stripe.com/v1/tokens',
  },
  UNIT: {
    ADD_USER: API_ROOT + '/property_manager/shared_units/add_by_phone_number/',
    MY_UNITS: API_ROOT + '/property_manager/units/mine/',
    SHARED_UNITS: API_ROOT + '/property_manager/shared_units/',
    UNIT_DETAIL: (id) => API_ROOT + `/property_manager/units/${id}/`,
    UNIT_NEAR_ME: (lat, lon, page) =>
      API_ROOT + `/property_manager/units/near-me/${lat},${lon}/?page=${page}`,
    UNITS_PUBLIC: API_ROOT + '/property_manager/units/public/',
    UNIT_SUMMARY: (id) => API_ROOT + `/property_manager/units/${id}/summary/`,
    UNIT_SUMMARY_DETAIL: (id, id2) =>
      API_ROOT + `/property_manager/units/${id}/summary_detail/${id2}/`,
    FILTER_SHARED_UNITS: (field) =>
      API_ROOT + `/property_manager/shared_units/?ordering=${field}`,
    STAR_UNIT: (id) => API_ROOT + `/property_manager/units/${id}/star/`,
    UNSTAR_UNIT: (id) => API_ROOT + `/property_manager/units/${id}/unstar/`,
    PIN_UNIT: (id) => API_ROOT + `/property_manager/units/${id}/pin/`,
    UNPIN_UNIT: (id) => API_ROOT + `/property_manager/units/${id}/unpin/`,
    MANAGE_UNIT: (id) => API_ROOT + `/property_manager/units/${id}/`,
  },
  SUB_UNIT: {
    REMOVE_SUB_UNIT: (unitId, id) =>
      API_ROOT + `/property_manager/${unitId}/sub_units/${id}/`,
    CREATE_SUB_UNIT: (unitId) =>
      API_ROOT + `/property_manager/${unitId}/sub_units/`,
    MANAGE_SUB_UNIT: (unitId, id) =>
      API_ROOT + `/property_manager/${unitId}/sub_units/${id}/`,
    SENSOR_SCAN: (id) =>
      API_ROOT + `/property_manager/stations/${id}/sensor_scan/`,
  },
  SENSOR: {
    DISPLAY: (id) => API_ROOT + `/property_manager/sensors/${id}/display/`,
    DISPLAY_VALUES: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/display_values/`,
    DISPLAY_VALUES_V2: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/display_values_v2/`,
    DISPLAY_HISTORY: (id, hId) =>
      API_ROOT + `/property_manager/sensors/${id}/display_history/`,
    CAMERA_DISPLAY: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/cameras/`,
    REMOTE_CONTROL_OPTIONS: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/remote_control_options/`,
    QUICK_ACTION: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/quick_action/`,
    CHECK_CONNECTION: (id) =>
      API_ROOT + `/property_manager/sensors/${id}/check_connection/`,
    UPDATE_SENSOR: (unit_id, station_id, id) =>
      API_ROOT +
      `/property_manager/${unit_id}/sub_units/${station_id}/devices/${id}/`,
  },
  CONFIG: {
    DISPLAY_HISTORY: API_ROOT + '/property_manager/configs/display_history/',
  },
  POWER_CONSUME: {
    DISPLAY_HISTORY:
      API_ROOT + '/property_manager/power_consume/display_history/',
  },
  SHARE: {
    UNITS: API_ROOT + '/property_manager/sharing/units/',
    UNIT_PERMISSIONS: (id) =>
      API_ROOT + `/property_manager/sharing/units/${id}/permissions/`,
    UNITS_MEMBERS: (id) =>
      API_ROOT + `/property_manager/sharing/units/${id}/members/`,
    UNITS_MEMBER_DETAIL: (id, shareId) =>
      API_ROOT + `/property_manager/sharing/units/${id}/members/${shareId}/`,
    SHARE: API_ROOT + '/property_manager/sharing/share/',
  },
  EXTERNAL: {
    WEATHER: (location, weatherMapId) =>
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}` +
      `&appid=${weatherMapId}`,
    UV_INDEX: (location, weatherMapId) =>
      `https://api.openweathermap.org/data/2.5/uvi?appid=${weatherMapId}&lat=${location.lat}&lon=${location.lon}`,
    AQI: (location, weatherMapToken) =>
      `https://api.waqi.info/feed/geo:${location.lat};${location.lon}/?token=${weatherMapToken}`,
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
    SCAN_TO_BOOK: API_ROOT + '/smart_parking/bookings/scan_to_book/',
    SCAN_TO_CONFIRM: API_ROOT + '/smart_parking/bookings/scan_to_confirm/',
    EXTEND_INFO: (id) =>
      API_ROOT + `/smart_parking/bookings/${id}/extend_info/`,
    EXTEND: (id) => API_ROOT + `/smart_parking/bookings/${id}/extend/`,
    CANCEL: (id) => API_ROOT + `/smart_parking/bookings/${id}/cancel/`,
    STOP: (id) => API_ROOT + `/smart_parking/bookings/${id}/stop/`,
  },
  EMERGENCY: {
    CONTACTS: API_ROOT + '/emergency_button/contacts/',
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
    NUMBER: API_ROOT + '/notifications/notifications/number/',
  },
  EMERGENCY_BUTTON: {
    CREATE_CONTACT: API_ROOT + '/emergency_button/contacts/',
    CONTACTS: API_ROOT + '/emergency_button/contacts/',
    REMOVE_CONTACTS: (id) => API_ROOT + `/emergency_button/contacts/${id}/`,
    SEND_ALERT: API_ROOT + '/emergency_button/events/',
    NOTIFY_SMS: (id) => API_ROOT + `/emergency_button/events/${id}/notify_sms/`,
    FASLE_ALARM: (id) =>
      API_ROOT + `/emergency_button/events/${id}/false_alarm/`,
    RESOLVE: (id) => API_ROOT + `/emergency_button/events/${id}/resolve/`,
  },
  IOT: {
    CHIP_MANAGER: {
      WATCH_CONFIGS: API_ROOT + '/chip_manager/watch_configs/',
      PUSHER_AUTH: API_ROOT + '/chip_manager/pusher/auth/',
    },
  },
};

export default API;
