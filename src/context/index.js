import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SUMMARY_HISTORY_CACHE_NAME, SUMMARY_SEARCH_CACHE_NAME } from "../helpers/constants";

const SummaryContext = createContext();

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const getSummarySearchCache = () => {

    const defaultSummarySearchCache = null;
    let currentSearchCache = localStorage.getItem(SUMMARY_SEARCH_CACHE_NAME);
    if (!currentSearchCache) {
        currentSearchCache = localStorage.setItem(SUMMARY_SEARCH_CACHE_NAME, JSON.stringify(defaultSummarySearchCache));
    }
    // console.log(isJsonString(currentSearchCache));
    // console.log(typeof currentSearchCache);

    return isJsonString(currentSearchCache) ? JSON.parse(currentSearchCache) : null;
}

export const updateSummarySearchCache = (rawData) => {
    // Save summary data to localStorage
    localStorage.setItem(SUMMARY_SEARCH_CACHE_NAME, JSON.stringify(rawData));
}

export const getSummaryHistoryCache = () => {
    let currentHistoryCache = localStorage.getItem(SUMMARY_HISTORY_CACHE_NAME);
    // console.log(currentHistoryCache);
    if (!currentHistoryCache) {
        currentHistoryCache = localStorage.setItem(SUMMARY_HISTORY_CACHE_NAME, []);
    }

    return isJsonString(currentHistoryCache) ? JSON.parse(currentHistoryCache) : [];
}

export const updateSummaryHistoryCache = (rawData) => {
    // Save search history data to localStorage
    // 1. Search query
    // 2. Search datetime
    const currentHistory = getSummaryHistoryCache();
    // console.log(currentHistory);
    currentHistory.push(rawData);
    localStorage.setItem(SUMMARY_HISTORY_CACHE_NAME, JSON.stringify(currentHistory));
    // if (currentHistory) {
    // } else {
    //     localStorage.setItem(SUMMARY_HISTORY_CACHE_NAME, JSON.stringify(rawData));
    // }
}

