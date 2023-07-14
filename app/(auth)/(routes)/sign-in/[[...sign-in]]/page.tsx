import { FC } from 'react';
import { SignIn } from '@clerk/nextjs';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <SignIn />;
};

export default page;
