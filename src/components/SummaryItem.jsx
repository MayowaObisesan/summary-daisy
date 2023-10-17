export const SummaryItem = (props) => {
    return (
        <>
            {
                props.summarized
                && <span className="absolute right-6 text-gray-600 font-medium text-xs">Summary</span>
            }
            < a href={props.link} className="text-xs text-gray-500" > {props.title}</a >
            <div className="py-4">
                {props.content ?? props.text ?? props.summary_text ?? props.snippet}
            </div>
            <a href={props.link} className="text-sm hover:bg-base-100">
                <div className="flex">
                    <img src={props.src || props.icon} alt="" className="w-5 h-5 rounded-full" />
                    <span className="px-2">{props.link}</span>
                </div>
            </a>
        </>
    )
}

export const SummarySingleItem = (props) => {
    return (
        <div className="relative w-full px-2 pt-2 pb-2 my-2 rounded-lg bg-neutral-200/30 dark:bg-base-100">
            <div className="bg-white shadow rounded-md px-4 pt-3 pb-3 dark:bg-inherit">
                <SummaryItem {...props} />
            </div>
        </div>
    );
}

export const SummaryGroupItem = (props) => {
    return (
        <div className="relative flex-none w-full max-w-xs bg-base-100 px-6 pt-4 pb-4 mx-2 my-2 rounded-lg lg:max-w-sm">
            <SummaryItem {...props} />
        </div>
    )
}

export const SummaryGroup = ({ hostName, children }) => {
    return (
        <section className="bg-base-200 rounded-md px-2 pt-4 pb-2">
            <div className="relative flex flex-row items-center w-full h-8 flex-1 px-4">
                <span>Results from <b>{hostName}</b></span>
                <span className="absolute right-2 bg-success w-8 h-8 leading-8 rounded-full text-center font-bold dark:bg-primary">{children.length}</span>
            </div>
            <section className="flex flex-row flex-nowrap justify-start items-stretch bg-base-200 p-1 overflow-x-auto rounded-md lg:p-2">
                {/* <div className="flex-none w-9/12 bg-orange-600 mx-2"></div> */}
                {children}
            </section>
        </section>
    )
}