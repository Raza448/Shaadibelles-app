var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');


boot(app, __dirname);
app.use("/public", loopback.static(__dirname + "/../public"));
app.use("/admin/js", loopback.static(__dirname + "/../admin/js"));
app.use("/admin/css", loopback.static(__dirname + "/../admin/css"));
app.use("/admin/views", loopback.static(__dirname + "/../admin/views"));
app.use("/components", loopback.static(__dirname + "/../components"));

 var ds = app.loopback.createDataSource({
        connector: require('loopback-component-storage'),
  provider: 'amazon',
  key: '1UZZBhUGsKqKAWtT1YN0Tv8v82yozNZZAreXUxqs',
  keyId: 'AKIAIYCCSTLER74BGKOQ',
      region : 'us-west-2',
        root: path.join(__dirname, '../../storage')
    });
    var container = ds.createModel('container');
    app.model(container);

app.middleware('session', loopback.session({ saveUninitialized: true,
  resave: true, secret: 'keyboard cat' }));

app.middleware('parse', bodyParser.json());

app.middleware('parse', bodyParser.urlencoded({
	extended: true
}));

app.models.Role.find({where: {name: 'admin'} }, function(err, roles) {

 if(err){
 console.log(err);
}

  if(!roles.length  > 0){
app.models.user.create(
{
   
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
        "widgets": [
        ],
        "footerMenu": null,
        "footerMenuTwo": null,
        "recommended": [
        ],
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
        "description": null ,
        "slides": [
        
        ],
        "vendor": null
    }
}, function(err, user){
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

app.get('/', function (req, res) {

  if(!req.session.user){
 req.session.user = null;
}
  fs.createReadStream('public/index.html').pipe(res);
});



app.get('/admin', function (req, res) {
 if(req.session.user && req.session.user.userId){
app.models.Role.getRoles({principalType: app.models.RoleMapping.USER, principalId: req.session.user.userId}, function(err, roles) {


  app.models.Role.findOne({'where' : {'id' : roles[2]}}, function(err, r){
  if(err){
return console.log(err);
  res.redirect('/');
}
if(r){
if(r.name === 'admin'){
  console.log(r.name);
    fs.createReadStream('admin/index.html').pipe(res);
} else {
  res.redirect('/');
}
}
 else {
  res.redirect('/');
}
 
});


  });
} else {
  res.redirect('/');
}

});



app.get('/verified', function (req, res) {
  res.redirect('/#/main/verified');
});

app.get('/vendorverified', function (req, res) {
  res.redirect('/#/main/vendorverified');
});

app.get('/credentials', function (req, res, next) {
  var user = {};
  if(req.session.user && req.session.user.accessToken){
  var user = { 'userId' : req.session.user.userId, 'accessToken': req.session.user.accessToken };
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
