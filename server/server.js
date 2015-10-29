var loopback = require('loopback');
var boot = require('loopback-boot');
 var fs = require('fs');
  var path = require('path');
  var crypto = require('crypto');
 var express = require('express'),
  bodyParser = require('body-parser'),
  es = require('event-stream');

var app = module.exports = loopback();
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
var bodyParser = require('body-parser');
var flash      = require('express-flash');
var session = require('express-session');


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

var config = {};
try {
	config = require('../providers.json');
} catch (err) {
	console.trace(err);
	process.exit(1); // fatal
}

passportConfigurator.init();

app.use(flash());

app.use(session({secret: 'ssshhhhh'}));


app.use("/public", loopback.static(__dirname + "/../public"));

app.use("/admin", loopback.static(__dirname + "/../admin"));

app.use("/components", loopback.static(__dirname + "/../components"));

    var path = require('path');
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

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
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


app.get('/', function (req, res) {
  console.log(req.headers.cookie);
  var string = req.headers.cookie;
  var pairs = string.split(";");
for (var i = 0; i < pairs.length; i++) {
     pairs[i] = pairs[i].trim();
 }
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[pair[0]] = unescape(pair[1]);
  }
  console.log(cookies);
  if(cookies.access_token){
    req.session.user = cookies;
  }
  fs.createReadStream('public/index.html').pipe(res);
});


app.get('/credentials', function (req, res) {
  var data = {};
if(req.session.user){
 data.user = req.session.user;
if(req.session.vendor){
 data.vendor = req.session.vendor;
}
} 
res.status(200).send(data);

});


app.get('/admin', function (req, res) {
  fs.createReadStream('admin/index.html').pipe(res);
});


  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
