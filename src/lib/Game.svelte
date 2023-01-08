<script lang="ts">
    import { navigate } from 'svelte-routing';

    async function getArtist() {
        const resp = await fetch('http://localhost:8888/artists?access_token=' + localStorage.getItem('access_token'));
        const data = await resp.json();
    
        const a = Math.round(Math.random() * 9);
        let b = Math.round(Math.random() * 9);
        while (b === a) b = Math.round(Math.random() * 9);
    
        return [
            {
                img: data.items[a].images[0].url,
                name: data.items[a].name,
                color: await getAverageRGB(data.items[a].images[0].url),
            },
            {
                img: data.items[b].images[0].url,
                name: data.items[b].name,
                color: await getAverageRGB(data.items[b].images[0].url),
            },
        ];
    }

    async function getAverageRGB(imageURL: string): Promise<{ r: number; g: number; b: number; }> {
        return new Promise((resolve) => {
            // const imgEl: HTMLImageElement = document.createElement('img');
            const imgEl = new Image();
            imgEl.crossOrigin = 'Anonymous'; // HERE:
    
            imgEl.onload = () => {
                const blockSize = 5; // only visit every 5 pixels
                const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
                const canvas = document.createElement('canvas');
                const context = canvas.getContext && canvas.getContext('2d');
                let data: ImageData;
                let i = -4;
                const rgb = { r: 0, g: 0, b: 0 };
                let count = 0;
    
                if (!context) {
                    resolve(defaultRGB);
                }
    
                const height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
                const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
                context.drawImage(imgEl, 0, 0);
    
                try {
                    data = context.getImageData(0, 0, width, height);
    
                    const length = data.data.length;
    
                    while ( (i += blockSize * 4) < length ) {
                        ++count;
                        rgb.r += data.data[i];
                        rgb.g += data.data[i+1];
                        rgb.b += data.data[i+2];
                    }
    
                    // ~~ used to floor values
                    rgb.r = ~~(rgb.r/count);
                    rgb.g = ~~(rgb.g/count);
                    rgb.b = ~~(rgb.b/count);
    
                    resolve(rgb);
                } catch (e) {
                    /* security error, img on diff domain */
                    alert('x');
                    console.log('HERE');
    
                    resolve(defaultRGB);
                }
            };
    
            imgEl.src = imageURL;
        });
    }

    let promise = getArtist();

    function reload() {
        const currentId = progress.findIndex((e) => e === 'current');
        if (currentId === progress.length -1) navigate('/display', { replace: true });

        progress[currentId] = Math.random() > 0.5 ? 'passed' : 'failed';
        if (currentId < progress.length - 1) progress[currentId + 1] = 'current';
    
        promise = getArtist();
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
        <p>...waiting</p>
    {:then data}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="left game-panel" style="background-color: rgb({data[0].color.r + ',' + data[0].color.g + ',' + data[0].color.b});" on:click={reload}>
            <img class="artist-img" src={data[0].img} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isReadable(data[0].color.r, data[0].color.g, data[0].color.b) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
            <span class="artist-name" style="color: {isReadable(data[0].color.r, data[0].color.g, data[0].color.b) ? "rgb(16, 16, 16)" : "white"}">{data[0].name}</span>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="right game-panel" style="background-color: rgb({data[1].color.r + ',' + data[1].color.g + ',' + data[1].color.b});" on:click={reload}>
            <img class="artist-img" src={data[1].img} alt="" style="box-shadow: 0px 0px 31px 0px rgba({isReadable(data[1].color.r, data[1].color.g, data[1].color.b) ? "0, 0, 0" : "255, 255, 255"}, 0.2);">
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

.separator {
    position: absolute;

    /* top: 10px;

    padding: 0.5rem 1rem;
    border: var(--border);
    background-color: white;
    border-radius: 10px; */
    

    font-size: 5rem;
    font-weight: 900;

    color: white;

    -webkit-text-stroke: 6px #000;

    width: fit-content;
    height: fit-content;

    margin:auto;
    /* margin-right:auto; */
    
    inset: 0;

    /* left:0; */
    /* right:0; */
}

.counter {
    /* width: 15px; */
    /* height: 15px; */

    align-self: center;
    /* background-color: red; */
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