'use client';

import * as z from 'zod';
import axios from 'axios';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '../ui/modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useStoreModal } from '@/hooks/useStoreModal';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from '../ui/form';

const formSchema = z.object({
  name: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface StoreModalProps {}

const StoreModal: FC<StoreModalProps> = ({}) => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      // toast.success('Store created.');
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong!!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create store'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      description='Add a new store to manage products and categories'
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-commerce'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  disabled={loading}
                  variant='outline'
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
