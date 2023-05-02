import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import HomeLayout from './components/HomeLayout';
import { UserContextProvider } from './context/UserContext';
import { GenerateContextProvider } from './context/GenerateContext';
import ArtistInfo from './components/ArtistInfo';

function App() {

    return (
        <UserContextProvider>
            <GenerateContextProvider>
                <Routes>
                    <Route path="/" element={ <Login/> } />
                    <Route path="/generate" element={ <HomeLayout/> } />
                    <Route path="/artist-info" element={ <ArtistInfo /> } />
                </Routes>
            </GenerateContextProvider>
        </UserContextProvider>
    )
}

export default App