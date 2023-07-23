import { FC } from 'react';
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import SizeClient from './components/client';
import { SizeColumn } from './components/columns';

interface SizePageProps {
  params: { storeId: string };
}

const SizePage: FC<SizePageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedSizess: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient data={formattedSizess} />
      </div>
    </div>
  );
};

export default SizePage;
