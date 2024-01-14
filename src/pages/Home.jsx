import { Link, Outlet, ScrollRestoration } from "react-router-dom"
// import { getSummaryTrends } from "./loaders"
// import { DesktopNavBar, MobileNavBar } from "./NavBar";
// import { useDeviceWidth } from "./useDeviceWidth";
import { deviceWidthEnum } from "../helpers";
import { DesktopNavBar, LaptopNavBar, MobileNavBar } from "../components/NavBar";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import Summary from "./Summary";
import { groupData } from "../helpers/loaders";
import Footer from "../components/Footer";
import { SummaryGradientText } from "../components/SummaryText";
import { HelpContent } from "../components/HelpContent";
import { ContactCard } from "../components/ContactCard";
import InstallPWA from "../components/Install";
import { getSummaryHistoryCache, getSummarySearchCache } from "../context";

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

const Home = () => {
    const size = useWindowSize();
    const [data, setData] = useState(getSummarySearchCache() || []);

    useEffect(() => {
        setData(data);
        // console.log("Updating summaryData");
        // console.log(data);
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
                            <InstallPWA />
                            <Summary summary={data} />
                            <Footer />
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full h-screen bg-gray-100 dark:bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <div className={"flex-1 flex flex-col h-full overflow-y-auto"}>
                                    <div className="px-3 pt-2 pb-6 text-lg font-bold flex flex-row items-center gap-x-4">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                        <span>Search History</span>
                                    </div>
                                    <div className={"flex-1 overflow-y-auto"}>
                                        {
                                            getSummaryHistoryCache().reverse().map((eachHistory, index) => (
                                                // <li key={eachHistory.query + index} className={"flex flex-row py-1"}>
                                                //     <span className={"flex-1"}>{eachHistory.query}</span>
                                                //     {/* <span className={""}>{eachHistory.datetime}</span> */}
                                                // </li>
                                                <div key={eachHistory.query + index} tabIndex={0} className="collapse collapse-arrow bg-base-100 my-1">
                                                    <div className="collapse-title text-base font-medium">
                                                        {eachHistory.query}
                                                    </div>
                                                    <div className="collapse-content px-4">
                                                        <p>You searched <b>{eachHistory.query}</b> at {eachHistory.datetime}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <li><a>Menu</a></li>
                                <li><a>Saved</a></li> */}
                                <div className="relative left-0 bottom-0 mx-auto px-4 w-full flex flex-col justify-between text-left leading-8">
                                    <details className="dropdown dropdown-top w-full">
                                        <summary className="btn btn-ghost btn-block justify-between">
                                            <span className="">Built in 🇳🇬 by Blessed</span>
                                            <span type="button" className="flex justify-center items-center h-10 w-10 text-sm font-semibold rounded-lg bg-base-100 dark:bg-base-100">
                                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                            </span>
                                        </summary>
                                        <div tabIndex={0} className="dropdown-content z-[1] menu w-full my-1 p-1 shadow bg-base-100 dark:bg-base-100 rounded-box">
                                            <ContactCard></ContactCard>
                                            {/* <div className="flex p-4">
                                                <div className="flex-shrink-0 text-warning">
                                                    <svg className="h-5 w-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                                </div>
                                                <div className="ms-4">
                                                    <h3 className="text-gray-800 font-semibold dark:text-white">
                                                        Work in Progress
                                                    </h3>
                                                    <div className="mt-1 text-sm leading-6">
                                                        You will be informed once News is live.
                                                        🙂
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </details>
                                    {/* Built by Blessed */}
                                    {/* <div>Proudly built in 🇳🇬</div> */}
                                </div>
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
                            <InstallPWA />
                            <Summary summary={data} />
                            <Footer />
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="desktop-help-drawer" className="drawer-overlay"></label>
                            <div className="relative py-8 w-96 min-h-full overflow-y-auto bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                {/* <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                                <li></li> */}
                                <HelpContent />
                                <div className="absolute right-10 top-11 bg-base-300/60 dark:bg-neutral rounded-xl">
                                    <button className="w-full mx-auto">
                                        <span className="sr-only">Close</span>
                                        <label htmlFor="desktop-help-drawer" className="flex justify-center btn btn-ghost items-center w-12 h-8 leading-8 text-center">
                                            <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Outlet />
        </div>
    )
}

export default Home;