'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, ConfigProvider, Popover, Tabs, TabsProps } from 'antd';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { logout } from '@redux/features/authSlice';

function TeacherHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authState);
  const router = useRouter();
  const pathname = usePathname();

  const itemsTab: TabsProps['items'] = [
    { label: 'Trang chủ', key: '/teacher/home' },
    { label: 'Lịch theo tuần', key: '/teacher/weekly-schedule' }
  ];

  const PopoverContent = () => {
    return (
      <div className="flex flex-col cursor-pointer text-black">
        <Link
          className="hover:bg-amber-200 p-2 text-black hover:text-black"
          href="#"
        >
          Thông tin cá nhân
        </Link>
        <div className="hover:bg-amber-200 p-2">Đổi mật khẩu</div>
        <div
          className="hover:bg-amber-200 p-2"
          onClick={() => {
            dispatch(logout());
            router.push('/');
          }}
        >
          Đăng xuất
        </div>
      </div>
    );
  };

  return (
    <div className="absolute bg-[#1634a9] text-white flex items-center justify-around gap-12 w-full px-12">
      {/* Logo */}
      <div
        className="cursor-pointer"
        onClick={() => router.push('/teacher/home')}
      >
        HUCE
      </div>

      {/* Tab menu */}
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: 'white',
              itemHoverColor: '#bbb',
              itemActiveColor: 'white',
              itemSelectedColor: 'white',
              inkBarColor: '#0F30A7'
            }
          }
        }}
      >
        <Tabs
          centered
          size="large"
          defaultActiveKey={pathname}
          activeKey={pathname}
          items={itemsTab}
          onChange={(activeKey) => router.push(activeKey)}
        />
      </ConfigProvider>

      {/* Account information */}
      <div className="cursor-pointer">
        <Popover trigger="click" content={<PopoverContent />}>
          <div className="flex items-center gap-5">
            <Avatar
              src={process.env.HIEU_URL + user?.urlImage}
              style={{ boxShadow: '0 4px 20px lightblue' }}
              size={36}
            />
            <div className="flex flex-col text-sm">
              <div>Welcome</div>
              <div className="font-semibold">{user?.tenGiangVien}</div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default TeacherHeader;
