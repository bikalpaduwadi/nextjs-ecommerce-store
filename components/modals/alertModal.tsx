'use client';

import { FC, useEffect, useState } from 'react';

import Modal from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Are you sure ?'
      description='This action cannot be undone'
    >
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
