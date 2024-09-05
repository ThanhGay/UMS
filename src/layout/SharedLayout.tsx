import Header from "@components/common/Header";
import { PropsWithChildren } from "react";

function SharedLayout(props: PropsWithChildren) {
    const { children } = props;
    return (
        <div className="flex flex-col h-screen relative">
            <Header />
            <div className="mt-[70px]">{children}</div>
        </div>
    );
}

export default SharedLayout;
