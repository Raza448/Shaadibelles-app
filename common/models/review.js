var app = require('../../server/server');
module.exports = function(Review) {


 
Review.beforeRemote(
      'upsert',
      function(ctx, ins, next) {

        app.models.review.findOne({
          'where': {
            'userId': ctx.req.body.userId,
            'vendorId': ctx.req.body.vendorId
          }
        }, function(err, review) {
 
          if(err){
 console.log(err);
next();
}
         if(review.id){
console.log(review);
 ctx.req.body.id = review.id;
          next();
} else {
 ctx.req.body.active = false;
 next();
}


        });

      });




Review.observe(
      'upsert',
      function(ctx, next) {
     
 if (ctx.isNewInstance) {
      
 var html = '<p>New Review posted please check and enable</p></br><p> Review Content : '+ ctx.instance.content +'</p>';

    Review.app.models.Email.send({
      to: 'harishkumarchellappa@gmail.com',
      from: 'support@herokuapp.com',
      subject: 'Review posted',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending review alert email');
      console.log('> sending review alert email to');
    });

    } else {

var html = '<p> Review Updated please check and enable</p></br><p> Review Content : '+ ctx.body.content +'</p>';

    Review.app.models.Email.send({
      to: 'harishkumarchellappa@gmail.com',
      from: 'support@herokuapp.com',
      subject: 'Review Updated',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending review alert email');
      console.log('> sending review alert email to');
    });

 
}
});



};
