'use client';

import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { StyleProvider } from '@ant-design/cssinjs';
import TeacherHeader from '@components/common/Header/TeacherHeader';

function TeacherLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <StyleProvider hashPriority="low">
      <Layout>
        <TeacherHeader />
        <Content style={{ marginTop: 75, height: 'calc(100vh - 75px)' }}>
          <Layout>{children}</Layout>
        </Content>
      </Layout>
    </StyleProvider>
  );
}

export default TeacherLayout;
