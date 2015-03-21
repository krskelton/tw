/**
 * Stretch Galley.
 * Description:       Stretch Gallery - jQuery responsive slider that allows you to create a nice portfolio gallery with smooth animation on hover and lot of customization settings.
 * Version:           2.0.0
 * Author:            irrealix
 * Author URI:        http://irrealix.com/
 * Email:             irrealix@gmail.com
 */


(function(jQuery){
    jQuery.fn.stretch_gallery = function(options){
        options = jQuery.extend({

            width:"100%",
            height:"400px",

            border_size:"0px",
            border_color:"transparent",
            border_radius:"0px",

            caption_size:"20pt",
            caption_color:"#000000",

            description_size:"12pt",
            description_color:"#000000",

            text_block_height:"85px",
            text_block_background: "rgba(255,255,255,0.5)",
            text_block_bottom:"0px",

            animation_speed:"1000ms"

        }, options);

        var make = function(){

            var gwidth;

            var gheight;

            var slide_width;

            var bgImgHeight;

            var bgImgWidth;

            var $this = jQuery(this);

            $this.addClass("stretch_gallery");
            $this.css({"width":options.width,"height":options.height,"background":options.border_color});
            gwidth = $this.width();
            gheight = $this.height();



            jQuery.easing.def = "easeOutExpo" ;
            var count=0;
            $this.find(".sg_slide").css({"border-radius":options.border_radius});
            $this.find(".sg_caption").css({"font-size":options.caption_size,"color":options.caption_color});
            $this.find(".sg_description").css({"font-size":options.description_size,"color":options.description_color});
            $this.find(".sg_text_block").css({"bottom":options.text_block_bottom,"background":options.text_block_background, "border-radius":options.border_radius,"height":options.text_block_height});

            var images_count=0;
            $this.find(".sg_slide").each(function(  ) {
                images_count++;
            });
            //console.log(parseInt(options.border_size));

            gwidth=gwidth-(images_count-1)*parseInt(options.border_size);

            $this.find(".sg_slide").each(function(  ) {


                slide_width = gwidth/images_count;

                jQuery(this).css({"width":slide_width,"height":gheight});


                if (count!=0) {


                    jQuery(this).css({"margin-left":options.border_size});
                }

                count++;

            });




            $this.find(".sg_slide").bind("mousemove ",function(e){

                e.preventDefault();


                var img_count=0;
                jQuery(this).parent().parent().find(".sg_slide").each(function( ) {
                    img_count++;

                });

                gheight = $this.height();
                gwidth = $this.width()-(img_count-1)*parseInt(options.border_size);



                var image_url = jQuery(this).css('background-image'), image;
                image_url = image_url.match(/^url\("?(.+?)"?\)$/);
                if (image_url[1]) {
                    image_url = image_url[1];
                    image = new Image();
                    jQuery(image).load(function () {
                        bgImgWidth = image.width;
                        bgImgHeight = image.height;

                    });

                    image.src = image_url;
                }

                var d = gheight / bgImgHeight;
                var sel_width = Math.ceil(bgImgWidth*d);
                if ((sel_width +images_count*10)>gwidth) {
                    sel_width =gwidth-img_count*10;
                }


                slide_width = (gwidth-sel_width)/(img_count-1);


                jQuery(this).parent().parent().find(".sg_slide").stop().animate({'width':slide_width},options.animation_speed);

                jQuery(this).stop().animate({ 'width': sel_width},options.animation_speed);


            });

            $this.find(".sg_slide").bind("mouseout",function(e){


                var img_count=0;
                jQuery(this).parent().parent().find(".sg_slide").each(function(  ) {
                    img_count++;

                });


                gwidth = jQuery(this).parent().parent().width()-(img_count-1)*parseInt(options.border_size);

                slide_width = gwidth/img_count;

                jQuery(this).parent().parent().find(".sg_slide").stop().animate({'width':slide_width},options.animation_speed);



            });

            jQuery(window).resize(function() {
                gwidth = $this.width();
                var img_count=0;

                $this.find(".sg_slide").each(function( index ) {
                    img_count++;

                });
                $this.find(".sg").css("width",gwidth+100);

                slide_width = gwidth/img_count-parseInt(options.border_size);

                $this.find(".sg_slide").stop().animate({'width':slide_width},10);
            });

            function shownext(next){



                images_count=0;
                $(next).parent().parent().find(".sg_slide").each(function( index ) {
                    images_count++;

                });

                gheight = $(next).parent().parent().height();
                gwidth = $(next).parent().parent().width()-(img_count-1)*parseInt(options.border_size);

                var image_url = jQuery(next).css('background-image'), image;
                image_url = image_url.match(/^url\("?(.+?)"?\)$/);
                if (image_url[1]) {
                    image_url = image_url[1];
                    image = new Image();
                    jQuery(image).load(function () {
                        bgImgWidth = image.width;
                        bgImgHeight = image.height;

                    });

                    image.src = image_url;
                }

                var d = gheight / bgImgHeight;
                var sel_width = Math.ceil(bgImgWidth*d);
                if ((sel_width +images_count*10)>gwidth) {
                    sel_width =gwidth-images_count*10;
                }


                slide_width = Math.ceil((gwidth-sel_width)/(images_count-1));


                $(next).parent().parent().find(".sg_slide").stop().animate({'width':slide_width},options.animation_speed);
                $(next).parent().parent().find(".sg_text_block").stop().animate({'left':'500px'},options.animation_speed);
                jQuery(next).stop().animate({ 'width': sel_width},options.animation_speed);

                jQuery(next).find(".sg_text_block").stop().animate({'left':'0px'},options.animation_speed);
            };

            var started = false,
                delta = 0,
                tapx= 0,
                tapy= 0,
                oldx= 0,
                oldy= 0;


            jQuery(".sg_slide").bind("touchstart",function(e){


                event.preventDefault();
                var touches = event.changedTouches;

                tapx = event.touches[0].pageX;
                tapy = event.touches[0].pageY;

                started = true;
                oldx = tapx;
                oldy = tapy;


            });

            jQuery(".sg_slide").bind("touchmove",function(e){

                event.preventDefault();
                var touches = event.changedTouches;


                tapx = event.touches[0].pageX;
                tapy = event.touches[0].pageY;
                delta = (tapx - oldx);


                oldx = tapx;
                oldy = tapy;

            });
            jQuery(".sg_slide").bind("touchend touchcancel",function(e){

                if (!started){
                    return;
                }

                e.preventDefault();




                var next;
                if (Math.abs(delta)>5){
                    if (delta < 0){
                        next = jQuery(this).next(".sg_slide");
                    }
                    else{
                        next = jQuery(this).prev(".sg_slide");
                    }
                    if(next!=undefined) {
                       // console.log(next);
                        shownext(next);
                    }
                }
                else{shownext(this);}

            });



        };

        return this.each(make);
    };
})(jQuery);






 
jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {

        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
    });





   




