import spotipy
from spotipy.oauth2 import SpotifyOAuth
import cred
import spotipy.util as util
import sys
import pandas as pd

scope = 'user-library-read playlist-modify-public playlist-read-private'
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_id, client_secret= cred.client_secret, redirect_uri=cred.redirect_url, scope=scope))
print('Spotify Authorized...')

username = sys.argv[1] ## parameter passed in as user_id
print('Username --> ',username)

sourcePlaylistID = sys.argv[2] ## parameter passed in as playlist_link
print('source playlist --> ',sourcePlaylistID)

trackRatings = sys.argv[5]
#print('track ratings type --> ',type(trackRatings))

results = sp.user_playlist(username, sourcePlaylistID)
tracks = results["tracks"]
songs = tracks["items"]

track_ids = []
track_names = []

source_track_length = int(len(songs))

print('Removing Local Tracks...')
for i in range(0, len(songs)):
    if songs[i]['track']['id'] != None: # Removes the local tracks in your playlist if there is any
      track_ids.append(songs[i]['track']['id'])
      track_names.append(songs[i]['track']['name'])


print('Extracting track features...')
features = []
for i in range(0,len(track_ids)):
    audio_features = sp.audio_features(track_ids[i])
    for track in audio_features:
        
      if track is None:
        print(track)
        features.append({'danceability': 0, 'energy': 0, 'key': 0, 'loudness': 0, 'mode': 0, 'speechiness': 0, 'acousticness': 0, 'instrumentalness': 0, 'liveness': 0, 'valence': 0, 'tempo': 0, 'type': 'audio_features', 'id': '00000', 'uri': 'spotify:track:0', 'track_href': 'https://api.spotify.com/', 'analysis_url': 'https://api.spotify.com/', 'duration_ms': 0, 'time_signature': 0})
      else:
        features.append(track)

print('Generating data frame...')
playlist_df = pd.DataFrame(features, index = track_names)

playlist_df=playlist_df[["id", "acousticness", "danceability", "duration_ms", 
                          "energy", "instrumentalness",  "key", "liveness",
                          "loudness", "mode", "speechiness", "tempo", "valence"]]


## PRE PROCESS DATA ##
print('Beginning Pre-Processing...')
from sklearn.feature_extraction.text import TfidfVectorizer
v=TfidfVectorizer(sublinear_tf=True, ngram_range=(1, 6), max_features=10000)
X_names_sparse = v.fit_transform(track_names)
X_names_sparse.shape

import numpy as np
import random

# to avoid the user having to manually rate each song, they are randomly generated.
# this AI could probably be improved by allowing the user to rate them, however that is super tedious
# and randomly generating ratings works perfectly fine for what I am doing.

if(len(trackRatings)!=0):
  # Track ratings was passed as an array but is coming in as a string for some reason
  # so the following code will parse the string and put each rating into an array
  trackRatings = trackRatings.split(',')
  trackRatings = [int(x) for x in trackRatings]
  print('Track Ratings: ',trackRatings)
  playlist_df['ratings']=trackRatings
else:
  temp_ratings = []
  for i in range(len(playlist_df)):
    temp_ratings.append(random.randint(5,10))
  playlist_df['ratings']=temp_ratings

print('Analyzing features...')
  # Analyze feature importances
from sklearn.ensemble._forest import RandomForestRegressor, RandomForestClassifier

X_train = playlist_df.drop(['id', 'ratings'], axis=1)
y_train = playlist_df['ratings']
forest = RandomForestClassifier(random_state=42, max_depth=5, max_features=12) # Set by GridSearchCV below
forest.fit(X_train, y_train)
importances = forest.feature_importances_
indices = np.argsort(importances)[::-1]

  # Print the feature rankings
print("Feature ranking:")

for f in range(len(importances)):
    print("%d. %s %f " % (f + 1, 
      X_train.columns[f], 
      importances[indices[f]]))
      
# Apply pca to the scaled train set first

from sklearn import decomposition
from sklearn.preprocessing import StandardScaler
import seaborn as sns; sns.set(style='white')

print('Setting up model...')

X_scaled = StandardScaler().fit_transform(X_train)
pca = decomposition.PCA().fit(X_scaled)

