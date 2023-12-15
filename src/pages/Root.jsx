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
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
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
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <div className="menu relative py-8 w-96 min-h-full overflow-y-auto bg-base-200 text-base-content">
                                <div className="my-4">
                                    <header className="flex flex-row items-center px-4">
                                        <span className="flex-1 font-bold text-3xl">Help</span>
                                        <div class="flex-shrink-0">
                                            <svg class="flex-shrink-0 h-6 w-6 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </header>
                                </div>
                                <div className="px-4 py-6 space-y-4 leading-6">
                                    <header className="font-semibold text-lg text-gray-400">What is <SummaryGradientText />?</header>
                                    <div>
                                        Summary is a platform that summarizes your search results in real-time.
                                    </div>
                                    <div>
                                        It performs your search and returns a summary of each website from your search.
                                    </div>
                                    <div>Summary leverages search engines to generate search results and and summary those results real-time</div>
                                    <div>
                                        Works like a search engine like google search, <strong>but it reads each search result and returns a bullet summary of each of the website that was returned from your search.</strong>
                                    </div>
                                    <Link to={"/about"} className="flex items-center space-x-2 font-bold">
                                        <span>Read more here</span>
                                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </Link>
                                </div>
                                <li></li>
                                <section className="my-8 px-4 space-y-4">
                                    <header className="font-bold text-xl">
                                        Other info
                                    </header>
                                    <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                                        <input type="radio" name="my-accordion-2" />
                                        <div className="collapse-title text-xl font-medium">
                                            Blog
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-gray-600">Coming soon</p>
                                        </div>
                                    </div>
                                    <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                                        <input type="radio" name="my-accordion-2" />
                                        <div className="collapse-title text-xl font-medium">
                                            Roadmap
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-gray-600">Coming soon</p>
                                        </div>
                                    </div>
                                    <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                                        <input type="radio" name="my-accordion-2" />
                                        <div className="collapse-title text-xl font-medium">
                                            Contact
                                        </div>
                                        <div className="collapse-content">
                                            <div className="text-gray-800 dark:text-gray-400">
                                                Developed by: Mayowa Obisesan
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Sidebar content here */}
                                {/* <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                                <li></li> */}
                                <div className="fixed left-0 bottom-0 mx-auto w-full flex flex-col text-center overflow-hidden leading-8">
                                    Built by Mayowa Obisesan
                                </div>
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