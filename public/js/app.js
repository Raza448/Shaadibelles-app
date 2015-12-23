'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbFrontEnd', [
        'oc.lazyLoad',
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngSanitize',
        'ngCookies',
        'ngFileUpload',
        'angular.filter',
        'uiGmapgoogle-maps',
        'wu.masonry',
        'angularPayments',
        'duScroll',
    'textAngular'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$sceProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $sceProvider, uiGmapGoogleMapApiProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });


uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM',
      v: '3.17',
      libraries: [ 'places', 'geocoder' ] // Required for SearchBox.
    });

        $sceProvider.enabled(false);

        $urlRouterProvider.otherwise('/main/home');

        $stateProvider


            .state('main', {
            url: '/main',
            controller: 'MainCtrl',
            templateUrl: 'public/views/main.html',
            loadMyDirectives: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: ['public/js/window.js', 'public/js/controllers/main.js']
                })
            }
        })

        .state('main.home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'public/views/home.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/home.js', 'public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.blog', {
                url: '/blog',
                controller: 'PostsCtrl',
                templateUrl: 'public/views/blog.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/blog.js', 'public/js/window.js', 'public/js/controllers/main.js'] //'js/controllers/home.js'
                        })
                    }
                }
            })
            .state('main.verified', {
                url: '/verified',
                controller: 'MainCtrl',
                templateUrl: 'public/views/verified.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                        })
                    }
                }
            })

        .state('main.vendorverified', {
            url: '/vendorverified',
            controller: 'MainCtrl',
            templateUrl: 'public/views/vendorverified.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.category', {
                url: '/category/:id',
                controller: 'CategoriesCtrl',
                templateUrl: 'public/views/category.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/categories.js', 'public/js/window.js', 'public/js/controllers/main.js']
                        })
                    }
                }
            })
            .state('main.signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: 'public/views/bride_signup.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/signup.js', 'public/js/window.js', 'public/js/controllers/main.js']
                        })
                    }
                }
            })

        .state('main.vendorsignup', {
            url: '/vendorsignup',
            controller: 'VendorSignupCtrl',
            templateUrl: 'public/views/vendor_signup.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/vendorsignup.js', 'public/js/window.js', 'public/js/controllers/main.js']
                    })
                }
            }
        })

        .state('main.vendorsignuptwo', {
            url: '/vendorsignuptwo',
            controller: 'VendorSignupTwoCtrl',
            templateUrl: 'public/views/vendor_signup2.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/vendorsignuptwo.js', 'public/js/window.js', 'public/js/controllers/main.js']
                    })
                }
            }
        })

 .state('main.vendorpremium', {
            url: '/premium',
            controller: 'VendorSignupTwoCtrl',
            templateUrl: 'public/views/premium.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/vendorsignuptwo.js', 'public/js/window.js', 'public/js/controllers/main.js']
                    })
                }
            }
        })


.state('main.brideaccount', {
                url: '/profile',
                controller: 'BrideProfileCtrl',
                templateUrl: 'public/views/account.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/account.js', 'public/js/window.js'] //'js/controllers/home.js'
                        })
                    }
                }
            })

