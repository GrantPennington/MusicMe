import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import GenerateContext from '../context/GenerateContext'
import UserContext from '../context/UserContext'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import NumberInput from './NumberInput'
import SuccessAlert from './SuccessAlert'
import DisplayPlaylistTracks from './DisplayPlaylistTracks';
import ScrollableBox from './ScrollableBox'

function GeneratePlaylist({ token }) {
    const { user } = useContext(UserContext)
    const { data, updateData, resetData } = useContext(GenerateContext)
    const [isGenerating, setIsGenerating] = useState(false)
    const [visible, setVisible] = useState(false)
    const [openAdvanced, setOpenAdvanced] = useState(false)

    const handleCloseAlert = () => {
        setVisible(false);
    };

    useEffect(() => {
        updateData('ratings', [])
    }, [])

    const getSelectedPlaylistId = () => {
        if(data.playlist_link!==""){
            return data.playlist_link.replace(/([^\/]*\/){4}/, '')
        }
    }

    const handleSubmit = () => {
        handleGenerate(user.UserID, data.playlist_link, data.new_playlist_name, data.amount_of_songs, data.ratings)
    }

    const handleOpenAdvanced = () => {
        if(openAdvanced){
            updateData('ratings', [])
        }
        setOpenAdvanced(!openAdvanced)
    }

    const formatRatings = () => {
        let temp = []
        data.ratings.map((track) => {
            temp.push(parseInt(track.rating)*2)
        })
        return temp
    }

    const handleGenerate = (user_id, playlist_link, new_playlist_name, amount_of_songs, ratings) => {
        if(playlist_link!=="" && user_id!=="" && new_playlist_name!=="" && amount_of_songs!==""){
                console.log('Generating your playlist...')
                let trackRatings = []
                if(data.ratings.length!==0) {
                    trackRatings = formatRatings()
                }
                setIsGenerating(true)
                axios.post('http://localhost:3001/data', {
                    user_id: user_id,
                    playlist_link: playlist_link,
                    new_playlist_name: new_playlist_name,
                    amount_of_songs: amount_of_songs,
                    ratings: trackRatings,
                })
                .then((response) => {
                    console.log('RESPONSE --> ',response)
                    setIsGenerating(false)
                    resetData()
                })
                .finally(() => {setVisible(true)})
                .catch((error) => console.log(error))
        } else {
            console.log('Error, something went wrong :(')
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                {!openAdvanced ?
                <>
                <h3>New Playlist Name</h3>
                <CustomInput placeholder={'Enter Playlist Name'} width={500} label={'new_playlist_name'}/>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <h3>Select Source Playlist</h3>
                    <p style={{ marginLeft: 5, fontSize: '0.75rem' }}>{`(the longer the playlist, the longer it may take.)`}</p>
                </div>
                <CustomSelect
                    updateKey={"playlist_link"}
                    options={user.Playlists}
                    w={500}
                />
                <h3>Amount of Songs</h3>
                <NumberInput min={5} max={100} />
                <CustomButton
                    label={'Generate'}
                    handleClick={handleSubmit} 
                    isDisabled={data.new_playlist_name==='' || user.playlist_link==='' || isGenerating}
                    styling={{ backgroundColor: 'rgba(95, 40, 222, 0.5)', width: 300, marginTop: 15 }}
                />
                <CustomButton
                    label={'Go To Advanced'}
                    handleClick={handleOpenAdvanced}
                    styling={{ backgroundColor: 'rgba(95, 40, 222, 0.5)', width: 300, marginTop: 15 }}
                />
                </>
                : 
                <>
                
                <h1>Advanced Playlist Generation</h1>
                <p>
                    The AI model that generates your playlist works on a rating system. 
                    If you want to increase the accuracy of recommended songs, you can rate each song from the playlist here.
                </p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                <h3>New Playlist Name</h3>
                <CustomInput placeholder={'Enter Playlist Name'} width={500} label={'new_playlist_name'}/>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <h3>Select Source Playlist</h3>
                    <p style={{ marginLeft: 5, fontSize: '0.75rem' }}>{`(the longer the playlist, the longer it may take.)`}</p>
                </div>
                <CustomSelect
                    updateKey={"playlist_link"}
                    options={user.Playlists}
                    w={500}
                />
                <h3>Amount of Songs</h3>
                <NumberInput min={5} max={100} />
                <CustomButton
                    label={'Generate'}
                    handleClick={handleSubmit} 
                    isDisabled={data.new_playlist_name==='' || user.playlist_link==='' || isGenerating}
                    styling={{ backgroundColor: 'rgba(95, 40, 222, 0.5)', width: 300, marginTop: 15 }}
                />
                <CustomButton
                    label={'Go Back'}
                    handleClick={handleOpenAdvanced}
                    styling={{ backgroundColor: 'rgba(95, 40, 222, 0.5)', width: 300, marginTop: 15 }}
                />
                </div>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                    <h4>Rate playlist tracks</h4>
                    <ScrollableBox>
                        {data.playlist_link===""
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><p>No Playlist Selected</p></div>
                        : <DisplayPlaylistTracks playlist={getSelectedPlaylistId()} token={token} />
                        }
                    </ScrollableBox>
                </div>
                </div>
                </>
                }
                {isGenerating && <p>Generating Playlist... this may take a while</p>}
                {visible && 
                    <div style={{ marginTop: 8 }}>
                        <SuccessAlert description={`Your playlist ${data.new_playlist_name} was succesfully created!`} handleClose={handleCloseAlert}/>
                    </div>
                }
            </div>
        </>
    )
}

export default GeneratePlaylist