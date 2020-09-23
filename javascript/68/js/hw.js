(function () {
    'use strict';

    /*global $ */

    const searchButton = $('#searchButton');
    const searchBox = $('#searchBox');
    const largeImage = $('#largeImage');
    const imageList = $('#imageList');
    const imageInfo = $('#imageInfo');
    const imgDetails = $('#imgDetails');
    const previous = $('#previous');
    const next = $('#next');
    const imageNum = $('#imageNum');

    $(document).ready(() => {
        search();
    });


    searchButton.click(() => {
        search();
    });

    previous.click(() => {
        slideImage(-1);
    });

    next.click(() => {
        slideImage(1);
    });

    function search() {
        let searchWord = searchBox.val();
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${searchWord}&format=json&jsoncallback=?`)
            .then(pictureData => {
                imageList.empty();
                imageList.data('imageArray', pictureData.items);
                setMainImg(pictureData.items[0], 0);
                for (let i = 0; i < pictureData.items.length; i++) {
                    $(`<li><img src=${pictureData.items[i].media.m} alt=""></li>`)
                        .click(() => setMainImg(pictureData.items[i], i))
                        .appendTo(imageList);

                }

                console.log(pictureData);
            })
            .catch(e => console.error(e));
    }

    function slideImage(direction) {
        let arraySize = imageList.data('imageArray').length;
        console.log(imageList.data('imageArray').length);
        let currentSpot = largeImage.data('position');
        let newSpot = currentSpot + direction;
        if (newSpot === arraySize) {
            newSpot = 0;
        } else if (newSpot < 0) {
            newSpot = arraySize - 1;
        }
        setMainImg(imageList.data('imageArray')[newSpot], newSpot);
    }

    function setMainImg(img, spot) {
        largeImage.attr('src', img.media.m);
        largeImage.data('image', img);
        largeImage.data('position', spot);
        imageNum.text(spot + 1);
        updateInfo();
    }

    imgDetails.change(() => {
        updateInfo();
    });

    function updateInfo() {
        let choice = imgDetails.find(":selected").val();
        imageInfo.text(largeImage.data('image')[choice]);
    }


}());