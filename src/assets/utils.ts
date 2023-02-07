import { get } from 'svelte/store';
import { artists } from '../store';
import type { TopArtistsReponse, Image } from '../types/Spotify';

export type MyArtist = {
    id: string;
    name: string;
    popularity: number;
    color: {
        r: number;
        g: number;
        b: number;
    };
    images: Image[];
}

function randomIntFromInterval(min: number, max: number) { // min included
    return Math.floor(Math.random() * (max - min) + min);
}

export async function getRandomArtists(): Promise<[MyArtist, MyArtist]> {
    const [firstId, secondId] = getRandomNum();
    const artistsObj = await getArtists();

    return [artistsObj[firstId], artistsObj[secondId]];
}

export function getRandomNum(): [number, number] {
    const first = randomIntFromInterval(0, 20);
    let second = randomIntFromInterval(0, 20);
    while (second === first) second = randomIntFromInterval(0, 20);

    return [first, second];
}

export async function getArtists() {
    const artistsObj: { [artistId: string]: MyArtist} = get(artists);

    if (JSON.stringify(artistsObj) === '{}') {
        const access_token = localStorage.getItem('access_token');
        const res = await fetch(`http://localhost:8888/artists?limit=20&access_token=${access_token}`);
        const json: TopArtistsReponse = await res.json();

        const obj: { [artistId: string]: MyArtist}= {};

        for (const artistId in json.items) {
            const artist = json.items[artistId];
            obj[artistId] = {
                id: artistId,
                name: artist.name,
                popularity: artist.popularity,
                color: await getAverageRGB(artist.images[0].url),
                images: artist.images,
            };
        }

        artists.set(obj);
        return obj;
    } else {
        return artistsObj;
    }
}

export async function getAverageRGB(imageURL: string): Promise<{ r: number; g: number; b: number; }> {
    return new Promise((resolve) => {
        // const imgEl: HTMLImageElement = document.createElement('img');
        const imgEl = new Image();
        imgEl.crossOrigin = 'Anonymous'; // HERE:

        imgEl.onload = () => {
            const blockSize = 100; // only visit every 5 pixels
            const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
            const canvas = document.createElement('canvas');
            const context = canvas.getContext && canvas.getContext('2d');
            let data: ImageData;
            let i = -4;
            const rgb = { r: 0, g: 0, b: 0 };
            let count = 0;

            if (!context) {
                resolve(defaultRGB);
            }

            const height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
            const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

            context.drawImage(imgEl, 0, 0);

            try {
                data = context.getImageData(0, 0, width, height);

                const length = data.data.length;

                while ( (i += blockSize * 4) < length ) {
                    ++count;
                    rgb.r += data.data[i];
                    rgb.g += data.data[i+1];
                    rgb.b += data.data[i+2];
                }

                // ~~ used to floor values
                rgb.r = ~~(rgb.r/count);
                rgb.g = ~~(rgb.g/count);
                rgb.b = ~~(rgb.b/count);

                resolve(rgb);
            } catch (e) {
                /* security error, img on diff domain */
                alert('x');
                console.log('HERE');

                resolve(defaultRGB);
            }
        };

        imgEl.src = imageURL;
    });
}