.state('main.vendoraccount', {
                url: '/vendorprofile',
                controller: 'VendorProfileCtrl',
                templateUrl: 'public/views/vendoraccount.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbFrontEnd',
                            files: ['public/js/controllers/vendor.js', 'public/js/window.js'] //'js/controllers/home.js'
                        })
                    }
                }
            })

        .state('main.post', {
            url: '/post/:id',
            controller: 'PostCtrl',
            templateUrl: 'public/views/blog_detail_article.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/post.js', 'public/js/window.js']
                    })
                }
            }
        })

        .state('main.page', {
            url: '/page/:id',
            controller: 'PageCtrl',
            templateUrl: 'public/views/page.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/page.js', 'public/js/window.js']
                    })
                }
            }
        })


        .state('main.galleries', {
            url: '/galleries',
            controller: 'GalleriesCtrl',
            templateUrl: 'public/views/galleries.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/galleries.js', 'public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.gallery', {
            url: '/gallery/:id',
            controller: 'GalleryCtrl',
            templateUrl: 'public/views/image_gallery.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/gallery.js', 'public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.post-images', {
            url: '/post-images/:id',
            controller: 'PostImagesCtrl',
            templateUrl: 'public/views/blog_detail_image.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/post-images.js', 'public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.searchresult', {
            url: '/searchresult',
            controller: 'SearchResultsCtrl',
            templateUrl: 'public/views/search_result.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/searchresult.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


        .state('main.vendordetail', {
            url: '/vendordetail/:id',
            controller: 'VendorDetailCtrl',
            templateUrl: 'public/views/vendor_detail.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })
  .state('main.vendor', {
            url: '/vendor/:id',
            controller: 'VendorDetailCtrl',
            templateUrl: 'public/views/vendor.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

       

        .state('main.vendor.weddings', {
            url: '/weddings',
            templateUrl: 'public/views/vendor/weddings.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.vendor.reviews', {
            url: '/reviews',
            templateUrl: 'public/views/vendor/reviews.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.vendor.allreviews', {
            url: '/allreviews',
            templateUrl: 'public/views/vendor/all_reviews.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })



        .state('main.vendor.contact', {
            url: '/contact',
            templateUrl: 'public/views/vendor/contact.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.vendormain', {
            url: '/vendormain',
            controller: 'VendorsMainCtrl',
            templateUrl: 'public/views/vendor_main_page.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/vendormain.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


     .state('main.contact', {
            url: '/contact',
            controller: 'MainCtrl',
            templateUrl: 'public/views/contact.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

      .state('main.disabled', {
            url: '/disabled',
            controller: 'MainCtrl',
            templateUrl: 'public/views/disabled.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


 .state('main.reset', {
            url: '/reset',
            controller: 'SignupCtrl',
            templateUrl: 'public/views/reset.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/signup.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })



        .state('main.vendormaintwo', {
            url: '/vendormaintwo',
            controller: 'VendorsTwoCtrl',
            templateUrl: 'public/views/vendor_more.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/vendortwo.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


        .state('main.exist', {
            url: '/exist',
            controller: 'MainCtrl',
            templateUrl: 'public/views/exist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


  .state('main.notexist', {
            url: '/notexist',
            controller: 'MainCtrl',
            templateUrl: 'public/views/notexist.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

.state('main.regsuccess', {
            url: '/regsuccess',
            controller: 'MainCtrl',
            templateUrl: 'public/views/regsuccess.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })


        .state('main.signuptwo', {
            url: '/signuptwo',
            controller: 'SignupTwoCtrl',
            templateUrl: 'public/views/revised_submission_2.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/signuptwo.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.signupthree', {
            url: '/signupthree',
            controller: 'SignupThreeCtrl',
            templateUrl: 'public/views/revised_submission_3.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/signupthree.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })
    }])
    .run(function($rootScope, $state, $log, $cookieStore, $http, $timeout) {




 $rootScope.map = {
    "center": {
      "latitude": 52.47491894326404,
      "longitude": -1.8684210293371217
    },
    "zoom": 15
  }; //TODO:  set location based on users current gps location
  $rootScope.marker = {
    id: 0,
    coords: {
      latitude: 52.47491894326404,
      longitude: -1.8684210293371217
    },
    options: {
      draggable: true
    },
    events: {
      dragend: function(marker, eventName, args) {

        $rootScope.marker.options = {
          draggable: true,
          labelContent: "lat: " + $rootScope.marker.coords.latitude +
            ' ' + 'lon: ' + $rootScope.marker.coords.longitude,
          labelAnchor: "100 0",
          labelClass: "marker-labels"
        };
      }
    }
  };



  


 $rootScope.startLoading = function(){
  $rootScope.loading = true;
}

$rootScope.stopLoading = function(){
 $rootScope.loading = false;
}

 $http.get('/credentials').then(function(res) {
                if (res.data) {
                    $rootScope.user = { id : res.data.userId,
                    accessToken :  res.data.accessToken }
                    $rootScope.getUserData();
                }
            
            });
        $rootScope.homeSlider = null;
        $rootScope.homeWidgets = [];
        $rootScope.featuredVendor = null;
        $rootScope.checkItem = function(item){
            var i = $rootScope.blogWidgets.indexOf(item.id);
            if(i >= 0){
                return true;
            } else {
                return false;
            }
        }
        $rootScope.vendorSearch = null;
        $rootScope.changeVendorSearch = function(type) {
            $rootScope.vendorSearch = type;
        }

        $rootScope.vendorDirectory = function(type) {
            $rootScope.vendorSearch = type;
            location.href = "#/main/vendormaintwo?type=" + type;
        }

        $rootScope.getPosts = function() {
            var url = '/api/posts';
            $http.get(url).then(function(res) {
                $rootScope.posts = res.data;

            });
        };
        $rootScope.vendorslides = [];

        $rootScope.getVendors = function() {
            var url = '/api/users';

            $http.get(url).then(function(res) {
                $rootScope.vendors = _.where(res.data, {'realm' : 'vendor'});
                $rootScope.vendors.forEach(function(vendor) {
                       if(vendor.gallery){
                        $rootScope.vendorslides.push(vendor);
                           }
                        $http.get(window.remote + '/api/users/' + vendor.id + '/userReviews').then(function(res) {
                            vendor.reviews = res.data;
                            vendor.totalratings = 0;
                            vendor.reviews.forEach(function(review) {
                                vendor.totalratings += review.rating || 0;
                            });
                            var avg = vendor.totalratings / vendor.reviews.length;
                            vendor.averageRating = Math.round(avg);

                        });
                    });
            })
        };

        $rootScope.getGalleries = function() {
            var url = '/api/galleries';
            $http.get(url).then(function(res) {
                $rootScope.galleries = res.data;


            })
        };


        $rootScope.changeRecommended = function(item) {
            $rootScope.currentRecommended = item;
        };

        $rootScope.changeBlogCategory = function(item) {
            $rootScope.blogCategory = item;
        };

        $rootScope.getData = function() {
           $rootScope.startLoading();
            $http.get(window.remote + '/api/users/admin').then(function(res) {

                $rootScope.site = res.data;
                $rootScope.defaultSlider = $rootScope.site.settings.slider;
                $rootScope.featuredVendor = $rootScope.site.featured_vendor;
                $rootScope.socialLinks = $rootScope.site.social;
                $rootScope.keywords = $rootScope.site.settings.keywords.split(",");
                $rootScope.recommended = [];
                $rootScope.blogWidgets = _.union(res.data.settings.blog.smallWidgets , res.data.settings.blog.mediumWidgets);
                $rootScope.blogWidgets = _.union($rootScope.blogWidgets, res.data.settings.blog.bigWidgets);
                $http.get(window.remote + '/api/widgets').then(function(res){
                    $rootScope.widgets= [];
                    res.data.forEach(function(widget){
                        if($rootScope.checkItem(widget) === false ){
                            $rootScope.widgets.push(widget);
                        }
                    });
                    $rootScope.widgetLimit = 0;
                });
                
                $rootScope.vendorstwo = [];
                $http.get(window.remote + '/api/menus/' + $rootScope.site.settings.menu).then(function(res) {
                    $rootScope.menu = res.data;
                });
                $rootScope.editorschoice = [];
                $rootScope.site.settings.blog.editorschoice.forEach(function(item){
                   $http.get(window.remote + '/api/posts/' + item ).then(function(res){

                     $http.get(window.remote + '/api/posts/' + res.data.id + '/ratings').then(function(rating) {
                                    res.data.ratings = rating.data;
                                    $rootScope.editorschoice.push(res.data);
                                    $rootScope.blogCategory = $rootScope.editorschoice;
                                });
                   }); 
                });
                $rootScope.mostpopular = [];

                $rootScope.site.settings.blog.mostpopular.forEach(function(item){
                   $http.get(window.remote + '/api/posts/' + item ).then(function(res){
                    $http.get(window.remote + '/api/posts/' + res.data.id + '/ratings').then(function(rating) {
                                    res.data.ratings = rating.data;
                                $rootScope.mostpopular.push(res.data);

                                });
                   }); 
                });


                $rootScope.blogSmallWidgets = [];
                $rootScope.blogMediumWidgets = [];
                $rootScope.blogBigWidgets = [];
                $rootScope.adverts = [];
                $rootScope.site.settings.blog.smallWidgets.forEach(function(item) {
                    $http.get(window.remote + '/api/widgets/' + item).then(function(res) {
                        $rootScope.blogSmallWidgets.push(res.data);
                    });

                });


                $rootScope.site.settings.blog.mediumWidgets.forEach(function(item) {
                    $http.get(window.remote + '/api/widgets/' + item).then(function(res) {
                        $rootScope.blogMediumWidgets.push(res.data);
                    });

                });


                $rootScope.site.settings.blog.bigWidgets.forEach(function(item) {
                    $http.get(window.remote + '/api/widgets/' + item).then(function(res) {
                        $rootScope.blogBigWidgets.push(res.data);
                    });

                });
                $rootScope.advertLive = $rootScope.site.settings.adverts[Math.floor(Math.random()*$rootScope.site.settings.adverts.length)];



                    $http.get(window.remote + '/api/adverts/' + $rootScope.advertLive).then(function(res) {
                        $rootScope.advert = res.data;
                    });





               
                


                $rootScope.site.settings.recommended.forEach(function(item) {
                    $http.get(window.remote + '/api/categories/' + item).then(function(resOne) {

                        var category = resOne.data;
                        $http.get(window.remote + '/api/categories/' + category.id + '/posts').then(function(resTwo) {
                            resTwo.data.forEach(function(post) {
                                $http.get(window.remote + '/api/posts/' + post.id + '/ratings').then(function(res) {
                                    post.ratings = res.data;
                                });
                            });
                            $rootScope.recommended.push({
                                name: category.name,
                                posts: resTwo.data
                            });
                             if(resTwo.data.length > 1){
                            $rootScope.currentRecommended = {
                                name: category.name,
                                posts: resTwo.data
                            };
                                
                             }
                           

                        });

                    });

                });


                $http.get(window.remote + '/api/menus/' + $rootScope.site.settings.footerMenu).then(function(res) {
                    $rootScope.footerMenu = res.data;
                });

                $http.get(window.remote + '/api/menus/' + $rootScope.site.settings.footerMenuTwo).then(function(res) {
                    $rootScope.footerMenuTwo = res.data;
                });

                $http.get(window.remote + '/api/sliders/' + $rootScope.defaultSlider).then(function(res) {
                    $rootScope.homeSlider = res.data.slides;
                });
                $http.get(window.remote + '/api/sliders/' + $rootScope.site.settings.blog.slider).then(function(res) {
                    $rootScope.blogSlider = res.data.slides;
                });

                $http.get(window.remote + '/api/users/' + $rootScope.featuredVendor.vendor).then(function(res) {
                    $rootScope.featuredVendor.profile = res.data;
                });
				$rootScope.footerWidgets = [];
				$http.get(window.remote + '/api/widgets/').then(function(res) {
					res.data.forEach(function(footer) {
						if(footer.content.type === 'Footer'){
							$rootScope.footerWidgets.push(footer);
						}
					});
                });

                $rootScope.site.settings.featuredVendors.forEach(function(id) {
                    $http.get(window.remote + '/api/users/' + id).then(function(resOne) {
                        $http.get(window.remote + '/api/users/' + id + '/userReviews').then(function(resTwo) {
                            resOne.data.reviews = resTwo.data;
                            resOne.data.totalratings = 0;
                            resOne.data.reviews.forEach(function(review) {
                                resOne.data.totalratings += review.rating || 0;
                            });
                            var avg = resOne.data.totalratings / resTwo.data.length;
                            resOne.data.averageRating = Math.round(avg);



                            $rootScope.vendorstwo.push(resOne.data);
                        });
                    });
                });


                $http.get(window.remote + '/api/widgets/' + $rootScope.site.settings.widgets[0]).then(function(res) {
                                                        $rootScope.homeWidgets[0] = res.data;

                           if(res.data.content.type === 'Post'){
                            $http.get('/api/posts/' + res.data.content.id ).then(function(res){

                                 $http.get(window.remote + '/api/posts/' + res.data.id + '/ratings').then(function(rating) {
                                 $rootScope.homeWidgets[0].ratings = rating.data;

                                }); 
                            });
                            
                           }

                           if(res.data.content.type === 'Gallery'){
  $http.get(window.remote + '/api/galleries/' + res.data.id + '/ratings').then(function(rating) {
                                    res.data.ratings = rating.data;
                                    $rootScope.homeWidgets[0] = res.data;

                                });
                            
                           }

                  
                });

                $http.get(window.remote + '/api/widgets/' + $rootScope.site.settings.widgets[1]).then(function(res) {
                    $rootScope.homeWidgets[1] = res.data;
                });

                $http.get(window.remote + '/api/widgets/' + $rootScope.site.settings.widgets[2]).then(function(res) {
                    $rootScope.homeWidgets[2] = res.data;
                });
            $rootScope.stopLoading();

            });
          
        }

        $rootScope.reviewAuth = function() {
            if ($rootScope.user.id) {
                location.href = "#/main/signupthree"
            } else {
                $("#form-content").modal('show');
            }
        }



        $rootScope.getUserData = function() {
            $http.get( '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.id).then(function(res) {
                $rootScope.userData = res.data;
            });
        }

       




      

        $rootScope.$on('$stateChangeError', function() {
            $state.go('login');
        });
        $rootScope.$on('$stateChangeSuccess', function() {


   




            $rootScope.getGalleries();

            $rootScope.vendorCategories = window.vendorTypes;



            $rootScope.getPosts();

            $rootScope.getVendors();


            $rootScope.getData();
			$rootScope.navbarCollapsed = true;

           

        });
    });
