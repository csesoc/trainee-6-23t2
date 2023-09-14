export async function fetchProfile(token) {
    const result = await fetch('https://api.spotify.com/v1/me', {
        method: "GET", headers: {'Authorization': 'Bearer ' + token}
    });
    return await result.json();
}

export async function fetchUserPlaylists(token) {
    const result = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: "GET", headers: {'Authorization': 'Bearer ' + token}
    });
    return await result.json();
}

export async function fetchUsersSavedAlbums(token) {
    const result = await fetch('https://api.spotify.com/v1/me/albums', {
        method: "GET", headers : {'Authorization': 'Bearer ' + token}
    })
    return await result.json();
}

export async function fetchPlaylistItems(token, playlist_id) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "GET", headers : {'Authorization': 'Bearer ' + token}
    })
    return await result.json();
}

export async function fetchAlbumItems(token, album_id) {
    const result = await fetch(`https://api.spotify.com/v1/albums/${album_id}/tracks`, {
        method: "GET", headers : {'Authorization': 'Bearer ' + token}
    })
    return await result.json();
}


export async function fetchPlaylist(token, playlist_id) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        method: "GET", headers: {'Authorization': 'Bearer ' + token}
    })
    return await result.json();
}

export async function fetchAlbum(token, album_id) {
    const result = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
        method: "GET", headers: {'Authorization': 'Bearer ' + token}
    })
    return await result.json();
}