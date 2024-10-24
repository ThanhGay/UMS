import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MenuAdmin from '@components/common/MenuAdmin';

export const metadata: Metadata = {
  title: 'Admin'
};

function Index(props: PropsWithChildren) {
  const { children } = props;
  return (
    <Layout className="h-screen">
      <MenuAdmin />
      <Content style={{ padding: 32 }}>{children}</Content>
    </Layout>
  );
}

export default Index;
