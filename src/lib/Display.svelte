<script lang="ts">
    import { onMount } from 'svelte';
    import { getArtists } from '../assets/utils';
    import { score } from '../store';

    let artists = [];
    
    onMount(async () => {
        artists = Object.values(await getArtists()).sort((a, b) => b.popularity - a.popularity);
    });

    function getMessage(score: number) {
        if (score === 0) return 'Spotify is completely off the mark ...';
        if (score < 3) return 'Spotify may have misunderstood your tastes ...';
        if (score < 5) return 'almost perfect!';
        return 'you know your taste perfectly!';
    }

</script>

<main>

    <header>
        <h2>Congratulations!</h2>
        <p>You got <b>{$score}/5</b>, {getMessage($score)}</p>
        <p>Now, here is the list of your 20 most favourite artists of all time.</p>
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
    background-color: #ffd567;

    padding: 3rem;
}

header {
    background-color: var(--white);
    
    border-radius: 25px;

    padding: 2rem 3rem;
    max-width: 700px;

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

    max-width: 450px;
    width: 100%;

    padding: 2rem;

    border: 2px solid black;
    box-shadow: 10px 10px 0 0 black;
    background-color: var(--white);
    border-radius: 5px;
}

.artist {
    background-color: rgb(231, 223, 255);
    
    width: 80%;

    display: flex;
    align-items: center;
    flex-direction: row;
    
    padding: 0.5rem 1rem;
    
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

    margin-inline: 0.5rem 1rem;
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
    width: 100%;
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

@media screen and (max-width: 640px) {
    main {
        padding: 3rem 1.5rem;
    }
    header {
        padding: 1rem 2rem;
    }
    .top {
        padding: 1rem;
    }
    .artist{
        font-size: 1rem;
        font-weight: 400;
    }
    .artist > img {
        height: 25px;
        width: 25px;
        margin-inline: 0.25rem 0.5rem;
    }
    .artist:nth-child(1),
    .artist:nth-child(2),
    .artist:nth-child(3) {
        font-size: 1.25rem;
        font-weight: 500;
    }
    .artist:nth-child(1) > img,
    .artist:nth-child(2) > img,
    .artist:nth-child(3) > img {
        height: 40px;
        width: 40px;
    }
}

</style>