/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */


    /* ==============================================
    Full Width Menu
    =============================================== */
    
    var orsovaMenuWrap=$('.orsova-menu').find('.menu-wrap');
    var orsovaMenu=$('.orsova-menu').find('.menu-wrap > ul > li').children('ul');
    var orsovaMenuLength=orsovaMenu.length;
    
    
    orsovaMenu.each(function(e){
    
        $(this).siblings('a').append('<i class="open-menu fa fa-angle-down"></i>');
    
    });
    
    /* Menu Slide Toggle */
    
    $('.open-menu').on('click',function(e){
    
        e.preventDefault();
        
        if($(this).parent('a').parent('li').hasClass('active')){
            $('.open-menu').parent('a').parent('li').removeClass('active');
            $(this).parent('a').siblings('ul').stop().slideUp({
                duration:1000,
                easing: 'easeOutExpo'
            });
    
        }
        
        else{
    
            $('.open-menu').parent('a').parent('li').removeClass('active');
            $(this).parent('a').parent('li').addClass('active');
            $('.open-menu').parent('a').siblings('ul').stop().slideUp({
                duration:1000,
                easing: 'easeOutExpo'
            });
    
            $(this).parent('a').siblings('ul').stop().slideDown({
                duration:1000,
                easing: 'easeOutExpo'
            });
        }   
    });
    
    $('.open-menu').hover(function(){
    
        $(this).stop().animate({
            paddingTop:'10px'
        },200);
    
    },function(){
    
        $(this).stop().animate({
            paddingTop:'7px'
        },200);
    
    });
    
    $('.close-icon').click(function(){
    
        orsovaMenuWrap.removeClass('fadeInDown');
        orsovaMenuWrap.addClass('fadeOutUp');
    
        $('.orsova-menu').stop().delay(500).slideUp({
            duration:500,
            easing:'easeOutCubic'
        }); 
    
        $('.top-bars').find('.fa').stop().delay(600).animate({
            opacity:1
        },300);
    });


    $('.top-bars').find('.fa').click(function(){
        orsovaMenuWrap.removeClass('fadeOutUp');   
        orsovaMenuWrap.addClass('fadeInDown');
    
        $('.orsova-menu').stop().slideDown({
            duration:500,
            easing:'easeInCubic'
        });
        $('.orsova-menu').css('display','block');
        $(this).stop().animate({
            opacity:0
        },300);
    });

    /* ==============================================
        Full height home-section
    =============================================== */
    
	var windowHeight = $(window).height(),
		topSection = $('#hero-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);       
	});

    /* ==============================================
        Parallax
    =============================================== */
    
    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
                  scrollTop: target.offset().top -80
            }, 1000);
            return false;
          }
        }
    });

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {   
        var dataperc;   
        $('.statistic-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,      
                speed: 1000,             // ms
                refreshInterval: 10,
            });  
        });
    }
        
    $('.statistic-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',                 
        triggerOnce: true
    });

    /* ==============================================
        BxSlider
    =============================================== */

         $('.skills-slider, .process-slider').bxSlider({
            auto: true,
            controls: false,
            adaptiveHeight: true
         });

    /* ==============================================
    Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();

    /* ==============================================
    Google Map
    =============================================== */

	var contact = {"lat":"51.51152", "lon":"-0.125198"}; //change coordinates map here

	var mapContainer = $('.map');
	mapContainer.gmap3({
		action: 'addMarker',
		marker:{
			options:{
				icon : new google.maps.MarkerImage('assets/images/marker.png')
			}
		},
		latLng: [contact.lat, contact.lon],
		map:{
			center: [contact.lat, contact.lon],
			zoom: 17
			},
		},
		{action: 'setOptions', args:[{scrollwheel:false}]}
	);

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
    },{accY: -150});  

    /* ==============================================
    Contact Form
    =============================================== */

    $('#contactform').submit(function(){

        var action = $(this).attr('action');

        $("#alert").slideUp(750,function() {
            $('#alert').hide();

        $('#submit')
            .after('<img src="assets/images/ajax-loader.GIF" class="contactloader" />')
            .attr('disabled','disabled');

        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#contactform img.contactloader').fadeOut('slow',function(){$(this).remove();});
                $('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                }
            }
        );

        });

        return false;

    });

    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

});

$(window).load(function(){
    "use strict";
    
    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({ 
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }


            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});
