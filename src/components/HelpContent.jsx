import { Link } from "react-router-dom"
import { SummaryGradientText } from "./SummaryText"
import { ContactCard } from "./ContactCard"

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
                <ol className="marker:text-base-content list-decimal ps-5 space-y-2 text-sm text-gray-600 dark:text-base-content leading-10">
                    <li>
                        Summary is a platform that <strong>summarizes your search results</strong> in real-time.
                    </li>
                    <li>
                        It performs your search and returns a summary of each website from your search.
                    </li>
                    <li>
                        <strong>Summary leverages search engines</strong> to generate search results and and summary those results in real-time.
                    </li>
                    <li>
                        Summary works similar to a search engine like google search, <strong>but it reads each search result and returns a bullet summary of each of the website that was returned from your search.</strong>
                    </li>
                    <li>
                        Summary only summarizes web page contents, <strong>it does not generate web page contents</strong>.
                    </li>
                </ol>
                <div>
                </div>
                <div></div>
                {/* <div className="divider dark:divider-neutral py-5 lg:hidden"></div> */}
                {/* <div className="lg:pt-5">
                    <Link to={"/about"} className="flex items-center space-x-2 font-bold">
                        <Link to="/about">Read more here</Link>
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                </div> */}
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
            {/* <div className="relative hidden lg:fixed left-0 bottom-0 mx-auto w-full lg:flex flex-col text-center overflow-hidden leading-8">
                Built by Blessed
            </div> */}
            <div className="relative hidden lg:fixed left-0 bottom-4 w-full mx-auto lg:flex flex-col items-center text-left leading-8">
                {/* Contact: <a href={"mailto:summary.create@gmail.com"}>summary.create@gmail.com</a> */}
                {/* <a href={"tel:summary.create@gmail.com"}>+2349137823897</a> */}
                <details className="dropdown dropdown-top w-full">
                    <summary className="btn btn-ghost btn-block justify-between">
                        <span className="">Built in 🇳🇬 by Blessed</span>
                        <span type="button" className="flex justify-center items-center h-10 w-10 text-sm font-semibold rounded-lg bg-base-100 dark:bg-base-100">
                            <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                        </span>
                    </summary>
                    <div tabIndex={0} className="dropdown-content z-[1] menu w-full lg:w-80 my-1 p-1 shadow bg-base-100 dark:bg-base-200 rounded-box">
                        <ContactCard></ContactCard>
                        {/* <div class="flex p-4">
                                                <div class="flex-shrink-0 text-warning">
                                                    <svg class="h-5 w-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                                </div>
                                                <div class="ms-4">
                                                    <h3 class="text-gray-800 font-semibold dark:text-white">
                                                        Work in Progress
                                                    </h3>
                                                    <div class="mt-1 text-sm leading-6">
                                                        You will be informed once News is live.
                                                        🙂
                                                    </div>
                                                </div>
                                            </div> */}
                    </div>
                </details>
            </div>
            {/* <div className="dropdown dropdown-top dropdown-right dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 opacity">
                    Contact
                </div>
                <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64">
                    <div class="flex p-4">
                        <div class="flex-shrink-0 text-warning">
                            <svg class="h-5 w-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </div>
                        <div class="ms-4">
                            <h3 class="text-gray-800 font-semibold dark:text-white">
                                Work in Progress
                            </h3>
                            <div class="mt-1 text-sm leading-6">
                                You will be informed once News is live.
                                🙂
                            </div>
                            <div class="mt-4">
                                <div class="flex space-x-3">
                                    <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-blue-800 dark:text-blue-500 dark:focus:text-blue-400">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="relative">
                <div tabIndex={0} role="button" className="peer btn btn-circle btn-ghost btn-xs text-info">
                    Contact
                    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div tabIndex={0} className="absolute bottom-full invisible peer-focus:visible card compact z-[1] shadow bg-base-100 rounded-box">
                    <div tabIndex={0} className="card-body">
                        <ContactCard />
                    </div>
                </div>
            </div> */}
        </>
    )
}