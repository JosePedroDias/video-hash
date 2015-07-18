(function(w) {
    'use strict';

    var input = QS('input');
    var c1 = QS('#c1');
    var c2 = QS('#c2');

    w.fetchImageToCanvas(input, c1, function() {
        console.log('done');

        var ctx = c1.getContext('2d');

        var W = c1.width;
        var H = c1.height;

        c2.width  = W;
        c2.height = H;
        var ctx2 = c2.getContext('2d');

        var id_  = ctx.getImageData(0, 0, W, H); var id = id_.data;
        var id2_ = ctx2.getImageData(0, 0, W, H); var id2 = id2_.data; // TODO or generate instead of fetch?

        var i, j, lab, l = W * H;
        for (i = 0; i < l; ++i) {
            j = i * 4;

            lab = w.rgb2lab(id, j);

            id2[  j] = lab[0];
            id2[++j] = lab[1];
            id2[++j] = lab[2];
            id2[++j] = 255;
        }

        ctx2.putImageData(id2_, 0, 0);

        console.log('done2');
    })

})(this);
