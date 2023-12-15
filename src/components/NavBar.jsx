import { Link } from "react-router-dom";
import { DesktopSummaryFormComponent, MobileSummaryFormComponent } from "./Form";
import { NewsImage } from "../assets/images";
import { SummaryGradientText } from "./SummaryText";
import { useSummaryContext } from "../context";
import { HelpIconSquircle } from "../assets/icons";
import { useRef } from "react";
import { HelpContent } from "./HelpContent";

export const DesktopNavBar = ({ setData }) => {
    const { baseData } = useSummaryContext();

    return (
        <div className="sticky top-0 z-20 navbar items-start bg-[#FFFFFFBB] backdrop-blur-sm shadow dark:bg-base-200 overflow-hidden">
            {
                baseData?.data?.length > 0
                && <div className={"absolute top-0 right-0 -z-10 bg-green-400 md:bg-green-300 w-24 md:w-48 h-24 blur-3xl dark:bg-green-900 dark:md:bg-green-800"}></div>
            }
            {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
            {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
            {/* <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label> */}
            <div className="flex-1 items-center px-24 gap-12">
                <SummaryGradientText classes="block px-4 h-10 leading-10 normal-case font-semibold text-xl" />
                {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
                <DesktopSummaryFormComponent setData={setData} />
            </div>
            <div className="flex-none">
                <ul className="menu menu-lg menu-horizontal place-items-center space-x-3">
                    {/* Navbar menu content here */}
                    <li><Link to="/">
                        <NewsImage />
                        News
                    </Link></li>
                    {/* <li>
                    </li> */}
                    <label htmlFor="desktop-help-drawer" className="flex flex-row justify-center items-center w-12 h-12 rounded-xl cursor-pointer bg-black/10 hover:bg-black/20 hover:scale-110 transition-all">
                        <HelpIconSquircle width={32} height={32} />
                    </label>
                </ul>
                {/* <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button> */}
            </div>
        </div>
        // <div className="drawer">
        //     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content bg-neutral-200">
        //         {/* Page content here */}
        //         <div className="navbar items-start bg-[#FFFFFFBB] backdrop-blur-sm dark:bg-base-200">
        //             {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
        //             {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
        //             <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
        //                 {/* <button type={"button"} className=""> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        //                 {/* </button> */}
        //             </label>
        //             <div className="flex-1 items-start px-24">
        //                 <Link to="/" className="btn btn-ghost normal-case text-xl">Summary</Link>
        //                 {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
        //                 <DesktopSummaryFormComponent setData={setData} />
        //             </div>
        //             <div className="flex-none">
        //                 <button className="btn btn-square btn-ghost">
        //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        //             {/* Sidebar content here */}
        //             <li><a>Sidebar Item 1</a></li>
        //             <li><a>Sidebar Item 2</a></li>
        //         </ul>
        //     </div>
        // </div>
    );
}

export const LaptopNavBar = ({ setData }) => {
    const { baseData } = useSummaryContext();

    return (
        <div className="sticky top-0 z-20 navbar items-start bg-[#FFFFFFBB] backdrop-blur-sm shadow-sm transition-all dark:bg-base-200 overflow-hidden">
            {
                baseData?.data?.length > 0
                && <div className={"absolute top-0 right-0 -z-10 bg-green-400 md:bg-green-300 w-24 md:w-48 h-24 blur-3xl dark:bg-green-900 dark:md:bg-green-800"}></div>
            }
            {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
            {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
            {/* <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label> */}
            <div className="flex-1 items-center px-8 gap-12">
                <SummaryGradientText classes="block px-4 h-10 leading-10 normal-case font-semibold text-xl" />
                {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
                <DesktopSummaryFormComponent setData={setData} />
            </div>
            <div className="flex-none">
                <ul className="menu menu-lg menu-horizontal">
                    {/* Navbar menu content here */}
                    <li><Link to="/">
                        <NewsImage />
                        News
                    </Link></li>
                    {/* <li><Link to="/">Navbar Item 2</Link></li> */}
                    <label htmlFor="desktop-help-drawer" className="flex flex-row justify-center items-center w-12 h-12 rounded-xl cursor-pointer bg-black/10 hover:bg-black/20 hover:scale-110 transition-all">
                        <HelpIconSquircle width={32} height={32} />
                    </label>
                </ul>
                {/* <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button> */}
            </div>
        </div>
        // <div className="drawer">
        //     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content bg-neutral-200">
        //         {/* Page content here */}
        //         <div className="navbar items-start bg-[#FFFFFFBB] backdrop-blur-sm dark:bg-base-200">
        //             {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
        //             {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
        //             <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
        //                 {/* <button type={"button"} className=""> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        //                 {/* </button> */}
        //             </label>
        //             <div className="flex-1 items-start px-24">
        //                 <Link to="/" className="btn btn-ghost normal-case text-xl">Summary</Link>
        //                 {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
        //                 <DesktopSummaryFormComponent setData={setData} />
        //             </div>
        //             <div className="flex-none">
        //                 <button className="btn btn-square btn-ghost">
        //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        //             {/* Sidebar content here */}
        //             <li><a>Sidebar Item 1</a></li>
        //             <li><a>Sidebar Item 2</a></li>
        //         </ul>
        //     </div>
        // </div>
    );
}

export const MobileNavBar = ({ setData }) => {
    const { baseData } = useSummaryContext();
    const mobileHelpModal = useRef(null);

    return (
        <>
            <div className="navbar relative items-center bg-gray-100/60 dark:bg-base-200 overflow-hidden">
                {
                    baseData?.data?.length > 0
                    && <div className={"absolute top-0 right-0 -z-10 bg-green-400 md:bg-green-300 w-24 md:w-48 h-24 blur-3xl dark:bg-green-900 dark:md:bg-green-800"}></div>
                }
                {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
                <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
                    {/* <button type={"button"} className=""> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    {/* </button> */}
                </label>
                <div className="flex-1 flex-col items-start">
                    <SummaryGradientText classes="btn btn-ghost normal-case text-xl" />
                    {/* <Link to={"/"} className="btn btn-ghost normal-case text-xl">Summary</Link> */}
                    {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal place-items-center">
                        {/* Navbar menu content here */}
                        <li><Link to="/">
                            <NewsImage width={20} height={20} />
                            News
                        </Link></li>
                        {/* <li><Link to="/">Navbar Item 2</Link></li> */}
                        <button id="id-mobile-help-drawer" className="" onClick={() => mobileHelpModal.current?.showModal()}>
                            <div className="flex flex-row justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-black/10 hover:bg-black/20 hover:scale-110 transition-all">
                                <HelpIconSquircle width={24} height={24} />
                            </div>
                        </button>
                        <dialog id="mobile-help-modal" className="modal modal-middle m-0 space-y-0 gap-0" ref={mobileHelpModal}>
                            <div className="modal-box bg-base-200 mb-8 rounded-none rounded-t-xl rounded-b">
                                <HelpContent />
                            </div>
                            <div className="modal-action w-[92%] fixed bottom-2 bg-base-200 m-0 rounded-t rounded-b-xl md:hidden">
                                <form method="dialog" className="w-full mx-auto">
                                    <button className="w-full h-10 leading-10">close</button>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop hidden md:grid">
                                <button>close</button>
                            </form>
                        </dialog>
                    </ul>
                    {/* <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button> */}
                </div>
            </div>
            <MobileSummaryFormComponent setData={setData} />
        </>
        // <div className="drawer bg-base-100">
        //     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content">
        //         {/* Page content here */}
        //         <div className="navbar items-start bg-base-200">
        //             {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
        //             {/*<input id="drawer" type="checkbox" className={"drawer-toggle"} />*/}
        //             <label htmlFor="my-drawer" className="drawer-button btn btn-square btn-ghost">
        //                 {/* <button type={"button"} className=""> */}
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        //                 {/* </button> */}
        //             </label>
        //             <div className="flex-1 flex-col items-start">
        //                 <Link to={"/"} className="btn btn-ghost normal-case text-xl">Summary</Link>
        //                 {/* <input type="text" placeholder="What should I search and summarize?" className="input input-lg input-bordered w-full max-w-2xl text-sm" /> */}
        //             </div>
        //             <div className="flex-none">
        //                 <button className="btn btn-square btn-ghost">
        //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        //                 </button>
        //             </div>
        //         </div>
        //         <MobileSummaryFormComponent setData={setData} />
        //     </div>

        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        //             {/* Sidebar content here */}
        //             <li><a>Sidebar Item 1</a></li>
        //             <li><a>Sidebar Item 2</a></li>
        //         </ul>
        //     </div>
        // </div>
    );
}