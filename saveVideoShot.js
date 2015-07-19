(function(w) {
	'use strict';
	
	w.saveVideoShot = function(title, video, canvas) {
		video.pause();
		
		var suffix = video.currentTime.toFixed(3);
		var imageName = title + '_' + suffix + '.jpg';

		var dataURI = w.dataURIFromVideo(video, 'image/jpeg', 0.75);
		
		var aEl = document.createElement('a');
		aEl.setAttribute('download', imageName);
		aEl.href = dataURI;
		document.body.appendChild(aEl);
		aEl.click();
		document.body.removeChild(aEl);
	};
	
})(this);
