import { useWindowSize } from "@uidotdev/usehooks";
import { HelpIconSquircle } from "../assets/icons";
import { EmptyPageFooter } from "./Footer";
import { deviceWidthEnum } from "../helpers";

const EmptySummaryUI = () => {
    const size = useWindowSize();
    return (
        <section className={"flex flex-col fixed w-full h-[80%] lg:h-[88%]"}>
            <section className={"flex-1 flex flex-col justify-center items-center gap-6 bg-gray-100/80 dark:bg-base-200 lg:bg-base-100 dark:lg:bg-base-300"}>
                {/* <SummaryGradientText classes="font-bold text-5xl py-8" />
                <DesktopSummaryFormComponent setData={updateSummaryBaseData} /> */}
                {/* <label className="swap text-6xl">
                    <div className="swap-on"><CloudSearchIcon /></div>
                    <div className="swap-on">🥵</div>
                    <div className="swap-off">🥶</div>
                </label>
                <label className="swap swap-active text-6xl">
                    <div className="swap-on text-slate-400/80">
                    </div>
                    <div className="swap-on">🥳</div>
                    <div className="swap-off">😭</div>
                </label> */}
                <div>
                    {
                        size.width <= deviceWidthEnum.laptop
                            ? <div className="text-gray-300">
                                <HelpIconSquircle width={96} height={96} strokeWidth={1} />
                            </div>
                            : <div className="text-gray-300 dark:text-gray-600">
                                <HelpIconSquircle width={120} height={120} strokeWidth={1} />
                            </div>
                    }
                </div>
                <div className="text-lg lg:text-xl">
                    Nothing to summarize
                </div>
            </section>
            <div className={"fixed bottom-0 w-full"}>
                <EmptyPageFooter />
            </div>
        </section>
    )
}

export default EmptySummaryUI;