(function(w) {
    'use strict';

    var input = QS('input');
    var canvas = QS('canvas');
    var select = QS('select');

    w.fetchImageToCanvas(input, canvas, function() {
        var op = select.value;

        if (op === 'RGB to LAB') {
            w.toLAB(canvas);
        }
        else if (op === 'histogram') {
            var histEl = w.generateHistogram(canvas);
            canvas.parentNode.replaceChild(histEl, canvas);
            canvas = histEl;
        }
    })

})(this);
