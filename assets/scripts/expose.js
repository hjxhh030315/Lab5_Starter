// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const synth = window.speechSynthesis;

    // Get the voice selection dropdown and populate it with available voices
    const voiceSelect = document.getElementById('horn-select');
    const voices = synth.getVoices();
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // Get the "Play Sound" button and the selected horn sound
    const playButton = document.querySelector('button');
    const audio = document.querySelector('audio');

    // Get the volume slider and the volume icon
    const volumeSlider = document.getElementById('volume');
    const volumeIcon = document.querySelector('#volume-controls img');

    // Function to play the selected horn sound with the chosen volume level
    const playHornSound = () => {
        const hornSound = voiceSelect.value;
        audio.src = `./assets/audio/${hornSound}.mp3`;
        audio.volume = volumeSlider.value / 100;
        audio.play();
    };

    // Add an event listener to the "Play Sound" button
    playButton.addEventListener('click', playHornSound);

    // Add an event listener to the volume slider to update the volume icon
    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        if (volume == 0) {
            volumeIcon.src = 'assets/icons/volume-level-0.svg';
            volumeIcon.alt = 'Volume level 0';
        } else if (volume <= 33) {
            volumeIcon.src = 'assets/icons/volume-level-1.svg';
            volumeIcon.alt = 'Volume level 1';
        } else if (volume <= 66) {
            volumeIcon.src = 'assets/icons/volume-level-2.svg';
            volumeIcon.alt = 'Volume level 2';
        } else {
            volumeIcon.src = 'assets/icons/volume-level-3.svg';
            volumeIcon.alt = 'Volume level 3';
        }
    });

    // Add an event listener to the audio element to change the volume icon
    audio.addEventListener('play', () => {
        volumeIcon.src = 'assets/icons/volume-level-2.svg';
        volumeIcon.alt = 'Volume level 2';
    });
    audio.addEventListener('ended', () => {
        volumeIcon.src = 'assets/icons/volume-level-0.svg';
        volumeIcon.alt = 'Volume level 0';
    });
}