import React from 'react'
import ArtistCard from './ArtistCard'

function DisplayArtist({ artists }) {
  return (
    <div>
        {artists!=="" &&
            artists.map(artist => (
                <ArtistCard 
                    key={artist.id}
                    artist={artist}
                />
        ))}
    </div>
  )
}

export default DisplayArtist