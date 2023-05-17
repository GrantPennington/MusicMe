import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TrackCard from './TrackCard'

function DisplayFavorites({ token }) {
    const [favorites, setFavorites] = useState([])

    const getFavorites = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/tracks", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        console.log('DATA --> ',data.items)
        setFavorites(data.items)
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <>
            {favorites!=="" && 
                favorites.map((track) => 
                    <TrackCard track={track} />
                )
            }  
        </>
    )
}

export default DisplayFavorites