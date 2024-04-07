import axios from "axios";
import localforage from "localforage";
import { redirect } from "react-router-dom";
import { testData3 } from "../TestData";
// import { testData3 } from "./TestData";

// console.log(process.env)

let summaryStore = localforage.createInstance({
    name: "summaryDB",   // dbName
    storeName: "summaryTable",
    description: "This is summary's DB Table"
});

// Create another table in the same summaryDB
// let summaryTrendStore = localforage.createInstance({
//     name: "summaryDB",
//     storeName: "trendsTable",
//     description: "This is summary's trends DB table"
// });

// Create another DB entirely
// let summaryBackupStore = localforage.createInstance({
//     name: "summaryBackupDB",
//     storeName: "summaryBackupTable",
//     description: "This is the backup to the offline version of Summary"
// })

export async function getSummaryTrends() {
    let data = null;
    let isLoading = true;
    let isError = false;

    const fetchConfig = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            // 'Origin': '*',
            // 'Authorization': `Bearer ${window.localStorage.getItem('nine_login')}`
        },
        modes: 'cors',  // options: cors, no-cors, same-origin
        cache: 'default',   // options: default, no-store, reload, no-cache, force-cache, only-if-cached
    }
    await axios(`${process.env.REACT_APP_BASE_URL}/trends/`, fetchConfig)
        .then(response => {
            if (response.status > 400) {
                // return setResponseDetails('Error fetching apps. Try again.');
                redirect('/')
            }
            return response.data
        })
        .then(resData => {
            isLoading = false;
            console.log(resData.results)
            data = resData
        }).catch(err => {
            console.log('Error fetch trends: ' + err)
            isLoading = false;
            // data = [];
            isError = true;
        });
    return { data, isLoading, isError }
}

export function groupSummaryData(array_to_group) {
    // You can pass in a dict as an argument, e.g., data as an argument
    // const data = { /* your data object here */ };

    // const result = data.data.reduce((acc, curr) => {
    const result = array_to_group.reduce((acc, curr) => {
        const { displayLink, ...rest } = curr.data;
        if (acc[displayLink]) {
            acc[displayLink].push(rest);
        } else {
            acc[displayLink] = [rest];
        }
        return acc;
    }, {});

    // console.log(result);
    return result;
}

export function groupData(array_to_group) {
    // You can pass in a dict as an argument, e.g., data as an argument
    // const data = { /* your data object here */ };

    // const result = data.data.reduce((acc, curr) => {
    const result = array_to_group.reduce((acc, curr) => {
        const { displayLink, ...rest } = curr;
        if (acc[displayLink]) {
            acc[displayLink].push(rest);
        } else {
            acc[displayLink] = [rest];
        }
        return acc;
    }, {});

    // console.log(result);
    return result;
}

export async function getSummary(searchQuery) {
    let data = {};
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

    const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/summary?search_input=${searchQuery}`, { fetchConfig });
    eventSource.onopen = (event) => {
        console.log("Opened Event stream");
    }
    if (eventSource.readyState === 1) {
        eventSource.close();
    }
    eventSource.onmessage = (event) => {
        // console.log(event);
        // console.log(event.event);
        // let summary_url = event.data['url']?.toString() || "";
        // let summary_title = event.data['summary_title']?.toString() || "";
        // let summary_text = event.data['summary_text']?.toString() || "No content";
        // const searchResult = event.data['results'] || [];
        // const nextPage = event.data['next_page_url'] || "";

        data.isLoading = false;
        if (event.data['summary_error']?.toString() !== undefined || event.data['error']?.toString() !== undefined) {
            data.error = true;
            data.success = false;
        } else {
            data.error = false;
            data.success = true;
        }
        // Update the result dict, the offline data.
        resultDict.isLoading = data.isLoading;
        resultDict.error = data.error;
        resultDict.success = data.success;
        resultDict.searchInput = searchQuery;
        // update the searchInputElement with the current Search Query
        // searchInputElement.setAttribute("data-currentSearchQuery", searchInputValue);
        resultDict.searchInformation = data.searchInformation;
        console.log(data);
        // console.log(result_dict);
        let event_data = JSON.parse(event.data);
        data.streaming = event_data.streaming;
        data.streamed_count = event_data.streamed_count;
        data.searchInformation = event_data.searchInformation;
        data.currentStartIndex = event_data.queries?.request[0]?.startIndex;
        data.nextStartIndex = event_data.queries?.nextPage[0]?.startIndex;
        resultDict.searchInformation = data.searchInformation;
        resultDict.currentStartIndex = data.currentStartIndex;
        resultDict.nextStartIndex = data.nextStartIndex;
        resultArray.push(event_data);
        // let grouped_resultArray = nestedGroupBy(resultArray, 'host');
        // console.log(grouped_resultArray)
        group_data = groupData(resultArray);
        // console.log(group_data);
        resultGroupArray.splice(0, resultGroupArray.length);
        resultGroupArray.push(group_data);
        // console.log(resultGroupArray[0]);
        // resultArray = Array.from(group_data);
        // let summarySearchLocalData = writeLocalStore('summary-search', resultDict);
        // summarySearchLocalData?.set(resultDict);
        summaryStore.setItem(searchQuery, resultDict);

        // Stop pinging the server if there's no more streaming from the server
        if (!event_data.streaming) {
            eventSource.close();
            console.log("Closed event source - event streaming");
        }
    };
    data.data = resultGroupArray;

    // await axios(`${process.env.REACT_APP_BASE_URL}/summary`, fetchConfig)
    //     .then(response => {
    //         if (response.status > 400) {
    //             // return setResponseDetails('Error fetching apps. Try again.');
    //             redirect('/')
    //         }
    //         return response.data;
    //     })
    //     .then(resData => {
    //         isLoading = false;
    //         console.log(resData.results)
    //         data = resData
    //         if (data.next) nextPageData = { hasNextPage: true, next: data.next }
    //     }).catch(err => {
    //         console.log('Error fetch summary: ' + err)
    //         isLoading = false;
    //         // data = [];
    //         isError = true;
    //     });
    return { data, isLoading, isError, nextPageData }
}

export async function dummySummary() {
    const data = testData3;
    const isLoading = true;
    const isError = false;
    const nextPageData = null;

    return { data, isLoading, isError, nextPageData };
}