# Fit dataset to the optimal pca
pca1 = decomposition.PCA(n_components=8)
X_pca = pca1.fit_transform(X_scaled)

## I may not need TSNE, because is is a dimensionality reduction technique similar to PCA.
from sklearn.manifold import TSNE
tsne = TSNE(random_state=17, perplexity=(len(songs)-1)/2)

X_tsne = tsne.fit_transform(X_scaled)

from scipy.sparse import csr_matrix, hstack

X_train_last = csr_matrix(hstack([X_pca, X_names_sparse])) # Check with X_tsne + X_names_sparse also

from sklearn.model_selection import StratifiedKFold, GridSearchCV
import warnings
warnings.filterwarnings('ignore')

# Initialize a stratified split for the validation process
try:
  skf = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
except:
  skf = StratifiedKFold(n_splits=2, shuffle=True, random_state=42)
# Decision Trees
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV

tree = DecisionTreeClassifier()

tree_params = {'max_depth': range(1,11), 'max_features': range(4,19)}

tree_grid = GridSearchCV(tree, tree_params, cv=skf, n_jobs=-1, verbose=True)

tree_grid.fit(X_train_last, y_train)
tree_grid.best_estimator_, tree_grid.best_score_

print('Generating test set...')
# Generate test set
rec_tracks = []
if(source_track_length>=75):
  reco_limit = int(len(playlist_df)/2)
else:
  reco_limit = int(len(playlist_df)*2)

for i in playlist_df['id'].values.tolist():
    rec_tracks += sp.recommendations(seed_tracks=[i], limit=reco_limit)['tracks']

rec_track_ids = []
rec_track_names = []
for i in rec_tracks:
    rec_track_ids.append(i['id'])
    rec_track_names.append(i['name'])

rec_features = []
for i in range(0,len(rec_track_ids)):
    rec_audio_features = sp.audio_features(rec_track_ids[i])
    for track in rec_audio_features:
        rec_features.append(track)
          
rec_playlist_df = pd.DataFrame(rec_features, index = rec_track_ids)

X_test_names = v.transform(rec_track_names)
rec_playlist_df=rec_playlist_df[["acousticness", "danceability", "duration_ms", "energy", "instrumentalness",  "key", "liveness", "loudness", "mode", "speechiness", "tempo", "valence"]]

print('Finished creating test set.')
print('Making predictions...')

# Make predictions
tree_grid.best_estimator_.fit(X_train_last, y_train)
rec_playlist_df_scaled = StandardScaler().fit_transform(rec_playlist_df)
rec_playlist_df_pca = pca1.transform(rec_playlist_df_scaled)
X_test_last = csr_matrix(hstack([rec_playlist_df_pca, X_test_names]))
y_pred_class = tree_grid.best_estimator_.predict(X_test_last)

rec_playlist_df['ratings']=y_pred_class
rec_playlist_df = rec_playlist_df.sort_values('ratings', ascending = False)
rec_playlist_df = rec_playlist_df.reset_index()

num_songs_to_generate = sys.argv[4]

# Pick the top ranking tracks to add your new playlist 9, 10 will work
recs_to_add = rec_playlist_df[rec_playlist_df['ratings']>=8]['index'].values.tolist()

# I was running into an error where sometimes there would be less songs rated 9 or 10 than the inputted amount of songs
# so this while loop just checks if thelength of the selected songs is less than num_songs then iteratively choose songs of lower rating
i = 8
while len(recs_to_add)<int(num_songs_to_generate):
  recs_to_add = rec_playlist_df[rec_playlist_df['ratings']>=i]['index'].values.tolist()
  i=i-1

print(len(rec_tracks), rec_playlist_df.shape, len(recs_to_add))

rec_array = np.reshape(recs_to_add, (-1,))
print(rec_array.shape)

print('Predictions finished!')

def create_playlist(title, track_amount):
  print('Creating playlist...')
  
  ## Create the playlist
  playlist_recs = sp.user_playlist_create(username, name=title)
  
  ## Populate the playlist
  tracks = []
  for i in range(0,track_amount):
      tracks.append(rec_array[i])
  sp.user_playlist_add_tracks(username, playlist_recs['id'], tracks)

create_playlist(sys.argv[3], int(num_songs_to_generate))
print('Playlist has been generated... Enjoy!')

