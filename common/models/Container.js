module.exports = function(Container) {
Container.beforeRemote('upload', function(ctx,  modelInstance, next){
      console.log(modelInstance);                     

    });
};
