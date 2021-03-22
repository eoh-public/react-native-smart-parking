import { useState, useMemo } from 'react';

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const { setTrue, setFalse } = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
    }),
    []
  );

  return [value, setTrue, setFalse];
};

export default useBoolean;
