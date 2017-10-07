const clientId = '1ae67631ce7a4f73957a871b439ade4f';
const redirectURI = 'http://localhost:3000/';

let accessToken;
let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else {
            let accessToken = window.location.href.match(/access_token=([^&]*)/);
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
            if ( accessToken && expiresIn ) {
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/'); 
            } else if ( !accessToken ) {
                window.location('https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI)
            }
        }
    },
    async search(search) {
        try {
            let response = await fetch(
                'https://api.spotify.com/v1/search?type=track&q=' + search,{
                headers: {
                    'Authorization': 'Bearer' + accessToken
                }
            });
            let jsonResponse = response.json();
            if (!jsonResponse) {
                return [];
            } else {
                return jsonResponse.map((track) => {
                    let tracks = {
                        'ID': track.id,
                        'Name': track.name,
                        'Artist': track.artists[0].name,
                        'Album': track.album.name,
                        'URI': track.uri
                    };
                    return tracks;
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    async savePlaylist(name, trackuris) {
        if (!name && !trackuris) {
            return
        };
        let headers = {
            'Authorization': 'Bearer' + accessToken
        };
        let userID;

        // GET REQUEST FOR USERID
        try {
            let GETresponse = await fetch('https://api.spotify.com/v1/me', {headers: headers});
            let getJsonResponse = GETresponse.json();
            userID = getJsonResponse.id;

            let POSTresponse = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists',
            {
                headers: {
                    'Authorization': 'Bearer' + accessToken,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: {
                    name: name
                }
            });
            let postJsonResponse = POSTresponse.json();
            let playlistID = postJsonResponse.id;

            let POST2response = await fetch(
                'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks',
                {
                    headers: {
                        'Authorization': 'Bearer' + accessToken,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: {
                        'uris': trackuris
                    }
                });
            let post2JsonResponse = POST2response.json();
            playlistID = post2JsonResponse.id;

        } catch (error) {
            console.log(error);
        };
    }
};

export default {Spotify};