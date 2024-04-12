import { Link } from "react-router-dom"

export const SummaryGradientLink = ({ classes = "", text = "Summary" }) => {
    return (
        <Link to="/" className={`bg-clip-text bg-gradient-to-r from-[#27CE8E] to-[#FFDE52] text-transparent ${classes}`}>{text}</Link>
    )
}

export const SummaryGradientText = ({ classes = "", text = "Summary" }) => {
    return (
        <div className={`bg-clip-text bg-gradient-to-r from-[#27CE8E] to-[#FFDE52] text-transparent ${classes}`}>{text}</div>
    )
}