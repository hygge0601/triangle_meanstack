var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();

var Private = require('../models/privates');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage});

router.post("/", upload.array("uploads[]", 12), function (req, res) {
    console.log("files", req.files);
    res.send(req.files);
});

module.exports = router;