import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SummaryContext = createContext();

const SummaryProvider = ({ children }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search_query');
    const [baseData, setBaseData] = useState([]);
    const [eventData, setEventData] = useState(null);
    const [mainQuery, setMainQuery] = useState("");
    const [eventOpened, setEventOpened] = useState(false);
    const [isFetchingSummary, setIsFetchingSummary] = useState(false);
    const [moreSummary, setMoreSummary] = useState(baseData);

    const query = useCallback((searchInput) => {
        setMainQuery(searchInput);
    }, []);

    const updateSummaryBaseData = (newSummaryData) => {
        setBaseData(newSummaryData);
    }

    const updateMoreSummary = (moreSummaryData) => {
        setMoreSummary(moreSummaryData);
    }

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
                mainQuery,
                query,
                summaryData,
                eventOpened,
                setEventOpened,
                isFetchingSummary,
                setIsFetchingSummary,
                moreSummary,
                updateMoreSummary
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
}

export const useSummaryContext = () => useContext(SummaryContext);

export default SummaryProvider;