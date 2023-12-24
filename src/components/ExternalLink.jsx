export const ExternalLink = ({ url, classes, children }) => {
    return <a href={url} className={classes} target={"_blank"} rel="noreferrer">{children}</a>
}