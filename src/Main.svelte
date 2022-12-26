<script lang="ts">
    import { loggedIn } from './store';
    
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import Login from './lib/Login.svelte';

    let loggedInValue: boolean;

    loggedIn.subscribe((value) => loggedInValue = value);

</script>

<Header />
{#if loggedInValue}
    <main></main>
{:else}
    <Login />
{/if}
<Footer />

<style>
main {
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;

    background-color: var(--yellow);
}
</style>