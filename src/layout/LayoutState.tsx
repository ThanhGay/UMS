import { PropsWithChildren } from "react";

function LayoutState(props: PropsWithChildren) {
    const { children } = props;
    return <div>{children}</div>;
}

export default LayoutState;
