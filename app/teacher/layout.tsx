import TeacherLayout from '@/src/layout/TeacherLayout';
import { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <TeacherLayout>{children}</TeacherLayout>;
}

export default Layout;
