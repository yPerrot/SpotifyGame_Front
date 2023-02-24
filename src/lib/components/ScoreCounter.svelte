<script lang="ts" context="module">
    type ProgressStates = 'current' | 'passed' | 'failed' | 'todo';
    export type Progress = ProgressStates[]; 
</script>
<script lang="ts">
    export let progress: Progress = [];
</script>

<div class="counter">
    <span>Who is your favourite artist between these two?</span>
    <div class="counter__container">
        {#each progress as state, i}

            {#if state === 'passed'}
                <span class="counter__tag counter__tag__passed"></span>
            {:else if state === 'failed'}
                <span class="counter__tag counter__tag__failed"></span>
            {:else if state === 'current'}
                <span class="counter__tag counter__tag__current"></span>
            {:else}
                <span class="counter__tag"></span>
            {/if}

        {/each}
    </div>
</div>

<style>
    
.counter {
    padding: 0.5rem 1rem;
    border: var(--border);
    background-color: white;
    border-radius: 10px;

    width: fit-content;
    max-width: 70vw;
    text-align: justify;

    display: flex;
    flex-direction: column;
}

.counter__container {
    align-self: center;
}

.counter__tag {
    height: 10px;
    width: 10px;
    border-radius: 50%;

    display: inline-block;
    
    background-color: grey;
    
    margin-left: 5px;
}

.counter__tag__passed {
    background-color: #4caf50;
}

.counter__tag__failed {
    background-color: #f44336;
}

.counter__tag__current {
    width: 30px;
    border-radius: 15px;
}

</style>