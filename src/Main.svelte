<script lang="ts">
    import { Router, Route } from 'svelte-routing';
    
    import { loggedIn } from './store';
    
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import Login from './lib/Login.svelte';
    import Game from './lib/Game.svelte';
    import Display from './lib/Display.svelte';

    let loggedInValue = false;

    loggedIn.subscribe((value) => loggedInValue = value);

    export let url = '';
</script>

<Router url="{url}">
    <Header />

    {#if loggedInValue}
        <Route path="game" component="{Game}" />
        <Route path="display" component="{Display}" />
        <Route path="/" component="{Game}" ></Route>
    {:else}
        <Route path="/"><Login /></Route>
    {/if}

    <Footer />
</Router>
