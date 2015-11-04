var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
 var fs = require('fs');

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash      = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
	config = require('../providers.json');
} catch (err) {
	console.trace(err);
	process.exit(1); // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// boot scripts mount components like REST API
boot(app, __dirname);

app.use("/public", loopback.static(__dirname + "/../public"));

app.use("/admin", loopback.static(__dirname + "/../admin"));

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

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
	extended: true
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken
}));




app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
app.middleware('session', loopback.session({
	secret: 'kitty',
	saveUninitialized: true,
	resave: true
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
	userModel: app.models.user,
	userIdentityModel: app.models.userIdentity,
	userCredentialModel: app.models.userCredential
});
for (var s in config) {
	var c = config[s];
	c.session = c.session !== false;
	passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/', function (req, res) {

  fs.createReadStream('public/index.html').pipe(res);
});


app.get('/admin', function (req, res) {
  fs.createReadStream('admin/index.html').pipe(res);
});

app.get('/verified', function (req, res) {
  res.redirect('/#/main/verified');
});

app.get('/vendorverified', function (req, res) {
  res.redirect('/#/main/vendorverified');
});


app.get('/auth/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/credentials', function (req, res, next) {
  var user = {};
console.log(req);
  if(req.user && req.signedCookies.access_token){
  var user = { 'userId' : req.signedCookies.userId, 'accessToken': req.signedCookies.access_token };
}

  res.status(200).send(user);
});



// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client/public')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
	// start the web server
	return app.listen(function() {
		app.emit('started');
		console.log('Web server listening at: %s', app.get('url'));

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
	});
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.start();
}
