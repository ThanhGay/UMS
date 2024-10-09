import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Tạo chương trình khung'
};
function Index(props: PropsWithChildren) {
  const { children } = props;
  return <div className="p-8">{children}</div>;
}

export default Index;
