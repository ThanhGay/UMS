import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Thông tin lớp học'
};
function Index(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default Index;
