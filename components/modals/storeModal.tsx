'use client';

import { FC } from 'react';
import Modal from '../ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';

interface StoreModalProps {}

const StoreModal: FC<StoreModalProps> = ({}) => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title='Create store'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      description='Add a new store to manage products and categories'
    >
      Create store form
    </Modal>
  );
};

export default StoreModal;
