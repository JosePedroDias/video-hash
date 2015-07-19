(function(w) {
    'use strict';



    w.QS = function(sel) { return document.querySelector(sel); };


    w.seq = function(n){
        var arr = new Array(n);
        for (var i = 0; i < n; ++i) {
            arr[i] = i;
        }
        return arr;
    };


    w.fromSearch = function() {
        var url = location.search.split('');
        url.shift();
        if (url[ url.length-1 ] === '/') { url.pop(); }
        url = url.join('');
        return decodeURIComponent(url);
    };



    w.canvasFromVideo = function(video) {
        var canvasEl = document.createElement('canvas');
        var W = video.videoWidth;
        var H = video.videoHeight;
        canvasEl.width = W;
        canvasEl.height = H;
        var ctx = canvasEl.getContext('2d');
        ctx.drawImage(video, 0, 0, W, H);

        return canvasEl;
    };



    w.dataURIFromVideo = function(video, mimeType, quality) {
        var canvasEl = w.canvasFromVideo(video);
        return canvasEl.toDataURL(mimeType || 'image/jpeg', quality || 0.75);
    };



    w.imageFromVideo = function(video, mimeType, quality) {
        var dataURI = w.dataURIFromVideo(video, mimeType, quality);
        var imgEl = document.createElement('img');
        imgEl.src = dataURI;
        return imgEl;
    };



    w.generateHistogram = function(c) {
        var W = c.width;
        var H = c.height;
        var ctx = c.getContext('2d');

        var c2 = document.createElement('canvas');
        c2.width = 256;
        c2.height = 256;

        var ctx2 = c2.getContext('2d');

        var id_  = ctx.getImageData(0, 0, W, H);      var id = id_.data;
        var id2_ = ctx2.getImageData(0, 0, 256, 256); var id2 = id2_.data; // TODO or generate instead of fetch?

        var hist = w.histogram(id, false);

        var mapLog = function(arr) {
            return arr.map(function(v) {
                return Math.log(v);
            });
        };

        hist = {
            r: mapLog(hist.r),
            g: mapLog(hist.g),
            b: mapLog(hist.b)
        };

        //console.log(hist);
        w.histogramImage(hist, id2);

        ctx2.putImageData(id2_, 0, 0);

        return c2;
    };



    w.cloneCanvas = function(c) {
        var W = c.width;
        var H = c.height;

        var c2 = document.createElement('canvas');
        c2.width = W;
        c2.height = H;

        c2.getContext('2d').drawImage(c, 0, 0, W, H);

        return c2;
    };



    w.toLAB = function(c) {
        var W = c.width;
        var H = c.height;
        var ctx = c.getContext('2d');

        var id_  = ctx.getImageData(0, 0, W, H);
        var id = id_.data;

        var i, j, lab, l = W * H;
        for (i = 0; i < l; ++i) {
            j = i * 4;

            lab = w.rgb2lab(id, j);

            id[  j] = lab[0];
            id[++j] = lab[1];
            id[++j] = lab[2];
            id[++j] = 255;
        }

        ctx.putImageData(id_, 0, 0);
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



    w.saveDataURI = function(dataURI, fileName) {
        var aEl = document.createElement('a');
        aEl.setAttribute('download', fileName);
        aEl.href = dataURI;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    };

})(this);
