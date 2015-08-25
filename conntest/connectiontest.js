(function() {
    'use strict';

    var TIMEOUT_IN_MILLIS = 20000;
    var NOT_LOADED = 'Not loaded';

    // size in bytes
    var images = [
        {
            url: 'http://live.chess.com/static/t.gif',
            size: 43,
            speed: NOT_LOADED
        },
        {
            url: 'http://www.google.com/favicon.ico',
            size: 5430,
            speed: NOT_LOADED
        },
        {
            url: 'http://live.chess.com/static/t.gif',
            size: 5430,
            speed: NOT_LOADED
        }
    ];

    var imageLoadedCount = 0;

    var table = '<table><tr><th>URL</th><th>Size in bytes</th><th>Speed (bytes / millisecond)</th></tr>';

    for (var i = 0; i < images.length; i++) {
        var image = new Image();
        var startTime;

        image.onload = function() {
            images[i].speed = images[i].size / ((new Date()).getTime() - startTime.getTime());
            imageLoadedCount++;
        };

        image.onerror = function(error, message) {
            console.log('Error loading image. Error: ' + error + '\nMessage: ' + message);
        };

        startTime = (new Date()).getTime();
        image.src = images[i].url + '?cb=' + startTime;  // add time as cache buster
    }

    var timeout = new Date();

    while (imageLoadedCount != images.length && ((new Date()).getTime() - timeout < TIMEOUT_IN_MILLIS)) {
        // wait
    }

    table += '</table>';

    $('#connectiontest_table').append(table);
})();