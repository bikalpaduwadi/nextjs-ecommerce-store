'use client';

import React, { FC } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from './dialog';

interface modalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  description: string;
  children: React.ReactNode;
}

const modal: FC<modalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  description,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default modal;
