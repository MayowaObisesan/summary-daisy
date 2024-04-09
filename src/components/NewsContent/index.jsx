import {useEffect} from "react";
import {updateSummaryNewsCache, useSummaryContext} from "../context";

const NewsContent = () => {
    const {baseNewsData, updateBaseNewsData, updateNewsFetchedFlag} = useSummaryContext();
    console.log(baseNewsData);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const sources = "fox-news";
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/news?query=${""}&sources=${sources}`
                );
                if (response.status === 400) {
                    throw new Error("Check your search query");
                } else if (response.status === 500) {
                    throw new Error("Server Error");
                } else if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newsResult = await response.json()
                updateBaseNewsData(newsResult);
                updateNewsFetchedFlag(true);
                updateSummaryNewsCache(newsResult);
            } catch(err) {}
        }
        fetchLatestNews();
    }, []);

    return (
        <section>
            News section
            <div>
                {
                    baseNewsData.articles?.length > 0 && baseNewsData?.articles.map((eachNews, index) => (
                        <div>
                            {JSON.stringify(eachNews)}
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default NewsContent;