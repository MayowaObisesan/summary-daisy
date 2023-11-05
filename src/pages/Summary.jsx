import { Form, useLoaderData, useSearchParams } from "react-router-dom";
// import { dummySummary, getSummary } from "./loaders";
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";
// import { useDeviceWidth } from "./useDeviceWidth";
// import { MobileSummaryFormComponent } from "./components/SummaryForm";
import { useWindowSize } from "@uidotdev/usehooks";
import { deviceWidthEnum } from "../helpers";
import { dummySummary, getSummary, groupData } from "../helpers/loaders";
import { SummaryGroup, SummaryGroupItem, SummarySingleItem } from "../components/SummaryItem";
import { useSummaryContext } from "../context";
import Footer from "../components/Footer";
import { handleSummaryStream } from "../components/Form";

export async function loader({ request }) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search_query");
    if (!searchQuery) {
        return {};
    }
    // const summary = await getSummary(searchQuery);
    const summary = await dummySummary();
    return { summary };
}

export async function action({ request }) {
    const formData = await request.formData();
    const update = Object.fromEntries(formData);
    // update.search_query == the input with name: search_query
    const summary = await getSummary(update.search_query);
    return { summary }
}

const NoSearchResult = () => {
    return (
        <section className={"relative flex flex-col justify-center items-center font-14 font-medium text-center"}>
            <span>No search results</span>
        </section>
    )
}

const SummaryItemLoading = () => {
    return (
        <>
            <section className="bg-base-100 animate-pulse shadow rounded-lg px-2 py-4 w-full mx-auto">
                <div className="animate-pulse flex-col space-x-4 w-full">
                    <div className="h-3 bg-base-300 dark:bg-slate-700/80 dark:bg-neutral rounded w-8/12 mx-6 my-3"></div>
                    <div className="flex-1 w-full">
                        {/* <div className="h-2 bg-slate-700 rounded w-96 mt-5"></div> */}
                        <div className="flex items-start px-3 my-6">
                            <div className="rounded-full bg-neutral-400 lg:bg-slate-700/80 dark:bg-neutral h-2 w-2"></div>
                            <section className="w-full space-y-2">
                                <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral h-2 flex-1 mx-2"></div>
                                <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral w-10/12 h-2 flex-1 mx-2"></div>
                            </section>
                        </div>
                        <div className="flex items-start px-3 my-6 w-10/12">
                            <div className="rounded-full bg-neutral-400 lg:bg-slate-700/80 dark:bg-neutral h-2 w-2"></div>
                            <section className="w-full space-y-2">
                                <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral h-2 flex-1 mx-2"></div>
                                <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral h-2 flex-1 mx-2"></div>
                                <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral w-10/12 h-2 flex-1 mx-2"></div>
                            </section>
                        </div>
                        {/* <div className="h-2 bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral rounded"></div> */}
                    </div>
                    <section className="flex items-center">
                        <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral h-5 w-5"></div>
                        <div className="rounded-full bg-neutral-300 lg:bg-slate-700/80 dark:bg-neutral w-96 h-3 flex-1 mx-2"></div>
                    </section>
                </div>
            </section>
            {/* <section className={"search-result-pulse-container relative flex flex-column justify-end align-items-end pct:w-100 h-160 radius-sm shadow:0px-0px-8px-2px-E4E4E4 mg-t2 bg-inherit lg:mg-x-auto|h-240 dark:bg-121714 dark:shadow-unset dark:border:1px_solid_444444"}>
                <div className={"d-block pct:w-100 h-48 border:0px_solid_D4D4D4 em:border-t-0.04 dark:border:0px_solid_222222 dark:em:border-t-0.05"}></div>
            </section> */}
        </>
    )
}

