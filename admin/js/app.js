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
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'localytics.directives',
    'ngResource',
    'ngFileUpload',
	'ngSanitize',
	'ngCookies',
    'angular.filter',
    'textAngular',
'youtube-embed'

  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$sceProvider', function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $sceProvider) {
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

      $sceProvider.enabled(false);



    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'admin/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'admin/js/directives/header/header.js',
                    'admin/js/directives/header/header-notification/header-notification.js',
                    'admin/js/directives/sidebar/sidebar.js',
                    'admin/js/directives/sidebar/sidebar-search/sidebar-search.js',
                    'admin/js/controllers/dashboard.js',
                    'admin/js/services/file.js'

                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'DashboardCtrl',
        templateUrl:'admin/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'admin/js/controllers/dashboard.js',
              'admin/js/directives/timeline/timeline.js',
              'admin/js/directives/notifications/notifications.js',
              'admin/js/directives/chat/chat.js',
              'admin/js/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.users',{
        templateUrl:'views/dashboard/user/users.html',
        url:'/users',
        controller: "UsersCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/users.js',
              'js/window.js'
              ]
            })
          }
        }
    })
    .state('dashboard.new-user',{
        templateUrl:'views/dashboard/user/create_user.html',
        url:'/new-user',
        controller: "NewUserCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_user.js',
              'js/window.js'
              ]
            })
          }
        }
    })
    .state('dashboard.edit-user',{
        templateUrl:'views/dashboard/user/create_user.html',
        url:'/edit-user',
        controller: "EditUserCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_user.js',
              'js/window.js'
              ]
            })
          }
        }
    })
  .state('dashboard.social',{
        templateUrl:'views/dashboard/blog/social.html',
        url:'/social',
        controller: "SocialCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/social.js',
              'js/window.js'
              ]
            })
          }
        }
    })    

  .state('dashboard.vendors',{
        templateUrl:'views/dashboard/user/vendors.html',
        url:'/vendors',
        controller: "VendorsCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/vendors.js',
              'js/window.js'
              ]
            })
          }
        }
    })
    .state('dashboard.new-vendor',{
        templateUrl:'views/dashboard/user/create_vendor.html',
        url:'/new-vendor',
        controller: "NewVendorCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_vendor.js',
              'js/window.js'
              ]
            })
          }
        }
    })
    .state('dashboard.edit-vendor',{
        templateUrl:'views/dashboard/user/create_vendor.html',
        url:'/edit-vendor',
        controller: "EditVendorCtrl",
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_vendor.js',
              'js/window.js'
              ]
            })
          }
        }
    })


      .state('dashboard.post',{
        templateUrl:'views/dashboard/blog/create_post.html',
        url:'/post',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/posts.js',
              'js/window.js'
              ]
            })
          }
        }
    })

      .state('dashboard.posts',{
        templateUrl:'views/dashboard/blog/posts.html',
        controller: 'PostsCtrl',
        url:'/posts',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/posts.js',
              'js/window.js'
              ]
            })
          }
        }
    })

      .state('dashboard.categories',{
        templateUrl:'views/dashboard/blog/categories.html',
        url:'/categories',
        controller: 'CategoriesCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/categories.js',
              'js/window.js'              ]
            })
          }
        }
    })
    .state('dashboard.new-category',{
      templateUrl:'views/dashboard/blog/category_details.html',
      url:'/new-category',
      controller: 'NewCategoryCtrl',
      resolve: {
        loadMyFiles:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'sbAdminApp',
            files:[
            'js/controllers/create_category.js',
            'js/window.js'              ]
          })
        }
      }
  })
  .state('dashboard.edit-category',{
    templateUrl:'views/dashboard/blog/category_details.html',
    url:'/edit-category',
    controller : 'EditCategoryCtrl',
    resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'js/controllers/edit_category.js',
          'js/window.js'              ]
        })
      }
    }
})


