import { Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisplayArtist from './DisplayArtist'
import SearchBar from './SearchBar'

// const SerpApi = require('google-search-results-nodejs')
// const search = new SerpApi.GoogleSearch(API_KEY)

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

    // const searchGoogle = async () => {
    //     axios.get("https://google.com/search?q=javascript",{ 
    //         headers: { 'Accept-Encoding': 'text/html; charset=UTF-8',}
    //     })
    //     .then(response => console.log(response.data))
    // }

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
            {/*<Button onClick={() => navigate('/artist-info')}>Search Google</Button>*/}
        </>
    )
}

export default SearchArtists