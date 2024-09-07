import SharedLayout from '@/src/layout/SharedLayout';
import { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <SharedLayout>{children}</SharedLayout>;
}

export default Layout;
