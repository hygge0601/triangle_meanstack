var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var Private = require('../models/privates');
var Activity = require('../models/activities');
var Rank = require('../models/ranks');

var nodeMailer = require('nodemailer');

var smtpTransport = nodeMailer.createTransport({
    host: 'smtp.naver.com',
    secure: true,
    auth: {
        user: 'hedgar0601@naver.com',
        pass: 'hack3125!@'
    }
});

router.post('/signup', function (req, res, next) {
    var private = new Private({
        id: req.body.id,
        pwd: bcrypt.hashSync(req.body.password, 10),
        first: req.body.firstName,
        last: req.body.lastName,
        email: req.body.email
    });
    private.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    Private.findOne({id: req.body.id}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Please confirm your Triangle ID'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.pwd)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Please confirm your Password'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

router.post('/activity', function (req, res) {
    console.log('id: ' + req.body.id);
    console.log('pwd: ' + req.body.password);
    Private.findOne({_id: req.body.id}, function (err, user) {
        console.log(user);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Invalid user',
                error: {message: 'Invalid user'}
            });
        }
        console.log(user.id);
        Activity.find({id: user.id}, function (err, logs) {
            if(err){
                console.log(err);
                return res.send(err);
            }
            if(!logs){
                console.log('not matching at activities');
            }
            var keyword =[];
            var date =[];
            var no1 =[];
            var no1_url =[];
            var no2 =[];
            var no2_url =[];
            var no3 =[];
            var no3_url =[];

            for(var i =0; i < logs.length; i++){
                keyword[i] = logs[i].keyword;
                date[i] = logs[i].date.getFullYear() + "-"
                    + (logs[i].date.getMonth() + 1) + "-" + logs[i].date.getDate();
                no1[i] = logs[i].no1;
                no1_url[i] = logs[i].no1_url;
                no2[i] = logs[i].no2;
                no2_url[i] = logs[i].no2_url;
                no3[i] = logs[i].no3;
                no3_url[i] = logs[i].no3_url;
            }

            if(logs.length>0){
                if(logs[0].keyword){
                    res.status(201).json({
                        keyword: keyword, date: date,
                        no1: no1, no1_url: no1_url,
                        no2: no2, no2_url: no2_url,
                        no3: no3, no3_url: no3_url
                    });
                }
                else{
                    res.status(201).json({
                        keyword: keyword, date: date,
                        no1: '', no1_url: '',
                        no2: '', no2_url: '',
                        no3: '', no3_url: ''
                    });
                }
            }
            else{
                res.status(201).json({
                    keyword: keyword, date: date,
                    no1: '', no1_url: '',
                    no2: '', no2_url: '',
                    no3: '', no3_url: ''
                });
            }
        })
    });
});

router.post('/delete', function (req, res) {
    Private.findById(req.body.id, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }
        user.remove(function (err, result) {
            if(err){
                return res.stat(500).json({
                    title: 'An error Occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Delete user',
                obj: result
            });
        });
    });
});

router.post('/find', function (req, res) {
    console.log('find express');
    Private.findById(req.body.id, function (err, user) {
        if(err) {
            console.log('err1 occur');
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            console.log('err2 occured!');
            return res.status(500).json({
                title: 'No User Found',
                error: {message: 'User not found'}
            })
        }
        res.status(200).json({
            message: 'find out user info',
            obj: user
        });
    });
});

router.post('/update', function (req, res) {
    console.log('json update!');
    Private.findById(req.body.id, function (err, user) {
        if(err){
            console.log('err1 occured!');
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            console.log('err2 occured!');
            return res.status(500).json({
                title: 'No User Found',
                error: {message: 'User not found'}
            });
        }
        console.log('find user: ' + user);
        user.first = req.body.firstName;
        user.last = req.body.lastName;
        user.email = req.body.email;
        user.save(function (err, result) {
            if(err){
                return res.stat(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Update User info',
                obj: result
            });
        });
    });
});

