import { useState, useCallback } from 'react';

const useModal = () => {
  const [modalState, setModalState] = useState(false);
  const openModal = useCallback(() => setModalState(true), []);
  const closeModal = useCallback(() => setModalState(false), []);

  return { modalState, openModal, closeModal };
};

export default useModal;
