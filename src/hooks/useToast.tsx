import { useCallback, useState } from 'react';

const useToast = () => {
  const [toastState, setToastState] = useState(false);
  const toggleToast = useCallback(() => {
    setToastState(true);
    setInterval(() => {
      setToastState(false);
    }, 4000);
  }, []);

  const closeToast = useCallback(() => {
    setToastState(false);
  }, []);

  return { toastState, toggleToast, closeToast };
};

export default useToast;
