/* eslint-disable no-undef */
import '../src/utils/I18n/index'; // translation

(function () {
  if (typeof Object.id === 'undefined') {
    let id = 0;

    Object.id = function (o) {
      if (typeof o.__uniqueid === 'undefined') {
        Object.defineProperty(o, '__uniqueid', {
          value: ++id,
          enumerable: false,
          // This could go either way, depending on your
          // interpretation of what an "id" is
          writable: false,
        });
      }

      return o.__uniqueid;
    };
  }
})();

const mockedNavigate = jest.fn();
const mockedReplace = jest.fn();
const mockedUseIsFocused = jest.fn();
mockedUseIsFocused.mockImplementation(() => true);

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      replace: mockedReplace,
    }),
    useIsFocused: mockedUseIsFocused,
  };
});

jest.mock('react-native-alert-async');
