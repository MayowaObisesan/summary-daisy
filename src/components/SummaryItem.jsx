import Markdown from "react-markdown";
import { ConvertToList } from "../helpers";
import { ChecksIcon } from "../assets/icons";

export const SummaryItem = (props) => {
    const summaryText = props.content ?? props.text ?? props.summary_text ?? props.snippet;

    return (
        <>
            {
                props.summary_text
                && <span className="absolute flex justify-center items-center w-8 h-8 top-3 right-2 text-teal-800 font-semibold text-xs bg-base-200/50 rounded-md">
                    <ChecksIcon width={16} height={16} strokeWidth={2} />
                </span>
            }
            <a href={props.link} className="font-semibold text-xs text-green-800 dark:font-medium dark:text-green-800" > {props.title}</a>
            <div className="summary-list py-4 list-disc leading-6">
                <Markdown>
                    {summaryText}
                </Markdown>
            </div>
            <a href={props.link} className="text-sm hover:bg-base-100" target="_blank" rel="noreferrer">
                <div className="flex">
                    <img src={props.src || props.icon} alt="" className="w-5 h-5 rounded-full" />
                    <span className="w-full px-2 truncate">{props.link}</span>
                </div>
            </a>
        </>
    )
}

export const SummarySingleItem = (props) => {
    return (
        <div className="relative w-full px-2 pt-2 pb-2 my-2 rounded-lg bg-gray-100/60 dark:bg-base-100">
            <div className="bg-white shadow rounded-md px-4 pt-3 pb-3 dark:bg-inherit dark:shadow-none">
                <SummaryItem {...props} />
            </div>
        </div>
    );
}

export const SummaryGroupItem = (props) => {
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
                <span className="absolute right-2 bg-green-200 w-8 h-8 leading-8 rounded-full text-center font-bold dark:bg-primary">{children.length}</span>
            </div>
            <section className="flex flex-row flex-nowrap justify-start items-stretch bg-inherit p-1 overflow-x-auto rounded-md lg:p-2 dark:bg-base-200">
                {/* <div className="flex-none w-9/12 bg-orange-600 mx-2"></div> */}
                {children}
            </section>
        </section>
    )
}