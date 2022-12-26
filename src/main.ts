import './global.css';
import { loggedIn } from './store';
import Main from './Main.svelte';

// Remove access_token & refresh_token
const url_string = window.location.search;
const url = new URLSearchParams(url_string);

const access_token = url.get('access_token');
const refresh_token = url.get('refresh_token');

url.delete('access_token');
url.delete('refresh_token');

if (access_token) localStorage.setItem('access_token', access_token);
if (refresh_token) localStorage.setItem('refresh_token', refresh_token);

if (access_token) document.cookie = `access_token=${access_token}; SameSite=None; Secure`;

window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}`));

loggedIn.set(!!localStorage.getItem('access_token'));


const app = new Main({
    target: document.getElementById('app'),
});

export default app;
