import { useCallback, useEffect, useState } from "react";
import { useSummaryContext } from "../context";

const useSummary = () => {
    const { searchQuery } = useSummaryContext();
    const [data, setData] = useState({});
    const [eventData, setEventData] = useState(null);

    const summary = useCallback((query) => {
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

        // return () => {
        //     eventSource.close();
        //     console.log("Closed event source - event streaming");
        // }

        return { eventData, data };
    }, [searchQuery]);


    useEffect(() => {
        setData(data);
        console.log(data);
    }, [eventData, data]);

    return summary;
}

export default useSummary;