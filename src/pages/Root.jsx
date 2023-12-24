import { Outlet, ScrollRestoration } from "react-router-dom"

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

export const Root = () => {
    return (
        <div className="font-sans">
            <Outlet />
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
        </div>
    )
}