var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var Facebook = require('facebook-node-sdk');
var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');

boot(app, __dirname);
app.use(loopback.favicon(path.resolve(__dirname, '../favicon.ico')));
app.use("/public", loopback.static(__dirname + "/../public"));
app.use("/admin/js", loopback.static(__dirname + "/../admin/js"));
app.use("/admin/css", loopback.static(__dirname + "/../admin/css"));
app.use("/admin/views", loopback.static(__dirname + "/../admin/views"));
app.use("/components", loopback.static(__dirname + "/../components"));


// app.use(Facebook.middleware({ appId: '748452378599729', secret: '935fef9dbef266953cc94756dda7f4dc' }));
app.use(Facebook.middleware({ appId: '1686914201546987', secret: '6f9b32f1e0e71402faed779822219fcc' }));

var ds = app.loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'amazon',
    key: '1UZZBhUGsKqKAWtT1YN0Tv8v82yozNZZAreXUxqs',
    keyId: 'AKIAIYCCSTLER74BGKOQ',
    region: 'us-west-2',
    root: path.join(__dirname, '../../storage')
});
var container = ds.createModel('container');
app.model(container);

app.middleware('session', loopback.session({
    saveUninitialized: true,
    resave: true,
    secret: 'keyboard cat'
}));

app.middleware('parse', bodyParser.json());

app.middleware('parse', bodyParser.urlencoded({
    extended: true
}));

app.models.Role.find({ where: { name: 'admin' } }, function(err, roles) {

    if (err) {
        console.log(err);
    }

    if (roles && !roles.length > 0) {
        app.models.user.create({

            "username": "admin",
            "password": "helloworld",
            "email": "support@shaadibelles.com",
            "emailVerified": true,
            "status": "active",
            "settings": {
                "live": true,
                "title": "shaadibelles",
                "address": null,
                "email": null,
                "slider": null,
                "menu": null,
                "category": null,
                "widgets": [],
                "footerMenu": null,
                "footerMenuTwo": null,
                "recommended": [],
                "featuredVendors": [

                ],
                "blog": {
                    "smallWidgets": [

                    ],
                    "mediumWidgets": [

                    ],
                    "bigWidgets": [

                    ],
                    "categories": [

                    ],
                    "slider": null
                }
            },
            "social": {
                "facebook": null,
                "twitter": null,
                "youtube": null,
                "pinterest": null
            },
            "featured_vendor": {
                "title": null,
                "description": null,
                "slides": [

                ],
                "vendor": null
            }
        }, function(err, user) {
            app.models.Role.create({
                name: 'admin'
            }, function(err, role) {
                if (err) throw err;

                console.log('Created role:', role);

                //make bob an admin
                role.principals.create({
                    principalType: app.models.RoleMapping.USER,
                    principalId: user.id
                }, function(err, principal) {
                    if (err) throw err;

                    console.log('Created principal:', principal);

                    app.models.Role.create({
                        name: 'guest'
                    }, function(err, role) {
                        if (err) throw err;
                        console.log('Created role:', role);
                    });

                    app.models.Role.create({
                        name: 'vendor'
                    }, function(err, role) {
                        if (err) throw err;
                        console.log('Created role:', role);
                    });
                });
            });
        });

    }
});

app.get('/', function(req, res) {

    if (!req.session.user) {
        req.session.user = null;
    }
    fs.createReadStream('public/index.html').pipe(res);
});


app.get('/auth/facebook', Facebook.loginRequired(), function(req, res) {
    req.facebook.api('/me?fields=email,name,id', function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);
        app.models.user.findOne({ where: { email: user.email } }, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user && user.id) {
                app.models.AccessToken.create({ userId: user.id }, function(err, token) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.user = {
                        'userId': token.userId,
                        'accessToken': token.id
                    }
                    res.redirect('/');
                });
            } else {
                console.log('user not found');
                res.redirect('/notexists');
            }
        });
    });
});

