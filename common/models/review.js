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
 next();
}


        });

      });

};
