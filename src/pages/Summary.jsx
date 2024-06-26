import {useContext, useEffect, useRef, useState} from "react";
import localforage from "localforage";
import { useCopyToClipboard, useWindowSize } from "@uidotdev/usehooks";
import {deviceWidthEnum, truncateWords} from "../helpers";
import { dummySummary, getSummary } from "../helpers/loaders";
import { SummaryGroup, SummaryGroupItem, SummarySingleItem } from "../components/SummaryItem";
import Footer from "../components/Footer";
import {fetchMultipleSearchSummaryUrls, handleSearchFetch, handleSummaryStream} from "../components/Form";
import { useSummaryContext } from "../context";
import EmptySummaryUI from "../components/EmptySummaryUI";
import async from "async";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {HelpContent} from "../components/HelpContent";

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

const SummarySkeleton = () => {
    return (
        <section className="relative w-full lg:px-2 lg:pt-2 lg:pb-2 my-6 rounded-lg bg-gray-100/60 dark:bg-base-200">
            <section className="bg-base-100 animate-pulse shadow rounded-lg px-2 py-4 w-full mx-auto">
                <section className="space-y-5">
                    <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-3 w-8/12"></div>
                    <div className="flex gap-4 items-start px-4">
                        <div className="skeleton bg-gray-300/60 dark:bg-base-300 w-2 h-2 rounded-full shrink-0"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-full"></div>
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-10/12"></div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start px-4">
                        <div className="skeleton bg-gray-300/60 dark:bg-base-300 w-2 h-2 rounded-full shrink-0"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-8/12"></div>
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-full"></div>
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-10/12"></div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start px-4">
                        <div className="skeleton bg-gray-300/60 dark:bg-base-300 w-2 h-2 rounded-full shrink-0"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-2 w-9/12"></div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="skeleton bg-gray-300/60 dark:bg-base-300 w-6 h-6 rounded-full shrink-0"></div>
                        <div className="flex-1 flex flex-col gap-2">
                            {/* <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-4 w-20"></div> */}
                            <div className="skeleton bg-gray-300/60 dark:bg-base-300 h-4 w-full"></div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

const SummaryItemLoading = () => {
    return (
        <>
            <section className="bg-base-100 animate-pulse shadow rounded-lg px-2 py-4 w-full my-6 mx-auto">
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

const SummaryList = (props) => {
    const data = props.data;
    const summaries = props.summaries;
    const children = props.children;
    // console.log([data].concat(props.children.data[0]));
    // console.log(props.children.data.length);
    // console.log(props);

    // const data = props;
    // const isStreaming = props.isStreaming;
    // const isError = props.isError;
    if (data?.length < 1) {
        return (
            <section>No search results to display</section>
        )
    }
    else if (children?.data?.length > 0) {
        // console.log("Inside the children render condition");
        // console.log(children);
        return (
            <>
                {
                    children?.data?.map((eachSummary, index) => {
                        let pageNumber = ((props.currentStartIndex - 1) / 10) + (index + 1);
                        if (props.fromLocalStore) {
                            pageNumber = index + 1;
                        }
                        return (
                            <div key={`page${props.currentStartIndex}-${index}`}>
                                {
                                    pageNumber > 1
                                    && <div key={index} className={"sticky top-[72px] lg:relative lg:top-0 block font-bold px-1 pt-6 pb-2 bg-base-100/60 backdrop-blur-sm z-10"}>
                                        Page {pageNumber}
                                    </div>
                                }
                                <section key={index} className="border-b-2 pb-4 border-base-100">
                                    {Object.keys(eachSummary).map((grouper, index) => {
                                        // let hostName = grouper;
                                        const grouperData = eachSummary[grouper];
                                        if (grouperData.length === 1) {
                                            // For single summary response
                                            return (
                                                // <SummaryItem key={index} groupedResult={grouperData[0]} hostName={grouper} />
                                                <SummarySingleItem key={grouperData[0].cacheId} {...grouperData[0]} summaries={summaries} hostName={grouper} />
                                            )
                                        } else if (grouperData.length > 1) {
                                            // For grouped summary response
                                            return (
                                                <SummaryGroup hostName={grouper}>
                                                    {
                                                        grouperData.map((groupedResult, index) => (
                                                            <SummaryGroupItem key={groupedResult.cacheId} {...groupedResult} hostName={grouper} />
                                                        ))
                                                    }
                                                </SummaryGroup>
                                            )
                                        }
                                    })}
                                    {/* {
                                        props.children?.length
                                    } */}
                                </section>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    else if (data?.length >= 1) {
        return (
            <>
                {data?.map((eachSummary, index) => {
                    const pageNumber = ((props.currentStartIndex - 1) / 10) + (index + 1)
                    return (
                        <div key={`page${props.currentStartIndex}-${index}`}>
                            {
                                pageNumber > 1
                                && <div className={"relative block font-bold pad-x1 pad-t4"}>
                                    Page {pageNumber}
                                </div>
                            }
                            <section className={""}>
                                {Object.keys(eachSummary).map((grouper, index) => {
                                    // let hostName = grouper;
                                    const grouperData = eachSummary[grouper];
                                    if (grouperData.length === 1) {
                                        // For single summary response
                                        return (
                                            // <SummaryItem key={index} groupedResult={grouperData[0]} hostName={grouper} />
                                            <SummarySingleItem key={grouperData[0].cacheId} {...grouperData[0]} summaries={summaries} hostName={grouper} />
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
                                                        <SummaryGroupItem key={groupedResult.cacheId} {...groupedResult} hostName={grouper} />
                                                    ))
                                                }
                                            </SummaryGroup>
                                        )
                                    }
                                })}
                            </section>
                            {/* {
                                props.children?.length
                            } */}
                        </div>
                    )
                })}
                {/* {
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
                                    // let hostName = grouper;
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
                } */}
            </>
        )
    }


    // console.log("Finished processing summary list");
}

const Summary = ({ summary }) => {
    // console.log(summary.data);
    // console.log("SUMMARY IS: ", summary);
    // const { summary } = useLoaderData();
    // const url = new URL(request.url);
    // const searchQuery = url.searchParams.get("search_query");
    // const { summary } = getSummary();
    // const offlineSummary = localforage.getItem()
    // const fetchMoreData = false;
    // const [nextPageData, setNextPageData] = useState(summary?.nextPageData);
    const aiGeneratedContentModal = useRef(null);
    const [showCompleteAiGeneratedContent, setShowCompleteAiGeneratedContent] = useState(false);

    const handleToggleShowCompleteAiGeneratedContent = () => {
        setShowCompleteAiGeneratedContent(!showCompleteAiGeneratedContent);
    }

    const {
        baseData,
        updateSummaryBaseData,
        updateBaseDataWithSummaries,
        eventOpened,
        setEventOpened,
        isFetchingSummary,
        setIsFetchingSummary,
        moreSummary,
        updateMoreSummary,
        showOnlySummaries,
        updateShowOnlySummaries,
        isSearchDataFetched,
        updateIsSearchDataFetched,
        updateSearchSummaryData,
        updateIsFetchingSummary,
        aiGeneratedData,
        isFetchingSearch,
        updateIsFetchingSearch
    } = useSummaryContext();
    // console.log(baseData);
    // const [moreSummary, setMoreSummary] = useState(baseData);
    // console.log("BASE DATA:", baseData);


    const size = useWindowSize();
    const [copiedGeneratedText, copyGeneratedTextToClipboard] = useCopyToClipboard();
    const hasCopiedGeneratedText = Boolean(copiedGeneratedText);
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

    // console.log(isSearchDataFetched);
    useEffect(() => {
        const fetcher =  async () => {
            const searchUrls = baseData.searchUrls;

            const summaryData = await fetchMultipleSearchSummaryUrls(
                searchUrls,
                summary?.searchQuery,
                updateSearchSummaryData,
                updateIsFetchingSummary,
                updateBaseDataWithSummaries
            );
            updateIsSearchDataFetched(false);
        }

        if (isSearchDataFetched) fetcher();
        // console.log(summary.searchUrls[0]);
    }, [isSearchDataFetched]);

    const loadMoreSummary =  async () => {
        // console.log(moreSummary);
        setIsFetchingSummary(true);
        updateIsFetchingSearch(true);
        // reset setMoreSummary if the searchQuery is a new
        // console.log(baseData?.data);
        // handleSummaryStream(summary?.searchQuery, updateMoreSummary, baseData?.data, updateSummaryBaseData, true, baseData?.nextStartIndex, setEventOpened, setIsFetchingSummary);
        await handleSearchFetch(summary?.searchQuery, true, baseData?.nextStartIndex, baseData?.data, updateMoreSummary, updateSummaryBaseData, updateIsSearchDataFetched, baseData);
        // console.log("Clicked load more");
        // console.log(moreSummary);
        // updateMoreSummary(baseData);
    }

    const toggleShowOnlySummaries = () => {
        updateShowOnlySummaries();
    }

    const handleCopyGeneratedText = (text) => {
        copyGeneratedTextToClipboard(text);
    }

    useEffect(() => {
        if (hasCopiedGeneratedText) {
            setTimeout(() => {
                copyGeneratedTextToClipboard("");
            }, 2000);
        }
    }, [hasCopiedGeneratedText]);

    // useEffect(() => {
    //     setData(data);
    //     console.log("Updating summaryData");
    //     console.log(data);
    // }, [data]);

    // if (baseData.length < 1 && !(eventOpened || isFetchingSummary)) {
    // if (baseData.length < 1 && baseData?.searchQuery === "") {

    if (baseData?.length < 1 && !isFetchingSearch) {
        return <EmptySummaryUI />
    }

    const summaryPageListCount = baseData?.data ? Object.keys(baseData?.data[`${baseData?.data.length - 1}`]).length : 0;
    const loaderList = new Array(10 - summaryPageListCount).fill("");

    return (
        <>
            <section
                className={"block w-full px-2 mx-auto md:px-4 lg:px-5 lg:w-full dark:bg-base-300 dark:lg:bg-base-300"}>
                {
                    size.width < deviceWidthEnum.desktop
                        ? <section
                            className={"relative flex flex-col h-full flex-basis flex-grow every:color-454545 dark:every:color-lightgray"}>
                            <section className={"w-full h-[400]"}>
                                {
                                    hasCopiedGeneratedText
                                    && <div role="alert" className="alert alert-success flex flex-row">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="stroke-current shrink-0 h-6 w-6" fill="none"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>Text Copied</span>
                                    </div>
                                }
                                <div
                                    className={"relative bg-green-100 w-full rounded-md my-2 py-2 overflow-x-auto dark:bg-27CE8E1A dark:bg-green-800/20"}>
                                    {
                                        aiGeneratedData?.length < 1 &&
                                        <div className={"flex flex-row items-center gap-x-8 p-8"}>
                                            <span className="loading loading-dots loading-md"></span>
                                            Generating AI response ...
                                        </div>
                                    }
                                    {
                                        aiGeneratedData?.length > 0 && aiGeneratedData[0].finish_reason &&
                                        <div
                                            className={"bg-clip-text bg-gradient-to-l from-[#27CE8E] to-[#FFDE52] text-transparent px-5 py-4 font-bold text-sm"}>
                                            AI Generated
                                        </div>
                                    }
                                    {
                                        aiGeneratedData?.length > 0
                                            ? hasCopiedGeneratedText
                                                ? <button className="fa fa-check absolute top-6 right-5"></button>
                                                : <button
                                                    className="far fa-copy absolute top-6 right-5"
                                                    onClick={() => handleCopyGeneratedText(baseData?.aiGeneratedData[0]?.text)}>
                                                </button>
                                            : null
                                    }
                                    <div className={"summary-list px-5 py-2 leading-normal list-disc"}>
                                        {
                                            (aiGeneratedData || baseData?.aiGeneratedData)?.length > 0
                                            && (aiGeneratedData || baseData?.aiGeneratedData)?.map((eachAiGeneratedData) => (
                                                <>
                                                    <Markdown
                                                        rehypePlugins={[rehypeRaw]}>{truncateWords(eachAiGeneratedData?.text, 0, 80)}</Markdown>
                                                    {
                                                        eachAiGeneratedData?.text.split(" ").length > 80
                                                        && <button
                                                            onClick={() => aiGeneratedContentModal.current?.showModal()}>
                                                            <div className={"btn btn-sm flex justify-center mx-auto mt-4"}>
                                                                Show more
                                                            </div>
                                                        </button>
                                                    }
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/*<div className={"bg-base-200 w-88 h-64 rounded my-2"}></div>*/}
                            </section>
                            <section className={"text-sm w-full h-full color-E2E2E2 lg:overflow-y-unset"}>
                                {
                                    summary?.data?.length > 0 &&
                                    <section className={"card card-compact bg-gray-200/80 dark:bg-base-200 m-2"}>
                                        <div className="card-body flex flex-row items-center">
                                            <div className="flex-1">Show only summaries</div>
                                            <div className="">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success"
                                                    onChange={toggleShowOnlySummaries}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                }
                                {
                                    summary?.data?.length > 0 &&
                                    <section className={"italic text-xs py-3 neutral-content lg:not-italic"}>
                                        {
                                            summary &&
                                            <div>
                                                {summary.searchInformation?.formattedTotalResults} results
                                                in {summary.searchInformation?.formattedSearchTime}s
                                            </div>
                                        }
                                        {/* {summary && <div>Powered by Google search</div>} */}
                                    </section>
                                }
                                {
                                    summary
                                        ? <SummaryList {...summary}>
                                            {moreSummary}
                                        </SummaryList>
                                        : <NoSearchResult/>
                                }
                                {/*{*/}
                                {/*    // summary?.streaming || moreSummary?.streaming || eventOpened || isFetchingSummary*/}
                                {/*    baseData?.length < 1*/}
                                {/*        ? <SummarySkeleton />*/}
                                {/*        : null*/}
                                {/*}*/}
                                {
                                    // !(summary?.streaming || moreSummary?.streaming || isFetchingSummary || eventOpened) &&
                                    summary?.hasNextPage
                                        ? <button type={"button"}
                                                  className={"block mx-auto my-8 btn btn-wide bg-gray-200 dark:bg-base-100 capitalize"}
                                                  onClick={loadMoreSummary}>More Summary</button>
                                        : null
                                }
                                {
                                    // summary?.isStreaming
                                    baseData?.length < 1
                                        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                            return (
                                                <SummarySkeleton/>
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
                        : <section
                            className={"flex flex-row justify-start items-start mx-auto w-11/12 lg:w-1440 bg-green-inverse space-x-10"}>
                            {/* 70% of the container width. i.e., 65% of 1280 == 832 */}
                            <section className={"bg-pin p-6 w-7/12 lg:pct:w-56"}>
                                {/* {JSON.stringify(summary?.data)} */}
                                {
                                    summary?.data?.length > 0 &&
                                    <section className={"card card-compact bg-gray-200/80 dark:bg-base-200 m-2"}>
                                        <div className="card-body flex flex-row items-center">
                                            <div className="flex-1">Show only summaries</div>
                                            <div className="">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success"
                                                    onChange={toggleShowOnlySummaries}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                }
                                <section className={"text-xs py-4 leading-6"}>
                                    {
                                        summary?.searchInformation &&
                                        <div>
                                            {summary.searchInformation?.formattedTotalResults} results
                                            in {summary.searchInformation?.formattedSearchTime} seconds
                                        </div>
                                    }
                                    {/* {summary && <div className={"font-10 color-gray lh-3"}>Powered by Google search</div>} */}
                                    {/* <div>8,490,000,000 results in 0.34 seconds</div>
                                <div>Powered by Google search</div> */}
                                </section>
                                <section className={"pad-y4 font-11 color-E2E2E2 every:color-454545"}>
                                </section>
                                {/* {JSON.stringify(summary)} */}
                                {
                                    summary
                                        ? <SummaryList {...baseData}>
                                            {moreSummary}
                                        </SummaryList>
                                        : <NoSearchResult/>
                                }
                                {
                                    // summary?.streaming || moreSummary?.streaming || isFetchingSummary || eventOpened
                                    baseData?.length < 1
                                        ? loaderList.map(() => {
                                            return (<SummarySkeleton/>)
                                        })
                                        : null
                                }
                                {
                                    // (summary?.streaming || moreSummary?.streaming || isFetchingSummary || eventOpened) &&
                                    summary?.hasNextPage
                                        ? <button type={"button"}
                                                  className={"block mx-auto my-4 btn btn-wide bg-gray-200 dark:bg-base-100 capitalize"}
                                                  onClick={loadMoreSummary}>More Summary</button>
                                        : null
                                }
                                {
                                    summary?.isStreaming
                                        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                            return (
                                                <SummarySkeleton/>
                                            )
                                        })
                                        : null
                                }
                            </section>
                            {/* 30% of the container width. i.e., 35% of 1280 == 448 */}
                            <section className={"border:0px_solid_lightgray w-[560px] h-[400] px-8 pt-32"}>
                                {
                                    hasCopiedGeneratedText
                                    && <div role="alert" className="alert alert-success">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="stroke-current shrink-0 h-6 w-6" fill="none"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>Text Copied</span>
                                    </div>
                                }
                                <div
                                    className={"relative bg-gray-100 w-full rounded-md my-2 py-4 dark:bg-27CE8E1A dark:bg-base-100"}>
                                    {
                                        aiGeneratedData?.length < 1 &&
                                        <div className={"flex flex-row items-center gap-x-8 p-8"}>
                                            <span className="loading loading-dots loading-md"></span>
                                            Generating AI response ...
                                        </div>
                                    }
                                    {
                                        aiGeneratedData.length > 0 && aiGeneratedData[0].finish_reason &&
                                        <div
                                            className={"bg-clip-text bg-gradient-to-l from-[#27CE8E] to-[#FFDE52] text-transparent px-8 py-4 font-bold text-sm"}>AI
                                            Generated
                                        </div>
                                    }
                                    {
                                        aiGeneratedData?.length > 0
                                            ? hasCopiedGeneratedText
                                                ? <button className="fa fa-check absolute top-6 right-5"></button>
                                                : <button
                                                    className="far fa-copy absolute top-6 right-5"
                                                    onClick={() => handleCopyGeneratedText(baseData?.aiGeneratedData[0]?.text)}>
                                                </button>
                                            : null
                                    }
                                    <div className={"summary-list px-8 py-2 leading-normal list-disc"}>
                                        {
                                            aiGeneratedData.length > 0
                                            && aiGeneratedData.map((eachAiGeneratedData) => (
                                                <>
                                                    {
                                                        showCompleteAiGeneratedContent
                                                            ? <>
                                                                <Markdown
                                                                    rehypePlugins={[rehypeRaw]}>
                                                                    {eachAiGeneratedData?.text}
                                                                </Markdown>
                                                                {
                                                                    eachAiGeneratedData?.text.split(" ").length > 80
                                                                    && <button
                                                                        onClick={handleToggleShowCompleteAiGeneratedContent}>
                                                                        <div
                                                                            className={"btn btn-sm flex justify-center mx-auto mt-4"}>
                                                                            Show less
                                                                        </div>
                                                                    </button>
                                                                }
                                                            </>
                                                            : <>
                                                                <Markdown
                                                                    rehypePlugins={[rehypeRaw]}>
                                                                    {truncateWords(eachAiGeneratedData?.text, 0, 160)}
                                                                </Markdown>
                                                                {
                                                                    eachAiGeneratedData?.text.split(" ").length > 160
                                                                    && <button
                                                                        onClick={handleToggleShowCompleteAiGeneratedContent}>
                                                                        <div
                                                                            className={"btn btn-sm flex justify-center mx-auto mt-4"}>
                                                                            Show more
                                                                        </div>
                                                                    </button>
                                                                }
                                                            </>
                                                    }

                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={"bg-base-200 w-88 h-64 rounded my-2"}></div>
                            </section>
                        </section>
                }
            </section>
            <dialog id="ai-generated-content-modal" className="modal modal-bottom md:modal-middle m-0 space-y-0 gap-0 z-50"
                    ref={aiGeneratedContentModal}>
                <div className="modal-box w-[98%] justify-self-center bg-base-200 mb-1 rounded-xl">
                    <div
                        className={"w-full rounded-md my-2 py-2 overflow-x-auto"}>
                        {
                            aiGeneratedData.length > 0 && aiGeneratedData[0].finish_reason &&
                            <div
                                className={"bg-clip-text bg-gradient-to-l from-[#27CE8E] to-[#FFDE52] text-transparent py-4 font-bold text-sm"}>AI
                                Generated</div>
                        }
                        <div className={"summary-list py-2 leading-normal list-disc"}>
                            {
                                (aiGeneratedData || baseData?.aiGeneratedData)?.length > 0
                                && (aiGeneratedData || baseData?.aiGeneratedData)?.map((eachAiGeneratedData) => (
                                        <Markdown
                                            rehypePlugins={[rehypeRaw]}>
                                            {eachAiGeneratedData?.text}
                                        </Markdown>
                                ))
                            }
                        </div>
                    </div>
                    {/*<HelpContent/>*/}
                    <div
                        className="modal-action absolute right-10 top-9 bg-base-300/60 dark:bg-neutral m-0 rounded-xl">
                        <form method="dialog" className="w-full mx-auto">
                            <button
                                className="flex justify-center btn btn-ghost items-center w-12 h-8 leading-8 text-center">
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M18 6 6 18"/>
                                    <path d="m6 6 12 12"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop hidden md:grid">
                    <button>close</button>
                </form>
            </dialog>
            {baseData?.length >= 1 && <Footer/>}
        </>
    )
}

export default Summary;