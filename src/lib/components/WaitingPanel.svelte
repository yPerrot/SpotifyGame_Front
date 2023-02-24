<div class="loader">
    <div class="spinner"></div>
    <div class="loader__txt">
        <p>Bip Boup, Creating your profile</p>
        <p>(Kidding, waiting for the Spotify API to respond)</p>
    </div>
</div>

<style>
    
.loader {
    border: 2px solid black;
    box-shadow: 10px 10px 0 0 black;
    
    border-radius: 5px;
    margin: 3rem 1rem;

    background-color: var(--white);

    padding: 2rem;

    display: flex;
    flex-direction: column;
}

.loader__txt > p:nth-child(1) {
    font-size: 2rem;
}

.loader__txt > p:nth-child(2) {
    font-size: 0.75rem;
}

.spinner {
    align-self: center;
    margin-bottom: 1.5rem;

    width: 48px;
    height: 48px;
    border: 5px solid var(--gray-400);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 

@media screen and (max-width: 640px) {
    .loader {
        padding: 1.5rem 1rem;
    }
    .loader__txt > p:nth-child(1) {
        font-size: 1.25rem;
    }
}

</style>