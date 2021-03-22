import { useState } from 'react';

const usePayment = () => {
  const [isPayNow, setIsPayNow] = useState(true);

  return {
    isPayNow,
    setIsPayNow,
  };
};

export { usePayment };
