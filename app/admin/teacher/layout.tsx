import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Danh sách giảng viên'
};
function Index(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default Index;
