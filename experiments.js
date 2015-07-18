(function(w) {
    'use strict';

    var input = QS('input');
    var c1 = QS('#c1');
    var c2 = QS('#c2');



    var rgb2labImage = function(id, id2, W, H) {
        var i, j, lab, l = W * H;
        for (i = 0; i < l; ++i) {
            j = i * 4;

            lab = w.rgb2lab(id, j);

            id2[  j] = lab[0];
            id2[++j] = lab[1];
            id2[++j] = lab[2];
            id2[++j] = 255;
        }
    };



    w.fetchImageToCanvas(input, c1, function() {
        console.log('done');

        var ctx, ctx2, W, H, id, id2, id_, id2_, hist;

        ctx = c1.getContext('2d');

        W = c1.width;
        H = c1.height;

        if (0) { // rgb2lab
            c2.width = W;
            c2.height = H;

            ctx2 = c2.getContext('2d');

            id_  =  ctx.getImageData(0, 0, W, H); id  = id_.data;
            id2_ = ctx2.getImageData(0, 0, W, H); id2 = id2_.data; // TODO or generate instead of fetch?

            rgb2labImage(id, id2, W, H);
        }
        else if (1) { // histogram
            c2.width = 256;
            c2.height = 256;

            ctx2 = c2.getContext('2d');

            id_  = ctx.getImageData(0, 0, W, H);      id = id_.data;
            id2_ = ctx2.getImageData(0, 0, 256, 256); id2 = id2_.data; // TODO or generate instead of fetch?

            var hist = w.histogram(id, false);
            //console.log(hist);
            w.histogramImage(hist, id2);
        }

        ctx2.putImageData(id2_, 0, 0);

        console.log('done2');
    })

})(this);
