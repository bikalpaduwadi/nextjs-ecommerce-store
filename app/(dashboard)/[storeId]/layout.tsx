import React, { FC } from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import Navbar from '@/components/navbar';

interface DashboardLayoutProps {
  params: { storeId: string };
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  params,
  children,
}) => {
  1;
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
