"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, ConfigProvider, Popover, Tabs, TabsProps } from "antd";

import { useAppSelector } from "@redux/hooks";

function Header() {
    const { user } = useAppSelector((state) => state.authState);
    const router = useRouter();

    const itemsTab: TabsProps["items"] = [
        { label: "Trang chủ", key: "home" },
        { label: "Kết quả học tập", key: "result" },
        { label: "Lịch theo tuần", key: "schedule" },
        { label: "Chương trình khung", key: "list" },
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
                    onClick={() => router.push("/")}
                >
                    Đăng xuất
                </div>
            </div>
        );
    };

    return (
        <div className="absolute bg-[#0F30A7] text-white flex items-center justify-around gap-12 w-full px-12"
           
        >
            <div>HUCE</div>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemColor: "white",
                            itemHoverColor: "#bbb",
                            itemActiveColor: "white",
                            itemSelectedColor: "white",
                            inkBarColor: "#0F30A7",
                        },
                    },
                }}
            >
                <Tabs
                    centered
                    size="large"
                    defaultActiveKey="home"
                    items={itemsTab}
                    onChange={(activeKey) => router.push("/"+activeKey)}
                />
            </ConfigProvider>
            <div className="cursor-pointer">
                <Popover trigger="click" content={<PopoverContent />}>
                    <div className="flex items-center gap-3">
                        <Avatar size={36} />
                        <div className="flex flex-col text-sm">
                            <div>Welcome</div>
                            <div className="font-semibold">
                                {user?.fullName}
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default Header;
