(function(w) {
	'use strict';
	


	var setV = function(el, v) { el.firstChild.nodeValue =  ((typeof v === 'number') ? v.toFixed(2) : v); };
	
	
	var d;
	var dt = 1;
	var lastT = -1;
	
	var url = w.fromSearch();
	
	
	
	var video = QS('video');
	var canvas = QS('canvas');
	
	var titleSpan = QS('#title');
	var progressSpan = QS('#progress');
	var tSpan = QS('#t');
	var dSpan = QS('#d');
	var hashSpan = QS('#hash');
	
	
	
	var results = {};
	setV(titleSpan, url);
	
	
	
	video.addEventListener('durationchange', function() {
		d = video.duration;

		setV(dSpan, d);
	});
	
	video.addEventListener('timeupdate', function() {
		var t = video.currentTime;
		if (t >= lastT + dt) {
			video.pause();
			lastT = t;
			
			var hash = pHash(video, canvas);
			
			setV(progressSpan, t * 100 / d );
			setV(tSpan, t);
			setV(hashSpan, hash);
			
			results[hash] = t;
			
			video.play();
		}
	});
	
	video.addEventListener('ended', function() {
		console.log( ['"', url, '": ', JSON.stringify(results),','].join('') );
	});
	
	
	
	video.setAttribute('autoplay', '');
	video.setAttribute('muted', '');
	var source = document.createElement('source');
	source.setAttribute('type', 'video/mp4');
	source.setAttribute('src', url);
	video.appendChild(source);

})(this);
