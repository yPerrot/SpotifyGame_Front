<script lang="ts">
    // import svelteLogo from './assets/svelte.svg'
    import Header from './lib/Header.svelte'
    import Footer from './lib/Footer.svelte'
</script>

<Header loggedIn={true} />
<main></main>
<Footer />

<style>

main {
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
}

</style>