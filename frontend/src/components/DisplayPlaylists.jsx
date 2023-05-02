import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import PlaylistCard from './PlaylistCard'

function DisplayPlaylists({ updatePlaylists }) {
    const { user } = useContext(UserContext)

    useEffect(() => {
        updatePlaylists()
        //console.log('UPDATING PLAYLISTS')
    }, [])

    const playlists = user.Playlists

    return (
        <>
            {playlists.map((playlist) => 
                <PlaylistCard key={playlist.id} playlist={playlist} />
            )} 
        </>
    )
}

export default DisplayPlaylists