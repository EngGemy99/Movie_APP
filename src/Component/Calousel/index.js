import "./style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomHooks from "../../hooks/CustomHooks";
const Calousel = ({ Display }) => {
    const Api_image = 'https://image.tmdb.org/t/p/w500';
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1200, min: 900 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 900, min: 700 },
            items: 3
        },
        small: {
            breakpoint: { max: 700, min: 450 },
            items: 2
        },
        verysmall: {
            breakpoint: { max: 450, min: 0 },
            items: 1
        }
    }
    const { content } =
        CustomHooks(`https://api.themoviedb.org/3/discover/${Display}?api_key=97cd0ab3fd3e22a15f551b94745e328a`);

    return (
        <div className='overflow-hidden movieContainer container mt-5'>
            <h3 className='text-center text-white mb-5'>
                {
                    Display === 'movie' ?
                        (
                            `Top Trending Movie`
                        ) :
                        Display === 'tv' ?
                            (
                                `Top Trending Series`
                            ) :
                            (
                                `Top Trending Actors`

                            )
                }

            </h3>
            {
                content.length > 0 ?
                    (
                        <Carousel
                            responsive={responsive}
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container-with-dots"
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                        >
                            {
                                content.map((movie) => {
                                    return (
                                        <div className='item px-2 position-relative overflow-hidden' key={movie.id}>
                                            <span
                                                href="#"
                                                className=
                                                {movie.vote_average > 6.5 ? "badge badge-primary " : movie.vote_average > 5 ? "badge badge-warning " : "badge badge-danger "}
                                            >
                                                {movie.vote_average}
                                            </span>

                                            {
                                                <img src={Api_image + movie.poster_path} className="w-100" alt={movie.title} />
                                            }
                                            <p>
                                                {
                                                    movie.title ? movie.title : movie.name
                                                }
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    ) :
                    (
                        <p>No {Display} To Show</p>
                    )
            }
        </div>
    );
}

export default Calousel;