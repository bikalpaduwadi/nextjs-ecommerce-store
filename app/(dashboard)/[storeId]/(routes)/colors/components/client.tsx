'use client';

import { FC } from 'react';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading';
import ApiList from '@/components/ui/apiList';
import { Button } from '@/components/ui/button';
import { ColorColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors ${data.length}`}
          description='Manage colors for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
      <Heading title='API' description='API calls for colors' />
      <Separator />
      <ApiList entityName='colors' entityIdName='colorId' />
    </>
  );
};

export default ColorClient;