const SummaryProvider = ({ children }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search_query');
    const [baseData, setBaseData] = useState(getSummarySearchCache() || []);
    const [eventData, setEventData] = useState(null);
    const [mainQuery, setMainQuery] = useState("");
    const [eventOpened, setEventOpened] = useState(false);
    const [isFetchingSummary, setIsFetchingSummary] = useState(false);
    const [moreSummary, setMoreSummary] = useState(baseData);
    const [showOnlySummaries, setShowOnlySummaries] = useState(false);
    const [searchSummaryData, setSearchSummaryData] = useState([]);
    const [isSearchDataFetched, setIsSearchDataFetched] = useState(false);
    const [aiGeneratedData, setAiGeneratedData] = useState(baseData?.aiGeneratedData || []);

    const deleteSummarySearchCache = () => {
        localStorage.removeItem(SUMMARY_SEARCH_CACHE_NAME);
    }

    const readSummarySearchCache = (key) => {
        const parsedSummarySearchCache = getSummarySearchCache();
        return parsedSummarySearchCache ? parsedSummarySearchCache[key] : null;
    }

    const query = useCallback((searchInput) => {
        setMainQuery(searchInput);
    }, []);

    const updateSummaryBaseData = (newSummaryData) => {
        setBaseData(newSummaryData);
        // if (!newSummaryData.streaming) {
        //     updateSummarySearchCache(JSON.stringify(newSummaryData));
        // }
    }

    const resetShowOnlySummaries = () => {
        setShowOnlySummaries(false);
    }

    const updateShowOnlySummaries = () => {
        setShowOnlySummaries(!showOnlySummaries);
    }

    const updateMoreSummary = (moreSummaryData) => {
        setMoreSummary(moreSummaryData);
        // rewrite the localStorage
        // if (!moreSummaryData.streaming) {
        //     updateSummarySearchCache(JSON.stringify(moreSummaryData));
        // }
    }

    const updateBaseDataWithSummaries = (_summaryData) => {
        baseData.summaries.push(_summaryData);
        // setBaseData(v => {v, "summaries": [_summaryData, ...v.summaries]});
        // setBaseData(v => [v, {"summaries": [_summaryData, ...v.summaries]}]);
        // console.log(baseData);
        setBaseData(baseData);
        updateSummarySearchCache(baseData);
    }

    const updateSearchSummaryData = (_searchSummaryData) => {
        setSearchSummaryData(v => [_searchSummaryData, ...v]);
        // setSearchSummaryData(_searchSummaryData);
    }

    const resetSearchSummaryData = () => {
        setSearchSummaryData([]);
    }

    const updateIsSearchDataFetched = (_fetchedFlag) => {
        setIsSearchDataFetched(_fetchedFlag);
    }

    const updateIsFetchingSummary = (_fetchingFlag) => {
        setIsFetchingSummary(_fetchingFlag)
    }

    const resetAiGeneratedData = () => {
        setAiGeneratedData([]);
    }

    const updateAiGeneratedData = (_aiGeneratedData) => {
        setAiGeneratedData(_aiGeneratedData);
        // console.log(baseData.aiGeneratedData);
        // console.log(_aiGeneratedData);
        // baseData.aiGeneratedData = _aiGeneratedData;
        // setBaseData(baseData);
        // updateSummarySearchCache(baseData);
        // console.log([{"aiContent": _aiGeneratedData, ...baseData}]);
        // setBaseData([{"aiContent": _aiGeneratedData, ...baseData}]);
        // if (baseData.aiGeneratedData) {
        //     console.log(baseData);
        //     // baseData.aiGeneratedData.push(_aiGeneratedData[0]);
        //     // console.log(baseData.aiGeneratedData);
        //     // setBaseData(baseData);
        // }
        // updateSummarySearchCache([{"aiContent": _aiGeneratedData, ...baseData}]);
        // console.log(baseData);
    }

    useEffect(() => {
        baseData.aiGeneratedData = aiGeneratedData;
        setBaseData(baseData);
        updateSummarySearchCache(baseData);
    }, [aiGeneratedData]);

    const summaryData = useCallback((res) => {
        setBaseData(res);
    }, [mainQuery]);

    const summary = useCallback((searchQuery) => {
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
            const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${searchQuery}`, { fetchConfig });
            eventSource.onopen = (event) => {
                console.log("Opened Event stream useSummaryContext");
            }
            console.log(eventSource);
            if (eventSource.readyState === 1 || EventSource.CLOSED) {
                eventSource.close();
            }

            eventSource.onmessage = (event) => {
                console.log(event.data);
                setEventData(event.data);
            }
        } catch (err) {
            console.error(err);
            return;
        }

        // return () => {
        //     eventSource.close();
        //     console.log("Closed event source - event streaming");
        // }

        return { eventData, baseData };
    }, [searchQuery]);


    // useEffect(() => {
    //     setBaseData(baseData);
    //     console.log(baseData);
    // }, [baseData]);

    return (
        <SummaryContext.Provider
            value={{
                searchQuery,
                summary,
                eventData,
                baseData,
                updateSummaryBaseData,
                updateBaseDataWithSummaries,
                mainQuery,
                query,
                summaryData,
                eventOpened,
                setEventOpened,
                isFetchingSummary,
                setIsFetchingSummary,
                moreSummary,
                updateMoreSummary,
                showOnlySummaries,
                updateShowOnlySummaries,
                resetShowOnlySummaries,
                searchSummaryData,
                updateSearchSummaryData,
                resetSearchSummaryData,
                isSearchDataFetched,
                updateIsSearchDataFetched,
                updateIsFetchingSummary,
                aiGeneratedData,
                updateAiGeneratedData,
                resetAiGeneratedData
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
}

export const useSummaryContext = () => useContext(SummaryContext);

export default SummaryProvider;