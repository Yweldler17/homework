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
                    let thumbnail = v.poster || "media/defaultVideo.jpg";
                    $(`<li><p>${v.name}</p><img src=${thumbnail} alt=""></li>`)
                        .click(() => {
                            videoPlayer.empty();
                            videoPlayer.attr('src', v.url);
                        })
                        .appendTo(videoList);

                })
                .catch((err) => console.error(err));
        });
    }

}());