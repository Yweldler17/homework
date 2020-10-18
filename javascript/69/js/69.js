/*global google */
/*global $ */
function initMap() {

    'use strict';

    const searchButton = $('#searchButton');
    const searchBox = $('#searchBox');
    const resultList = $('#resultList');
    const previous = $('#previous');
    const next = $('#next');
    const imageNum = $('#imageNum');
    let defaultImage = "media/default.png";

    let lat;
    let lon;
    let location;
    let searchItems = [];
    let markerArray = [];
    let map;
    let index = 0;

    searchButton.click(() => {
        fetchWiki(searchBox.val());
    });

    function refreshIndex() {
        map.setCenter({ lat: searchItems[index].lat, lng: searchItems[index].lng });
        map.setZoom(13);
        imageNum.text(index + 1)
    }

    function fetchWiki(searchVal) {
        clearMap();
        let counter = 0;
        fetch(`http://api.geonames.org/wikipediaSearchJSON?q=${searchVal}&maxRows=10&username=`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(wikiResult => {
                searchItems = wikiResult.geonames.map(item => ({
                    title: item.title,
                    thumbnail: item.thumbnailImg,
                    lat: item.lat,
                    lng: item.lng,
                    summary: item.summary,
                    wikiUrl: item.wikipediaUrl,
                    itemIndex: counter++
                }));
                console.log(searchItems);
                setWiki(searchItems);
            })
            .catch((err) => console.error(err));
    }

    function setWiki(wikiArray) {
        resultList.empty();
        let infoWindow = new google.maps.InfoWindow();
        let bounds = new google.maps.LatLngBounds();
        wikiArray.forEach(item => {
            console.log(item.itemIndex);
            $(`<li><div><h3>${item.title}</h3><img src=${item.thumbnail || defaultImage} alt="${item.title || ""}"></div></li>`).appendTo(resultList).click(() => {
                index = item.itemIndex;
                refreshIndex();
            });

            const marker = new google.maps.Marker({
                position: { lat: item.lat, lng: item.lng },
                map: map,
                title: item.title,
                icon: {
                    url: item.thumbnail,
                    scaledSize: new google.maps.Size(50, 50)
                }
            });

            markerArray.push(marker);

            marker.addListener('click', () => {
                infoWindow.setContent(`<h3>${item.title}</h3><br><p>${item.summary}</p><br><a href="https://${item.wikiUrl}" target="_blank">More Info</a>`);
                infoWindow.open(map, marker);
                index = item.itemIndex;
                refreshIndex();
            });
            bounds.extend({ lat: item.lat, lng: item.lng });
        });
        map.fitBounds(bounds);

    }

    navigator.geolocation.getCurrentPosition(getMyMap);

    function getMyMap(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        location = { lat: lat, lng: lon };
        map = new google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: 14,
        });
    }

    previous.click(() => {
        if (--index < 0) {
            index = searchItems.length - 1;
        }
        refreshIndex();
    });

    next.click(() => {
        if (++index === searchItems.length) {
            index = 0;
        }
        refreshIndex();
    });

    function clearMap() {
        resultList.empty();
        index = 0;
        searchItems = [];
        for (let i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
        markerArray = [];
    }
}


