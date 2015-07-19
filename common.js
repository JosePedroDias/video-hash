(function(w) {
    'use strict';



    w.QS = function(sel) { return document.querySelector(sel); };



    w.fromSearch = function() {
        var url = location.search.split('');
        url.shift();
        if (url[ url.length-1 ] === '/') { url.pop(); }
        url = url.join('');
        return decodeURIComponent(url);
    };



    w.showVideo = function(video, url, t) {
        if (t) {
            url += '#t=' + t;//.toString().replace('.', ',');
        }

        video.setAttribute('crossorigin', 'anonymous'); // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
        video.setAttribute('controls', '');
        var source = document.createElement('source');
        source.setAttribute('type', 'video/mp4');
        source.setAttribute('src', url);
        video.appendChild(source);
    };



    w.fetchImageToCanvas = function(input, canvasToPaintTo, cb) {
        var submittedImg = canvasToPaintTo;

        input.addEventListener('change', function (ev) {
            var reader = new FileReader();

            reader.onload = function(ev) {
                var img = new Image();
                img.onload = function() {
                    submittedImg.width = img.width;
                    submittedImg.height = img.height;
                    var ctx = submittedImg.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    cb();
                }

                img.src = ev.target.result;
            }
            reader.readAsDataURL(ev.target.files[0]);
        });
    };

})(this);
