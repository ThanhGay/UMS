import StudentLayout from '@/src/layout/StudentLayout';
import { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <StudentLayout>{children}</StudentLayout>;
}

export default Layout;
