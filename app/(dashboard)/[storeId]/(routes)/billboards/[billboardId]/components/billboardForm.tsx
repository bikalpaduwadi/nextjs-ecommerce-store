'use client';

import * as z from 'zod';
import axios from 'axios';
import { FC, useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Billboard } from '@prisma/client';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { useOrigin } from '@/hooks/useOrigin';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ui/imageUpload';
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

interface BillboardFormProps {
  billboard: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValue = z.infer<typeof formSchema>;

const BillboardForm: FC<BillboardFormProps> = ({ billboard }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();

  const title = !!billboard ? 'Edit billboard' : 'Create billboard';
  const description = !!billboard ? 'Edit a billboard' : 'Add a new billboard';
  const toastMessage = !!billboard ? 'Billboard updated' : 'Billboard Created';
  const action = !!billboard ? 'Save changes' : 'Create Billboard';

  const form = useForm<BillboardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || { label: '', imageUrl: '' },
  });

  const onSubmit = async (data: BillboardFormValue) => {
    try {
      setLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong!!');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push('/');
      toast.success('Billboard deleted!!');
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this billboard first.'
      );
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
        <Heading title={title} description={description} />
        {!!billboard && (
          <Button
            size='sm'
            onClick={() => setOpen(true)}
            disabled={loading}
            variant='destructive'
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BillboardForm;
