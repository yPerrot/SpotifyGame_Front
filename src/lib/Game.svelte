<script lang="ts">
    import { navigate } from 'svelte-routing';
    import { getRandomArtists, type Color, type MyArtist } from '../assets/utils';
    import { score } from '../store';

    import ScoreCounter from './components/ScoreCounter.svelte';
    import type { Progress } from './components/ScoreCounter.svelte';
    import WaitingPanel from './components/WaitingPanel.svelte';

    import faileImg from '/fail.png';
    import succesImg from '/success.png';

    let promise = getRandomArtists();
    score.set(0); // Reset score value

    type OnClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLDivElement };
    function imgOnClick(event: OnClickEvent, artistId: string, artists: [MyArtist, MyArtist]) {
        const img = event.currentTarget.querySelector<HTMLImageElement>('* > img');
    
        const [firstArtist, secondArtist] = artists;
        const mostPopularArtist = firstArtist.popularity > secondArtist.popularity ? firstArtist : secondArtist;
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

    function isColorReadableOnWhite(color: Color) {
        // https://stackoverflow.com/questions/946544/good-text-foreground-color-for-a-given-background-color/946734#946734
        return (color.r*0.299 + color.g*0.587 + color.b*0.114) > 128;
    }

    function getColorString(color: Color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    const progress: Progress = ['current', 'todo', 'todo', 'todo', 'todo'];

</script>



{#await promise}
    <main>
        <WaitingPanel />
    </main>
{:then data}
    <main class="game-main">
        <ScoreCounter progress={progress} />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="left game-panel" style="background-color: {getColorString(data[0].color)};" on:click={(e) => imgOnClick(e, data[0].id, data)}>
            <!-- <div class="img-container"> -->
                <img class="artist-img" src={data[0].images[0].url} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isColorReadableOnWhite(data[0].color) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
                <span class="artist-name" style="color: {isColorReadableOnWhite(data[0].color) ? "rgb(16, 16, 16)" : "white"}">{data[0].name}</span>
            </div>
        <!-- </div> -->

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="right game-panel" style="background-color: {getColorString(data[1].color)};" on:click={(e) => imgOnClick(e, data[1].id, data)}>
            <img class="artist-img" src={data[1].images[0].url} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isColorReadableOnWhite(data[1].color) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
            <span class="artist-name" style="color: {isColorReadableOnWhite(data[1].color) ? "rgb(16, 16, 16)" : "white"}">{data[1].name}</span>
        </div>
    </main>
{:catch error}
    <main>
        <p style="color: red">{error.message}</p>
    </main>
{/await}


<style>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;

    position: relative;

    background-color: #f1f333;

    
    height: 100%;
    width: 100%;
}

.game-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* gap: 1px; */
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

.artist-name {
    margin-top: 1rem;

    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: -1px;
    color: rgb(16, 16, 16);

    transition: transform .3s;
}

:global(.counter) {
    position: absolute;

    top: 10px;

    margin-left:auto;
    margin-right:auto;
    
    left:0;
    right:0;
}

/* .img-container {
    position: relative;
} */

@media screen and (max-width: 640px) {
    .artist-name {
        font-size: 1rem;
        letter-spacing: 0;
        font-weight: 500;
    }
    .game-panel > .artist-img {
        height: 150px;
        width: 150px;
    }
}

</style>