<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { loggedIn } from '../store';
    import exitLogo from '/exit.svg';

    let loggedInValue: boolean;

    loggedIn.subscribe((value) => loggedInValue = value);

    async function logout() {
        localStorage.clear();
        loggedIn.set(false);
        navigate('/', { replace: true });
        /*
        const res = await fetch('http://localhost:8888/tracks?access_token=' + localStorage.getItem('access_token'), {
            mode: 'cors',
            headers: {
                // 'Access-Control-Allow-Origin':'*',
                // 'Access-Control-Allow-Credentials': 'true',
            //     Cookie: `access_token=${localStorage.getItem('access_token')}; `
            },
            credentials: 'include',
            // credentials: "same-origin",
        })
    
        console.log(await res.json());
        */
    }
    
</script>

<header>
    <!-- <div class="logo">WhoIsMyFavorit</div> -->
    <div class="logo">SpotifyGame</div>
    
    {#if loggedInValue}
        <button class="btn logout-btn" on:click={logout}>
            <span>Logout</span>
            <img src={exitLogo} alt="Logout icon" />
        </button>
    {/if}
</header>

<style>
header {
    display: flex;
    border-bottom: var(--border);
}

.logo {
    padding: 1.5rem 2.5rem;
    
    font-family: 'DynaPuff', serif;
    font-weight: 700;
    font-size: 1.5rem;

    border-right: var(--border);
}

.logout-btn {
    padding: 0.5rem 1rem;
    margin: 1rem 1rem 1rem auto;

    background-color: var(--pink);
    --btn-hover-transition: 3px;
}

.logout-btn > img {
    width: 20px;
}
</style>