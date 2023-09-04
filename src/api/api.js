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