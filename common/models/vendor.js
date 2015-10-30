 var app = require('../../server/server');
var nodemailer = require('nodemailer');
var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');
var path = require('path');
module.exports = function(UserModel) {

UserModel.afterRemote(
      'login',
      function(ctx, ins, next) {
  console.log(ins);
       ctx.req.session.user = {
  'userId' : ins.vendorId,
  'accessToken' : ins.id

};
      ctx.req.session.vendor = {
  'userId' : ins.vendorId,
  'accessToken' : ins.id

};
  next();

      });
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hforhari531156@gmail.com',
        pass: 'michaelfaraday'
    }
});


UserModel.register = function(body, req, res, callback) {

    var newUser = body;
    newUser.email = body.email;
    newUser.name = body.name;
    newUser.usePassword = true;
    newUser.password = body.password;
    stripe.customers.create({
      email: body.email
    }).then(function(customer) {
      newUser.id = customer.id;
      UserModel.create(newUser, function(err, user) {
        if (err) {
          callback(err);
        } else {

console.log('> user.afterRemote triggered');

    var options = {
      host: 'http://shaadibelles.herokuapp.com',
      port: 80,
      type: 'email',
      to: user.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/vendorverified',
      user: user
    };

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
    app.models.vendor.find({ 'where' : { 'id' : id } },function(err, vendors){
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

             app.models.vendor.updateAll({ 'where': {'id' : userId}}, { 'subscription' : subscription }, function(err, users){
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
