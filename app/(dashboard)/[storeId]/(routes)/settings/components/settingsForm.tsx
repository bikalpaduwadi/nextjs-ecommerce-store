'use client';

import * as z from 'zod';
import axios from 'axios';
import { FC, useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Store } from '@prisma/client';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { useOrigin } from '@/hooks/useOrigin';
import { Button } from '@/components/ui/button';
import ApiAlert from '@/components/ui/apiAlert';
import { Separator } from '@/components/ui/separator';
import AlertModal from '@/components/modals/alertModal';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface SettingsFormProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm: FC<SettingsFormProps> = ({ store }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const origin = useOrigin();

  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const onSubmit = async (data: SettingsFormValue) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store updated!!');
    } catch (error) {
      toast.error('Something went wrong!!');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted!!');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Mange store preferences' />
        <Button
          size='sm'
          onClick={() => setOpen(true)}
          disabled={loading}
          variant='destructive'
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
};

export default SettingsForm;
