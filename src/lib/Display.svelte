<script lang="ts">
    import { onMount } from 'svelte';
    import { getArtists } from '../assets/utils';

    let artists = [];
    
    onMount(async () => {
        artists = Object.values(await getArtists()).sort((a, b) => b.popularity - a.popularity);
    });

</script>

<main>

    <header>
        <h2>Congratulation!</h2>
        <p>You got <b>5/5</b>, you know your taste perfectly!</p>
        <p>Now, here is the list of your 20 most favorit artists of all time</p>
    </header>

    <div class="top">
        {#each artists as artist, id }
            <div class="artist" title="{artist.name}">
                <span class="num">{id + 1}</span>
                <img src="{artist.images[2].url}" alt="{artist.name}">
                <span class="name">{artist.name}</span>
            </div>
        {/each}
    </div>


</main>

<style>
main {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    flex: 1;
    /* background-color: #f1f333; */
    background-color: #ffd567;

    padding: 3rem;
}

header {
    background-color: var(--white);
    
    border-radius: 25px;

    padding: 2rem 3rem;
    width: 700px;

    margin-bottom: 4rem;

    border: 2px solid black;
}

header > h2 {
    margin-bottom: 1rem;
}

.top {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    padding: 3rem;

    border: 2px solid black;
    box-shadow: 10px 10px 0 0 black;
    background-color: var(--white);
    border-radius: 5px;
}

.artist {
    /* background-color: var(--purple); */
    background-color: rgb(231, 223, 255);
    
    width: 300px;

    display: flex;
    gap: 1rem;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    
    padding: 0.5rem 1rem;
    /* margin-bottom: 1rem; */
    
    font-weight: 500;
    font-size: 1.25rem;
    text-overflow: ellipsis;
    
    border-radius: 40px;
    border: 2px solid black;
    
}

.artist + .artist {
    margin-top: 1rem;
}

.num {
    width: 2ch;
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
    margin-bottom: 0.5rem;
}

.artist:nth-child(1) > img,
.artist:nth-child(2) > img,
.artist:nth-child(3) > img {
    height: 50px;
    width: 50px;
}
</style>