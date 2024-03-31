import { NextPage } from 'next';
import { Layout } from '../Layout';
import { PropsWithChildren, ReactElement } from 'react';

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => <Layout>{children}</Layout>;

export const getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;
