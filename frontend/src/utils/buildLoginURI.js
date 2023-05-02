export const buildLoginURI = (client_id, redirect_url, scope) => {
  return `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scope}`
}