import { CloudPauseIcon, CloudSearchIcon } from "../assets/icons";

const EmptySummaryUI = () => {
    return (
        <section className={"flex flex-col justify-center items-center gap-6 h-[80%]"}>
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
                    <CloudPauseIcon width={112} height={112} strokeWidth={1} />
                </div>
            </div>
            <div className="text-lg lg:text-xl">
                Nothing to summarize
            </div>
        </section>
    )
}

export default EmptySummaryUI;