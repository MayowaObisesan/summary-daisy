import { CloudPauseIcon } from "../assets/icons";
import { EmptyPageFooter } from "./Footer";

const EmptySummaryUI = () => {
    return (
        <section className={"flex flex-col fixed w-full h-[80%] lg:h-full"}>
            <section className={"flex-1 flex flex-col justify-center items-center gap-6 bg-base-200 lg:bg-base-100"}>
                <div>
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
                    <div className="text-slate-400">
                        <CloudPauseIcon width={96} height={96} strokeWidth={1} />
                    </div>
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