router.post('/image', function (req, res) {
    console.log('image express');
    Private.findById(req.body.id, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'No User Found',
                error: {message: 'User not found'}
            });
        }
        console.log('find image user: ' + user);
        console.log(req.body.img);
        user.img = req.body.img;
        user.save(function (err, result) {
            if(err){
                return res.stat(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Update User info',
                obj: result
            });
        })
    })
})

router.post('/analysis', function (req, res) {

    //read analysis data
    console.log('analysis express');
    if(req.body.id){
        Auction.find().exec(function (err, items) {
            console.log(items);
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if(items.length <= 0){
                return res.status(500).json({
                    title: 'No Item Found',
                    error: {message: 'Item not found'}
                });
            }

            var products = new Array();
            for(var i =0; i < items.length; i++){
                var product = new Object();
                product.title = items[i].title;
                product.site = items[i].site;
                product.category = items[i].category;
                product.count = items[i].count;
                product.url = items[i].url;
                product.img = items[i].img;

                products.push(product);
            }
            //console.log(products);

            res.status(200).json({
                message: 'Find Item',
                obj: items
            });

            //find user info
            var activity = new Object();
            Private.findById(req.body.id,function (err, user) {
                if(err){
                    console.log(err);
                }
                if(!user){
                    console.log('not user info');
                }

                //insert activity data
                var activity = new Activity({
                    id: user.id,
                    keyword: req.body.keyword,
                    date: new Date(),
                    no1: products[0].title,
                    no1_url: products[0].url,
                    no2: products[1].title,
                    no2_url: products[1].url,
                    no3: products[2].title,
                    no3_url: products[2].url
                })

                activity.save(function (err, result) {
                    if(err){
                        console.log(err);
                    }
                    console.log(result);
                })
            });
        });
    }
    else{
        res.status(500).json({
            title: 'it is not sign in status',
            error: 'token: ' + req.body.id
        })
    }
});

router.post('/confirm', function (req, res) {
    console.log('confirm express');
    Private.findById(req.body.id, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            console.log('Found not user');
            return res.status(401).json({
                title: 'Found not user',
                obj: ''
            })
        }
        if (!bcrypt.compareSync(req.body.password, user.pwd)){
            console.log('Not Asynchronized password');
            return res.status(200).json({
                title: 'Not sync password',
                obj: ''
            });
        }
        res.status(200).json({
            message: 'password is correct!',
            obj: 'correct'
        });
    });
});

router.post('/reset', function (req, res) {
    console.log('reset express');
    Private.findById(req.body.id, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).json({
                title: 'An error Occured',
                error: err
            })
        }
        if(!user){
            console.log('Found not User');
            return res.status(401).json({
                title: 'Not found user',
                error: {message: 'not found user!'}
            })
        }
        console.log('pass: ' + req.body.password);
        user.pwd = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err, result) {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: 'reset password is failed',
                    error: err
                })
            }
            res.status(200).json({
                message: 'reset password is success!',
                obj: 'success'
            });
        });
    });
});

router.post('/confirmail', function (req, res) {
    console.log('confirm mail express');
    Private.findOne({email: req.body.email}, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).json({
                title: 'An error occured',
                error: err
            })
        }
        if(!user){
            console.log('Found not User');
            return res.status(401).json({
                title: 'Not found user',
                error: 'Session is not exist'
            });
        }
        if(user.email === req.body.email){
            var username = user.last + " " + user.first;
            var mailOptions ={
                from: 'admin <hedgar0601@naver.com>',
                to: username + '<' + user.email + '>',
                subject: '요청하신 Triangle의 아이디를 발송하여 드립니다.',
                html:
                '<html>' +
                '   <head>' +
                '   </head>' +
                '   <body>' +
                '       <h1>요청하신 Triangle의 아이디를 발송해 드립니다.</h1>' +
                '       <br><br><br>' +
                '       <p>아이디: ' + user.id + '</p>' +
                '   </body>' +
                '</html>'
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if(err){
                    return console.log(err);
                }
                else{
                    console.log("Message sent: " + info.messageId + info.response);
                    res.status(200).json({
                        message: 'confirm email is completed!',
                        obj: 'success',
                        email: user.email
                    })

                }
                smtpTransport.close();
            });
        }
        else{
            res.status(400).json({
                title: 'email is not valid',
                error: {message: 'Please confirm your recovery Email'}
            });
        }
    });
});


