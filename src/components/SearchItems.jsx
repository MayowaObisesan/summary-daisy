const SummaryItem = ({ itemType, groupedResult, hostName }) => {
    console.log("Inside summary item")
    const SummaryItemCommon = () => {
        return (
            <>
                <div className={"relative pct:w-100 font-12 font-medium h-3 lh-3 pad-x2 color-rebeccapurple color-191E30 text-ellipsis hover:underline-offset-3 hover:underline hover:decoration-3 dark:color-gray dark:h-5|lh-5|color-lightgray"}>{groupedResult?.title}</div>
                <a href={groupedResult?.link} target="_blank" rel="noreferrer" data-href="/summary/url" className={"d-block decoration-none pct:w-100 cursor-pointer text-ellipsis pad-x2 pad-y1 border:0px_solid_D4D4D4 em:border-t-0.04 hover:bg-lighter lg:border-0 dark:border:0px_solid_222222 dark:em:border-t-0.05 dark:hover:bg-4444"}>
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
            ? <section className="relative flex-grow flex-noshrink flex flex-column justify-between align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-E4E4E4 mg-y2 bg-inherit lg:shadow:0px-0px-8px-1px-D8D8D8 dark:bg-121714 dark:shadow-unset dark:border:1px_solid_444444">
                {/* For grouped items */}
                <SummaryItemCommon />
            </section>
            : <section className={"relative flex flex-column justify-start align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-D8D8D8 mg-b4 bg-inherit lg:mg-x-auto|shadow:0px-0px-0px-1px-transparent dark:bg-121714 dark:shadow-unset dark:border:0px_solid_444444"}>
                {/* For single items */}
                <SummaryItemCommon />
            </section>
    )
}

export default SummaryItem;