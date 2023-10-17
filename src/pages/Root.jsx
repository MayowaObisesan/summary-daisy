import { Outlet, ScrollRestoration } from "react-router-dom"
// import { getSummaryTrends } from "./loaders"
// import { DesktopNavBar, MobileNavBar } from "./NavBar";
// import { useDeviceWidth } from "./useDeviceWidth";
import { deviceWidthEnum } from "../helpers";
import { DesktopNavBar, MobileNavBar } from "../components/NavBar";
import { useWindowSize } from "@uidotdev/usehooks";
import { Home } from "./Home";

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

export const Root = () => {
    // const deviceWidth = useDeviceWidth();
    const size = useWindowSize();

    return (
        <div className={"relative flex flex-col h-screen overflow-y-auto dark:bg-base-300 font-sans"}>
            {
                size?.width < deviceWidthEnum.laptop
                    ? <MobileNavBar />
                    : <DesktopNavBar />
            }
            <Home />
            <Outlet />
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
        </div>
    )
}