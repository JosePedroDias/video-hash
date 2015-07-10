(function(w) {
	'use strict';
	
	w.saveVideoShot = function(title, video, canvas) {
		video.pause();
		
		var suffix = video.currentTime.toFixed(3);
		var imageName = title + '_' + suffix + '.jpg';
		
		var ctx = canvas.getContext('2d');
		var w = video.videoWidth;
		var h = video.videoHeight;
		canvas.width = w;
		canvas.height = h;
		ctx.drawImage(video, 0, 0, w, h);
		var dataUrl = canvas.toDataURL('image/jpeg', 0.75);
		
		var aEl = document.createElement('a');
		aEl.setAttribute('download', imageName);
		aEl.href = dataUrl;
		//aEl.href = 'data:image/svg+xml;base64,\n' + b64;
		document.body.appendChild(aEl);
		aEl.click();
		document.body.removeChild(aEl);
		
	};
	
})(this);
