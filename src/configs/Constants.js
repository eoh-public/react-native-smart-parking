import { Platform, Dimensions, StatusBar } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const FONT_PREFIX = 'SFProDisplay';

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');
export const LANGUAGE = {
  English: { label: 'English (EN)', value: 'en' },
  Vietnamese: { label: 'Tiếng Việt (VN)', value: 'vi' },
  DEFAULT: 'vi',
};

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
      (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT))
  );
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: isIphoneX() ? 40 : 20,
    android: StatusBar.currentHeight,
  });
}

export const BOOKING_STATUS = {
  ON_GOING: '----',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const PARKING_CHARGE_TYPE = {
  FROM_BOOKING_TIME: 'from_booking_time',
  FROM_ARRIVAL_TIME: 'from_arrival_time',
};

export const BLE_REMOTE_SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const BLE_REMOTE_CHARACTERISTIC_UUID =
  'beb5483e-36e1-4688-b7f5-ea07361b26a8';

export const DEEP_LINK = {
  SUCCESS_PAYMENT: 'app://eoh/success-payment',
  NOTIFICATION_SCREEN: 'app://eoh/notifications',
};

export const Constants = {
  paddingTop: getStatusBarHeight(),
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  BOOKING_STATUS,
  PARKING_CHARGE_TYPE,
  LANGUAGE,
  FONT_PREFIX,
  isIphoneX,
  BLE_REMOTE_SERVICE_UUID,
  BLE_REMOTE_CHARACTERISTIC_UUID,
  DEEP_LINK,
};

export const SCANNING_STATUS = {
  BOOKING_ACTIVATED: 'booking_activated',
  WRONG_SPOT: 'wrong_spot',
  AVAILABLE_SPOTS: 'available_spots',
  PARKING_NEAREST: 'parking_nearest',
  NOT_WORKING_FOR_SENSOR_ONLY: 'not_working_for_sensor_only',
  SPOT_DOES_NOT_EXIST: 'Spot does not exist',
  NO_CAR_PARKED_AT_THIS_SPOT: 'No car parked at this spot',
};

export const TESTID = {
  // common
  COMMON_LOADING_ANIMATION: 'COMMON_LOADING_ANIMATION',
  BOTTOM_BUTTON_RIGHT: 'BOTTOM_BUTTON_RIGHT',
  VIEW_BUTTON_BOTTOM_RIGHT_BUTTON: 'VIEW_BUTTON_BOTTOM_RIGHT_BUTTON',
  VIEW_BUTTON_BOTTOM_LEFT_BUTTON: 'VIEW_BUTTON_BOTTOM_LEFT_BUTTON',
  FAST_IMAGE_USER_AVATAR: 'FAST_IMAGE_USER_AVATAR',
  TEXT_STATUS_BUTTOM_TEXT_BOTTOM_VIEW: 'TEXT_STATUS_BUTTOM_TEXT_BOTTOM_VIEW',

  SCROLL_VIEW_TERM_POLICY: 'SCROLL_VIEW_TERM_POLICY',

  // Smart parking drawer
  ROW_EXIT_SMARTPARKING_DRAWER: 'ROW_EXIT_SMARTPARKING_DRAWER',
  ROW_ITEM_SMARTPARKING_DRAWER: 'ROW_ITEM_SMARTPARKING_DRAWER',

  // My Dashboard
  MAP_VIEW: 'MAP_VIEW',
  GUIDE_LINE: 'GUIDE_LINE',
  MARKER_CURRENT_LOCATION: 'MARKER_CURRENT_LOCATION',
  MY_DASHBOARD_MENU: 'MY_DASHBOARD_MENU',
  FEATURE_ITEM: 'FEATURE_ITEM',
  ROW_LOGOUT: 'ROW_LOGOUT',
  TEXT_BUTTON: 'TEXT_BUTTON',
  BUTTON_PRESS_LOCATE: 'BUTTON_PRESS_LOCATE',
  MARKER_SEARCHED: 'MARKER_SEARCHED',
  MARKER_ACTIVE_SESSIONS: 'MARKER_ACTIVE_SESSIONS',
  TERMS_AND_CONDITIONS_CHECKBOX: 'TERMS_AND_CONDITIONS_CHECKBOX',

  // My booking
  ACTIVE_SESSION: 'ACTIVE_SESSION',
  BOOKING_HISTORY: 'BOOKING_HISTORY',

  // Add Payment Card
  CUSTOMER_CARD_NUMBER: 'CUSTOMER_CARD_NUMBER',
  INPUT_CARD_NUMBER: 'INPUT_CARD_NUMBER',
  INPUT_CARD_HOLDER_NAME: 'INPUT_CARD_HOLDER_NAME',
  INPUT_CARD_EXPIRE_DATE: 'INPUT_CARD_EXPIRE_DATE',
  INPUT_CARD_CVV: 'INPUT_CARD_CVV',
  NON_CARD_TYPE: 'NON_CARD_TYPE',
  VISA_CARD_TYPE: 'VISA_CARD_TYPE',
  MASTER_CARD_TYPE: 'MASTER_CARD_TYPE',
  SAVE_CARD_BUTTON: 'SAVE_CARD_BUTTON',
  ADD_CARD_NOTIFY_ERROR: 'ADD_CARD_NOTIFY_ERROR',
  BUTTON_SELECT_VISA: 'BUTTON_SELECT_VISA',
  BUTTON_SELECT_MASTER_CARD: 'BUTTON_SELECT_MASTER_CARD',

  // Map Dashboard
  NAVIGATE_PARKING_INPUT_BUTTON: 'NAVIGATE_PARKING_INPUT_BUTTON',
  PARKING_MARKER: 'PARKING_MARKER',
  BUTTON_SEE_NEARBY_PARKING: 'BUTTON_SEE_NEARBY_PARKING',
  MAP_DASHBOARD_SEARCH_BAR: 'MAP_DASHBOARD_SEARCH_BAR',

  STATUS_BAR_APP: 'STATUS_BAR_APP',

  // Parking Area List
  PARKING_AREA_POPUP: 'PARKING_AREA_POPUP',
  PARKING_AREA_POPUP_ITEM: 'PARKING_AREA_POPUP_ITEM',
  AVAILABLE_SPOT_NUMBER: 'AVAILABLE_SPOT_NUMBER',
  PARKING_PRICE_TEXT: 'PARKING_PRICE_TEXT',
  DISTANCE_TO_PARKING_TEXT: 'DISTANCE_TO_PARKING_TEXT',
  PARKING_TIP_TEXT: 'PARKING_TIP_TEXT',
  BUTTON_BOOK_NOW: 'BUTTON_BOOK_NOW',
  BUTTON_DIRECTIONS: 'BUTTON_DIRECTIONS',
  BUTTON_SAVE_PARKING: 'BUTTON_SAVE_PARKING',

  // Parking area detail
  PARKING_DETAIL_TOUCH_DIRECTION: 'PARKING_DETAIL_TOUCH_DIRECTION',
  PARKING_DETAIL_TOUCH_BOOKMARK: 'PARKING_DETAIL_TOUCH_BOOKMARK',
  PARKING_DETAIL_STATUS_BAR: 'PARKING_DETAIL_STATUS_BAR',
  PARKING_DETAIL_SPOTS_AVAILABLE: 'PARKING_DETAIL_SPOTS_AVAILABLE',
  PARKING_DETAIL_DISTANCE: 'PARKING_DETAIL_DISTANCE',
  PARKING_DETAIL_BUTTON_SAVE_VEHICLE: 'PARKING_DETAIL_BUTTON_SAVE_VEHICLE',
  TOUCHABLE_CHECK_BOX: 'TOUCHABLE_CHECK_BOX',
  PARKING_DETAIL_CHANGE_SPOT: 'PARKING_DETAIL_CHANGE_SPOT',

  // Booking detail
  HEADER_BOOKING_DETAILS: 'HEADER_BOOKING_DETAILS',
  NUMBER_OF_HOUR_PARKING: 'NUMBER_OF_HOUR_PARKING',
  DETAIL_PARKING_INFO_VIOLATION_RATE: 'DETAIL_PARKING_INFO_VIOLATION_RATE',
  DETAIL_PARKING_INFO_VIOLATION_FEE: 'DETAIL_PARKING_INFO_VIOLATION_FEE',
  PAY_AT: 'PAY_AT',
  BOOKING_DETAIL_TEST_STATUS: 'BOOKING_DETAIL_TEST_STATUS',
  ARRIVE_AT: 'ARRIVE_AT',
  LEAVE_AT: 'LEAVE_AT',

  ON_CHECK_SPOT_NUMBER: 'ON_CHECK_SPOT_NUMBER',
  ON_BOOK_NOW: 'ON_BOOK_NOW',
  SPOT_INPUT_0: 'SPOT_INPUT_0',
  SPOT_INPUT_FOCUS: 'SPOT_INPUT_FOCUS',
  HOUR: 'HOUR',
  ARRIVE_ITEM: 'ARRIVE_ITEM',
  MINUS: 'MINUS',
  PLUS: 'PLUS',
  PRESS_CAR: 'PRESS_CAR',
  BOTTOM_VIEW_MAIN: 'BOTTOM_VIEW_MAIN',
  BOTTOM_VIEW_SECONDARY: 'BOTTOM_VIEW_SECONDARY',
  EXTEND_TOTAL_PRICE: 'EXTEND_TOTAL_PRICE',
  MODAL_BUTTON_POPUP: 'MODAL_BUTTON_POPUP',
  ITEM_TEXT_INPUT: 'ITEM_TEXT_INPUT',
  ITEM_TEXT_ERROR: 'ITEM_TEXT_ERROR',
  SEARCH_BAR_INPUT: 'SEARCH_BAR_INPUT',

  // Parking input maunaly spot
  PARKING_SPOT_INFO_BUTTON: 'PARKING_SPOT_INFO_BUTTON',
  PARKING_SPOT_CONFIRM_SPOT: 'PARKING_SPOT_CONFIRM_SPOT',
  PARKING_SPOT_INPUT: 'PARKING_SPOT_INPUT',
  PARKING_SPOT_BUTTON_POPUP: 'PARKING_SPOT_BUTTON_POPUP',
  PARKING_SPOT_MODAL_INFO: 'PARKING_SPOT_MODAL_INFO',
  PARKING_SPOT_TEXT_RESULT: 'PARKING_SPOT_TEXT_RESULT',
  PARKING_INPUT_MANUALLY_PARKING_SPOT: 'PARKING_INPUT_MANUALLY_PARKING_SPOT',
  PARKING_INPUT_MANUALLY_ENTER_PARKING_SPOT:
    'PARKING_INPUT_MANUALLY_ENTER_PARKING_SPOT',
  PARKING_INPUT_MANUALLY_QUESTION_ICON: 'PARKING_INPUT_MANUALLY_QUESTION_ICON',
  PARKING_INPUT_MANUALLY_PARKING_AREA_TEXT:
    'PARKING_INPUT_MANUALLY_PARKING_AREA_TEXT',
  PARKING_INPUT_MANUALLY_PARKING_ADDRESS:
    'PARKING_INPUT_MANUALLY_PARKING_ADDRESS',
  PARKING_INPUT_MANUALLY_GO_NEXT_ICON: 'PARKING_INPUT_MANUALLY_GO_NEXT_ICON',
  PARKING_INPUT_MANUALLY_SCAN_QR_CODE_NOTE:
    'PARKING_INPUT_MANUALLY_SCAN_QR_CODE_NOTE',
  PARKING_INPUT_MANUALLY_SCAN_QR_CODE_BUTTON:
    'PARKING_INPUT_MANUALLY_SCAN_QR_CODE_BUTTON',
  PARKING_INPUT_MANUALLY_SCAN_QR_CODE_TEXT:
    'PARKING_INPUT_MANUALLY_SCAN_QR_CODE_TEXT',
  PARKING_INPUT_MANUALLY_QUESTION_TEXT: 'PARKING_INPUT_MANUALLY_QUESTION_TEXT',

  // extend
  EXTEND_TOTAL_VIOLATION_FEE: 'EXTEND_TOTAL_VIOLATION_FEE',
  EXTEND_EXTEND_FEE: 'EXTEND_EXTEND_FEE',
  EXTEND_TOTAL_FEE: 'EXTEND_TOTAL_FEE',

  // SCAN QR CODE
  SCAN_QR_CODE_SPOT: 'SCAN_QR_CODE_SPOT',
  SCANNING_RESPONSE_TITLE: 'SCANNING_RESPONSE_TITLE',
  SCANNING_RESPONSE_DESCRIPTION: 'SCANNING_RESPONSE_DESCRIPTION',
  SCANNING_RESPONSE_SUB_TITLE: 'SCANNING_RESPONSE_SUB_TITLE',
  SCANNING_RESPONSE_DATA: 'SCANNING_RESPONSE_DATA',
  SCANNING_RESPONSE_INFO: 'SCANNING_RESPONSE_INFO',
  SCANNING_RESPONSE_BUTTON_RIGHT: 'SCANNING_RESPONSE_BUTTON_RIGHT',
  SCANNING_RESPONSE_BUTTON_LEFT: 'SCANNING_RESPONSE_BUTTON_LEFT',

  MENU_ACTION_LIST_TOUCHABLE: 'MENU_ACTION_LIST_TOUCHABLE',

  TIME_COUNT_DOWN_TEXT: 'TIME_COUNT_DOWN_TEXT',
  PRESS_BACK_MAP: 'PRESS_BACK_MAP',
  PRESS_BOOKING_DETAIL: 'PRESS_BOOKING_DETAIL',
  TEXT_PAY_CONFIRM: 'TEXT_PAY_CONFIRM',
  TEXT_HOUR_UNIT: 'TEXT_HOUR_UNIT',
  TAB_HEADER_2: 'TAB_HEADER_2',

  LEFT_TEXT_ROW_TIME_PARKING: 'LEFT_TEXT_ROW_TIME_PARKING',
  RIGHT_TEXT_ROW_TIME_PARKING: 'RIGHT_TEXT_ROW_TIME_PARKING',
  BUTTON_TEXT_BOTTOM_LEFT: 'BUTTON_TEXT_BOTTOM_LEFT',
  BUTTON_TEXT_BOTTOM_RIGHT: 'BUTTON_TEXT_BOTTOM_RIGHT',
  ACTIVE_SESSION_ITEM: 'ACTIVE_SESSION_ITEM',
  ACTIVE_SESSION_BUTTON_BOTTOM: 'ACTIVE_SESSION_BUTTON_BOTTOM',

  ITEM_PAYMENT_METHOD: 'ITEM_PAYMENT_METHOD',
  ITEM_PAYMENT_METHOD_CHECKBOX: 'ITEM_PAYMENT_METHOD_CHECKBOX',

  BACK_DEFAULT_TOUCH: 'BACK_DEFAULT_TOUCH',

  SENSOR_CONNECTED_STATUS: 'SENSOR_CONNECTED_STATUS',

  // Vehicle management
  ITEM_VEHICLE: 'ITEM_VEHICLE',
  ON_PLUS_VEHICLE: 'ON_PLUS_VEHICLE',
  ON_MORE_VEHICLE: 'ON_MORE_VEHICLE',
  VEHICLE_MENU_ACTION_MORE: 'VEHICLE_MENU_ACTION_MORE',
  NOTE_EMPTY_VEHICLE: 'NOTE_EMPTY_VEHICLE',

  // Add Vehicle
  ADD_VEHICLE_TAKE_PHOTO: 'ADD_VEHICLE_TAKE_PHOTO',
  ADD_VEHICLE_IMAGE_PICKER: 'ADD_VEHICLE_IMAGE_PICKER',
  ADD_VEHICLE_SEATS_DROPDOWN: 'ADD_VEHICLE_SEATS_DROPDOWN',
  ADD_VEHICLE_DEFAULT_CAR: 'ADD_VEHICLE_DEFAULT_CAR',
  ADD_VEHICLE_BUTTON_SAVE: 'ADD_VEHICLE_BUTTON_SAVE',
  ADD_VEHICLE_BUTTON_DELETE: 'ADD_VEHICLE_BUTTON_DELETE',
  ADD_VEHICLE_MODAL_DELETE: 'ADD_VEHICLE_MODAL_DELETE',
  INPUT_PLATE_NUMBER: 'INPUT_PLATE_NUMBER',

  // Map Dashboard
  MAP_DASHBOARD_VIEW: 'MAP_DASHBOARD_VIEW',

  // SearchBar
  BUTTON_MENU_SMARTPARKING: 'BUTTON_MENU_SMARTPARKING',
  BUTTON_SEARCH_PARKING: 'BUTTON_SEARCH_PARKING',
  BUTTON_NOTI_PARKING: 'BUTTON_NOTI_PARKING',
  SEARCH_LOCATION_ROW_ITEM: 'SEARCH_LOCATION_ROW_ITEM',
  SEARCH_BAR_BUTTON_LEFT: 'SEARCH_BAR_BUTTON_LEFT',
  SEARCH_BAR_BUTTON_RIGHT: 'SEARCH_BAR_BUTTON_RIGHT',
  SEARCH_BAR_KM_TEXT: 'SEARCH_BAR_KM_TEXT',
  SEARCH_BAR_FORMAT_ADDRESS: 'SEARCH_BAR_FORMAT_ADDRESS',
  TEXT_SEARCH_DESCRIPTION: 'TEXT_SEARCH_DESCRIPTION',

  // Group Checkbox Parking Detail
  GROUP_CHECK_BOX_PARKING_DETAIL: 'GROUP_CHECK_BOX_PARKING_DETAIL',

  PREFIX: {
    BUTTON_POPUP: 'BUTTON_POPUP',
    ALERT_CANCEL: 'ALERT_CANCEL',
    ADD_VEHICLE: 'ADD_VEHICLE',
  },

  TOUCHABLE_ACTION_ADD_MORE: 'TOUCHABLE_ACTION_ADD_MORE',

  // Header Unit
  HEADER_UNIT_BUTTON_BACK: 'HEADER_UNIT_BUTTON_BACK',
  HEADER_UNIT_BUTTON_ADD: 'HEADER_UNIT_BUTTON_ADD',
  HEADER_UNIT_BUTTON_MORE: 'HEADER_UNIT_BUTTON_MORE',

  // Display Checking
  LOADING_MESSAGE: 'LOADING_MESSAGE',
  LOADING_MESSAGE_WITH_MODAL: 'LOADING_MESSAGE_WITH_MODAL',

  // Saved parking areas
  TOUCH_SAVED_PARKING: 'TOUCH_SAVED_PARKING',
  SAVED_PARKING_BUTTON: 'SAVED_PARKING_BUTTON',

  // Payment
  PAYMENT_ON_PLUS: 'PAYMENT_ON_PLUS',
  PAYMENT_ON_MORE: 'PAYMENT_ON_MORE',

  // Notifications
  NOTIFICATION_CONTENT: 'NOTIFICATION_CONTENT',
};

export const SPOT_STATUS_CHECK_CAR = {
  MOVE_CAR_TO_SPOT: 'MOVE_CAR_TO_SPOT',
  THIS_SPOT_HAVE_BOOKED: 'THIS_SPOT_HAVE_BOOKED',
  YOU_ARE_IN_VIOLATION_BOOKING: 'YOU_ARE_IN_VIOLATION_BOOKING',
  THERE_IS_CAR_PARKED: 'THERE_IS_CAR_PARKED',
};

export const NOTIFICATION_TYPES = {
  REMIND_TO_MAKE_PAYMENT: 'REMIND_TO_MAKE_PAYMENT',
  EXPIRE_PARKING_SESSION: 'EXPIRE_PARKING_SESSION',
  REMIND_TO_SCAN_QR_CODE: 'REMIND_TO_SCAN_QR_CODE',
  USER_CANCEL: 'USER_CANCEL',
  SYSTEM_CANCEL_NO_PAYMENT: 'SYSTEM_CANCEL_NO_PAYMENT',
  BOOKING_SUCCESSFULLY: 'BOOKING_SUCCESSFULLY',
  PARKING_COMPLETED: 'PARKING_COMPLETED',
  BOOKING_EXPIRED_AND_VIOLATION_CREATED:
    'BOOKING_EXPIRED_AND_VIOLATION_CREATED',
  MOVE_CAR_WITHOUT_PAY_VIOLATION: 'MOVE_CAR_WITHOUT_PAY_VIOLATION',
  PAY_FINE_SUCCESSFULLY: 'PAY_FINE_SUCCESSFULLY',
  PAY_FINE_AND_EXTEND_SUCCESSFULLY: 'PAY_FINE_AND_EXTEND_SUCCESSFULLY',
  STOP_VIOLATION_FREE_PARKING_ZONE: 'STOP_VIOLATION_FREE_PARKING_ZONE',
  PARKING_COMPLETED_DUE_TO_CAR_LEAVE: 'PARKING_COMPLETED_DUE_TO_CAR_LEAVE',
};

export const BOOKING_TYPE = {
  FULL: 'parking_is_full',
  FREE: 'parking_is_free',
};
