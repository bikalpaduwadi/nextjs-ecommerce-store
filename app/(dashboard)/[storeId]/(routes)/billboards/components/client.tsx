'use client';
import { FC } from 'react';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

interface BillboardClientClientProps {}

const BillboardClient: FC<BillboardClientClientProps> = ({}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className='flex items-center justify-between'>
      <Heading
        title='Billboards (0)'
        description='Manage billboards for your store'
      />
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
        <Plus className='mr-2 h-4 w-4' />
        Add New
      </Button>
    </div>
  );
};

export default BillboardClient;
