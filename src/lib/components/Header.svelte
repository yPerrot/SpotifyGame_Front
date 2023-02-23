<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { loggedIn } from '../../store';
    import exitLogo from '/exit.svg';

    let loggedInValue: boolean;

    loggedIn.subscribe((value) => loggedInValue = value);

    async function logout() {
        localStorage.clear();
        loggedIn.set(false);
        navigate('/', { replace: true });
    }
    
</script>

<header>
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

@media screen and (max-width: 640px) {

    .logo {
        padding: 1rem 1.5rem;
        font-size: 1rem;
    }

    .logout-btn {
        padding: 0.25rem 0.5rem;
        margin: 0.5rem 1rem 0.5rem auto;
    }

    .logout-btn > span {
        font-size: 0.875rem;    
    }

    .logout-btn > img {
        width: 15px;
    }
}
</style>