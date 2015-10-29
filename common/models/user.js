var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');
var session = require('express-session');

module.exports = function(UserModel) {
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
          res.send(user);
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