app.get('/auth/facebook/signup', Facebook.loginRequired(), function(req, res) {
    req.facebook.api('/me?fields=email,name,id', function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);
        app.models.user.findOne({ where: { email: user.email } }, function(err, userFound) {
            if (err) {
                console.log(err);
            }
            if (userFound && userFound.id) {
                res.redirect('/exists')
            } else {
                var array = user.email.split('@');

                var newUser = {};

                newUser.email = user.email;
                newUser.username = array[0];
                newUser.name = user.name;
                newUser.emailVerified = true;
                newUser.usePassword = false;
                newUser.realm = 'guest';
                stripe.customers.create({
                    email: user.email
                }).then(function(customer) {
                    newUser.id = customer.id;
                    app.models.user.create(newUser, function(err, user) {
                        console.log(user);
                        if (err) {
                            console.log(err);
                        } else {
                            app.models.Role.findOne({ 'where': { 'name': 'guest' } }, function(err, role) {
                                role.principals.create({
                                    principalType: app.models.RoleMapping.USER,
                                    principalId: user.id
                                }, function(err, principal) {
                                    if (err) throw err;
                                    res.redirect('/regsuccess');
                                    console.log('Created principal:', principal);
                                });
                            });
                        }
                    });
                });
            }
        });
    });
});

app.get('/auth/facebook/vendorsignup', Facebook.loginRequired(), function(req, res) {
    req.facebook.api('/me?fields=email,name,id', function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);
        app.models.user.findOne({ where: { email: user.email } }, function(err, userFound) {
            if (err) {
                console.log(err);
            }
            if (userFound && userFound.id) {
                res.redirect('/exists');
            } else {
                var array = user.email.split('@');

                var newUser = {};

                newUser.email = user.email;
                newUser.username = array[0];
                newUser.name = user.name;
                newUser.emailVerified = true;
                newUser.usePassword = false;
                newUser.realm = 'vendor';
                stripe.customers.create({
                    email: user.email
                }).then(function(customer) {
                    newUser.id = customer.id;
                    app.models.user.create(newUser, function(err, user) {
                        console.log(user);
                        if (err) {
                            console.log(err);
                        } else {
                            app.models.Role.findOne({ 'where': { 'name': 'vendor' } }, function(err, role) {
                                role.principals.create({
                                    principalType: app.models.RoleMapping.USER,
                                    principalId: user.id
                                }, function(err, principal) {
                                    if (err) throw err;
                                    res.redirect('/regsuccess');
                                    console.log('Created principal:', principal);
                                });
                            });

                        }
                    });
                });
            }
        });
    });
});



app.get('/admin', function(req, res) {
    if (req.session.user && req.session.user.userId) {
        app.models.Role.getRoles({ principalType: app.models.RoleMapping.USER, principalId: req.session.user.userId }, function(err, roles) {


            app.models.Role.findOne({ 'where': { 'id': roles[2] } }, function(err, r) {
                if (err) {
                    return console.log(err);
                    res.redirect('/');
                }
                if (r) {
                    if (r.name === 'admin') {
                        console.log(r.name);
                        fs.createReadStream('admin/index.html').pipe(res);
                    } else {
                        res.redirect('/');
                    }
                } else {
                    res.redirect('/');
                }

            });
        });
    } else {
        res.redirect('/');
    }

});



app.get('/verified', function(req, res) {
    res.redirect('/#/main/verified');
});

app.get('/exists', function(req, res) {
    res.redirect('/#/main/exist');
});

app.get('/notexists', function(req, res) {
    res.redirect('/#/main/notexist');
});

app.get('/regsuccess', function(req, res) {
    res.redirect('/#/main/regsuccess');
});

app.get('/vendorverified', function(req, res) {
    res.redirect('/#/main/vendorverified');
});


app.post('/contact', function(req, res) {


    var html = "<h3>New Contact request from" + req.body.name + "</h3></br><h4>Email : " + req.body.email + "</h4></br></br><p>content : " + req.body.content + "</p>";
    if (req.body.weddingplace) {
        html += "</br><p> wedding date : " + req.body.weddingplace + "</p>";
    }
    app.models.Email.send({
        to: 'raza.scet@gmail.com',
        from: 'support@herokuapp.com',
        subject: 'Shaadibelles New Query',
        html: html
    }, function(err) {
        if (err) return console.log('> error sending contact email');
        console.log('> sending contact email');
        res.status(200).end();
    });
});

app.get('/credentials', function(req, res, next) {
    var user = {};
    if (req.session.user && req.session.user.accessToken) {
        var user = { 'userId': req.session.user.userId, 'accessToken': req.session.user.accessToken };
    }

    res.status(200).send(user);
});
var path = require('path');
app.use(loopback.urlNotFound());
app.use(loopback.errorHandler());
app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

// start the server if `$ node server.js`
if (require.main === module) {
    app.start();
}