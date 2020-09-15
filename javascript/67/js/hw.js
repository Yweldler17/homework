(function () {
    'use strict';

    /*global $ */

    const videoPlayer = $('#videoPlayer');
    const videoList = $('#videoList');

    fetch('json/videoList.json')
        .then(r => {
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            return r.json();
        })
        .then(videos => {
            console.log(videos);
            displayVideos(videos);
        })
        .catch((err) => console.error(err));

    function displayVideos(videoArray) {
        videoArray.forEach(video => {
            fetch(`json/${video}.json`)
                .then(r => {
                    if (!r.ok) {
                        throw new Error(`${r.status} ${r.statusText}`);
                    }
                    return r.json();
                })
                .then(v => {
                    $(`<li><p>${v.name}</p><img src="media/defaultVideo.jpg" alt=""></li>`)
                        .click(() => {
                            videoPlayer.empty();
                            videoPlayer.attr('src', v.url).play();
                            //videoPlayer[0].play();
                        })
                        .appendTo(videoList);

                })
                .catch((err) => console.error(err));
        });
    }

}());