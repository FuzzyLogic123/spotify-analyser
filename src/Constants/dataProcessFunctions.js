export const mostObscureArtist = (artistData) => {
    let min = 100;
    let obscureArtist = '';
    let url = '';
    for (let i = 0; i < artistData.data.items.length; i++) {
        const artist = artistData.data.items[i];
        if (artist.popularity < min) {
            min = artist.popularity;
            obscureArtist = artist.name;
            url = artist.images[0].url
        };
    }
    return {name: obscureArtist, url: url}
}

export const mostPopularArtist = (artistData) => {
    let max = 0;
    let popArtist = '';
    let url = '';
    for (let i = 0; i < artistData.data.items.length; i++) {
        const artist = artistData.data.items[i];
        if (artist.popularity > max) {
            max = artist.popularity;
            popArtist = artist.name;
            url = artist.images[0].url
        };
    }
    return {name: popArtist, url: url}
}

export const getObscurityRating = (artistData) => {
    const artists = artistData.data.items;
    let sum = 0;
    for (let i = 0; i < artists.length; i++) {
        const artist = artists[i];
        sum += artist.popularity;
        
    }
    return sum/artists.length
}