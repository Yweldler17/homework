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
                    let thumbnail;
                    if (v.poster.length < 1) {
                        console.log("Yes!!!");
                        thumbnail = $(`<li><p>${v.name}</p><img src="media/defaultVideo.jpg" alt=""></li>`)
                    } else {
                        thumbnail = $(`<li><p>${v.name}</p><img src=${v.poster} alt=""></li>`)
                    }
                    thumbnail.click(() => {
                        videoPlayer.empty();
                        videoPlayer.attr('src', v.url);
                    })
                        .appendTo(videoList);

                })
                .catch((err) => console.error(err));
        });
    }

}());