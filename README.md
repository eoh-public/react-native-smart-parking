# react-native-smart-parking

## Getting started

`$ npm install react-native-smart-parking --save`

### Mostly automatic installation

`$ react-native link react-native-smart-parking`

## Usage

```javascript
import SmartParking from 'react-native-smart-parking';


export const SmartParkingStack = memo(() => {
  initSPConfig(config);

  ...

  return (
    <SmartParking
      auth={auth}
      onExitApp={onExitApp}
      dataNotification={dataNofitication}
      langTranslate={'en'}
    />
  );
});
```
