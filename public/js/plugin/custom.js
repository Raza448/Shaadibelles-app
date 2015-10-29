// JavaScript Document

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');


	

	$(function () {
          $("#slider").responsiveSlides({
            auto: true,
            nav: true,
            speed: 500,
            namespace: "callbacks",
            pager: true,
          });
        });
		
		
		
		
		
		jQuery(document).ready(function($) {
			$(".scroll").click(function(event){		
				event.preventDefault();
				$('html,body').animate({scrollTop:$(this.hash).offset().top},1200);
			});
		});
		
		
		
		
		
		
		
		
		
		(function () {
					var menu = new Dottoro.Menu ();
					menu.SetSettings ( {"anim_duration":200,"open_event":"hover","first_level_open":false,"fade":true,"growing":true,"slide":false,"opacFilters":true,"compressed":true,"compressed_under":440,"custom_compressed":false,"move_into_view":true,"move_into_view_compressed":true,"detect_open":false} );
					menu.Build ('nav', 'nav_compressed', 'compressed_menu');
				}) ();
				
				
				
				
				
				
				
	 $("span.menu").click(function(){
		 $(".top-menu ul").slideToggle("slow" , function(){
		 });
		 });
		 
		 
		 addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 
		 
		 
		 
		 
		 
		 
		 /****** home js ******/
		 
		 $(document).ready(function() {
							/*
							var defaults = {
					  			containerID: 'toTop', // fading element id
								containerHoverID: 'toTopHover', // fading element hover id
								scrollSpeed: 1200,
								easingType: 'linear' 
					 		};
							*/
							
							$().UItoTop({ easingType: 'easeOutQuart' });
							
						});
						
						
		$(function() {
				
				$(' #da-thumbs > li ').each( function() { $(this).hoverdir(); } );

			});
			
			
			
