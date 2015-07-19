var url = fromSearch();
var video = QS('video');
showVideo(video, url);

var scd = Scd(video, {
    //mode: 'PlaybackMode',
    //step_width: 50,
    //step_height: 37,
    //debug: true
}, function(res){
    console.log(res);
});

setTimeout(function() {
    scd.start();
}, 200);

