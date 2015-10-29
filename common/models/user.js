var stripe = require("stripe")('sk_test_rV9tgpFSgr6ntNf2aGcx42Ta');
module.exports = function(UserModel) {
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
