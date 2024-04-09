// const props = {source, author, title, description, url, urlToImage, publishedAt, content};

export const NewsCard = (props) => {
    return (
        <div className={"card card-compact w-80"}>
            <figure>
                <img src={props?.urlToImage} alt="Shoes"/>
            </figure>
            <div className={"card-body"}>
                <h2 className={"card-title text-lg"}>{props?.title}</h2>
                <p>{props?.description}</p>
                {/*<div className="card-actions justify-end">*/}
                {/*    <button className="btn btn-primary">Buy Now</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}