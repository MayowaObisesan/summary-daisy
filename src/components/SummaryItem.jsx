import Markdown from "react-markdown";
import {ConvertToList} from "../helpers";
import { ChecksIcon } from "../assets/icons";
import { useSummaryContext } from "../context";
import classNames from "classnames";
import {useEffect} from "react";

const processSummaryDataIcon = (props) => {
    const url = props.url || props.icon;
    const fromPageMapImage = props.pagemap?.cse_image ? props.pagemap?.cse_image[0]?.src : "";
    const fromPageMapThumbnail = props.pagemap?.cse_thumbnail ? props.pagemap?.cse_thumbnail[0]?.src : "";
    const fromPageMapMetatagsOg = props.pagemap?.metatags ? props.pagemap?.metatags[0]["og:image"] : "";
    const fromPageMapMetatagsTwitter = props.pagemap?.metatags ? props.pagemap?.metatags[0]["twitter:image"] : "";
    // console.log([url, fromPageMapImage, fromPageMapThumbnail, fromPageMapMetatagsTwitter, fromPageMapMetatagsOg])
    const validIconUrl = [url, fromPageMapImage, fromPageMapThumbnail, fromPageMapMetatagsTwitter, fromPageMapMetatagsOg].filter((it) => it !== "" && it !== undefined && it !== null).filter(it => !(it?.startsWith("/")));
    // console.log(validIconUrl);
    // .map((eachIcon) => !(eachIcon?.startsWith("/")))
    // if (url.startsWith("/")) {
    //     // return `${props.hostName}`
    // }
    // return validIconUrl.join("|");
    return validIconUrl[0];
}

export const SummaryItem = (props) => {
    const {isFetchingSummary, isSearchDataFetched, searchSummaryData} = useSummaryContext();
    // console.log(props);

    <section className={"card card-compact bg-base-200 m-2"}>
        <div className="card-body flex flex-row items-center">
            <div className="flex-1">Show only summaries</div>
            <div className="">
                <input type="checkbox" className="toggle toggle-success" />
            </div>
        </div>
    </section>

    // useEffect(() => {
    //     console.log("Inside summary item to listen to summary text");
    //     console.log(searchSummaryData.length);
    // }, [searchSummaryData.length]);
    //
    // useEffect(() => {
    //     console.log("Inside summary item to listen to summary text without length");
    // }, [searchSummaryData]);

    // console.log(searchSummaryData);
    let summaryText;
    if (props.summaries?.length > 0) {
        // const _summaryStreamText = searchSummaryData?.filter(it => it.url === props.link);
        const _summaryStreamText = props.summaries?.filter(it => it.url === props.link);
        summaryText = _summaryStreamText[0]?.summary_text;
        // Object.assign(props, {"summary_text": summaryText});
        // props.summary_text = summaryText;
    } else {
        summaryText = null;
    }
    // const summaryText = "";
    // console.log("_summary Stream Text", _summaryStreamText);
    const searchText = props.content || props.text || props.summary_text || props.snippet || props.htmlSnippet;

    return (
        <>
            {
                summaryText
                && <span className="absolute flex justify-center items-center w-8 h-8 top-3 right-2 text-teal-800 font-semibold text-xs bg-base-200/50 rounded-md">
                    <ChecksIcon width={16} height={16} strokeWidth={2} />
                </span>
            }
            {
                props.summaries?.filter(it => it.url === props.link)?.length < 1 && isSearchDataFetched
                && <span
                    className="absolute flex justify-center items-center w-8 h-8 top-3 right-2 font-semibold text-xs bg-base-200/20 rounded-md">
                    <span className="loading loading-dots loading-sm"></span>
                </span>
            }
            {

            }
            <a href={props.link} className="font-semibold text-xs text-green-800 dark:font-medium dark:text-green-800" > {props.title}</a>
            <div className={
                classNames(
                    "py-4 list-disc leading-6",
                    {"px-4 mt-4 bg-gray-200/60 rounded-xl dark:bg-base-200/80": summaryText}
                )
            }>
                <Markdown>
                    {searchText}
                </Markdown>
            </div>
            {
                summaryText &&
                <div className="summary-list py-4 list-disc leading-6">
                    <div className={"font-medium text-sm px-4 py-1 inline-block rounded-lg bg-gray-200/80 dark:bg-base-200/80"}>Website summary</div>
                    <Markdown>
                        {summaryText}
                    </Markdown>
                </div>
            }
            <a href={props.link} className="text-sm hover:bg-base-100" target="_blank" rel="noreferrer">
                <div className="flex items-center">
                    {
                        processSummaryDataIcon(props)
                            ? <img srcSet="" src={processSummaryDataIcon(props)} alt="a" className="w-6 h-6 rounded-full" />
                            : <div className={"w-6 h-6 leading-6 rounded-full bg-green-200 text-center"}></div>
                    }
                    <span className="w-full px-2 truncate">{props.link}</span>
                </div>
            </a>
        </>
    )
}

export const SummarySingleItem = (props) => {
    const { showOnlySummaries, searchSummaryData } = useSummaryContext();

    let summaryText;
    if (props.summaries?.length > 0) {
        const _summaryStreamText = props.summaries?.filter(it => it.url === props.link);
        summaryText = _summaryStreamText[0]?.summary_text;
    } else {
        summaryText = null;
    }

    if (showOnlySummaries && !summaryText) {
        return null;
    }
    return (
        <div className="relative w-full px-2 pt-2 pb-2 my-2 rounded-lg bg-gray-100/60 dark:bg-base-100">
            <div className="bg-white shadow rounded-md px-4 pt-3 pb-3 dark:bg-inherit dark:shadow-none">
                {
                    <SummaryItem {...props} />
                }
            </div>
        </div>
    );
}

export const SummaryGroupItem = (props) => {
    const { showOnlySummaries, searchSummaryData } = useSummaryContext();

    let summaryText;
    if (props.summaries?.length > 0) {
        const _summaryStreamText = props.summaries?.filter(it => it.url === props.link);
        summaryText = _summaryStreamText[0]?.summary_text;
    } else {
        summaryText = null;
    }

    if (showOnlySummaries && !summaryText) {
        return null;
    }

    return (
        <div className="relative flex-none w-full max-w-[88%] md:max-w-[72%] bg-base-100 shadow px-6 pt-4 pb-4 mx-2 my-2 rounded-lg lg:max-w-[72%]">
            <SummaryItem {...props} />
        </div>
    )
}

export const SummaryGroup = ({ hostName, children }) => {
    return (
        // bg-blue-200/20
        <section className="bg-gray-100/80 rounded-md px-1 md:px-2 pt-4 pb-2 my-2 dark:bg-base-200">
            <div className="relative flex flex-row items-center w-full h-8 flex-1 px-4">
                <span>Results from <b>{hostName}</b></span>
                <span className="absolute right-2 bg-green-200 w-8 h-8 leading-8 rounded-full text-center font-bold dark:bg-green-700">{children.length}</span>
            </div>
            <section className="flex flex-row flex-nowrap justify-start items-stretch bg-inherit p-1 overflow-x-auto rounded-md lg:p-2 dark:bg-base-200">
                {/* <div className="flex-none w-9/12 bg-orange-600 mx-2"></div> */}
                {children}
            </section>
        </section>
    )
}