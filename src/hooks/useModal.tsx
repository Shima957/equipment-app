import { useState, useCallback } from 'react';

export const useModal = () => {
  const [modalState, setModalState] = useState(false);
  const openModal = useCallback(() => setModalState(true), []);
  const closeModal = useCallback(() => setModalState(false), []);

  return { modalState, openModal, closeModal };
};
