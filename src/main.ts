import './global.css';
import { loggedIn } from './store';
import Main from './Main.svelte';
import { navigate } from 'svelte-routing';
import { get } from 'svelte/store';

handleLogginState();
redirect();

const app = new Main({
    target: document.getElementById('app'),
});

export default app;

function handleLogginState() {
    // Remove access_token & refresh_token
    const url_string = window.location.search;
    const url = new URLSearchParams(url_string);

    const access_token = url.get('access_token');
    const refresh_token = url.get('refresh_token');

    url.delete('access_token');
    url.delete('refresh_token');

    if (access_token) {
        localStorage.setItem('access_token', access_token);
        // navigate('/game', { replace: true });
    }
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);

    if (access_token) document.cookie = `access_token=${access_token}; SameSite=None; Secure`;

    window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}`));

    loggedIn.set(!!localStorage.getItem('access_token'));
}

function redirect() {
    const { pathname } = window.location;
    if (get(loggedIn)) {
        // If logged in, and path != "/game" or "/display", redirecte to "/game"
        if (pathname !== '/game' && pathname !== '/display') navigate('/game', { replace: true });
    } else {
        // If no logged in, redirect to "/"
        if (pathname !== '/') navigate('/', { replace: true });
    }
}
