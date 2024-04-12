import News from "./newspaper-news.svg";
import SummaryLogo from "./summaryDefault192.png";

export const NewsImage = ({ width = 24, height = 24 }) => {
    return <img src={News} alt={"news"} width={width} height={height} />
}

export const SummaryImage = ({ width = 24, height = 24 }) => {
    return <img src={SummaryLogo} alt={"SummaryIcon"} width={width} height={height} />
}