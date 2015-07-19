(function(w) {
	'use strict';
	


	var input = QS('input');
	var submittedImg = QS('#c1');
	var pHashImg = QS('#c2');
	var video = QS('video');
	
	
	
	var showVideo = function(url, t) {
		console.log(url, t);
		url += '#t=' + t;//.toString().replace('.', ',');
		console.log(url);
		video.setAttribute('controls', '');
		var source = document.createElement('source');
		source.setAttribute('type', 'video/mp4');
		source.setAttribute('src', url);
		video.appendChild(source);
	};
	
	
	
	var lookForHash = function(submittedHash, results) {
		//console.log(hash);
		//console.log(results);
		
		var data = [];
		
		var video, videoHashes, hash, time;
		for (video in results) {
			videoHashes = results[video];
			
			for (hash in videoHashes) {
				time = videoHashes[hash];
				//console.log(video, time, hash);
				data.push({
					d: pHashDistance(hash, submittedHash),
					v: video,
					t: time
				});
			}
		}
		
		data.sort(function(a, b) {
			a = a.d;
			b = b.d;
			return ( (a < b) ? -1 : ((a > b) ? 1 : 0) );
		});
		
		var top = data.slice(0, 10);
		console.log(top);
		
		var best = top[0];
		showVideo(best.v, best.t);
	};



	w.fetchImageToCanvas(input, submittedImg, function() {
		var hash = pHash(submittedImg, pHashImg);
		lookForHash(hash, ALL_RESULTS);
	});


})(this);
