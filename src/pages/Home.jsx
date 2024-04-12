import {Link, Outlet} from "react-router-dom"
// import { getSummaryTrends } from "./loaders"
// import { DesktopNavBar, MobileNavBar } from "./NavBar";
// import { useDeviceWidth } from "./useDeviceWidth";
import {deviceWidthEnum} from "../helpers";
import {DesktopNavBar, LaptopNavBar, MobileNavBar} from "../components/NavBar";
import {useWindowSize} from "@uidotdev/usehooks";
import {useEffect, useState} from "react";
import Summary from "./Summary";
import Footer, {EmptyPageFooter} from "../components/Footer";
import {HelpContent} from "../components/HelpContent";
import {ContactCard} from "../components/ContactCard";
import InstallPWA from "../components/Install";
import {getSummaryHistoryCache, getSummarySearchCache} from "../context";
import {SummaryGradientText} from "../components/SummaryText";
import {SummaryImage} from "../assets/images";

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

    if (true) {
        return (
            <section className={"relative block w-full h-dvh dark:bg-base-300 overflow-hidden"}>
                <section className={"flex flex-col justify-start items-center"}>
                    <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
                        <div
                            className="bg-gradient-to-r from-green-300/50 to-yellow-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-green-900/50 dark:to-yellow-900"></div>
                        <div
                            className="bg-gradient-to-tl from-yellow-50/80 via-yellow-100/60 to-yellow-50/60 lg:from-yellow-50 lg:via-yellow-100 lg:to-yellow-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-green-900/40 dark:via-green-900/50 dark:to-yellow-900/60 dark:lg:from-green-900/70 dark:lg:via-green-900/70 dark:lg:to-yellow-900/70"></div>
                    </div>
                    <div
                        className="relative overflow-hidden before:absolute before:-top-40 before:opacity-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:hue-rotate-180 before:bg-blend-normal before:bg-no-repeat before:bg-top before:size-full before:z-[0] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
                        <div className={"flex flex-col justify-start items-center gap-x-4 w-full px-4 pt-24"}>
                            <SummaryImage width={48} height={48} />
                            {/*<SummaryGradientText classes={"font-bold text-xl"} />*/}
                            <div className={"font-bold text-xl dark:text-gray-200"}>Summary</div>
                        </div>
                        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
                            <div className="mt-5 max-w-full lg:max-w-4xl text-center mx-auto">
                                {/*<div className={"my-8"}>*/}
                                {/*    <SummaryGradientText />*/}
                                {/*</div>*/}
                                <h1 className="block font-bold text-gray-800 text-3xl md:text-5xl lg:text-6xl dark:text-gray-200">
                                    Supercharge your {" "}
                                    <SummaryGradientText
                                        text={"Search"}
                                        classes={"inline-block"}/> Experience
                                    with <SummaryGradientText text={"AI"} classes={"inline-block"}/>
                                </h1>
                            </div>

                            <div className="mt-5 max-w-3xl text-center mx-auto">
                                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400">
                                    Summary is a search platform which utilizes AI to improve search
                                </p>
                            </div>

                            <div className="hidden justify-center">
                                <div
                                    className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400">
                                    Explore the Capital Product
                                    <span className="flex items-center gap-x-1">
                                        <span
                                            className="border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500 dark:border-gray-700">Explore</span>
                                        <svg className="flex-shrink-0 size-4 text-blue-600"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round"
                                             stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                    </span>
                                </div>
                            </div>

                            <Link to={"/search"}
                                  className="relative mt-16 gap-3 flex flex-row justify-center items-center max-w-2xl mx-auto">
                                <input placeholder={"Search here to get started"}
                                       className={"input input-lg input-ghost w-full text-base bg-gray-200/60 dark:bg-base-200 border-0 rounded-box focus:outline-0 cursor-pointer"}
                                       readOnly={true}/>
                                <Link to={"/search"}
                                      className="absolute right-4 inline-flex justify-center items-center gap-x-3 size-12 text-center border-0 border-transparent text-black text-sm font-medium rounded-full py-3 px-4 dark:focus:ring-offset-gray-800"
                                      href="#">
                                    {/*<svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16"*/}
                                    {/*     height="16" fill="currentColor" viewBox="0 0 16 16">*/}
                                    {/*    <path*/}
                                    {/*        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>*/}
                                    {/*</svg>*/}
                                    {/*Continue to Search*/}
                                    <span
                                        className="fa fa-search bg-clip-text bg-gradient-to-r from-[#27CE8E] to-[#FFDE52] text-transparent"></span>
                                </Link>
                            </Link>

                            <div className={"hidden flex-row justify-center gap-x-4"}>
                                <button type="button"
                                        className="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"/>
                                        <path d="M12 5v14"/>
                                    </svg>
                                    Link-sm
                                </button>
                                <button type="button"
                                        className="py-2 px-3 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"/>
                                        <path d="M12 5v14"/>
                                    </svg>
                                    Link
                                </button>
                                <button type="button"
                                        className="py-2.5 px-3 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"/>
                                        <path d="M12 5v14"/>
                                    </svg>
                                    Link-lg
                                </button>
                            </div>

                            <div className={"hidden"}>
                                <ul className="text-sm text-gray-600">
                                    <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                                        FAQ
                                    </li>
                                    <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                                        License
                                    </li>
                                    <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                                        Terms & Conditions
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
                <section className={"fixed bottom-0 w-full"}>
                    <EmptyPageFooter />
                </section>
            </section>
        )
    }

    return (
        <div className={"relative flex flex-col h-full overflow-y-auto dark:bg-base-300 font-sans"}>
            {
                size?.width <= deviceWidthEnum.laptop
                    ? <div className="drawer flex flex-col justify-start">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content h-screen overflow-y-auto z-[1]">
                            {/* Page content here */}
                            <MobileNavBar setData={setData}/>
                            <InstallPWA/>
                            <Summary summary={data}/>
                            <Footer/>
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full h-screen bg-gray-100 dark:bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <div className={"flex-1 flex flex-col h-full overflow-y-auto"}>
                                    <div className="px-3 pt-2 pb-6 text-lg font-bold flex flex-row items-center gap-x-4">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                        </svg>
                                        <span>Search History</span>
                                    </div>
                                    <div className={"flex-1 overflow-y-auto"}>
                                        {
                                            getSummaryHistoryCache().reverse().map((eachHistory, index) => (
                                                // <li key={eachHistory.query + index} className={"flex flex-row py-1"}>
                                                //     <span className={"flex-1"}>{eachHistory.query}</span>
                                                //     {/* <span className={""}>{eachHistory.datetime}</span> */}
                                                // </li>
                                                <div key={eachHistory.query + index} tabIndex={0}
                                                     className="collapse collapse-arrow bg-base-100 dark:bg-base-100 my-1">
                                                    <div className="collapse-title text-base font-medium">
                                                        {eachHistory.query}
                                                    </div>
                                                    <div className="collapse-content px-4">
                                                        <p>You searched <b>{eachHistory.query}</b> at {eachHistory.datetime}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <li><a>Menu</a></li>
                                <li><a>Saved</a></li> */}
                                <div
                                    className="relative left-0 bottom-0 mx-auto px-4 w-full flex flex-col justify-between text-left leading-8">
                                    <details className="dropdown dropdown-top w-full">
                                        <summary className="btn btn-ghost btn-block justify-between">
                                            <span className="">Built in 🇳🇬 by Blessed</span>
                                            <span type="button"
                                                  className="flex justify-center items-center h-10 w-10 text-sm font-semibold rounded-lg bg-base-100 dark:bg-base-100">
                                                <svg className="flex-shrink-0 w-4 h-4"
                                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path
                                                    d="m18 15-6-6-6 6"/></svg>
                                            </span>
                                        </summary>
                                        <div tabIndex={0}
                                             className="dropdown-content z-[1] menu w-full my-1 p-1 shadow bg-base-100 dark:bg-base-100 rounded-box">
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
                        <input id="desktop-help-drawer" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content h-screen overflow-y-auto dark:bg-base-300 z-10">
                            {/* Page content here */}
                            {
                                size?.width <= deviceWidthEnum.desktop
                                    ? <LaptopNavBar setData={setData}/>
                                    : <DesktopNavBar setData={setData}/>
                            }
                            <InstallPWA/>
                            <Summary summary={data}/>
                            <Footer/>
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="desktop-help-drawer" className="drawer-overlay"></label>
                            <div className="relative py-8 w-96 min-h-full overflow-y-auto bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                {/* <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                                <li></li> */}
                                <HelpContent/>
                                <div className="absolute right-10 top-11 bg-base-300/60 dark:bg-neutral rounded-xl">
                                    <button className="w-full mx-auto">
                                        <span className="sr-only">Close</span>
                                        <label htmlFor="desktop-help-drawer"
                                               className="flex justify-center btn btn-ghost items-center w-12 h-8 leading-8 text-center">
                                            <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M18 6 6 18"/>
                                                <path d="m6 6 12 12"/>
                                            </svg>
                                        </label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Outlet/>
        </div>
    )
}

export default Home;