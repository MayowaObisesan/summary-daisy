import { useRef } from "react";
import { Form } from "react-router-dom";
import { useSummaryContext } from "../context";
import useSummary from "../hooks/useSummary";
import { groupData } from "../helpers/loaders";

export const handleSummaryStream = (searchQuery, setData, currentData, updater, nextPage, startIndex, setEventOpened, setIsFetchingSummary) => {
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

    let groupedData;
    let resultArray = [];
    let resultGroupArray = [];

    // const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${"open"}`, { fetchConfig });
    const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${searchQuery}&next_page=${nextPage}&start_index=${startIndex}`, { fetchConfig });
    eventSource.onopen = (event) => {
        console.log("Opened Event stream");
        setEventOpened(true);
    }
    eventSource.onmessage = (event) => {
        let eventData = JSON.parse(event.data);
        let data = {};

        eventData.currentStartIndex = eventData.queries?.request[0]?.startIndex;
        eventData.nextStartIndex = eventData.queries?.nextPage[0]?.startIndex;
        eventData.hasNextPage = eventData.queries?.nextPage.length > 0;
        eventData.searchQuery = eventData.queries?.request[0].searchTerms;
        resultArray.push(eventData);
        groupedData = groupData(resultArray);
        resultGroupArray.splice(0, resultGroupArray.length);
        resultGroupArray.push(groupedData);
        console.log(resultGroupArray);
        // eventData.data = resultGroupArray;

        // We need the data because the eventData is still being used for grouping the results,
        // and so, eventData.data = resultGroupArray will give nested results. Which is not the intended result.
        data.currentStartIndex = eventData.currentStartIndex;
        data.nextStartIndex = eventData.nextStartIndex;
        data.searchInformation = eventData.searchInformation;
        data.queries = eventData.queries;
        data.data = currentData?.concat(resultGroupArray);
        data.event = eventData.event;
        data.id = eventData.id;
        data.streaming = eventData.streaming;
        data.streamed_count = eventData.streamed_count;
        data.hasNextPage = eventData.hasNextPage;
        data.searchQuery = eventData.searchQuery;

        setData(data);
        updater(data);
        console.log(data);
        if (!eventData.streaming) {
            eventSource.close();
            setEventOpened(false);
            setIsFetchingSummary(false);
            console.log("Closed event source");
        }
    }
    eventSource.onclose = () => {
        console.log("Event stream closed");
        setEventOpened(false);
    }
}

export const MobileSummaryFormComponent = ({ setData }) => {
    const { searchQuery, summary, baseData, updateSummaryBaseData, setEventOpened, setIsFetchingSummary } = useSummaryContext();
    const searchInputElement = useRef(null);
    const searchFormSubmitButton = useRef(null);
    const focusSearchInput = () => { }
    const handleSearchInput = () => {
        searchInputElement.current?.value.trim().length > 0
            ? searchFormSubmitButton.current?.removeAttribute("disabled")
            : searchFormSubmitButton.current?.setAttribute("disabled", "disabled")
    }

    const handleSummary = (e) => {
        e.preventDefault();
        // summary(searchQuery);
        handleSummaryStream(searchInputElement.current?.value.trim(), setData, [], updateSummaryBaseData, false, 1, setEventOpened, setIsFetchingSummary);
        setIsFetchingSummary(true);
    }

    return (
        <form method="GET" className="form-control sticky top-0 flex flex-col justify-center align-items-center bg-gray-100/80 backdrop-blur dark:bg-base-200 z-[1] shadow" onSubmit={handleSummary}>
            <div className={"relative flex-1 flex flex-row justify-center items-center w-[96%] mx-auto my-1 px-2 rounded-md dark:bg-base-100 ring-gray-300 ring-1 transition-all duration-150 ease-out delay-200 focus-within:w-full focus-within:bg-gray-100 focus-within:ring-1 focus-within:mt-0 focus-within:rounded-none dark:ring-neutral dark:focus-within:bg-base-200"}>
                <input
                    type="text"
                    name="search_query"
                    placeholder="What should I search and summarize?"
                    id=""
                    className="input input-lg input-ghost border-0 w-full px-2 text-sm bg-transparent focus:outline-0 placeholder:text-gray-600"
                    // className={"outline-none border-0 pct:w-96 h-8 md:h-8 lg:h-8 font-regular font-14 lg:font-15 md:pad-x2 lg:pad-x2 radius-round bg-EE bg-transparent dark:color-lightgray focus:shadow:0px-0px-0px-0px-white transition:width_400ms_ease|border-radius_200ms_ease|box-shadow_200ms_ease-in_200ms|background_200ms_ease_200ms|all_200ms_ease placeholder:color-989898"}
                    onFocus={focusSearchInput}
                    onInput={handleSearchInput}
                    ref={searchInputElement} />
                <button
                    type="submit"
                    className="btn btn-success border-0 outline-0 h-5 w-12 bg-[#27CE8E] cursor-pointer disabled:bg-gra-300 dark:disabled:bg-green-inverse"
                    data-summary_submit_type="search"
                    disabled="disabled"
                    ref={searchFormSubmitButton}>
                    <span className="fa fa-search color-white"></span>
                </button>
            </div>
        </form>
    )
}

export const DesktopSummaryFormComponent = ({ setData }) => {
    const { data, query, baseData, updateSummaryBaseData, setEventOpened, setIsFetchingSummary } = useSummaryContext();
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search_query');
    const searchInputElement = useRef(null);
    const searchFormSubmitButton = useRef(null);
    const focusSearchInput = () => { }
    const handleSearchInput = () => {
        searchInputElement.current?.value.trim().length > 0
            ? searchFormSubmitButton.current?.removeAttribute("disabled")
            : searchFormSubmitButton.current?.setAttribute("disabled", "disabled")
    }
    const summaryLanguages = ["English", "Pidgin", "Yoruba", "Hausa", "Igbo", "German", "French", "Spanish", "Russian", "Swedish", "Chinese"];

    const handleGenSummary = () => {
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

        console.log("summary use callback");

        // Create a result dict and a result array to store the offline data from the streamed summary response
        let group_data;
        let resultArray = [];
        let resultGroupArray = [];
        let resultDict = { data: resultGroupArray };
        console.log(resultDict);

        console.log(searchQuery);

        if (!searchQuery) return;
        console.log(searchQuery);

        try {
            const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${"open"}`, { fetchConfig });
            eventSource.onopen = (event) => {
                console.log("Opened Event stream");
            }
            console.log(eventSource);
            if (eventSource.readyState === 1 || EventSource.CLOSED) {
                eventSource.close();
            }

            eventSource.onmessage = (event) => {
                console.log(event.data);
                // setEventData(event.data);
            }
            // return { eventData, data };
            return "success";
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const handleSummary = (e) => {
        e.preventDefault();
        // handleGenSummary();
        handleSummaryStream(searchInputElement.current?.value.trim(), setData, [], updateSummaryBaseData, false, 1, setEventOpened, setIsFetchingSummary);
        setIsFetchingSummary(true);
    }

    return (
        <form method="GET" className="form-control relative flex flex-col justify-center align-items-center w-full max-w-2xl bg-white-transparent pad-x-4 pad-y-5 bg-mica z-1000 radius focus-withi:bg-27CE8E transition:background_200ms_ease_200ms dark:bg-transparent" onSubmit={handleSummary}>
            <div className={"flex-1 flex flex-row items-center rounded-xl px-4 ring-transparent ring-2 bg-gray-200/60 dark:ring-base-100 dark:bg-base-100 transition-all duration-400 ease-out delay-200 focus-within:w-full focus-within:bg-gray-100 focus-within:ring-2 focus-within:ring-gray-300/60 dark:focus-within:ring-neutral dark:focus-within:bg-base-100"}>
                <input
                    type="text"
                    name="search_query"
                    placeholder="What should I search and summarize?"
                    id=""
                    className="input input-lg input-ghost w-full px-2 text-sm bg-transparent border-0 focus:outline-0"
                    // className={"outline-none border-0 pct:w-96 h-8 md:h-8 lg:h-8 font-regular lg:font-12 md:pad-x2 lg:pad-x2 radius-round bg-EE bg-transparent dark:color-lightgray focus:shadow:0px-0px-0px-0px-white transition:width_400ms_ease|border-radius_200ms_ease|box-shadow_200ms_ease-in_200ms|background_200ms_ease_200ms|all_200ms_ease placeholder:color-787878"}
                    onFocus={focusSearchInput}
                    onInput={handleSearchInput}
                    ref={searchInputElement} />
                {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
                <button
                    type="submit"
                    className="btn btn-success border-0 outline-0 focus:shadow:0px-0px-8px-1px-gray|0px-0px-16px-8px-green h-5 w-12 bg-[#27CE8E] rounded-xl cursor-pointer disabled:bg-green-inverse"
                    data-summary_submit_type="search"
                    disabled="disabled"
                    ref={searchFormSubmitButton}>
                    <span className="fa fa-search color-white"></span>
                </button>
            </div>
            {/* <div className={"flex flex-row flex-nowrap justify-start align-items-center mt-4 mb-1 w-full overflow-x-auto"}>
                {
                    summaryLanguages.map((eachLanguage, index) => {
                        return (
                            <div key={index} className={"btn btn-sm lh-4 mr-2 px-2 rounded-md shadow cursor-pointer hover:bg-light|shadow:0px-0px-2px-0px-gray transition:background_200ms_ease dark:color-white dark:hover:bg-darkgray"}>{eachLanguage}</div>
                        )
                    })
                }
            </div> */}
        </form>
    )
}