'use client';

import { FC } from 'react';

import Heading from '@/components/ui/heading';
import { OrderColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders ${data.length}`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey='products' />
    </>
  );
};

export default OrderClient;