const SummaryItem = ({ itemType, groupedResult, hostName }) => {
    console.log("Inside summary item")
    const SummaryItemCommon = () => {
        return (
            <>
                <div className={"relative w-full font-12 font-medium h-3 lh-3 px-2 color-rebeccapurple color-191E30 text-ellipsis hover:underline-offset-3 hover:underline hover:decoration-3 dark:color-gray dark:h-5|lh-5|color-lightgray"}>{groupedResult?.title}</div>
                <a href={groupedResult?.link} target="_blank" rel="noreferrer" data-href="/summary/url" className={"block decoration-none w-full cursor-pointer text-ellipsis px-2 py-1 border:0px_solid_D4D4D4 em:border-t-0.04 hover:bg-lighter lg:border-0 dark:border:0px_solid_222222 dark:em:border-t-0.05 dark:hover:bg-4444"}>
                    <div className={"relative flex flex-row align-items font-11 font-medium color-gray dark:font-regular dark:color-gray"}>
                        <img src="{pageThumbnailData?.src || groupedResult?.icon}" alt="" width="" className={"relative square-3 lh-3 radius-circle font-12 font-medium dark:font-semibold color-gray dark:color-lightgray bg-light dark:bg-lighter mg-r1 object-contain object-center"} />
                        {groupedResult?.displayLink || hostName}
                    </div>
                </a>
                <div className={"relative lh-3 font-12 font-medium pad-x2 pad-y2 break-word color-565656 dark:color-A4A4A4|pad-t-1|pad-b2"}>
                    {groupedResult?.summary_text ?? groupedResult?.summary ?? groupedResult?.text}
                </div>
            </>
        )
    }

    return (
        itemType === "group"
            ? <section className="relative flex-grow flex-noshrink flex flex-col justify-between align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-E4E4E4 mg-y2 bg-inherit lg:shadow:0px-0px-8px-1px-D8D8D8 dark:bg-121714 dark:shadow-unset dark:border:1px_solid_444444">
                {/* For grouped items */}
                <SummaryItemCommon />
            </section>
            : <section className={"relative flex flex-col justify-start align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-D8D8D8 mg-b4 bg-inherit lg:mg-x-auto|shadow:0px-0px-0px-1px-transparent dark:bg-121714 dark:shadow-unset dark:border:0px_solid_444444"}>
                {/* For single items */}
                <SummaryItemCommon />
            </section>
    )
}

const SummaryList = (props) => {
    const data = props.data;
    // console.log([data].concat(props.children.data[0]));
    // console.log(props.children.data.length);
    // console.log(data);
    // const data = props;
    // const isStreaming = props.isStreaming;
    // const isError = props.isError;
    if (data.length < 1) {
        return (
            <section>No search results to display</section>
        )
    } else if (data?.length >= 1) {
        return (
            <>
                {data?.map((eachSummary, index) => {
                    const pageNumber = ((props.currentStartIndex - 1) / 10) + (index + 1)
                    return (
                        <>
                            {
                                pageNumber > 1
                                && <div className={"relative block font-bold pad-x1 pad-t4"}>
                                    Page {pageNumber}
                                </div>
                            }
                            {Object.keys(eachSummary).map((grouper, index) => {
                                let hostName = grouper;
                                const grouperData = eachSummary[grouper];
                                if (grouperData.length === 1) {
                                    // For single summary response
                                    return (
                                        // <SummaryItem key={index} groupedResult={grouperData[0]} hostName={grouper} />
                                        <SummarySingleItem key={index} {...grouperData[0]} hostName={grouper} />
                                    )
                                } else if (grouperData.length > 1) {
                                    // For grouped summary response
                                    return (
                                        // <section key={index} className={"block pad-t4 pad-b2"}>
                                        //     <section class="relative block h-4 lh-4 w-full font-13 px-1 color-454545 dark:color-lightgray">
                                        //         Results from <span className={"font-semibold"}>{hostName}</span>
                                        //         <span class="abs right-2 square-4 lh-4 radius-circle text-center bg-lighter dark:bg-27CE6234">{grouperData.length}</span>
                                        //     </section>
                                        //     <section key={index} className={"relative flex flex-row flex-nowrap overflow-x-auto every:mg-x1|pct:w-90 lg:every:pct:w-56"}>
                                        //         {
                                        //             grouperData.map((groupedResult, index) => {
                                        //                 <SummaryItem key={index} itemType={"group"} groupedResult={groupedResult} hostName={grouper} />
                                        //             })
                                        //         }
                                        //     </section>
                                        // </section>
                                        <SummaryGroup hostName={grouper}>
                                            {
                                                grouperData.map((groupedResult, index) => (
                                                    <SummaryGroupItem key={index} {...groupedResult} hostName={grouper} />
                                                ))
                                            }
                                        </SummaryGroup>
                                    )
                                }
                            })}
                            {
                                props.children?.length
                            }
                        </>
                    )
                })}
                {
                    props.children?.data?.length > 0 ? props.children?.data?.map((eachSummary, index) => {
                        const pageNumber = ((props.currentStartIndex - 1) / 10) + (index + 1)
                        return (
                            <>
                                {
                                    pageNumber > 1
                                    && <div className={"relative block font-bold pad-x1 pad-t4"}>
                                        Page {pageNumber}
                                    </div>
                                }
                                {Object.keys(eachSummary).map((grouper, index) => {
                                    let hostName = grouper;
                                    const grouperData = eachSummary[grouper];
                                    if (grouperData.length === 1) {
                                        // For single summary response
                                        return (
                                            // <SummaryItem key={index} groupedResult={grouperData[0]} hostName={grouper} />
                                            <SummarySingleItem key={index} {...grouperData[0]} hostName={grouper} />
                                        )
                                    } else if (grouperData.length > 1) {
                                        // For grouped summary response
                                        return (
                                            <SummaryGroup hostName={grouper}>
                                                {
                                                    grouperData.map((groupedResult, index) => (
                                                        <SummaryGroupItem key={index} {...groupedResult} hostName={grouper} />
                                                    ))
                                                }
                                            </SummaryGroup>
                                        )
                                    }
                                })}
                                {
                                    props.children?.length
                                }
                            </>
                        )
                    }) : null
                }
            </>
        )
    }
    console.log("Finished processing summary list");
}

