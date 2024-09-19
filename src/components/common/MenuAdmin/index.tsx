'use client';

import React, { useState } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  CarryOutOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/admin', icon: <HomeOutlined />, label: 'Trang chủ' },
  {
    key: '/admin/subject',
    icon: <BookOutlined />,
    label: 'Quản lý môn học'
  },
  {
    key: '/admin/class',
    icon: <DesktopOutlined />,
    label: 'Quản lý lớp học phần'
  },
  {
    key: '/admin/schedule',
    icon: <CarryOutOutlined />,
    label: 'Thời khóa biểu'
  }
];

const MenuAdmin: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Sider
      width={250}
      trigger={null}
      collapsed={collapsed}
      style={{ backgroundColor: 'white' }}
    >
      <Button
        type="text"
        onClick={toggleCollapsed}
        style={{
          width: '100%',
          color: 'black',
          paddingLeft: collapsed ? 30 : 25,
          marginBottom: 16,
          justifyContent: 'start',
          backgroundColor: 'white'
        }}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      ></Button>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        // inlineCollapsed={collapsed}
        onClick={onClick}
        items={items}
      />
    </Sider>
  );
};

export default MenuAdmin;
