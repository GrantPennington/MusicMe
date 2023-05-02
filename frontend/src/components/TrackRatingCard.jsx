import React, { useContext } from 'react'
import GenerateContext from '../context/GenerateContext'
import TrackRating from './TrackRating'

function TrackRatingCard({ track, index }) {
    const { data } = useContext(GenerateContext)
    return (
        <div>
                <div style={{ height: 75, width: '100%', backgroundColor: '#dce3e0', display: 'flex', alignItems: 'center', borderBottom: "1px solid #bdbdbd" }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <img alt="example" src={track.track.album.images[2].url} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '30%', marginLeft: 10 }}>
                        {track.track.name}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                        {track.track.artists[0].name}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                        <TrackRating update_key={'ratings'} track_id={track.track.id} index={index} defaultRating={data.ratings[index]} />
                    </div>
                </div>
        </div>
    )
}

export default TrackRatingCard