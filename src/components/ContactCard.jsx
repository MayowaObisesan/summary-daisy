import { GithubIcon, LinkedIcon, MediumIcon, TwitterIcon } from "../assets/icons"
import { ExternalLink } from "./ExternalLink"

export const ContactCard = () => {
    return (
        <div class="" role="tooltip">
            {/* <!-- Header --> */}
            <div class="py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-x-3">
                    <img class="flex-shrink-0 inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://avatars.githubusercontent.com/u/91972571?v=4" alt="Builder" />
                    <div class="grow">
                        <h4 class="font-semibold text-gray-800 dark:text-white">
                            Mayowa Obisesan
                            {/* <span class="ms-0.5 inline-flex items-center align-middle gap-x-1.5 py-0.5 px-1.5 rounded-md text-[11px] font-medium bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                                PRO
                            </span> */}
                        </h4>
                        <p class="text-sm text-gray-500">
                            Builder
                        </p>
                    </div>
                </div>
            </div>
            {/* <!-- End Header --> */}

            {/* <!-- List --> */}
            <ul class="py-3 px-4 space-y-4">
                <li>
                    <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>
                        Lagos, Nigeria
                    </div>
                </li>

                <li>
                    <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                        <a href={"tel:2349131581488"}>(+234) 913-158-1488</a>
                    </div>
                </li>

                <li>
                    <div class="inline-flex items-center gap-x-3 text-sm text-gray-800 dark:text-neutral-200">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        <a href={"mailto:mayowaobi74@gmail.com"}>mayowaobi74@gmail.com</a>
                    </div>
                </li>

                <section className="space-y-2 rounded-lg bg-gray-100 lg:bg-transparent">
                    {/* <div className={"text-gray-500 dark:text-base-content"}>
                    Social Accounts
                </div> */}
                    <div className="join">
                        <ExternalLink url={"https://twitter.com/Blessed_mayowa"} classes="btn btn-ghost btn-square join-item">
                            <TwitterIcon width={20} height={20} viewWidth={16} viewHeight={16} strokeWidth={0} classes="text-blue-400" />
                        </ExternalLink>
                        <ExternalLink url={"https://github.com/MayowaObisesan"} classes="btn btn-ghost btn-square join-item">
                            <GithubIcon width={20} height={20} strokeWidth={0} />
                        </ExternalLink>
                        <ExternalLink url={"https://linkedin.com/in/mayowa-obisesan"} classes="btn btn-ghost btn-square join-item">
                            <LinkedIcon width={32} height={32} viewWidth={24} viewHeight={24} strokeWidth={2} fill={"text-green-600"} classes="text-blue-600" />
                        </ExternalLink>
                        <ExternalLink url={"https://mayowaobisesan.medium.com"} classes="btn btn-ghost btn-square join-item">
                            <MediumIcon />
                        </ExternalLink>
                    </div>
                </section>
            </ul>
            {/* <!-- End List --> */}

            {/* <div className="divider divider-gray-200"></div> */}


            {/* <div className="collapse collapse-close collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Social Accounts
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div> */}

            {/* <!-- Footer --> */}
            {/* <div class="py-2 px-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
                <a class="inline-flex items-center gap-x-1.5 text-xs text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg class="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
                    Flag
                </a>

                <button type="button" class="py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    Follow
                </button>
            </div> */}
            {/* <!-- End Footer --> */}
        </div>
    )
}