import { useWindowSize } from "@uidotdev/usehooks";
import { SummarySingleItem, SummaryGroup, SummaryGroupItem } from "../components/SummaryItem";
import Summary from "./Summary";

export const Home = () => {
    const size = useWindowSize();

    return (
        <div className="App font-sans">
            <section className={"w-10/12 bg-green-600 mx-auto text-left"}>
                {/* <Summary /> */}
                {/* <section className={"bg-purple-600 text-xs"}>
                    <div>8,490,000,000 results in 0.34 seconds</div>
                    <div>Powered by Google search</div>
                </section> */}

                <section className={"bg-teal-800"}>
                    {/* <SummaryItem /> */}
                    {/* <div className={""}>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Card title!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="relative bg-gray-800 px-6 pt-4 pb-4 my-2 rounded-lg">
                        <span className="absolute right-6 text-gray-600 font-medium text-xs">Summary</span>
                        <div className="text-xs text-gray-500">Github - MayowaObisesan</div>
                        <div className="py-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ut autem veniam fuga voluptates voluptatibus eveniet laboriosam, porro deserunt accusamus laudantium exercitationem quae quod delectus molestiae. Dolores perferendis repudiandae aliquam!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus distinctio, ex provident, accusamus dignissimos quia quidem dicta accusantium natus tenetur maxime repellendus porro fugiat quam? Debitis expedita perspiciatis et corrupti eius sequi temporibus ea, molestiae ipsam ducimus quia vel nihil velit explicabo dolor consequuntur ullam, mollitia nisi. Facilis fuga nulla reiciendis provident, odio porro officia voluptate debitis omnis ea similique laboriosam quam recusandae corrupti necessitatibus exercitationem dolores optio, eum, suscipit sed aspernatur quod error. Deserunt reiciendis non expedita distinctio cupiditate, hic maiores perferendis enim maxime exercitationem, possimus numquam aperiam corrupti iusto repellat doloribus cumque, dolorum nesciunt illum velit labore. Esse.
                        </div>
                        <a href="/" className="text-sm hover:bg-base-100">
                            <div className="flex">
                                <img src="" alt="" className="w-5 h-5 rounded-full" />
                                <span className="px-2">https://github.com/MayowaObisesan</span>
                            </div>
                        </a>
                    </div> */}

                    {/* <SummarySingleItem /> */}

                    {/* <SummaryGroup>
                        <SummaryGroupItem />
                        <SummaryGroupItem />
                        <SummaryGroupItem />
                        <SummaryGroupItem />
                        <SummaryGroupItem />
                    </SummaryGroup> */}
                </section>
            </section>
        </div>
    );
}