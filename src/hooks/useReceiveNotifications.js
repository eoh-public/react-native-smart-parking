import { useEffect, useState, useCallback } from 'react';
import OneSignal from 'react-native-onesignal';

const useReceiveNotifications = () => {
  const [dataNofitication, setDataNofitication] = useState(null);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const onReceived = useCallback((data) => {
    const { additionalData } = data.payload;
    setDataNofitication(additionalData);
    setShowEmergencyPopup(!!additionalData);
  }, []);

  useEffect(() => {
    OneSignal.addEventListener('received', onReceived);
  }, [onReceived]);

  return { dataNofitication, showEmergencyPopup, setShowEmergencyPopup };
};

export default useReceiveNotifications;
