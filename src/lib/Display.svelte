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

    padding: 3rem;
}

.artist {
    background-color: var(--pink);
    border-radius: 25px;

    display: flex;
    gap: 0.5rem;

.artist {
    background-color: var(--pink);
    
    width: 300px;

    display: flex;
    gap: 1rem;
    align-items: center;
    
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    
    font-weight: 500;
    font-size: 1.25rem;
    text-overflow: ellipsis;
    
    border-radius: 40px;
    border: 2px solid black;
    
}

.artist > img {
    height: 40px;
    width: 40px;
    border-radius: 50%;

    display: inline-block;
    object-fit: cover;

    flex-shrink: 0;
}

.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* TOP */
.artist:nth-child(1),
.artist:nth-child(2),
.artist:nth-child(3) {
    width: 400px;
    font-size: 1.75rem;
    border-radius: 70px;
    margin-bottom: 1.5rem;
}

.artist:nth-child(1) > img,
.artist:nth-child(2) > img,
.artist:nth-child(3) > img {
    height: 50px;
    width: 50px;
}
</style>