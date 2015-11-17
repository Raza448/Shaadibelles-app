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
        'nemLogging',
        'uiGmapgoogle-maps',
        'wu.masonry',
        'angularPayments'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$sceProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $sceProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true
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

        .state('main.vendordetail.profile', {
            url: '/profile',
            templateUrl: 'public/views/vendor/profile.html',
            resolve: {
                loadMyFiles: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbFrontEnd',
                        files: ['public/js/controllers/main.js', 'public/js/controllers/vendordetail.js', 'public/js/window.js'] //'js/controllers/home.js'
                    })
                }
            }
        })

        .state('main.vendordetail.weddings', {
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

        .state('main.vendordetail.reviews', {
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

        .state('main.vendordetail.allreviews', {
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



        .state('main.vendordetail.contact', {
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
    .run(function($rootScope, $state, $log, $cookieStore, $http) {
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
                }
            
            });
        $rootScope.homeSlider = null;
        $rootScope.homeWidgets = [];
        $rootScope.featuredVendor = null;

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

        $rootScope.getVendors = function() {
            var url = '/api/users';

            $http.get(url).then(function(res) {
                $rootScope.vendors = _.where(res.data, {'realm' : 'vendor'});``
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
                $rootScope.recommended = [];

                $rootScope.vendorstwo = [];
                $http.get(window.remote + '/api/menus/' + $rootScope.site.settings.menu).then(function(res) {
                    $rootScope.menu = res.data;
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

               $rootScope.site.settings.adverts.forEach(function(item) {
                    $http.get(window.remote + '/api/adverts/' + item).then(function(res) {
                        $rootScope.adverts.push(res.data);
                    });

                });
                $rootScope.advertLive = _.shuffle($rootScope.adverts)[0];

                $rootScope.blogCategories = [];
                $rootScope.blogCategory;
                $rootScope.site.settings.blog.categories.forEach(function(item) {
                    $http.get(window.remote + '/api/categories/' + item).then(function(resOne) {

                        var category = resOne.data;
                        $http.get(window.remote + '/api/categories/' + category.id + '/posts').then(function(resTwo) {
                            resTwo.data.forEach(function(post) {
                                $http.get(window.remote + '/api/posts/' + post.id + '/ratings').then(function(res) {
                                    post.ratings = res.data;
                                });
                            });
                            $rootScope.blogCategories.push({
                                name: category.name,
                                posts: resTwo.data
                            });

                            $rootScope.changeBlogCategory({
                                name: category.name,
                                posts: resTwo.data
                            });

                        });

                    });

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
                            $rootScope.currentRecommended = {
                                name: category.name,
                                posts: resTwo.data
                            };

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
                    $rootScope.featuredVendor.vendor = res.data;
                });

                $rootScope.site.settings.featuredVendors.forEach(function(id) {
                    $http.get(window.remote + '/api/users/' + id).then(function(resOne) {
                        $http.get(window.remote + '/api/users/' + id + '/reviews').then(function(resTwo) {
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
            $http.get(window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.id).then(function(res) {
                $rootScope.userData = res.data;
            });
        }

        $rootScope.$watch('user', function(user) {
            if (user) {
                $rootScope.getUserData();
            }
        });




        $rootScope.$watch('user', function(user) {
            if (user && user !== null) {
                $rootScope.getUserData();
            }
        });


        $rootScope.$on('$stateChangeError', function() {
            $state.go('login');
        });
        $rootScope.$on('$stateChangeSuccess', function() {


            $rootScope.$watch('vendors', function(vendors) {

                if (vendors) {



                    vendors.forEach(function(vendor) {
                        $http.get(window.remote + '/api/users/' + vendor.id + '/reviews').then(function(res) {
                            vendor.reviews = res.data;
                            vendor.totalratings = 0;
                            vendor.reviews.forEach(function(review) {
                                vendor.totalratings += review.rating || 0;
                            });
                            var avg = vendor.totalratings / vendor.reviews.length;
                            vendor.averageRating = Math.round(avg);

                        });
                    });
                }

            });




            $rootScope.getGalleries();

            $rootScope.vendorCategories = window.vendorTypes;



            $rootScope.getPosts();

            $rootScope.getVendors();


            $rootScope.getData();


           

        });
    });
