$(document).ready(function(){

    console.log('test');
    var $headBox = $('#headBox');
    var $gnb = $('.gnb')
    var $gnb_menu = $gnb.children('li');
    var $gnb_2depth = $gnb.find('.depth2');
    var $gnb_2depth_menu = $gnb_2depth.children('li');
    var speed = 400;

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


});