import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Quản lý lớp học phần'
};
function Index(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default Index;
