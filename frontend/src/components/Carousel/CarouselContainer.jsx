import React, { useEffect } from 'react'

import { Carousel } from 'antd';
import adv_settings_img from "./images/gen_playlist_advanced.png";
import settings_img from "./images/gen_playlist.png";
import artists_img from "./images/search_artists.png";
import playlists_img from "./images/view_playlists.png";
import favs_img from "./images/view_favs.png";

import '../LoginPage/Container.css'


const contentStyle = {
    width: '100%',
    margin: 0,
    height: 475,
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
};

const containerStyle = {
    margin: 0,
    height: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    width: '920px',
    float: 'right',
    marginTop: 20,
    marginLeft: 40,
};

function CarouselContainer({ slide, update }) {
    const [toggle, setToggle] = React.useState(true)
    const carouselRef = React.useRef()
    const [next, setNext] = React.useState(0)

    useEffect(() => {
        setToggle(false)
            const timer = setTimeout(() => {
                const autoScroll = () => {
                    carouselRef.current.next()
                }
                autoScroll()
                setToggle(true)
            }, 6000);
            update(next)
        return () => clearTimeout(timer);
    }, [toggle]);

    const prevSlide = (currSlide, nextSlide) => {
        setNext(nextSlide)
    }

    const content = [settings_img, artists_img, playlists_img, favs_img, adv_settings_img]

    return (
        <div style={containerStyle}>
        <Carousel afterChange={onChange} beforeChange={prevSlide} ref={carouselRef}>
            {content.map((item) => 
                <div>
                    <img src={item} style={contentStyle} />
                </div>
            )}
        </Carousel>
        </div>
    )
}

export default CarouselContainer