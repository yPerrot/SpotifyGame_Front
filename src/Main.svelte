<script lang="ts">
    import { loggedIn } from './store';
    
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import Login from './lib/Login.svelte';
    import Game from './lib/Game.svelte';

    let loggedInValue = false;

    loggedIn.subscribe((value) => loggedInValue = value);

</script>

<Header />
{#if loggedInValue}
    <Game />
{:else}
    <Login />
{/if}
<Footer />
