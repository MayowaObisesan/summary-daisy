import News from "./newspaper-news.svg";

export const NewsImage = ({ width = 24, height = 24 }) => {
    return <img src={News} alt={"news"} width={width} height={height} />
}