const Summary = ({ summary }) => {
    // const { summary } = useLoaderData();
    // const url = new URL(request.url);
    // const searchQuery = url.searchParams.get("search_query");
    // const { summary } = getSummary();
    const offlineSummary = localforage.getItem()
    const fetchMoreData = false;
    const [nextPageData, setNextPageData] = useState(summary?.nextPageData);
    const [moreSummary, setMoreSummary] = useState(summary);
    const size = useWindowSize();
    // const searchQuery = useSearchParams();
    // const searchParams = new URLSearchParams(window.location.search);
    // const searchQuery = searchParams.get('search_query');
    // const [data, setData] = useState({});
    // const [eventData, setEventData] = useState(null);
    // const { eventData, data } = summary(searchQuery);
    // const { eventData, data, mainQuery } = useSummaryContext();

    // console.log(eventData);
    // console.log("SUMMARY FILE");
    // console.log(mainQuery);

    // useEffect(() => { }, [mainQuery]);

    /*
    useEffect(() => {
        console.log("SUMMARY LOADER DATA");
        console.log(summary);
    }, [summary?.data]);

    useEffect(() => {
        console.log(eventData);
        console.log("Each event Data");
    }, eventData);
    */

    // useEffect(() => {
    //     const fetch_config = {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             // 'Origin': '*',
    //         },
    //         modes: 'cors',  // options: cors, no-cors, same-origin
    //         cache: 'default',   // options: default, no-store, reload, no-cache, force-cache, only-if-cached
    //     }
    //     // fetch(nextPageData.next, fetch_config)
    //     axios(nextPageData?.next, fetch_config)
    //         // .then((res) => res.json())
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setMoreSummary(data?.results);
    //             if (data?.next) {
    //                 setNextPageData({ hasNextPage: true, next: data?.next });
    //             } else {
    //                 setNextPageData({ hasNextPage: false, next: data?.next })
    //             }
    //         });
    //     return () => { }
    // }, [fetchMoreData]);

    // let data = {};

    // useEffect(() => {
    //     let isLoading = true;
    //     let isError = false;
    //     let nextPageData = null;

    //     const fetchConfig = {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             // 'Origin': '*',
    //             // 'Authorization': `Bearer ${window.localStorage.getItem('nine_login')}`
    //         },
    //         modes: 'cors',  // options: cors, no-cors, same-origin
    //         withCredentials: false,
    //         cache: 'default',   // options: default, no-store, reload, no-cache, force-cache, only-if-cached
    //         params: {
    //             search_input: searchQuery
    //         }
    //     }

    //     // Create a result dict and a result array to store the offline data from the streamed summary response
    //     let group_data;
    //     let resultArray = [];
    //     let resultGroupArray = [];
    //     let resultDict = { data: resultGroupArray };
    //     console.log(resultDict);

    //     if (!searchQuery) return;

    //     const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${searchQuery}`, { fetchConfig });
    //     eventSource.onopen = (event) => {
    //         console.log("Opened Event stream");
    //     }
    //     if (eventSource.readyState === 1 || EventSource.CLOSED) {
    //         eventSource.close();
    //     }
    //     eventSource.onmessage = (event) => {
    //         console.log("On message");
    //         if (event.data['summary_error']?.toString() !== undefined || event.data['error']?.toString() !== undefined) {
    //             data.error = true;
    //             data.success = false;
    //         } else {
    //             data.error = false;
    //             data.success = true;
    //         }

    //         // Update the result dict, the offline data.
    //         resultDict.isLoading = data.isLoading;
    //         resultDict.error = data.error;
    //         resultDict.success = data.success;
    //         resultDict.searchInput = searchQuery;

    //         resultDict.searchInformation = data.searchInformation;
    //         console.log(data);
    //         // console.log(result_dict);
    //         let event_data = JSON.parse(event.data);
    //         data.streaming = event_data.streaming;
    //         data.streamed_count = event_data.streamed_count;
    //         data.searchInformation = event_data.searchInformation;
    //         data.currentStartIndex = event_data.queries?.request[0]?.startIndex;
    //         data.nextStartIndex = event_data.queries?.nextPage[0]?.startIndex;
    //         resultDict.searchInformation = data.searchInformation;
    //         resultDict.currentStartIndex = data.currentStartIndex;
    //         resultDict.nextStartIndex = data.nextStartIndex;
    //         resultArray.push(event_data);
    //         // let grouped_resultArray = nestedGroupBy(resultArray, 'host');
    //         // console.log(grouped_resultArray)
    //         group_data = groupData(resultArray);
    //         // console.log(group_data);
    //         resultGroupArray.splice(0, resultGroupArray.length);
    //         resultGroupArray.push(group_data);
    //         // console.log(resultGroupArray[0]);
    //         // resultArray = Array.from(group_data);
    //         // let summarySearchLocalData = writeLocalStore('summary-search', resultDict);
    //         // summarySearchLocalData?.set(resultDict);
    //         // summaryStore.setItem(searchQuery, resultDict);

    //         // Stop pinging the server if there's no more streaming from the server
    //         if (!event_data.streaming) {
    //             eventSource.close();
    //             console.log("Closed event source - event streaming");
    //         }
    //     }
    //     data.data = resultGroupArray;
    //     setData(data);

    //     return () => {
    //         eventSource.close();
    //         console.log("Closed event source - event streaming");
    //     }
    // }, []);

    /*
    useEffect(() => {
        let isLoading = true;
        let isError = false;
        let nextPageData = null;

        const fetchConfig = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Origin': '*',
                // 'Authorization': `Bearer ${window.localStorage.getItem('nine_login')}`
            },
            modes: 'cors',  // options: cors, no-cors, same-origin
            withCredentials: false,
            cache: 'default',   // options: default, no-store, reload, no-cache, force-cache, only-if-cached
            params: {
                search_input: searchQuery
            }
        }

        // Create a result dict and a result array to store the offline data from the streamed summary response
        let group_data;
        let resultArray = [];
        let resultGroupArray = [];
        let resultDict = { data: resultGroupArray };
        console.log(resultDict);

        if (!searchQuery) return;
        console.log(searchQuery);

        const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${searchQuery}`, { fetchConfig });
        eventSource.onopen = (event) => {
            console.log("Opened Event stream");
        }
        if (eventSource.readyState === 1 || EventSource.CLOSED) {
            eventSource.close();
        }

        eventSource.onmessage = (event) => {
            console.log(event.data);
            setEventData(event.data);
        }

        return () => {
            eventSource.close();
            console.log("Closed event source - event streaming");
        }
    }, []);

    useEffect(() => {
        setData(data);
        console.log(data);
    }, [eventData]);
    */

    // const [summaryData, setSummaryData] = useState('');
    // let resultArray = [];
    // let resultGroupArray = [];
    // let groupedData = useRef(null);

    // useEffect(() => {
    //     if (summary) {
    //         summary.currentStartIndex = summary.queries?.request[0]?.startIndex;
    //         summary.nextStartIndex = summary.queries?.nextPage[0]?.startIndex;
    //         resultArray.push(summary);
    //         groupedData.current = groupData(resultArray);
    //         resultGroupArray.splice(0, resultGroupArray.length);
    //         resultGroupArray.push(groupedData);
    //         // setData((res) => { })
    //         summary.data = resultGroupArray;
    //     }
    //     console.log(summaryData);
    //     return () => setSummaryData(summary);
    // }, [summary]);

    const loadMoreSummary = () => {
        handleSummaryStream(summary?.searchQuery, setMoreSummary);
        console.log("Clicked load more");
        console.log(moreSummary);
        setMoreSummary(summary);
    }

    return (
        <>
            <section className={"block w-full px-2 mx-auto lg:px-5 lg:w-9/12 dark:bg-base-300 dark:lg:bg-base-300"}>
                {
                    size.width < deviceWidthEnum.laptop
                        ? <section className={"relative flex flex-col h-full flex-basis flex-grow every:color-454545 dark:every:color-lightgray"}>
                            <section className={"text-sm w-full h-full color-E2E2E2 lg:overflow-y-unset"}>
                                <section className={"italic text-xs py-3 neutral-content"}>
                                    {
                                        summary &&
                                        <div>
                                            {summary.searchInformation?.formattedTotalResults} results in {summary.searchInformation?.formattedSearchTime}s
                                        </div>
                                    }
                                    {summary && <div>Powered by Google search</div>}
                                </section>
                                {
                                    summary
                                        ? <SummaryList {...summary}>
                                            {moreSummary}
                                        </SummaryList>
                                        : <NoSearchResult />
                                }
                                {
                                    summary?.streaming || moreSummary?.streaming
                                        ? <SummaryItemLoading />
                                        : null
                                }
                                {
                                    !(summary?.streaming || moreSummary?.streaming) && summary?.hasNextPage
                                        ? <button type={"button"} className={"block mx-auto my-8 btn btn-wide bg-base-300 dark:bg-base-100 capitalize"} onClick={loadMoreSummary}>More Summary</button>
                                        : null
                                }
                                {
                                    summary?.isStreaming
                                        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                            return (
                                                <SummaryItemLoading />
                                            )
                                        })
                                        : null
                                }
                            </section>
                            {/* {
                            size.width < deviceWidthEnum.laptop
                            && <MobileSummaryFormComponent />
                        } */}
                        </section>
                        : <section className={"flex flex-row justify-start items-start mg-x-auto w-10/12 lg:w-1440 bg-green-invers space-x-10"}>
                            {/* 70% of the container width. i.e., 65% of 1280 == 832 */}
                            <section className={"bg-pin p-6 w-7/12 lg:pct:w-56"}>
                                {/* {JSON.stringify(summary?.data)} */}
                                <section className={"text-xs py-4 leading-6"}>
                                    {
                                        summary &&
                                        <div>
                                            {summary.searchInformation?.formattedTotalResults} results in {summary.searchInformation?.formattedSearchTime} seconds
                                        </div>
                                    }
                                    {summary && <div className={"font-10 color-gray lh-3"}>Powered by Google search</div>}
                                    {/* <div>8,490,000,000 results in 0.34 seconds</div>
                                <div>Powered by Google search</div> */}
                                </section>
                                <section className={"pad-y4 font-11 color-E2E2E2 every:color-454545"}>
                                </section>
                                {/* {JSON.stringify(summary)} */}
                                {
                                    summary
                                        ? <SummaryList {...summary}>
                                            {moreSummary}
                                        </SummaryList>
                                        : <NoSearchResult />
                                }
                                {
                                    summary?.streaming || moreSummary?.streaming
                                        ? <SummaryItemLoading />
                                        : null
                                }
                                {
                                    !(summary?.streaming || moreSummary?.streaming) && summary?.hasNextPage
                                        ? <button type={"button"} className={"block mx-auto my-4 btn btn-wide capitalize"} onClick={loadMoreSummary}>More Summary</button>
                                        : null
                                }
                                {
                                    summary?.isStreaming
                                        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                            return (
                                                <SummaryItemLoading />
                                            )
                                        })
                                        : null
                                }
                            </section>
                            {/* 30% of the container width. i.e., 35% of 1280 == 448 */}
                            <section className={"border:0px_solid_lightgray w-5/12 h-[400] px-8 pt-32"}>
                                <div className={"bg-base-100 w-88 h-80 rounded-md my-2 dark:bg-27CE8E1A"}></div>
                                <div className={"bg-base-200 w-88 h-64 rounded my-2"}></div>
                            </section>
                        </section>
                }
            </section>
            {summary.length >= 10 && <Footer />}
        </>
    )
}

export default Summary;