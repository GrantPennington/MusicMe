import React, { createContext, useState } from 'react'

const UserContext = createContext({
    user: {},
    updateUser: () => {},
    updatePlaylists: () => {},
});

export default UserContext

export function UserContextProvider(props) {
    const [user, setUser] = useState({
        "DisplayName": "",
        "UserID": "",
        "SpotifyLink": "",
        "ProfileImg": "",
        "Playlists": [],
    })

    const updateUser = (displayName, userID, link, image) => {
        setUser((user) => {
            const updated = {
                "DisplayName": displayName || user.DisplayName,
                "UserID": userID || user.UserID,
                "SpotifyLink": link || user.SpotifyLink,
                "ProfileImg": image===[] ? '' : image[0].url || user.ProfileImg,
                "Playlists": user.Playlists
            }
            //console.log('UPDATING CONTEXT -> ',updated)
            return updated
        })
    }

    const updatePlaylists = (playlists) => {
        setUser((user) => {
            const updated = {
                ...user,
                "Playlists": playlists
            }
            return updated
        })
    }

    const defaultUserContext = {
        user: user,
        updateUser: updateUser,
        updatePlaylists: updatePlaylists,
    };

    return (
        <UserContext.Provider value={defaultUserContext}>
            {props.children}
        </UserContext.Provider>
    )
}