var stripe = require("stripe")('sk_test_XvlZMkw30XyvwSHknwsj7rI2');
var session = require('express-session');
var path = require('path');
var app = require('../../server/server');
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
/*var transporter = nodemailer.createTransport('smtps://orbi7435%40gmail.com:orbi$$123#@smtp.gmail.com');*/
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shaadibelle@gmail.com',
        pass: 'shaadi$$123'
    }
});

module.exports = function(UserModel) {

    UserModel.afterRemote(
        'login',
        function(ctx, ins, next) {
            ctx.req.session.user = {
                'userId': ins.userId,
                'accessToken': ins.id
            }
            console.log(ctx.req.session.user);
            next();
        });


    UserModel.beforeRemote(
        'login',
        function(ctx, ins, next) {
            UserModel.findOne({ where: { 'username': ctx.req.body.username } }, function(err, user) {
                if (err) {
                    console.log(err);
                    next();
                }
                if (user && user.active === false) {
                    var error = new Error('disabled');
                    error.statusCode = 500;
                    next(error);
                }
                next();

            });
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
        /*var html = 'Click <a href="' + url + '?id=' + info.accessToken.userId + '&access_token=' +
            info.accessToken.id + '">here</a> to reset your password';*/

          var html = 'Dear ' + info.user.username+ ',<br><br>' + 'This is a system generated mail sent for your profile registered with Shaadibelles. Click on the following link to reset the password for your account.<br> Reset My Password <a style="border: solid 6px lightgreen;background-color: lightgreen;color: blue;font-size: 15px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;border-top-left-radius: 5px;border-top-right-radius: 5px;" href="' + url + '?id=' + info.accessToken.userId + '&access_token=' +info.accessToken.id + '"> Click here</a> <br><br><span style="font-size: 11px;color: red;">Note: This link will be functional for 72 hours and can only be used once. </span> <br><br>--<br>Regards...<br>Shaadibelles Team';
            console.log(" ----- Hi Reset---------",info, html);
    

        transporter.sendMail({
            to: info.email,
            from: 'Shaadibelles Support <support@shaadibelles.com>',
            subject: 'Password reset',
            html: html
        }, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
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
                if (err) {
                    callback(err);
                } else {
                    if (user.realm === 'vendor') {
                        app.models.Role.findOne({ 'where': { 'name': 'admin' } }, function(err, role) {
                            role.principals.create({
                                principalType: app.models.RoleMapping.USER,
                                principalId: user.id
                            }, function(err, principal) {
                                if (err) throw err;
                                console.log('Created principal:', principal);
                            });
                        });
                    } else {
                        app.models.Role.findOne({ 'where': { 'name': 'guest' } }, function(err, role) {
                            role.principals.create({
                                principalType: app.models.RoleMapping.USER,
                                principalId: user.id
                            }, function(err, principal) {
                                if (err) throw err;

                                console.log('Created principal:', principal);
                            });
                        });
                    } 
                    UserModel.generateVerificationToken(user, function(err, token) {

                       UserModel.updateAll({ 'id': user.id }, { 'verificationToken': token }, function(err, count) {
                            console.log('> user.afterRemote triggered');
                            var url = 'http://shaadibelles.herokuapp.com:80/api/users/confirm?uid=' + user.id + '&redirect=/verified&token=' + token;
                            if (user.realm === 'vendor') {
                                url = 'http://shaadibelles.herokuapp.com:80/api/users/confirm?uid=' + user.id + '&redirect=/vendorverified&token=' + token;
                            }
                            console.log(url)
                            var options = {
                                to: user.email,
                                from: 'Shaadibelles Support <support@shaadibelles.com>',
                                subject: 'Shaadibelles Registration Acknowledgement',
                                html: "<p>Thankyou for register with shaadibelles. You are one step away to use your account. Kindly click on given below link to activate your account</p></br></br><a href='" + url + "'>Click here to activate</a></br></br><p>Regards</p></br><img src='http://shaadibelles.herokuapp.com/public/images/logo.png' /></br><p>Shaadibelles Inc</p>"
                            };

                            transporter.sendMail(options, function(error, info){
                                if(error){
                                    return console.log(error);
                                }
                                console.log('Message sent: ' + info.response);
                                return res.send(user);
                            });
                        });
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
        app.models.user.find({ 'where': { 'id': id } }, function(err, vendors) {
            var vendor = vendors[0];
            if (err) {
                return callback(err);
            }

            app.models.Email.send({
                from: 'support@shaadibelles.com',
                to: vendor.email,
                subject: 'New Contact request from shaadibelles',
                text: body.content
            }, function(err, mail) {
                if (err) {
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

            app.models.user.updateAll({ 'where': { 'id': userId } }, { 'subscription': subscription }, function(err, users) {
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


    UserModel.admin = function(req, res, callback) {
        app.models.Role.findOne({ where: { name: 'admin' } }, function(err, adminRole) {
            console.log(adminRole);
            app.models.RoleMapping.find({ where: { principalType: "USER", roleId: adminRole.id } }, function(err, users) {
                console.log(users);
                if (users.length >= 0) {
                    app.models.user.findOne({ where: { id: users[0].principalId } }, function(err, user) {
                        if (err) {
                            console.log(err);
                        }
                        res.status(200).send(user);
                    })
                }
            });
        });
    }

    UserModel.remoteMethod(
        'admin', {
            accepts: [{
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
                path: '/admin',
                verb: 'get'
            }
        }
    );
};
