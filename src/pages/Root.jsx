import { Link, Outlet, ScrollRestoration } from "react-router-dom"
// import { getSummaryTrends } from "./loaders"
// import { DesktopNavBar, MobileNavBar } from "./NavBar";
// import { useDeviceWidth } from "./useDeviceWidth";
import { deviceWidthEnum } from "../helpers";
import { DesktopNavBar, LaptopNavBar, MobileNavBar } from "../components/NavBar";
import { useWindowSize } from "@uidotdev/usehooks";
import { Home } from "./Home";
import { useEffect, useRef, useState } from "react";
import Summary from "./Summary";
import { groupData } from "../helpers/loaders";
import Footer from "../components/Footer";
import { SummaryGradientText } from "../components/SummaryText";
import { HelpContent } from "../components/HelpContent";

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

export const Root = () => {
    // const deviceWidth = useDeviceWidth();
    const size = useWindowSize();
    const [data, setData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [resultGroupArray, setResultGroupArray] = useState([]);
    // let resultArray = [];
    // let resultGroupArray = [];
    // let groupedData;

    /*
    useEffect(() => {
        if (data) {
            data.currentStartIndex = data.queries?.request[0]?.startIndex;
            data.nextStartIndex = data.queries?.nextPage[0]?.startIndex;
            // resultArray.push(data);
            setResultArray((prev) => [...prev, data]);
            groupedData = groupData(resultArray);
            resultGroupArray.splice(0, resultGroupArray.length);
            console.log(resultArray);
            console.log(groupedData);
            setResultGroupArray((v) => [...v, groupedData]);
            // setData((res) => { })
            console.log(resultGroupArray);
            data.data = resultGroupArray;
            console.log(data.data);

            // setSummaryData(v => (
            //     { ...v, data }
            // ));
        }
        console.log(summaryData);
        return () => null;
    }, [data]);
    */

    // useEffect(() => {
    //     setSummaryData(data);
    // }, [summaryData]);

    useEffect(() => {
        setData(data);
        console.log("Updating summaryData");
        console.log(data);
    }, [data]);

    return (
        <div className={"relative flex flex-col h-full overflow-y-auto dark:bg-base-300 font-sans"}>
            {
                size?.width <= deviceWidthEnum.laptop
                    ? <div className="drawer flex flex-col justify-start">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content h-screen overflow-y-auto z-[1]">
                            {/* Page content here */}
                            <MobileNavBar setData={setData} />
                            <Summary summary={data} />
                            <Footer />
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <div className="px-3 py-6">Menu</div>
                                <li><a>Bookmarks</a></li>
                                <li><a>Saved</a></li>
                            </ul>
                        </div>
                    </div>
                    : <div className="drawer drawer-end">
                        <input id="desktop-help-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content h-screen overflow-y-auto dark:bg-base-300 z-10">
                            {/* Page content here */}
                            {
                                size?.width <= deviceWidthEnum.desktop
                                    ? <LaptopNavBar setData={setData} />
                                    : <DesktopNavBar setData={setData} />
                            }
                            <Summary summary={data} />
                            <Footer />
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="desktop-help-drawer" className="drawer-overlay"></label>
                            <div className="menu relative py-8 w-96 min-h-full overflow-y-auto bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                {/* <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                                <li></li> */}
                                <HelpContent />
                            </div>
                        </div>
                    </div>
            }
            {/* {
                size?.width < deviceWidthEnum.laptop
                    ? <MobileNavBar />
                    : <DesktopNavBar setData={setData} />
            } */}
            {/* <Summary summary={data} /> */}
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