.state('dashboard.pages',{
        templateUrl:'views/dashboard/blog/pages.html',
        url:'/pages',
        controller: 'PagesCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/pages.js',
              'js/window.js'              ]
            })
          }
        }
    })
    .state('dashboard.new-page',{
      templateUrl:'views/dashboard/blog/page_details.html',
      url:'/new-page',
      controller: 'NewPageCtrl',
      resolve: {
        loadMyFiles:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'sbAdminApp',
            files:[
            'js/controllers/new_page.js',
            'js/window.js'              ]
          })
        }
      }
  })
  .state('dashboard.edit-page',{
    templateUrl:'views/dashboard/blog/page_details.html',
    url:'/edit-page',
    controller : 'EditPageCtrl',
    resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'js/controllers/edit_page.js',
          'js/window.js'              ]
        })
      }
    }
})


      .state('dashboard.profile',{
       templateUrl:'views/admin/profile_edit.html',
       url:'/profile',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/profile.js',
              'js/window.js'
              ]
            })
          }
        }
   })
     .state('dashboard.new-widget',{
       templateUrl:'views/dashboard/appearance/widget_details.html',
       url:'/new-widget',
       controller: 'NewWidgetCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_widget.js',
              'js/window.js'
              ]
            })
          }
        }
   })

  .state('dashboard.edit-widget',{
       templateUrl:'views/dashboard/appearance/widget_details.html',
       url:'/edit-widget',
       controller: 'EditWidgetCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_widget.js',
              'js/window.js'
              ]
            })
          }
        }
   })

 .state('dashboard.feature-vendor',{
       templateUrl:'views/dashboard/appearance/feature_vendor.html',
       url:'/feature_vendor',
       controller: 'FeatureVendorCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/feature_vendor.js',
              'js/window.js'
              ]
            })
          }
        }
   })


  .state('dashboard.widgets',{
       templateUrl:'views/dashboard/appearance/widgets.html',
       url:'/widgets',
       controller: 'WidgetsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/widgets.js',
              'js/window.js'
              ]
            })
          }
        }
   })

     .state('dashboard.new-slider',{
       templateUrl:'views/dashboard/appearance/slider_details.html',
       url:'/new-slider',
       controller: 'NewSliderCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_slider.js',
              'js/window.js'
              ]
            })
          }
        }
   })

  .state('dashboard.edit-slider',{
       templateUrl:'views/dashboard/appearance/slider_details.html',
       url:'/edit-slider',
       controller: 'EditSliderCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_slider.js',
              'js/window.js'
              ]
            })
          }
        }
   })

  .state('dashboard.sliders',{
       templateUrl:'views/dashboard/appearance/sliders.html',
       url:'/sliders',
       controller: 'SlidersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/sliders.js',
              'js/window.js'
              ]
            })
          }
        }
   })

 .state('dashboard.vendor-profile',{
       templateUrl:'views/dashboard/user/reviews.html',
       url:'/vendor-reviews',
       controller: 'ReviewsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/reviews.js',
              'js/window.js'
              ]
            })
          }
        }
   })


   
       .state('dashboard.menus',{
       templateUrl:'views/dashboard/appearance/menus.html',
       url:'/menus',
       controller: 'MenusCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/menus.js',
              'js/window.js'
              ]
            })
          }
        }
   })
          .state('dashboard.new-post',{
       templateUrl:'views/dashboard/blog/create_post.html',
       url:'/new-post',
       controller: 'NewPostCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_post.js',
              'js/window.js'
              ]
            })
          }
        }
   })
          .state('dashboard.edit-post',{
       templateUrl:'views/dashboard/blog/create_post.html',
       url:'/edit-post',
       controller: 'EditPostCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_post.js',
              'js/window.js'
              ]
            })
          }
        }
   })

          .state('dashboard.new-review',{
       templateUrl:'views/dashboard/user/create_review.html',
       url:'/new-review',
       controller: 'NewReviewCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_review.js',
              'js/window.js'
              ]
            })
          }
        }
   })
          .state('dashboard.edit-review',{
       templateUrl:'views/dashboard/user/create_review.html',
       url:'/edit-review',
       controller: 'EditReviewCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_review.js',
              'js/window.js'
              ]
            })
          }
        }
   })

      .state('dashboard.contact',{
       templateUrl:'views/dashboard/settings/contact.html',
       url:'/contact',
       controller: 'SiteInfoCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/site_info.js',
              'js/window.js'
              ]
            })
          }
        }
   })

    .state('dashboard.new-menu',{
       templateUrl:'views/dashboard/appearance/menu_details.html',
       url:'/new-menu',
       controller: 'NewMenuCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/new_menu.js',
              'js/window.js'
              ]
            })
          }
        }
   })
      .state('dashboard.edit-menu',{
       templateUrl:'views/dashboard/appearance/menu_details.html',
       url:'/edit-menu',
       controller: 'EditMenuCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/edit_menu.js',
              'js/window.js'
              ]
            })
          }
        }
   })

 
    .state('dashboard.adverts',{
        templateUrl:'views/dashboard/settings/adverts.html',
        url:'/adverts',
        controller: 'AdvertsCtrl',
        resolve: {
           loadMyFiles:function($ocLazyLoad) {
             return $ocLazyLoad.load({
               name:'sbAdminApp',
               files:[
               'js/controllers/adverts.js',
               'js/window.js'
               ]
             })
           }
         }
    })
    .state('dashboard.new-advert',{
        templateUrl:'views/dashboard/settings/advert_details.html',
        url:'/new-advert',
        controller: 'NewAdvertCtrl',
        resolve: {
           loadMyFiles:function($ocLazyLoad) {
             return $ocLazyLoad.load({
               name:'sbAdminApp',
               files:[
               'js/controllers/new_advert.js',
               'js/window.js'
               ]
             })
           }
         }
    })
    .state('dashboard.edit-advert',{
        templateUrl:'views/dashboard/settings/advert_details.html',
        url:'/edit-advert',
        controller: 'EditAdvertCtrl',
        resolve: {
           loadMyFiles:function($ocLazyLoad) {
             return $ocLazyLoad.load({
               name:'sbAdminApp',
               files:[
               'js/controllers/edit_advert.js',
               'js/window.js'
               ]
             })
           }
         }
    })
 .state('dashboard.settings',{
       templateUrl:'views/dashboard/settings/settings.html',
       url:'/settings',
       controller: 'SettingsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/settings.js',
              'js/window.js'
              ]
            })
          }
        }
   })    
.state('dashboard.blogpage',{
       templateUrl:'views/dashboard/settings/blogpage.html',
       url:'/blogpage',
       controller: 'SettingsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/settings.js',
              'js/window.js'
              ]
            })
          }
        }
   })    
       
       .state('dashboard.ratings',{
       templateUrl:'views/dashboard/blog/ratings.html',
       url:'/ratings',
       controller: 'RatingsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/controllers/ratings.js',
              'js/window.js'
              ]
            })
          }
        }
   })
          .state('login',{
       templateUrl:'views/pages/login.html',
       url:'/login',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'js/window.js'
              ]
            })
          }
        }
   })
  }])
.run(function($rootScope, $state, $log, $cookieStore, $http, $window) {
    $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.user = {};
       $http.get('/credentials').then(function(res){
  $rootScope.user = res.data;
});
      $rootScope.detaults = window.defaults;
    });
  });

