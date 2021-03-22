import { useCallback, useState, useRef } from 'react';

const usePopover = () => {
  const [showingPopover, setShowingPopover] = useState(false);
  const childRef = useRef(null);

  const showPopoverWithRef = useCallback(
    (ref) => {
      childRef.current = ref.current;
      setShowingPopover(true);
    },
    [childRef]
  );
  const hidePopover = useCallback(() => {
    childRef.current = null;
    setShowingPopover(false);
  }, [childRef]);

  return { childRef, showingPopover, showPopoverWithRef, hidePopover };
};

export default usePopover;
