import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import './style.css'
import { unavailable } from "../../config/index";
import YouTube from "react-youtube";

const Details = ({ any }) => {
    console.log(any);
    const { id, type } = useParams();
    console.log(useParams());
    const Api_image = 'https://image.tmdb.org/t/p/w500';
    const [item, setItem] = useState([]);
    const [video, setVideo] = useState([]);
    const history = useHistory();
    // const type = localStorage.getItem('type');
    useEffect(() => {
        window.scroll(0, 0);
        // for youtupe video 
        const fetchVideo = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=97cd0ab3fd3e22a15f551b94745e328a&language=en-US`
            );
            setVideo(data.results[0]?.key);
        };
        axios.get(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=97cd0ab3fd3e22a15f551b94745e328a`
        )
            .then(res => {
                setItem(res.data)
                console.log(res.data);
            }).catch(e => {
                console.log(e.message);
            })

        fetchVideo();
    }, [id, type]);
    const Back = () => {
        history.goBack();
        window.scroll(0, 0)
    }
    const opts = {
        height: '490',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    return (

        <div className="container mt-5">
            <button className="btn btn-outline-primary" onClick={Back}>
                <i className="fas fa-arrow-left mr-3"></i>
                Back
            </button>
            <div className="row ">
                <div className="col-lg-4">
                    <div className="boximg">
                        <img src={
                            item.poster_path ?
                                Api_image + item.poster_path :
                                unavailable
                        }
                            className="w-100"
                            alt={item.title}
                        />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="information text-white">
                        <h2 style={{ fontWeight: "bold" }}>{item.title}</h2>
                        <p>Language :{item.original_language}</p>
                        <p>Date :{item.release_date}</p>
                        <p>Rate :{item.vote_average} <i className="text-warning fas fa-star"></i></p>
                        <p style={{ lineHeight: "30px", fontWeight: "500" }}> Overview : {item.overview}</p>
                        <a className="btn btn-danger btn-lg"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Watch Trailer
                            <i className="fab fa-youtube ml-3"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <YouTube videoId={video} opts={opts} onReady={onReady} />

            </div>
        </div >


    );
}

export default Details;
