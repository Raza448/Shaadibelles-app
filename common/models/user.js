var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');
var session = require('express-session');
var path = require('path');
var app = require('../../server/server');

module.exports = function(UserModel) {

   UserModel.afterRemote(
      'login',
      function(ctx, ins, next) { 
          ctx.req.session.user = {
          'userId' : ins.userId,
          'accessToken' : ins.id
        }
       console.log(ctx.req.session.user);
       next();
      });

 UserModel.afterRemote(
      'logout',
      function(ctx, ins, next) {
            ctx.req.session.user = null;
       next();
      });

 

  //send password reset link when requested
  UserModel.on('resetPasswordRequest', function(info) {
    var url = 'http://' + 'shaadibelles.herokuapp.com' + '/#/main/reset';
    var html = 'Click <a href="' + url + '?id=' + info.accessToken.userId + '&access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    UserModel.app.models.Email.send({
      to: info.email,
      from: 'support@herokuapp.com',
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });






 UserModel.register = function(body, req, res, callback) {

    var newUser = body;
    newUser.email = body.email;
    newUser.name = body.name;
    newUser.usePassword = true;
    newUser.password = body.password;
    newUser.realm = body.realm;
    stripe.customers.create({
      email: body.email
    }).then(function(customer) {
      newUser.id = customer.id;
      UserModel.create(newUser, function(err, user) {
     console.log(user);       
        if (err) {
          callback(err);
        } else {

  if(user.realm === 'vendor'){
app.models.Role.findOne({ 'where' : { 'name' : 'admin' }}, function(err, role ){
 role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal); 
});
});
} else {
app.models.Role.findOne({ 'where' : { 'name' : 'guest' }}, function(err, role ){
 role.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: user.id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal); 
});
});
}

 


console.log('> user.afterRemote triggered');

    var options = {
      host: 'http://shaadibelles.herokuapp.com',
      port: 80,
      type: 'email',
      to: user.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      user: user
    };
    if(user.realm === 'vendor'){
      options.redirect =  '/vendorverified';
} else {
     options.redirect =  '/verified';
}

    user.verify(options, function(err, response, next) {
      if (err) return next(err);
      console.log('> verification email sent:', response);
          res.send(user);
    });

        }
      });
    });


  };


  UserModel.remoteMethod(
    'register', {
      accepts: [{
        arg: 'body',
        type: 'object',
        http: {
          source: 'body'
        }
      }, {
        arg: 'req',
        type: 'object',
        http: {
          source: 'req'
        }
      }, {
        arg: 'res',
        type: 'object',
        http: {
          source: 'res'
        }
      }],
      http: {
        path: '/register',
        verb: 'post'
      }
    }
  );


UserModel.contact = function(body, id, res, callback) {
    app.models.user.find({ 'where' : { 'id' : id } },function(err, vendors){
  var vendor = vendors[0];
 if(err){
  return callback(err);
}

 transporter.sendMail({
    from: 'support@shaadibelles.com',
    to: vendor.email,
    subject: 'New Contact request from shaadibelles',
    text: body.content
     },function(err, mail){
  if(err){
  return callback(err);
}
   res.send(mail);
});

  
});
 
   

  };


  UserModel.remoteMethod(
    'contact', {
      accepts: [{
        arg: 'body',
        type: 'object',
        http: {
          source: 'body'
        }
      }, {
        arg: 'id',
        type: 'string'
      }, {
        arg: 'res',
        type: 'object',
        http: {
          source: 'res'
        }
      }],
      http: {
        path: '/:id/contact',
        verb: 'post'
      }
    }
  );


 UserModel.subscribe = function(body, res, callback) {

        var userId = body.userId;
        var data = {
          source: body.token,
          plan: '1'
        }

       

          stripe.customers.createSubscription(userId, data).then(function(
            subscription) {

             app.models.user.updateAll({ 'where': {'id' : userId}}, { 'subscription' : subscription }, function(err, users){
                res.status(200).send(subscription);
             });
          });

      }


      UserModel.remoteMethod(
        'subscribe', {
          accepts: [{
            arg: 'body',
            type: 'object',
            http: {
              source: 'body'
            }
          }, {
            arg: 'res',
            type: 'object',
            http: {
              source: 'res'
            }
          }],
          http: {
            path: '/subscribe',
            verb: 'post'
          }
        }
      );


};
