import React from 'react'
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import CustomSelect from '../components/CustomSelect';
import CustomInput from '../components/CustomInput';
import NumberInput from '../components/NumberInput';
import CustomButton from '../components/CustomButton';


function Home() {
    const [token, setToken] = useState("")
    const navigate = useNavigate();

    const [userData, setUserData] = useState({})

    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])

    const [selectedPlaylist, setSelectedPlaylist] = useState("")
    const [newPlaylistName, setNewPlaylistName] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        // setting user auth token
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    useEffect(() => {
        // sets the selected playlist from dropdown menu
        Object.values(playlists).map((playlist) => {
            if(playlist.id===selectedPlaylist){
                setSelectedPlaylist(playlist)
            }
        })
    }, [selectedPlaylist])

    useEffect(() => {
        // get user playlists and user data whenever token changes
        getPlaylists()
        getUserData()
    }, [token])

    const getUserData = () => {
        // get the currently logged in users spotify details
        if(token!=="") {
            axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => setUserData({ display_name: resp.data.display_name, username: resp.data.id, link: resp.data.href }))
        }
    }

    const getPlaylists = () => {
        // get all the current logged in users playlists
        if(token!=="") {
            axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((resp) => setPlaylists(resp.data.items))
        }
    }

    
    const handleGenerateClicked = () => {
        // handler for sending required data to express server
        console.log('Generating your playlist...')
        if(selectedPlaylist!=="" && userData!=={}){
            setIsGenerating(true)
            axios.post('http://localhost:3001/data', {
                user_id: userData.username,
                link: userData.link,
                playlist_link: `https://open.spotify.com/playlist/${selectedPlaylist.id}`,
                new_playlist_name: newPlaylistName
            })
            .then((response) => console.log(response))
            .finally(() => setIsGenerating(false))
            .catch((error) => console.log(error))
        } else {
            console.log('Invalid entry')
        }
        
    }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <h3>Select a Playlist</h3>
            <CustomSelect
                options={playlists}
                w={500}
            />
            <h3>Generated Playlist Name</h3>
            <CustomInput placeholder={'Enter Playlist Name'} width={500}/>
            <h3>Amount of Songs</h3>
            <NumberInput min={5} max={100} />
            <CustomButton
                label={'Generate'}
                handleClick={handleGenerateClicked} 
                isDisabled={newPlaylistName==='' || selectedPlaylist==={}}
                styling={{ backgroundColor: 'rgba(95, 40, 222, 0.5)', width: 300, marginTop: 15 }}
            />
            {isGenerating &&
            <>
                <p>Generating your playlist... this could take a few minutes</p>
            </>
            }
        </div>
    )
}

export default Home