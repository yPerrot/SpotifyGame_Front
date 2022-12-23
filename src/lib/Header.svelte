<script lang="ts">
    export let loggedIn = false;
    import exitLogo from '../assets/exit.svg'
</script>

<header>
    <div class="logo">WhoIsMyFavorit</div>
    
    {#if loggedIn}
        <button class="btn logout-btn">
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