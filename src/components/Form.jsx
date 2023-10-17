import { useRef } from "react";
import { Form } from "react-router-dom";

export const MobileSummaryFormComponent = () => {
    const searchInputElement = useRef(null);
    const searchFormSubmitButton = useRef(null);
    const focusSearchInput = () => { }
    const handleSearchInput = () => {
        searchInputElement.current?.value.trim().length > 0
            ? searchFormSubmitButton.current?.removeAttribute("disabled")
            : searchFormSubmitButton.current?.setAttribute("disabled", "disabled")
    }
    return (
        <Form method="GET" className="sticky bottom-0 bg-white-transparent pad-x-4 pad-y-5 bg-27CE6234 bg-mica z-1000 radius-top-left-sm radius-top-right-sm radius focus-within:bg-27CE8E transition:background_200ms_ease_200ms lg:w-768 lg:max-w-768 lg:mg-x-auto">
            <div className={"relative flex flex-row justify-center align-items-center pct:w-100 outline:0px_solid_lightgray pad-x2 border-0 bg-white dark:bg-black-transparent radius"}>
                <input
                    type="text"
                    name="search_query"
                    placeholder="What should I search and summarize?"
                    id=""
                    className={"outline-none border-0 pct:w-96 h-8 md:h-8 lg:h-8 font-regular font-14 lg:font-15 md:pad-x2 lg:pad-x2 radius-round bg-EE bg-transparent dark:color-lightgray focus:shadow:0px-0px-0px-0px-white transition:width_400ms_ease|border-radius_200ms_ease|box-shadow_200ms_ease-in_200ms|background_200ms_ease_200ms|all_200ms_ease placeholder:color-989898"}
                    onFocus={focusSearchInput}
                    onInput={handleSearchInput}
                    ref={searchInputElement} />
                <button
                    type="submit"
                    className="border-0 outline-0 focus:shadow:0px-0px-8px-1px-gray|0px-0px-16px-8px-green h-40 w-56 bg-27CE8E radius-round cursor-pointer disabled:bg-green-inverse"
                    data-summary_submit_type="search"
                    disabled="disabled"
                    ref={searchFormSubmitButton}>
                    <span className="fa fa-search color-white"></span>
                </button>
            </div>
        </Form>
    )
}

export const DesktopSummaryFormComponent = () => {
    const searchInputElement = useRef(null);
    const searchFormSubmitButton = useRef(null);
    const focusSearchInput = () => { }
    const handleSearchInput = () => {
        searchInputElement.current?.value.trim().length > 0
            ? searchFormSubmitButton.current?.removeAttribute("disabled")
            : searchFormSubmitButton.current?.setAttribute("disabled", "disabled")
    }
    const summaryLanguages = ["English", "Pidgin", "Yoruba", "Hausa", "Igbo", "German", "French", "Spanish", "Russian", "Swedish", "Chinese"];

    return (
        <Form method="GET" className="form-control relative flex flex-col justify-center align-items-center w-full max-w-2xl bg-white-transparent pad-x-4 pad-y-5 bg-mica z-1000 radius focus-withi:bg-27CE8E transition:background_200ms_ease_200ms dark:bg-transparent">
            <div className={"input flex-1 flex flex-row outline:0px_solid_lightgray border-0 border:2px_solid_D8D8D8 bg-orange rounded-lg ring-2 ring-neutral-700 outline:2px_solid_666666|outline-offset-2 dark:border:1px_solid_444444"}>
                <input
                    type="text"
                    name="search_query"
                    placeholder="What should I search and summarize?"
                    id=""
                    className="input input-lg input-ghost outline-0 focus:ring-transparent w-full text-sm"
                    // className={"outline-none border-0 pct:w-96 h-8 md:h-8 lg:h-8 font-regular lg:font-12 md:pad-x2 lg:pad-x2 radius-round bg-EE bg-transparent dark:color-lightgray focus:shadow:0px-0px-0px-0px-white transition:width_400ms_ease|border-radius_200ms_ease|box-shadow_200ms_ease-in_200ms|background_200ms_ease_200ms|all_200ms_ease placeholder:color-787878"}
                    onFocus={focusSearchInput}
                    onInput={handleSearchInput}
                    ref={searchInputElement} />
                {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
                <button
                    type="submit"
                    className="btn border-0 outline-0 focus:shadow:0px-0px-8px-1px-gray|0px-0px-16px-8px-green h-5 w-6 bg-27CE8E radius-round cursor-pointer disabled:bg-green-inverse"
                    data-summary_submit_type="search"
                    disabled="disabled"
                    ref={searchFormSubmitButton}>
                    <span className="fa fa-search color-white"></span>
                </button>
            </div>
            <div className={"flex flex-row flex-nowrap justify-start align-items-center mt-2 mb-1 w-full overflow-x-auto"}>
                {
                    summaryLanguages.map((eachLanguage, index) => {
                        return (
                            <div key={index} className={"btn btn-sm lh-4 mr-2 px-2 rounded-md shadow cursor-pointer hover:bg-light|shadow:0px-0px-2px-0px-gray transition:background_200ms_ease dark:color-white dark:hover:bg-darkgray"}>{eachLanguage}</div>
                        )
                    })
                }
            </div>
        </Form>
    )
}