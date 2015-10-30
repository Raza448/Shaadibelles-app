var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');
var session = require('express-session');
var path = require('path');

module.exports = function(UserModel) {


 

  //send password reset link when requested
  UserModel.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    UserModel.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });



UserModel.afterRemote(
      'login',
      function(ctx, ins, next) {
  console.log(ins);
       ctx.req.session.user = {
  'userId' : ins.userId,
  'accessToken' : ins.id

};
  next();

      });

UserModel.afterRemote(
      'logout',
      function(ctx, ins, next) {
      console.log(ins);

       delete ctx.req.session.user;
       if(ctx.req.session.vendor){
 delete ctx.req.session.vendor;
}
  next();

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
      redirect: '/verified',
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

};
