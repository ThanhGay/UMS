'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  DatabaseOutlined,
  TeamOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

import { useAppDispatch } from '@redux/hooks';
import { logout } from '@redux/features/authSlice';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/admin', icon: <HomeOutlined />, label: 'Trang chủ' },
  {
    key: '/admin/subject',
    icon: <BookOutlined />,
    label: 'Danh sách môn học'
  },
  {
    key: '/admin/class',
    icon: <DesktopOutlined />,
    label: 'Quản lý lớp học phần'
  },
  {
    key: '/admin/teacher',
    icon: <TeamOutlined />,
    label: 'Danh sách giảng viên'
  },
  {
    key: '/admin/chuong-trinh-khung',
    icon: <DatabaseOutlined />,
    label: 'Chương trình khung'
  },
  {
    key: '/admin/schedule',
    icon: <CalendarOutlined />,
    label: 'Thời khóa biểu'
  }
];

const MenuAdmin: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  const handleLogout = async () => {
    dispatch(logout());
    router.push('/login');
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
      />
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        // inlineCollapsed={collapsed}
        onClick={onClick}
        items={items}
      />
      <div className="absolute bottom-5 w-full">
        <Button
          type="primary"
          size="large"
          icon={<PoweroffOutlined />}
          style={{ width: '100%' }}
          onClick={handleLogout}
        >
          {collapsed ? '' : 'Logout'}
        </Button>
      </div>
    </Sider>
  );
};

export default MenuAdmin;
