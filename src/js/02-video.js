import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));

const savePlaybackTime = () => {
    player.getCurrentTime().then(time => {
        localStorage.setItem('videoplayer-current-time', time);
    }).catch(error => {
        console.error('Error saving playback time:', error);
    });
};

const throttledSavePlaybackTime = throttle(savePlaybackTime, 1000);

player.on('timeupdate', () => {
    throttledSavePlaybackTime();
});

const resumePlayback = () => {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
        player.setCurrentTime(parseFloat(savedTime)).catch(error => {
            console.error('Error setting playback time:', error);
        });
    }
};

player.ready().then(() => {
    resumePlayback();
}).catch(error => {
    console.error('Error initializing player:', error);
});