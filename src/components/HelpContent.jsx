import { Link } from "react-router-dom"
import { SummaryGradientText } from "./SummaryText"

export const HelpContent = ({ children }) => {
    return (
        <>
            <div className="my-4">
                <header className="flex flex-row items-center px-4">
                    <span className="flex-1 font-bold text-3xl">Help</span>
                    {/* <div className="flex-shrink-0">
                        <svg className="flex-shrink-0 h-6 w-6 text-yellow-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                    </div> */}
                </header>
            </div>
            <div className="px-4 pt-6 pb-2 space-y-4 leading-6">
                <header className="font-semibold text-lg text-base-content dark:text-gray-400">What is <SummaryGradientText />?</header>
                <div>
                    Summary is a platform that summarizes your search results in real-time.
                </div>
                <div>
                    It performs your search and returns a summary of each website from your search.
                </div>
                <div>Summary leverages search engines to generate search results and and summary those results real-time</div>
                <div>
                    Works like a search engine like google search, <strong>but it reads each search result and returns a bullet summary of each of the website that was returned from your search.</strong>
                </div>
                <div className="divider dark:divider-neutral py-5 lg:hidden"></div>
                <div className="lg:pt-5">
                    <Link to={"/about"} className="flex items-center space-x-2 font-bold">
                        <span>Read more here</span>
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                </div>
            </div>
            {/* <li></li> */}
            <section className="hidden my-8 px-4 space-y-4">
                <header className="font-bold text-xl">
                    Other info
                </header>
                <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Blog
                    </div>
                    <div className="collapse-content">
                        <p className="text-gray-600">Coming soon</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Roadmap
                    </div>
                    <div className="collapse-content">
                        <p className="text-gray-600">Coming soon</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-100">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Contact
                    </div>
                    <div className="collapse-content">
                        <div className="text-gray-800 dark:text-gray-400">
                            Developed by: Mayowa Obisesan
                        </div>
                    </div>
                </div>
            </section>
            {children}
            <div className="relative hidden lg:fixed left-0 bottom-0 mx-auto w-full lg:flex flex-col text-center overflow-hidden leading-8">
                Built by Blessed
            </div>
        </>
    )
}