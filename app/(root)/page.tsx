'use client';

import { UserButton } from '@clerk/nextjs';

import Modal from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';
import { useEffect } from 'react';

const SetupPage = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className='p-5'>
      {/* <UserButton afterSignOutUrl='/' /> */}
      Root page
    </div>
  );
};

export default SetupPage;
