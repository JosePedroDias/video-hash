(function(w) {
    'use strict';

    // https://github.com/gka/chroma.js/blob/master/chroma.js
    // https://raw.githubusercontent.com/gka/chroma.js/e1557139233d4d3da0f60bfcb6fabce8a12190e4/src/converter/misc/lab-constants.coffee



    var LAB_CONSTANTS = {
        Kn: 18,
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452
    };



    var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) {
            return r / 12.92;
        } else {
            return Math.pow((r + 0.055) / 1.055, 2.4);
        }
    };

    var xyz_lab = function(t) {
        if (t > LAB_CONSTANTS.t3) {
            return Math.pow(t, 1 / 3);
        } else {
            return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
        }
    };

    var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
        return [x, y, z];
    };



    w.rgb2lab = function(arr, i0) {
        var r = arr[i0];
        var g = arr[i0+1];
        var b = arr[i0+2];

        // 2 xyz
        var arr2 = rgb2xyz(r, g, b);

        // 2 lab
        var x = arr2[0];
        var y = arr2[1];
        var z = arr2[2];
        return [
            Math.floor( 116 *  y - 16  ),
            Math.floor( 500 * (x -  y) ),
            Math.floor( 200 * (y -  z) )
        ];
    };

})(this);
