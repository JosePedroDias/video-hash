# search image in videos

using a basic perceptual hash algorithm,  
trying to find a frame from a pool of videos



## parse phase

* video server hosting the video(s) must support ranged requests
* video server should support CORS, otherwise one has to download the file or use a proxy so the parsing step is possible
* once the video parsing ends, copy the console.log line into `results/all.js`
* the save screenshot button saves frame so you can look for it in the search page O:)



## search phase

if you submit a frame from one of these videos:

* <http://rd3.videos.sapo.pt/i0Az39C8OSy6vO0rEtbk/mov/1>
* <http://rd3.videos.sapo.pt/uWMr3C8FQZE5FWwCLZTc/mov/1>

you should get a close hit, hopefully