router.post('/confirmidmail', function (req, res) {
    console.log('confirm id and email express');

    Private.findOne({id: req.body.id}, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            console.log('Found not user');
            return res.status(200).json({
                message: "can't not found User",
                obj: 'id fail'
            });
        }


        if(user.email === req.body.email){
            console.log('id and email address is correct');

            var username = user.last + ' ' + user.first;
            var mailOptions = {
                from: 'admin <hedgar0601@naver.com>',
                to: username + ' <' + user.email + '>',
                subject: '요청하신 Triangle 계정의 비밀번호를 재 설정해주십시오',
                html:
                '<html>' +
                '   <head>' +
                '    <meta charset="utf-8"/>' +
                '   </head>' +
                '   <body>' +
                '       <h1>요청하신 Triangle 계정의 비밀번호를 재 설정해주십시오</h1>' +
                '       <form action="http://localhost:3000/json/reset/forgotpwd" method="post">' +
                '           <input type="text" name="id" value="' + user.id + '" style="display: none">' +
                '           <input type="password" name="pwd1" placeholder="New Password">' +
                '           <br>' +
                '           <input type="password" name="pwd2" placeholder="confirm Password">' +
                '           <br>' +
                '           <input type="submit">' +
                '       </form>' +
                '   </body>' +
                '</html>'
            }

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if(err){
                    return console.log(err);
                }
                else{
                    console.log("Message sent: "+info.messageId + info.response);
                    console.log('user email: ' + user.email);
                    res.status(200).json({
                        message: 'reset email is sent',
                        obj: 'success',
                        email: user.email
                    });
                }
                smtpTransport.close();
            });
        }
        else{
            console.log('Not matching email address');
            res.status(200).json({
                message: "can't find email address",
                obj: 'email fail'
            });
        }
    });
});

router.post('/reset/forgotpwd', function (req, res) {
    console.log('reset forgot password express');
    Private.findOne({id: req.body.id}, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).json({
               title: 'An error occrued',
               error: err
            });
        }
        if(!user){
            console.log('Found not User');
            return res.status(401).json({
                title: 'Not found user',
                error: 'data is not existed'
            });
        }
        user.pwd = bcrypt.hashSync(req.body.pwd1, 10);
        user.save(function (err, result) {
            if(err){
                console.log('save error: ' + err);
                return res.status(500).json({
                    title: 'save error',
                    error: err
                });
            }

            res.redirect('/myAccount');
        });
    });
});

router.get('/getAll', function (req, res) {
    Rank.find().sort({count: -1}).limit(20)
        .exec(function (err, searches) {
            console.log('Get All Express');
            console.log(searches);
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: searches
            });
        });
});

router.get('/getAuction', function (req, res) {
    Rank.find({site: 'auction'}).sort({count: -1}).limit(20)
        .exec(function (err, searches) {
            console.log('Get Auction Express');
            console.log(searches);
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: searches
            });
        });
});

router.get('/getTimon', function (req, res) {
    Rank.find({site: 'ticketmonster'}).sort({count: -1}).limit(20)
        .exec(function (err, searches) {
            console.log('Get Timon Express');
            console.log(searches);
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: searches
            });
        });
});

router.get('/getG9', function (req, res) {
    Rank.find({site: 'g9'}).sort({count: -1}).limit(20)
        .exec(function (err, searches) {
            console.log('Get G9 Express');
            console.log(searches);
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: searches
            });
        });
});

router.post('/searchProduct',  function (req, res) {
    console.log('search product express');
    console.log(req.body.keyword)
    client.search({
        index: 'mall',
        //q: req.body.keyword
        q: req.body.keyword
    }).then(function (result) {
        var hits = result.hits.hits;
        res.status(200).json({
            message: 'Success',
            obj: hits
        })
    }, function (err) {
        console.trace(err.message);
    })
});

module.exports = router;