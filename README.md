# search image in videos

using a basic perceptual hash algorithm,  
trying to find a frame from a pool of videos



## parse phase

* video server hosting the video(s) must support ranged requests
* video server should support CORS, otherwise one has to download the file or use a proxy so the parsing step is possible
* once the video parsing ends, copy the console.log line into `results/all.js`
* the save screenshot button saves frame so you can look for it in the search page O:)

you should parse the video locally or use a video URL with CORS, then fire it here:

<http://josepedrodias.github.io/video-hash/parseVideo.html>



## search phase

With the test results on the repos, if you submit a frame from one of these videos:

* <http://rd3.videos.sapo.pt/i0Az39C8OSy6vO0rEtbk/mov/1>
* <http://rd3.videos.sapo.pt/uWMr3C8FQZE5FWwCLZTc/mov/1>

you should get a close hit, hopefully.

Try here:

<http://josepedrodias.github.io/video-hash/searchVideo.html>



## credits

article
http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html

basic pHash impl
??

scene detection
https://github.com/gmarty/Mozilla-Dev-Derby-2011-07

rgb2lab
https://github.com/gka/chroma.js/blob/master/chroma.js

?rgb2lab 2?
http://stackoverflow.com/questions/13405956/convert-an-image-rgb-lab-with-python

histogram
me

dct
https://github.com/vail-systems/node-dct/blob/master/src/dct.js



## new ideas

0) IMPROVE PHASH PRECISION 1
 
replace media for DCT


1) IMPROVE PHASH PRECISION 2

improve pHash, by converting it to a better color space than RGB (CIELAB?) and computing 3 hashs (one for each channel).
hash is the concatenation of 3 binary hashes


2) COMPUTE HASH FOR THE MOVIE

sample n frames from the video (ex: 10).
for each, compute the histogram (an image itself) and do a pHash of it!
use those entries to look for the movie (instead of all the frames sampled)


3) SMARTER HISTOGRAM SAMPLING

make use of a scene detection algorithm to identify scenes.
take one histogram at every scene half
