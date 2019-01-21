var express = require('express');
var router = express.Router();
var url = require('url');
var fs = require('fs');
var pathExists = require('path-exists');
var path = require('path');
var mime = require("../data/type").types;
/* 静态文件服务器 */
router.get('/:path', function (req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var realpath = '/Users/shirlychen/Pictures' + pathname;
    var ext = path.extname(realpath);
    ext = ext ? ext.slice(1) : 'unknown';
    pathExists(realpath).then((exists) => {
        console.log(exists)
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write("This request URL " + pathname + " was not found on this server.");
            res.end();
        } else {
            fs.readFile(realpath, "binary", function (err, file) {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    res.end(err);
                } else {
                    var contentType = mime[ext] || "text/plain";
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.write(file, "binary");
                    res.end();
                }
            })
        }
    })
});

module.exports = router;
