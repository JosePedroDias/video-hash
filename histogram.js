(function (w) {
    'use strict';

    w.rgbToHex = function(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    w.histogram = function (data, all) {
        var hist = {
            r: new Array(256),
            g: new Array(256),
            b: new Array(256)
        };
        var pal = [];
        var map = {};
        var k, r, g, b, i, l = data.length;

        for (i = 0; i < 256; ++i) {
            hist.r[i] = hist.g[i] = hist.b[i] = 0;
        }

        for (i = 0; i < l; i += 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];

            ++hist.r[r];
            ++hist.g[g];
            ++hist.b[b];

            if (all) {
                //k = [r, g, b].join('_');
                k = w.rgbToHex(r, g, b);

                if (!(k in map)) {
                    map[k] = 1;
                    pal.push(k);
                }
                else {
                    ++map[k];
                }
            }
        }

        if (all) {
            hist.pal = pal;
            hist.map = map;
        }

        return hist;
    };

    var maxInArr = function(arr) {
        return Math.max.apply(null, arr);
    }

    w.histogramImage = function(hist, data) {
        var maxR = maxInArr(hist.r);
        var maxG = maxInArr(hist.g);
        var maxB = maxInArr(hist.b);

        var maxV = Math.max(maxR, maxG, maxB);
        var s = 255 / maxV;

        var r, g, b;
        var x, y, i = 0;
        for (x = 0; x < 256; ++x) {
            r = hist.r[x] * s;
            g = hist.g[x] * s;
            b = hist.b[x] * s;
            for (y = 0; y < 256; ++y) {
                data[i]   = ((y <= r) ? 255 : 0);
                data[i+1] = ((y <= g) ? 255 : 0);
                data[i+2] = ((y <= b) ? 255 : 0);
                data[i+3] = 255;
                i += 4;
            }
        }
    };

}(this));
