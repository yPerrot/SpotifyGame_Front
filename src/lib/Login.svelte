<script lang="ts">
    import { getBackEndURL } from '../assets/utils';
    import spotifyLogo from '/spotify.svg';

    async function login() {
        location.href = `${getBackEndURL()}/login`;
    }
</script>

<main class="login-main">
    <div class="panel">
        <h1>Who is your favorite artist?</h1>
        <span class="text">
            Let's find out who your favourite artists are, or at least your most listened to artists on Spotify! 
            All you have to do is log in with your Spotify account by clicking the button below.
        </span>
        <button class="btn login-btn" on:click={login}>
            <span>Log in with Spotify</span>
            <img src={spotifyLogo} alt="Spotify Icon">
        </button>
    </div>
</main>

<style>

main {
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
}

.login-main {
    background-color: #f1f333;
}

.panel {
    border: 2px solid black;
    box-shadow: 10px 10px 0 0 black;
    
    border-radius: 5px;
    width: min(85vw, 650px);
    margin-block: 3rem;

    background-color: var(--white);

    padding: 2rem;
}

h1 {
    margin-bottom: 1rem;
}

.login-btn {
    margin: 0 auto;
    margin-top: 3rem;

    font-size: 2rem;

    background-color: hsl(148, 100%, 50%);
}

.login-btn > img {
    height: 40px;
    width: 40px;
}

@media (max-width: 640px) {
    .panel {
        padding: 1rem;
    }
    
    .login-btn {
        font-size: 1rem;
    }
    
    .login-btn > img {
        height: 20px;
        width: 20px;
    }
}
</style>