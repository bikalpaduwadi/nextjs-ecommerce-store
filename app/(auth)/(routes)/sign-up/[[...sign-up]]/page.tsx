import { FC } from 'react';
import { SignUp } from '@clerk/nextjs';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <SignUp />;
};

export default page;
