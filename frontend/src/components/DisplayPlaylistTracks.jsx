import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import GenerateContext from '../context/GenerateContext'
import TrackRatingCard from './TrackRatingCard'

function DisplayPlaylistTracks({ token, playlist }) {
    const [tracks, setTracks] = useState([])
    const { updateData } = useContext(GenerateContext)
    
    const getPlaylistTracks = async () => {
        if(playlist!==undefined){
            const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setTracks(data.items)
        }
    }

    const setTrackIDs = () => {
        let temp_ratings = []
        if(tracks.length!==0){
            tracks.map((track) => {
                temp_ratings.push({ id: track.track.id, rating: 3 })
            })
        }
        updateData('ratings', temp_ratings)
    }

    useEffect(() => {
        getPlaylistTracks()
    }, [playlist])

    useEffect(() => {
        setTrackIDs()
    }, [tracks])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tracks.length!==0 && tracks.map((track, index) => 
                <TrackRatingCard key={track} track={track} index={index} />
            )}
        </div>
    )
}

export default DisplayPlaylistTracks