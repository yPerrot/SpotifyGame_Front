<script lang="ts">
    import { onMount } from 'svelte';

    let artists = [];

    onMount(async () => {
        const access_token = localStorage.getItem('access_token');
        const res = await fetch(`http://localhost:8888/artists?limit=20&access_token=${access_token}`);
        const json = await res.json();
        artists = json.items;
    });

</script>

<main>

    {#each artists as artist, id }
        <!-- <p>n°{id + 1} {artist.name} -> {artist.popularity}</p> -->
        <div class="artist {id < 3 ? "top" : ""}" title="{artist.name}">
            <span class="num">{id + 1}</span>
            <img src="{artist.images[2].url}" alt="{artist.name}">
            <span class="name">{artist.name}</span>
        </div>
    {/each}

</main>

<style>
main {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    flex: 1;
    background-color: #f1f333;

    /* gap: 2rem; */

    padding: 3rem;
}

.artist {
    background-color: var(--pink);
    border-radius: 25px;

    display: flex;
    gap: 0.5rem;

    padding: 0.5rem 1rem;

    width: 300px;

    margin-bottom: 1rem;

    text-overflow: ellipsis;
}

.top {
    width: 400px;
    border-radius: 50px;
    font-size: 2rem;

    margin-bottom: 2rem;
}

.artist > img {
    height: 25px;
    width: 25px;
    border-radius: 50%;

    display: inline-block;
    object-fit: cover;

    flex-shrink: 0;
}

.top > img {
    height: 50px;
    width: 50px;
}

.num {
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: white;

    text-align: center;

    flex-shrink: 0;
}

.top > .num {
    height: 50px;
    width: 50px;
}

.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>