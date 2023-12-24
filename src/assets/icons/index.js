const IconDefaults = {
    width: 24,
    height: 24,
    viewWidth: 24,
    viewHeight: 24,
    strokeWidth: 2
}

export const CheckIcon = ({ ...IconDefaults }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width={IconDefaults.width} height={IconDefaults.height} viewBox="0 0 24 24" strokeWidth={IconDefaults.strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l5 5l10 -10" />
        </svg>
    )
}

export const ChecksIcon = ({ width = 24, height = 24, strokeWidth = 2 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width={width} height={height} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 12l5 5l10 -10" />
            <path d="M2 12l5 5m5 -5l5 -5" />
        </svg>
    )
}

export const CloudPauseIcon = ({ width = 24, height = 24, strokeWidth = 2 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-pause" width={width} height={height} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13 18.004h-6.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.406 0 2.617 .843 3.16 2.055" />
            <path d="M17 17v5" />
            <path d="M21 17v5" />
        </svg>
    )
}

export const CloudSearchIcon = ({ width = 24, height = 24, strokeWidth = 2 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-search" width={width} height={height} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 18.004h-4.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M20.2 20.2l1.8 1.8" />
        </svg>
    )
}

export const HelpIconBorderless = ({ width = 24, height = 24, strokeWidth = 2 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-help-small" width={width} height={height} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 16v.01" />
            <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
        </svg>
    )
}

export const HelpIconSquircle = ({ width = 24, height = 24, strokeWidth = 2 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-help-square-rounded-filled" width={width} height={height} viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm0 13a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z" strokeWidth={0} fill="currentColor" />
        </svg>
    )
}

export const TwitterIcon = ({ width = 24, height = 24, viewWidth = 16, viewHeight = 16, strokeWidth = 2, classes = "" }) => {
    return (
        <svg
            className={classes}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="currentColor"
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
    )
}

export const GithubIcon = ({ width = 24, height = 24, viewWidth = 16, viewHeight = 16, strokeWidth = 2, classes = "" }) => {
    return (
        <svg
            className={classes}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="currentColor"
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
    )
}

export const LinkedIcon = ({ width = 24, height = 24, viewWidth = 16, viewHeight = 16, fill = "", strokeWidth = 2, classes = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`icon icon-tabler icon-tabler-brand-linkedin ${classes}`}
            width={width}
            height={height}
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            strokeWidth={strokeWidth}
            stroke="white"
            fill={"currentColor"}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M8 11l0 5" />
            <path d="M8 8l0 .01" />
            <path d="M12 16l0 -5" />
            <path d="M16 16v-3a2 2 0 0 0 -4 0" />
        </svg>
    )
}
export const MediumIcon = ({ width = 24, height = 24, viewWidth = 16, viewHeight = 16, fill = "", strokeWidth = 2, classes = "" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-medium" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M8 9h1l3 3l3 -3h1" />
            <path d="M8 15l2 0" />
            <path d="M14 15l2 0" />
            <path d="M9 9l0 6" />
            <path d="M15 9l0 6" />
        </svg>
    )
}