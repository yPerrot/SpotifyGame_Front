<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { getRandomArtists, type MyArtist } from '../assets/utils';
    import { score } from '../store';

    import faileImg from '/fail.png';
    import succesImg from '/success.png';

    let promise = getRandomArtists();
    score.set(0); // Reset score value

    function reload(event: MouseEvent & {currentTarget: EventTarget & HTMLDivElement;}, artistId: string, artists: [MyArtist, MyArtist]) {
        const img = event.currentTarget.querySelector<HTMLImageElement>('* > img');
    
        const mostPopularArtist = artists[0].popularity > artists[1].popularity ? artists[0] : artists[1];
        const doPassed = mostPopularArtist.id === artistId;

        if (doPassed) img.src = succesImg;
        else img.src = faileImg;
    
        setTimeout((doPassed) => {
            if (doPassed) score.update((score) => score + 1);
            const currentId = progress.findIndex((e) => e === 'current');
            if (currentId === progress.length -1) navigate('/display', { replace: true });
    
            progress[currentId] = doPassed ? 'passed' : 'failed';
            if (currentId < progress.length - 1) progress[currentId + 1] = 'current';
    
            promise = getRandomArtists();
        }, 1000, doPassed);
    }

    function isReadable(red: number, green: number, blue: number) {
        // https://stackoverflow.com/questions/946544/good-text-foreground-color-for-a-given-background-color/946734#946734
        return (red*0.299 + green*0.587 + blue*0.114) > 128;
    }

    type ProgressStates = 'current' | 'passed' | 'failed' | 'todo'

    const progress: ProgressStates[] = ['current', 'todo', 'todo', 'todo', 'todo'];

</script>

<main class="game-main">
    <header>
        <span>Who is your favorit artist between those 2?</span>
        <div class="counter">
            {#each progress as state, i}

                {#if state === 'passed'}
                    <span style="background-color: var(--green);"></span>
                {:else if state === 'failed'}
                    <span style="background-color: var(--red);"></span>
                {:else if state === 'current'}
                    <span style="width: 30px; border-radius: 15px;"></span>
                {:else}
                    <span></span>
                {/if}

            {/each}
        </div>
    </header>

    <!-- <div class="separator">VS</div> -->

    {#await promise}
    <!-- TODO: Add style -->
        <p>Bip Boup, Creating your profile</p>
        <p>(Kiding, Waiting for the Spotify API to respond)</p>
    {:then data}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="left game-panel" style="background-color: rgb({data[0].color.r + ',' + data[0].color.g + ',' + data[0].color.b});" on:click={(event) => reload(event, data[0].id, data)}>
            <img class="artist-img" src={data[0].images[0].url} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isReadable(data[0].color.r, data[0].color.g, data[0].color.b) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
            <span class="artist-name" style="color: {isReadable(data[0].color.r, data[0].color.g, data[0].color.b) ? "rgb(16, 16, 16)" : "white"}">{data[0].name}</span>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="right game-panel" style="background-color: rgb({data[1].color.r + ',' + data[1].color.g + ',' + data[1].color.b});" on:click={(event) => reload(event, data[1].id, data)}>
            <img class="artist-img" src={data[1].images[0].url} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isReadable(data[1].color.r, data[1].color.g, data[1].color.b) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
            <span class="artist-name" style="color: {isReadable(data[1].color.r, data[1].color.g, data[1].color.b) ? "rgb(16, 16, 16)" : "white"}">{data[1].name}</span>
        </div>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

</main>

<style>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;

    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;
    /* gap: 1px; */

    height: 100%;
    width: 100%;
}

.game-panel {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: pointer;
}

.game-panel > .artist-img {
    display: inline-block;
    height: 200px;
    width: 200px;
    box-shadow: 0px 0px 31px 0px rgba(0, 0, 0, 0.2);

    border-radius: 50%;

    object-fit: cover;

    transition: transform .3s;
}

.game-panel:hover > .artist-img,
.game-panel:hover > .artist-name {
    transform: scale(1.1);
}

.left {
    background-color: var(--purple);
}

.right {
    background-color: var(--green);
}

.artist-name {
    margin-top: 1rem;

    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: -1px;
    color: rgb(16, 16, 16);

    transition: transform .3s;
}

.game-main > header {
    position: absolute;

    top: 10px;

    padding: 0.5rem 1rem;
    border: var(--border);
    background-color: white;
    border-radius: 10px;
    

    width: fit-content;
    max-width: 80vw;

    margin-left:auto;
    margin-right:auto;
    
    left:0;
    right:0;

    display: flex;
    flex-direction: column;
}

.counter {
    align-self: center;
}

.counter >  span {
    height: 10px;
    width: 10px;
    border-radius: 50%;

    display: inline-block;
    
    background-color: grey;
    
    margin-left: 5px;
}
</style>