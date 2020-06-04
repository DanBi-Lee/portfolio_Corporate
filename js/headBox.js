$(document).ready(function(){

    (function(){
        var $headBox = $('#headBox');
        var $gnb = $('.gnb')
        var $gnb_2depth = $gnb.find('.depth2');
        var speed = 400;
        var $btnGnb = $('.btn_gnb');
        var $mobileGnbMenu = $('.mobile_gnb_menu');
        var openedMobileGnb = false;

        function gnbSlide(){
            $gnb.on('mouseenter', openMenu);
            $gnb.on('focusin', openMenu);
            $headBox.on('mouseleave', closeMenu);
            $gnb.last().children('li').last().find('a').on('focusout', closeMenu);
        
            function openMenu(){
                $headBox.addClass('on');
                $gnb_2depth.stop().slideDown(speed);
            }
            function closeMenu(){
                $gnb_2depth.stop().slideUp(speed/2,function(){
                    $headBox.removeClass('on');
                });
            }
        }
        gnbSlide();

        function headerScroll(){
            var currentScrollTop = 0;
            $(window).on('scroll', function(){
                if( !openedMobileGnb ){
                    var scrollTop = $(this).scrollTop();
                    if( currentScrollTop < scrollTop ){
                        $headBox.css({
                            marginTop : '-80px'
                        })
                    }else{
                        $headBox.css({
                            marginTop : '0px'
                        })
                    }
                }
                currentScrollTop = $(this).scrollTop();
            })
        }
        headerScroll();

        function resizing(){ // 리사이징하여 모바일버전, PC버전이 전환될 경우 동작 초기화
            $(window).on('resize', function(){
                var _this = $(this);
                var mbToPcSize = 979;
                if(mbToPcSize < _this.outerWidth()){//PC화
                    resetHeader();
                }
                function resetHeader(){
                    $btnGnb.removeClass('on');
                    $mobileGnbMenu.css({
                       top : '-100%'
                    });
                    openedMobileGnb = false;
                }
            });
        }
        resizing();

        function mobileGnbBtn(){
            $btnGnb.on('click', function(){
                var _this = $(this);
                if(_this.hasClass('on')){
                    _this.removeClass('on');
                    $mobileGnbMenu.css({
                       top : '-100%'
                    });
                    openedMobileGnb = false;
                }else{
                    openedMobileGnb = true;
                    _this.addClass('on');
                    $mobileGnbMenu.css({
                        top : '0%'
                    });
                }
            });
        }
        mobileGnbBtn();
    })();
});