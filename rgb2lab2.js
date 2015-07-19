(function(w) {
    'use strict';

    // http://stackoverflow.com/questions/13405956/convert-an-image-rgb-lab-with-python

    w.rgb2lab = function(arr, i0) {

        var rgb = [
            arr[i0]   * 0.39215686274509803, // /255*100
            arr[i0+1] * 0.39215686274509803,
            arr[i0+2] * 0.39215686274509803
        ];

        var xyz = [
            ( rgb[0] * 0.4124 + rgb[1] * 0.3576 + rgb[2] * 0.1805 ) / 95.047,
            ( rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 ) / 100,
            ( rgb[0] * 0.0193 + rgb[1] * 0.1192 + rgb[2] * 0.9505 ) / 108.883
        ];

        return [
            116 *  xyz[1] - 16,
            500 * (xyz[0] - xyz[1]),
            200 * (xyz[1] - xyz[2])
        ];
    };

})(this);
