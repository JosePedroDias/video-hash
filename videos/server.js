var express = require('express');
var send    = require('send');

var PORT = 3000;

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};

app.disable('x-powered-by');
app.use(allowCrossDomain);

app.get('/:video', function (req, res) {
    send(req, req.params.video, {})
        .pipe(res);
});

app.listen(PORT, function() {
    console.log('video server listening on port %s...', PORT);
});
