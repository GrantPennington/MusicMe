# MusicMe
Author: _Grant Pennington_

# Overview
MusicMe is a Software Application developed for my Senior Capstone Project from Bellarmine University.
The outcome of MusicMe is to create user curated Spotify playlists, using Decision Tree Machine Learning models, generated from a given, source playlist. The AI learns relationships between the audio track features Spotify appends to every track on their platform and finds new songs on Spotify that have similar audio track features to those on the source playlist. The UI allows users to Log In with their Spotify account, view various things from Spotify such as, the users playlists and favorites, and also allows you to search for artists from Spotify. All of this is done using the Spotify API.
MusicMe utilizes React JS to create a powerful and responsive front end web application and Node JS for the backend. It uses the Spotify API to get user data, extract audio track features, create new playlists, and add new songs to those playlists.

# Abstract
Music is something that is universally loved and a huge part of people’s daily lives. However, finding new music that you enjoy can be tough. The goal of this project is to use various correlations between music track audio features to generate new playlists based on a given source playlist. MusicMe utilizes two machine learning algorithms along with the Spotify application programming interface (API) to find correlations between a user-submitted playlist and other audio tracks. MusicMe then suggests new playlists the user might enjoy as well as allowing users to explore other functionality of the Spotify API. AI models used to find correlations between various audio tracks include a random forest classifier for feature analysis and decision trees for predicting recommended tracks. The system employs the modern JavaScript frontend framework, React, as well as a node express backend to create a user-friendly interface for utilizing the tool.

## Generate Playlist Page
The user inputs
* A name for the new playlist
* The desired source playlist
* The number of songs to generate
- - - -
![MusicMe Generate Screen](https://github.com/GrantPennington/MusicMe/assets/77215050/b0c7bf9e-2a06-4354-b600-e768f15950d1)

## Custom Ratings (optional)
The AI model uses to a rating system to understand the relationships between track data. In order to improve the models accuracy, the user can choose to manually rate each track, from the source playlist, based on how much they enjoy it. This can be tedious depending on the size of the playlist, so if the user does not want to rate each track the ratings will be randomly generated.
- - - -
![MusicMe Advanced Settings](https://github.com/GrantPennington/MusicMe/assets/77215050/4cd70628-8e27-49ac-8209-766e288410a4)

## AI Model
The AI model used for MusicMe is a decision tree model. The machine learning code was written in Python and uses the sklearn machine learning library for models and pre-processing tools. A useful library called Spotipy was also utilized, making it easy to connect and communicate with the Spotify API within Python.
