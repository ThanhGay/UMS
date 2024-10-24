'use client';

import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { StyleProvider } from '@ant-design/cssinjs';
import StudentHeader from '@components/common/Header/StudentHeader';

function StudentLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <StyleProvider hashPriority="low">
      <Layout>
        <StudentHeader />
        <Content style={{ marginTop: 75 }}>
          <Layout>{children}</Layout>
        </Content>
      </Layout>
    </StyleProvider>
  );
}

export default StudentLayout;
