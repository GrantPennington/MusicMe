import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisplayArtist from './DisplayArtist'
import SearchBar from './SearchBar'


function SearchArtists({ token }) {
    const [artists, setArtists] = useState("")
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const searchArtist = async (e) => {
        //e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: search,
                type: "artist"
            }
        })
        setArtists(data.artists.items)
    }

    return (
        <>
            <SearchBar 
                onSearch={searchArtist}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <DisplayArtist 
                artists={artists}
            />
        </>
    )
}

export default SearchArtists