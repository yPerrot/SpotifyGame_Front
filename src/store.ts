import { writable } from 'svelte/store';

export const loggedIn = writable(false);

export const artists = writable(localStorage.getItem('artists') ? JSON.parse(localStorage.getItem('artists')) : {});
artists.subscribe((val) => localStorage.setItem('artists', JSON.stringify(val)));

export const score = writable(0);
