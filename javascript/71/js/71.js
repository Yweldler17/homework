(function () {

    /*global $ */
    'use strict';

    let selectedItem;
    let imageChoice;
    let offset;
    let show = true;
    let help = false;
    let currentTrack = 0;
    let itemNum = 0;
    let savedItems = [];
    let nextIndex = 0;

    const doc = $(document);
    const body = $(document.body);
    const partsList = $('#partsList');
    const hideButton = $('#hideButton');
    const helpButton = $('#helpButton');
    const helpDiv = $('#helpDiv');
    const music = document.getElementById("player");
    const controlPanel = $('#controlPanel');
    let newPosition = {};

    helpDiv.hide();

    helpButton.click(() => {
        if (!help) {
            partsList.hide();
            helpDiv.show();
            help = true;
            helpButton.text('Play');
        } else {
            partsList.show();
            helpDiv.hide();
            help = false;
            helpButton.text('Help');
        }
    });

    hideButton.click(() => {
        if (show) {
            controlPanel.slideUp('slow');
            hideButton.text('Show');
            show = false;
        } else {
            controlPanel.slideDown('slow');
            hideButton.text('Hide');
            show = true;
        }
    });

    $("#player").bind("ended", function () {
        if (currentTrack === 2) {
            currentTrack = -1;
        }
        currentTrack++;
        music.src = `audio/${currentTrack}.mp3`;
        music.load();
        music.play();
    });

    body.on('dblclick', '.using', e => {
        let deleteItem = $(e.target);
        removeFromLocalStorage(deleteItem);
        deleteItem.remove();
    });

    partsList.on('mousedown', 'li', e => {
        offset = { x: e.offsetX, y: e.offsetY };
        imageChoice = $(e.target);
        selectedItem = imageChoice.clone();
        body.append(selectedItem);
        selectedItem.css({
            position: 'absolute',
            cursor: 'grabbing'
        });
        selectedItem.attr('class', 'using');
    });


    body.on('mousedown', '.using', e => {
        offset = { x: e.offsetX, y: e.offsetY };
        selectedItem = $(e.target);
        selectedItem.css({ cursor: 'grabbing', zIndex: ++nextIndex });
    });

    doc.mousemove(e => {
        if (selectedItem) {
            e.preventDefault();
            selectedItem.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
        }
    }).mouseup(() => {
        if (selectedItem) {
            selectedItem.css({ cursor: 'grab' });
            console.log(!selectedItem.data('itemIndex'));
            if (!selectedItem.data('itemIndex')) {
                selectedItem.data('itemIndex', ++itemNum);
            }
            newPosition = {
                item: selectedItem[0].outerHTML,
                itemIndex: selectedItem.data('itemIndex')
            };
            let searchByIndex = savedItems.find(item => {
                return item.itemIndex === selectedItem.data('itemIndex');
            });
            console.log('searchResult', searchByIndex);
            if (savedItems[selectedItem.data('itemIndex') - 1]) {
                savedItems[selectedItem.data('itemIndex') - 1] = newPosition;
            } else {
                savedItems.push(newPosition);
            }
            localStorage.items = JSON.stringify(savedItems);
            selectedItem = null;
        }
    });

    if (localStorage.items) {
        const savedParts = JSON.parse(localStorage.items);
        savedParts.forEach(part => {
            let theSavedImg = $(`${part.item}`);
            let imgObject = {
                item: theSavedImg[0].outerHTML,
                itemIndex: ++itemNum
            };
            theSavedImg.data('itemIndex', itemNum);
            savedItems.push(imgObject);
            body.append(theSavedImg);
        });
        localStorage.items = JSON.stringify(savedItems);
    }

    function removeFromLocalStorage(item) {
        console.log('working');
        let indexSpot = item.data('itemIndex') - 1;
        savedItems.splice((indexSpot), 1);
        console.log(indexSpot);
        for (let i = indexSpot + 1; i < savedItems.length; i++) {
            console.log(savedItems[i].itemIndex);
            savedItems[i].itemIndex = savedItems[i].itemIndex - 1;
        }
        localStorage.items = JSON.stringify(savedItems);
        indexSpot = 0;
    }

}());