(function(w) {
    'use strict';

    var video = QS('video');
    var shotButton = QS('#shot');

    var url = w.fromSearch();

    w.showVideo(video, url);
    video.play();

    shotButton.addEventListener('click', function() {
        video.pause();
        var time = video.currentTime.toFixed(3);
        var imageName = url + '_' + time + '.jpg';
        var dataURI = w.dataURIFromVideo(video, 'image/jpeg', 0.75);
        w.saveDataURI(dataURI, imageName);
        video.play();
    });

})(this);
