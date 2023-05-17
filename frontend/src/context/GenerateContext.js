import React, { createContext, useState } from 'react'

/*
    React Context to hold the state data for generating a playlist.
*/

const GenerateContext = createContext({
    data: {},
    updateData: () => {},
});

export default GenerateContext

export function GenerateContextProvider(props) {
    const [data, setData] = useState({
        "source_name": "",
        "playlist_link": "",
        "new_playlist_name": "",
        "amount_of_songs": "",
        "ratings": [],
    })

    const updateData = (key, value) => {
        setData((data) => {
            const updated = {
                ...data,
                [key]: value,
            }
            return updated
        })
    }

    const resetData = () => {
        setData(() => {
            const updated = {
                "source_name": "",
                "playlist_link": "",
                "new_playlist_name": "",
                "amount_of_songs": "",
                "ratings": [],
            }
            return updated
        })
    }

    const defaultGenerateContext = {
        data: data,
        updateData: updateData,
        resetData: resetData,
    };

    return (
        <GenerateContext.Provider value={defaultGenerateContext}>
            {props.children}
        </GenerateContext.Provider>
    )
}