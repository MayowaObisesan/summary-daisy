import { Outlet, ScrollRestoration } from "react-router-dom"
// import { getSummaryTrends } from "./loaders"
// import { DesktopNavBar, MobileNavBar } from "./NavBar";
// import { useDeviceWidth } from "./useDeviceWidth";
import { deviceWidthEnum } from "../helpers";
import { DesktopNavBar, MobileNavBar } from "../components/NavBar";
import { useWindowSize } from "@uidotdev/usehooks";
import { Home } from "./Home";
import { useEffect, useRef, useState } from "react";
import Summary from "./Summary";
import { groupData } from "../helpers/loaders";

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

export const Root = () => {
    // const deviceWidth = useDeviceWidth();
    const size = useWindowSize();
    const [data, setData] = useState('');
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

    return (
        <div className={"relative flex flex-col h-screen overflow-y-auto dark:bg-base-300 font-sans"}>
            {
                size?.width < deviceWidthEnum.laptop
                    ? <MobileNavBar />
                    : <DesktopNavBar setData={setData} />
            }
            <Summary summary={data} />
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