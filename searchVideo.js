(function(w) {
	'use strict';
	


	var input = QS('input');
	var submittedImg = QS('#c1');
	var pHashImg = QS('#c2');
    var resultText = QS('#result-text');
	var video = QS('video');

	
	
	var lookForHash = function(submittedHash, results) {
        var data = w.searchPHash(submittedHash, results);

		var top = data.slice(0, 10);
		console.log(top);
		
		var best = top[0];

        var u = best.v + '#t=' + best.t;

        resultText.innerHTML = [
            '<b>video:</b> ', best.v, '<br/>',
            '<b>time:</b> ', best.t.toFixed(2), ' s<br/>',
            '<b>url:</b> <a href="', u, '">', u, '</a>', '<br/>',
            '<b>different bits:</b> ', best.d, ' / 64 (', (best.d / 0.64).toFixed(2), ' %)'
        ].join('');

        w.showVideo(video, best.v, best.t);
	};



	w.fetchImageToCanvas(input, submittedImg, function() {
		var hash = pHash(submittedImg, pHashImg);
		lookForHash(hash, ALL_RESULTS);
	});


})(this);
